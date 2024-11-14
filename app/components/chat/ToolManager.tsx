import { ToggleSwitch } from '../ui/ToggleSwitch';
import type { IToolsConfig } from '~/utils/types';

interface ToolManagerProps {
  toolConfig: IToolsConfig;
  onConfigChange?: (val: IToolsConfig) => void;
}

export function ToolManager({ toolConfig, onConfigChange }: ToolManagerProps) {
  return (
    <>
      {toolConfig && (
        <div className="grid gap-4 text-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm text-bolt-elements-textSecondary">Tool Calling</label>
            <ToggleSwitch
              checked={toolConfig.enabled}
              onCheckedChange={(e: boolean) => {
                onConfigChange?.({
                  enabled: e,
                  config: toolConfig.config,
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
