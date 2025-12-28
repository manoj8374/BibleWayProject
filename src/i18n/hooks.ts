import { useTranslation } from 'react-i18next';
import { loadLanguage } from './config';

/**
 * Custom hook for translations
 * Usage: const { t, i18n } = useI18n();
 */
export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
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
  };
};

