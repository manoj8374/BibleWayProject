import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Get the language from localStorage before initialization (for lazy loading)
const getStoredLanguage = (): string | null => {
  try {
    return localStorage.getItem('i18nextLng');
  } catch {
    return null;
  }
};

// Track which languages have been loaded
const loadedLanguages = new Set<string>();

/**
 * Dynamically loads translation files for a given language
 * This enables code splitting - languages are only loaded when needed
 * Uses lazy loading based on localStorage's i18nextLng
 */
export const loadLanguage = async (lng: string): Promise<void> => {
  // Skip if already loaded
  if (loadedLanguages.has(lng)) {
    return;
  }

  try {
    let translations: Record<string, Record<string, unknown>> = {};

    // Load English translations lazily
    if (lng === 'en') {
      const [
        common,
        auth,
        navigation,
        errors,
        admin,
        chapterSidebar,
        chapterNotes,
        chat,
        comments,
        continueReading,
        createBookModal,
        createCategoryModal,
        createPostModal,
        createPrayerRequestModal,
        createPromotionModal,
        createVerseModal,
        editPostModal,
        googleInfoModal,
        googleLoginButton,
        header,
        quoteOfTheDay,
        recommendedPeople,
        segmentedBibles,
        segregatedBiblesGrid,
        tabNavigation,
        userProtectedRoute,
        pages,
        services,
        people,
        profile,
        posts,
        promotions,
        notifications,
        logoutConfirmation,
      ] = await Promise.all([
        import('./locales/en/common.json'),
        import('./locales/en/auth.json'),
        import('./locales/en/navigation.json'),
        import('./locales/en/errors.json'),
        import('./locales/en/admin.json'),
        import('./locales/en/chapterSidebar.json'),
        import('./locales/en/chapterNotes.json'),
        import('./locales/en/chat.json'),
        import('./locales/en/comments.json'),
        import('./locales/en/continueReading.json'),
        import('./locales/en/createBookModal.json'),
        import('./locales/en/createCategoryModal.json'),
        import('./locales/en/createPostModal.json'),
        import('./locales/en/createPrayerRequestModal.json'),
        import('./locales/en/createPromotionModal.json'),
        import('./locales/en/createVerseModal.json'),
        import('./locales/en/editPostModal.json'),
        import('./locales/en/googleInfoModal.json'),
        import('./locales/en/googleLoginButton.json'),
        import('./locales/en/header.json'),
        import('./locales/en/quoteOfTheDay.json'),
        import('./locales/en/recommendedPeople.json'),
        import('./locales/en/segmentedBibles.json'),
        import('./locales/en/segregatedBiblesGrid.json'),
        import('./locales/en/tabNavigation.json'),
        import('./locales/en/userProtectedRoute.json'),
        import('./locales/en/pages.json'),
        import('./locales/en/services.json'),
        import('./locales/en/people.json'),
        import('./locales/en/profile.json'),
        import('./locales/en/posts.json'),
        import('./locales/en/promotions.json'),
        import('./locales/en/notifications.json'),
        import('./locales/en/logoutConfirmation.json'),
      ]);

      translations = {
        common: common.default,
        auth: auth.default,
        navigation: navigation.default,
        errors: errors.default,
        admin: admin.default,
        chapterSidebar: chapterSidebar.default,
        chapterNotes: chapterNotes.default,
        chat: chat.default,
        comments: comments.default,
        continueReading: continueReading.default,
        createBookModal: createBookModal.default,
        createCategoryModal: createCategoryModal.default,
        createPostModal: createPostModal.default,
        createPrayerRequestModal: createPrayerRequestModal.default,
        createPromotionModal: createPromotionModal.default,
        createVerseModal: createVerseModal.default,
        editPostModal: editPostModal.default,
        googleInfoModal: googleInfoModal.default,
        googleLoginButton: googleLoginButton.default,
        header: header.default,
        quoteOfTheDay: quoteOfTheDay.default,
        recommendedPeople: recommendedPeople.default,
        segmentedBibles: segmentedBibles.default,
        segregatedBiblesGrid: segregatedBiblesGrid.default,
        tabNavigation: tabNavigation.default,
        userProtectedRoute: userProtectedRoute.default,
        pages: pages.default,
        services: services.default,
        people: people.default,
        profile: profile.default,
        posts: posts.default,
        promotions: promotions.default,
        notifications: notifications.default,
        logoutConfirmation: logoutConfirmation.default,
      };
    } else {
      // For other languages, dynamically import all translation files
      const [
        common,
        auth,
        navigation,
        errors,
        admin,
        chapterSidebar,
        chapterNotes,
        chat,
        comments,
        continueReading,
        createBookModal,
        createCategoryModal,
        createPostModal,
        createPrayerRequestModal,
        createPromotionModal,
        createVerseModal,
        editPostModal,
        googleInfoModal,
        googleLoginButton,
        header,
        quoteOfTheDay,
        recommendedPeople,
        segmentedBibles,
        segregatedBiblesGrid,
        tabNavigation,
        userProtectedRoute,
        pages,
        services,
        people,
        profile,
        posts,
        promotions,
        notifications,
        logoutConfirmation,
      ] = await Promise.all([
        import(`./locales/${lng}/common.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/auth.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/navigation.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/errors.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/admin.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/chapterSidebar.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/chapterNotes.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/chat.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/comments.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/continueReading.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/createBookModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/createCategoryModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/createPostModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/createPrayerRequestModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/createPromotionModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/createVerseModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/editPostModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/googleInfoModal.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/googleLoginButton.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/header.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/quoteOfTheDay.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/recommendedPeople.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/segmentedBibles.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/segregatedBiblesGrid.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/tabNavigation.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/userProtectedRoute.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/pages.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/services.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/people.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/profile.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/posts.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/promotions.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/notifications.json`).catch(() => ({ default: {} })),
        import(`./locales/${lng}/logoutConfirmation.json`).catch(() => ({ default: {} })),
      ]);

      translations = {
        common: common.default,
        auth: auth.default,
        navigation: navigation.default,
        errors: errors.default,
        admin: admin.default,
        chapterSidebar: chapterSidebar.default,
        chapterNotes: chapterNotes.default,
        chat: chat.default,
        comments: comments.default,
        continueReading: continueReading.default,
        createBookModal: createBookModal.default,
        createCategoryModal: createCategoryModal.default,
        createPostModal: createPostModal.default,
        createPrayerRequestModal: createPrayerRequestModal.default,
        createPromotionModal: createPromotionModal.default,
        createVerseModal: createVerseModal.default,
        editPostModal: editPostModal.default,
        googleInfoModal: googleInfoModal.default,
        googleLoginButton: googleLoginButton.default,
        header: header.default,
        quoteOfTheDay: quoteOfTheDay.default,
        recommendedPeople: recommendedPeople.default,
        segmentedBibles: segmentedBibles.default,
        segregatedBiblesGrid: segregatedBiblesGrid.default,
        tabNavigation: tabNavigation.default,
        userProtectedRoute: userProtectedRoute.default,
        pages: pages.default,
        services: services.default,
        people: people.default,
        profile: profile.default,
        posts: posts.default,
        promotions: promotions.default,
        notifications: notifications.default,
        logoutConfirmation: logoutConfirmation.default,
      };
    }

    // Add the translations to i18next
    i18n.addResourceBundle(lng, 'translation', translations, true, true);
    loadedLanguages.add(lng);
  } catch (error) {
    console.error(`Failed to load language ${lng}:`, error);
    // Fallback to English if loading fails
    if (lng !== 'en') {
      await loadLanguage('en');
    }
  }
};

// Get the initial language from localStorage before initialization
const initialLanguage = getStoredLanguage() || 'en';

// Initialize i18n with empty resources (lazy loading)
// We'll load the language immediately after initialization
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {},
    lng: initialLanguage, // Set the language immediately
    fallbackLng: 'en',
    supportedLngs: ['en', 'te', 'ta', 'es', 'bn', 'hi', 'de', 'af', 'ar', 'as', 'brx', 'zh', 'doi', 'nl', 'fr', 'it', 'pt', 'pl', 'sv'],
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      // Explicitly use localStorage key 'i18nextLng' for language detection
      lookupLocalStorage: 'i18nextLng',
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Load the detected language from localStorage (lazy loading)
i18n.on('languageChanged', async (lng) => {
  await loadLanguage(lng);
});

// Load initial language immediately after initialization
// This ensures translations are available before React renders
const initializeLanguage = async () => {
  const detectedLanguage = i18n.language || initialLanguage;
  try {
    await loadLanguage(detectedLanguage);
  } catch (error) {
    console.error('Failed to load initial language:', error);
    // Fallback to English if initial language fails to load
    if (detectedLanguage !== 'en') {
      await loadLanguage('en');
    }
  }
};

// Export a promise that resolves when the initial language is loaded
// This allows the app to wait for translations before rendering
// i18n.init() is synchronous, so we can load the language immediately
export const i18nReady = initializeLanguage();

export default i18n;
