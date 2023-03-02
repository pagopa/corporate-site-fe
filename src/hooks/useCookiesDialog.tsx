import { useEffect } from 'react';

export const useCookiesDialog = ({ selector }: { selector: string }) => {
  useEffect(() => {
    const openOTPreferences = () => {
      if ('OneTrust' in window && window?.OneTrust)
        (window?.OneTrust as any)?.ToggleInfoDisplay();
    };
    const otButton = document.querySelector(selector);
    otButton?.addEventListener('click', openOTPreferences);
    return () => otButton?.removeEventListener('click', openOTPreferences);
  }, []);
};
