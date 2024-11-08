import { useState } from 'react';
import { toast } from 'react-toastify';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('usePromptEnhancement');

interface EnhancerResponse {
  enhancedPrompt: string;
  error?: string;
  model?: string;
  status?: string;
}

export function usePromptEnhancer() {
  const [enhancingPrompt, setEnhancingPrompt] = useState(false);
  const [promptEnhanced, setPromptEnhanced] = useState(false);

  const resetEnhancer = () => {
    setPromptEnhanced(false);
  };

  const enhancePrompt = async (prompt: string, callback: (enhancedPrompt: string) => void) => {
    try {
      logger.info('Starting prompt enhancement...');
      setEnhancingPrompt(true);
      setPromptEnhanced(false);

      logger.debug('Connecting to enhancement API...');
      const response = await fetch('/api/enhancer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        logger.error(`API responded with status: ${response.status}`);
        throw new Error('Failed to enhance prompt');
      }

      logger.debug('Successfully connected to API');
      const data = (await response.json()) as EnhancerResponse;

      if (data.error) {
        logger.error('Enhancement error:', data.error);
        throw new Error(data.error);
      }

      logger.info(`Enhancement completed using model: ${data.model || 'unknown'}`);
      logger.debug(`Enhancement status: ${data.status || 'completed'}`);

      callback(data.enhancedPrompt);
      setPromptEnhanced(true);
      logger.info('Enhancement process finished successfully');
    } catch (error) {
      logger.error('Error enhancing prompt:', error);
      toast.error('Failed to enhance prompt');
    } finally {
      setEnhancingPrompt(false);
    }
  };

  return { enhancingPrompt, promptEnhanced, enhancePrompt, resetEnhancer };
}
