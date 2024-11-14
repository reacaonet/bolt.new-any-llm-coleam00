// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { MAX_RESPONSE_SEGMENTS, MAX_TOKENS } from '~/lib/.server/llm/constants';
import { CONTINUE_PROMPT } from '~/lib/.server/llm/prompts';
import { streamText, type Messages, type StreamingOptions } from '~/lib/.server/llm/stream-text';
import SwitchableStream from '~/lib/.server/llm/switchable-stream';
import tools from '~/lib/.server/llm/tools';
import { z } from 'zod';


export async function action(args: ActionFunctionArgs) {
  return chatAction(args);
}

async function chatAction({ context, request }: ActionFunctionArgs) {
  const { messages, apiKeys, toolEnabled } = await request.json<{
    messages: Messages,
    apiKeys: Record<string, string>
    toolEnabled: boolean
  }>();
  const stream = new SwitchableStream();
  let forceDisableToolAfterProjectImport = false
  if (messages.length > 3) {
    forceDisableToolAfterProjectImport = true
  }

  const useTool = toolEnabled && !forceDisableToolAfterProjectImport
  try {
    const options: StreamingOptions = {
      apiKeys,
      onFinish: async ({ text: content, finishReason, ...props }) => {

        if (finishReason !== 'length') {
          return stream.close();
        }

        if (stream.switches >= MAX_RESPONSE_SEGMENTS) {
          throw Error('Cannot continue message: Maximum segments reached');
        }

        const switchesLeft = MAX_RESPONSE_SEGMENTS - stream.switches;

        console.log(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);

        messages.push({ role: 'assistant', content });
        messages.push({ role: 'user', content: CONTINUE_PROMPT });

        const result = await streamText(messages, context.cloudflare.env, options, apiKeys);

        return stream.switchSource(result.toDataStream());
      },
      tools: useTool ? tools : undefined,
      toolChoice: useTool ? 'auto' : 'none',
    };

    const result = await streamText(messages, context.cloudflare.env, options, apiKeys);
    stream.switchSource(result.toDataStream());

    return new Response(stream.readable, {
      status: 200,
      headers: {
        contentType: 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    if (error.message?.includes('API key')) {
      throw new Response('Invalid or missing API key', {
        status: 401,
        statusText: 'Unauthorized'
      });
    }

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
