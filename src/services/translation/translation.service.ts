import axios from "axios";

const GOOGLE_TRANSLATE_API_URL =
  "https://translation.googleapis.com/language/translate/v2";
const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || "";

// European languages
// Indian languages
// African languages
// Asian languages
export type LanguageCode =
  // European
  | "en" // English
  | "de" // German
  | "fr" // French
  | "es" // Spanish
  | "it" // Italian
  | "pt" // Portuguese
  | "ru" // Russian
  | "nl" // Dutch
  | "sv" // Swedish
  | "pl" // Polish
  | "el" // Greek
  // Indian
  | "as" // Assamese
  | "bn" // Bengali
  | "brx" // Bodo
  | "hi" // Hindi
  | "gu" // Gujarati
  | "kn" // Kannada
  | "ks" // Kashmiri
  | "kok" // Konkani
  | "mai" // Maithili
  | "ml" // Malayalam
  | "mni" // Manipuri
  | "mr" // Marathi
  | "ne" // Nepali
  | "or" // Odia
  | "pa" // Punjabi
  | "sa" // Sanskrit
  | "sat" // Santali
  | "sd" // Sindhi
  | "ta" // Tamil
  | "te" // Telugu
  | "ur" // Urdu
  | "doi" // Dogri
  // African
  | "sw" // Swahili
  | "af" // Afrikaans
  | "ha" // Hausa
  | "zu" // Zulu
  | "yo" // Yoruba
  // Asian
  | "zh" // Mandarin Chinese
  | "ar"; // Arabic

// Language name mapping for display
export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  // European
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  nl: "Dutch",
  sv: "Swedish",
  pl: "Polish",
  el: "Greek",
  // Indian
  as: "Assamese",
  bn: "Bengali",
  brx: "Bodo",
  hi: "Hindi",
  gu: "Gujarati",
  kn: "Kannada",
  ks: "Kashmiri",
  kok: "Konkani",
  mai: "Maithili",
  ml: "Malayalam",
  mni: "Manipuri",
  mr: "Marathi",
  ne: "Nepali",
  or: "Odia",
  pa: "Punjabi",
  sa: "Sanskrit",
  sat: "Santali",
  sd: "Sindhi",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
  doi: "Dogri",
  // African
  sw: "Swahili",
  af: "Afrikaans",
  ha: "Hausa",
  zu: "Zulu",
  yo: "Yoruba",
  // Asian
  zh: "Mandarin Chinese",
  ar: "Arabic",
};

export interface TranslateResponse {
  success: boolean;
  translatedText?: string;
  error?: string;
}

// Cache to avoid re-translating the same text
// Key format: `${text}_${targetLanguage}`
const translationCache = new Map<string, string>();

export const translationService = {
  /**
   * Translate text to target language
   * @param text - Text to translate
   * @param targetLanguage - Target language code
   * @returns Promise with translation result
   */
  translate: async (
    text: string,
    targetLanguage: LanguageCode
  ): Promise<TranslateResponse> => {
    try {
      // Validate input
      if (!text || !text.trim()) {
        return {
          success: false,
          error: "Text cannot be empty",
        };
      }

      // Validate API key
      if (!API_KEY || API_KEY.trim() === "") {
        return {
          success: false,
          error:
            "Translation API key is not configured. Please set VITE_GOOGLE_TRANSLATE_API_KEY in your environment variables.",
        };
      }

      // Check cache first
      const cacheKey = `${text.trim()}_${targetLanguage}`;
      if (translationCache.has(cacheKey)) {
        return {
          success: true,
          translatedText: translationCache.get(cacheKey)!,
        };
      }

      // Call Google Translate API
      const response = await axios.post(
        `${GOOGLE_TRANSLATE_API_URL}?key=${encodeURIComponent(API_KEY)}`,
        {
          q: text.trim(),
          target: targetLanguage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract translated text from response
      if (response.data?.data?.translations?.[0]?.translatedText) {
        const translatedText =
          response.data.data.translations[0].translatedText;

        // Cache the translation
        translationCache.set(cacheKey, translatedText);

        return {
          success: true,
          translatedText,
        };
      }

      return {
        success: false,
        error: "Translation failed: Invalid response format",
      };
    } catch (error: unknown) {
      console.error("Translation error:", error);
      const err = error as {
        response?: {
          data?: {
            error?: {
              message?: string;
              status?: string;
            };
          };
          status?: number;
        };
        message?: string;
      };

      // Handle specific Google API errors
      let errorMessage =
        err.response?.data?.error?.message ||
        err.message ||
        "Translation failed";

      // Check for API key related errors
      if (
        errorMessage.includes("API key") ||
        errorMessage.includes("unregistered callers") ||
        errorMessage.includes("API_KEY_INVALID") ||
        err.response?.status === 403
      ) {
        errorMessage =
          "Translation API key is invalid or not configured. Please check your VITE_GOOGLE_TRANSLATE_API_KEY environment variable.";
      } else if (err.response?.status === 400) {
        errorMessage =
          "Invalid translation request. Please check the text and target language.";
      } else if (err.response?.status === 429) {
        errorMessage =
          "Translation API quota exceeded. Please try again later.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * Clear translation cache
   */
  clearCache: () => {
    translationCache.clear();
  },
};
