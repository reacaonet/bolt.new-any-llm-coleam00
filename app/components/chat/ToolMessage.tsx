import type { ToolInvocation } from 'ai';
import { useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import { classNames } from '~/utils/classNames';
import { Markdown } from './Markdown';

interface ToolMessageProps {
  content: ToolInvocation;
  data?: any;
  addToolResult?: ({ toolCallId, result }: { toolCallId: string; result: any }) => void;
}

const AskForConfirmation = (props: {
  toolInvocation: ToolInvocation;
  addToolResult?: ({ toolCallId, result }: { toolCallId: string; result: any }) => void;
}) => {
  const toolCallId = props.toolInvocation.toolCallId;
  const addResult = (result: string) =>
    props.addToolResult ? props.addToolResult({ toolCallId, result: result }) : null;

  return (
    <div className="overflow-hidden pt-[4px] flex flex-col gap-2">
      <Markdown>{props.toolInvocation.args.message}</Markdown>
      <div className="flex gap-2">
        {'result' in props.toolInvocation ? (
          <div className="text-bolt-elements-textTertiary">{props.toolInvocation.result}</div>
        ) : (
          <>
            <button
              className="flex gap-2 pl-6 pr-6 items-center bg-bolt-elements-sidebar-buttonBackgroundDefault text-bolt-elements-sidebar-buttonText hover:bg-bolt-elements-sidebar-buttonBackgroundHover rounded-md p-2 transition-theme"
              onClick={() => addResult('Yes')}
            >
              Yes
            </button>
            <button
              className="flex gap-2 pl-6 pr-6 items-center bg-bolt-elements-sidebar-buttonBackgroundDefault text-bolt-elements-sidebar-buttonText hover:bg-bolt-elements-sidebar-buttonBackgroundHover rounded-md p-2 transition-theme"
              onClick={() => addResult('No')}
            >
              No
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export function ToolMessage({ content, data: result, addToolResult }: ToolMessageProps) {
  const [data, setData] = useState<{ name: string; state: ToolInvocation['state']; result?: any }>();
  useEffect(() => {
    setData({
      name: content.toolName,
      state: content.state,
      result: (content as any).result,
    });
  }, [content]);
  if (data?.name == 'askForConfirmation') {
    if (!data.result) {
      return <AskForConfirmation toolInvocation={content} addToolResult={addToolResult}></AskForConfirmation>;
    }
    return <></>;
  }
  return (
    <div className="overflow-hidden pt-[4px]">
      {data && (
        <div>
          <div className="flex items-center gap-2 text-sm">
            <div className={classNames('text-lg', getIconColor(data.state))}>
              {data?.state === 'partial-call' ? (
                <div className="i-ph:circle-duotone"></div>
              ) : data?.state === 'call' ? (
                <div className="i-svg-spinners:90-ring-with-bg"></div>
              ) : (
                <div className="i-ph:check"></div>
              )}
            </div>
            <div className="text-bolt-elements-textPrimary">
              <div className="flex items-center w-full min-h-[28px]">
                <span className="flex-1"> Executing Action: {data.name}</span>
              </div>
            </div>
          </div>
          {data.state !== 'partial-call' && (
            <>
              <div className=" flex flex-col gap-2 bg-bolt-elements-messages-inlineCode-background text-bolt-elements-messages-inlineCode-text px-1.5 py-1 rounded-md">
                {(data.state == 'call' || data.state == 'result') && (
                  <div className="text-bolt-elements-textSecondary">
                    Parameters : {JSON.stringify(content.args) || ''}
                  </div>
                )}
                {/* //results in dimmed tone */}
                {data.state == 'result' && (
                  <div className="text-bolt-elements-textSecondary">
                    Output: {`${(content as any).result || ''}`.split('---')[0]}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
function getIconColor(status: ToolInvocation['state']) {
  switch (status) {
    case 'call': {
      return 'text-bolt-elements-textTertiary';
    }
    case 'partial-call': {
      return 'text-bolt-elements-loader-progress';
    }
    case 'result': {
      return 'text-bolt-elements-icon-success';
    }
    default: {
      return undefined;
    }
  }
}
