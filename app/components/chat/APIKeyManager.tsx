import React, { useState } from 'react';
import { IconButton } from '~/components/ui/IconButton';

interface APIKeyManagerProps {
  provider: string;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const APIKeyManager: React.FC<APIKeyManagerProps> = ({ provider, apiKey, setApiKey }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(tempKey);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2 mt-2 mb-2">
      <span className="text-sm text-bolt-elements-textSecondary"></span>
    </div>
  );
};
