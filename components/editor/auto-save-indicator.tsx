import React from 'react';

type AutoSaveStatus = 'idle' | 'saving' | 'success' | 'error';

interface AutoSaveIndicatorProps {
  status: AutoSaveStatus;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ status }) => {
  switch (status) {
    case 'saving':
      return <span className="text-sm text-gray-400">Saving...</span>;
    case 'success':
      return <span className="text-sm text-green-500">Saved!</span>;
    case 'error':
      return <span className="text-sm text-red-500">Error!</span>;
    default:
      return null;
  }
};
