import {
  GET_DAILY_VERSE,
  GET_ALL_VERSES,
  LIKE_VERSE,
  UNLIKE_VERSE,
} from "../../constants/ApiUrls";
import api from "../../AxiosClient";
import type { ApiError } from "../../constants/Error";
import i18n from "../../i18n/config";

export interface DailyVerseResponse {
  success: boolean;
  message?: string;
  data?: {
    verse_id: string;
    title: string;
    description: string;
    likes_count: number;
    is_liked: boolean;
    created_at: string;
    updated_at: string;
  };
  error?: string;
  error_code?: string;
}

export interface Verse {
  verse_id: string;
  title: string;
  description: string;
  likes_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetAllVersesResponse {
  success: boolean;
  message: string;
  data: Verse[];
  total_count: number;
  error?: string;
  error_code?: string;
}

export interface LikeVerseResponse {
  success: boolean;
  message?: string;
  error?: string;
  error_code?: string;
}

export const verseService = {
  getDailyVerse: async (): Promise<DailyVerseResponse> => {
    try {
      const response = await api.get<DailyVerseResponse>(GET_DAILY_VERSE, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t("services.verse.failedToLoadVerses"),
        error_code: err?.error_code,
      };
    }
  },

  getAllVerses: async (): Promise<GetAllVersesResponse> => {
    try {
      const response = await api.get<GetAllVersesResponse>(GET_ALL_VERSES, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t("services.verse.failedToLoadVerses"),
        data: [],
        total_count: 0,
        error_code: err?.error_code,
      };
    }
  },

  likeVerse: async (verseId: string): Promise<LikeVerseResponse> => {
    try {
      const response = await api.post<LikeVerseResponse>(LIKE_VERSE, {
        verse_id: verseId,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t("services.verse.failedToLikeVerse"),
        error_code: err?.error_code,
      };
    }
  },

  unlikeVerse: async (verseId: string): Promise<LikeVerseResponse> => {
    try {
      const response = await api.post<LikeVerseResponse>(UNLIKE_VERSE, {
        verse_id: verseId,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t("services.verse.failedToUnlikeVerse"),
        error_code: err?.error_code,
      };
    }
  },
};
