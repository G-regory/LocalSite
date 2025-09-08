
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useDebounce } from 'react-use';

type AutoSaveStatus = 'idle' | 'saving' | 'success' | 'error';

export const useAutoSave = (html: string, prompts: string[], delay = 2000) => {
  const { namespace, repoId } = useParams<{ namespace: string; repoId: string }>();
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const [isSaving, setIsSaving] = useState(false);

  const saveProject = useCallback(async () => {
    if (!namespace || !repoId || status === 'saving') {
      return;
    }

    setIsSaving(true);
    setStatus('saving');

    try {
      const res = await api.put(`/me/projects/${namespace}/${repoId}`, {
        html,
        prompts,
      });
      if (res.data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Auto-save failed:', err);
      setStatus('error');
    } finally {
      setIsSaving(false);
      // Reset status after a short period
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, [html, prompts, namespace, repoId, status]);

  useDebounce(
    () => {
      saveProject();
    },
    delay,
    [html, prompts, saveProject]
  );

  return { status, isSaving };
};
