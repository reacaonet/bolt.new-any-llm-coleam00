import { json } from '@remix-run/node';
import { z } from 'zod';
import { enhancePrompt } from '~/lib/.server/llm/prompts';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('api.enhancer');

const schema = z.object({
  prompt: z.string(),
});

export const action = async ({ request }: { request: Request }) => {
  logger.debug('Received enhancement request');

  if (request.method !== 'POST') {
    logger.warn(`Invalid method: ${request.method}`);
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await request.json();
    logger.debug('Parsing request body...');
    const { prompt } = schema.parse(body);

    logger.info('Starting prompt enhancement process');
    const { enhancedPrompt, model, status } = await enhancePrompt(prompt);

    logger.info(`Enhancement completed using model: ${model}`);
    return json({
      enhancedPrompt,
      model,
      status,
    });
  } catch (error) {
    logger.error('Error in prompt enhancement:', error);
    return json(
      {
        error: 'Failed to enhance prompt',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
};
