import api from '../../AxiosClient';
import { GET_ALL_LANGUAGES_PUBLIC, GET_ALL_BOOKS_PUBLIC, SEARCH_BOOKS } from '../../constants/ApiUrls';
import type { ApiError } from '../../constants/Error';

export interface PublicLanguage {
  language_id: string;
  language_name: string;
  display_name: string;
}

export interface GetLanguagesResponse {
  success: boolean;
  message: string;
  data: PublicLanguage[];
  error?: string;
  error_code?: string;
}

export interface PublicBook {
  book_id: string;
  title: string;
}

export interface GetBooksResponse {
  success: boolean;
  message: string;
  data: PublicBook[];
  total_count?: number;
  error?: string;
  error_code?: string;
}

export interface SearchBooksRequest {
  book_id?: string;
  language_id?: string;
  search_text: string;
}

export interface SearchResult {
  block_id: string;
  text: string;
  chapter_id: string;
  chapter_name: string;
  highlighted_text: string;
  book_id?: string; // May be included in some responses
}

export interface SearchBooksResponse {
  success: boolean;
  message: string;
  data?: SearchResult[];
  error?: string;
  error_code?: string;
}

export const publicService = {
  getAllLanguages: async (): Promise<GetLanguagesResponse> => {
    try {
      const response = await api.get<GetLanguagesResponse>(GET_ALL_LANGUAGES_PUBLIC, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch languages',
        data: [],
        error: err?.message || 'Failed to fetch languages',
        error_code: err?.error_code || 'INTERNAL_ERROR',
      };
    }
  },

  getAllBooks: async (): Promise<GetBooksResponse> => {
    try {
      const response = await api.get<GetBooksResponse>(GET_ALL_BOOKS_PUBLIC, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch books',
        data: [],
        total_count: 0,
        error: err?.message || 'Failed to fetch books',
        error_code: err?.error_code || 'INTERNAL_ERROR',
      };
    }
  },

  searchBooks: async (searchData: SearchBooksRequest): Promise<SearchBooksResponse> => {
    try {
      const response = await api.post<SearchBooksResponse>(SEARCH_BOOKS, searchData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to search books',
        error: err?.message || 'Failed to search books',
        error_code: err?.error_code || 'INTERNAL_ERROR',
      };
    }
  },
};

