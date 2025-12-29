import { useTranslation } from 'react-i18next';
import { loadLanguage } from './config';
import { useEffect, useState } from 'react';

/**
 * Custom hook for translations
 * Usage: const { t, i18n } = useI18n();
 */
export const useI18n = () => {
  const { t, i18n, ready } = useTranslation();
  const [isReady, setIsReady] = useState(ready);

  useEffect(() => {
    // Ensure translations are loaded
    if (!ready && i18n.language) {
      loadLanguage(i18n.language).then(() => {
        setIsReady(true);
      }).catch(() => {
        setIsReady(true); // Set to true even on error to prevent blocking
      });
    } else {
      setIsReady(ready);
    }
  }, [ready, i18n.language]);
  
  const changeLanguage = async (lng: string) => {
    // Load the language if not already loaded
    await loadLanguage(lng);
    // Change to the language
    await i18n.changeLanguage(lng);
  };

  return {
    t,
    i18n,
    changeLanguage,
    currentLanguage: i18n.language,
    ready: isReady,
  };
};

