import api from '../../AxiosClient';
import { GET_BOOKMARKS } from '../../constants/ApiUrls';
import type { ApiError } from '../../constants/Error';

export interface BookDetails {
  book_id: string;
  title: string;
  description: string;
  cover_image_url: string;
  category_id: string | null;
  category_name: string | null;
  age_group_id: string | null;
  age_group_name: string | null;
  language_id: string | null;
  language_name: string | null;
  book_order: number;
  is_active: boolean;
}

export interface Bookmark {
  bookmark_id: string;
  book_id: string;
  book_title: string;
  progress_percentage: string;
  block_id: string | null;
  chapter_id: string | null;
  book_details: BookDetails;
  created_at: string;
  updated_at: string;
}

export interface GetBookmarksResponse {
  success: boolean;
  message: string;
  bookmarks?: Bookmark[];
  error?: string;
  error_code?: string;
}

export const bookmarkService = {
  getAllBookmarks: async (): Promise<GetBookmarksResponse> => {
    try {
      const response = await api.get<GetBookmarksResponse>(GET_BOOKMARKS, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch bookmarks',
        error: err?.message || 'Failed to fetch bookmarks',
        error_code: err?.error_code || 'INTERNAL_ERROR',
      };
    }
  },
};

