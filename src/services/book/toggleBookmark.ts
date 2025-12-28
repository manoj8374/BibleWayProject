import api from '../../AxiosClient';
import { TOGGLE_BOOKMARK } from '../../constants/ApiUrls';

export interface ToggleBookmarkRequest {
  book_id: string;
}

export interface ToggleBookmarkResponse {
  success: boolean;
  message: string;
  data?: {
    bookmark_id?: string;
    action: 'created' | 'deleted';
  };
  error?: string;
  error_code?: string;
}

/**
 * Toggle bookmark for a book (create if not exists, delete if exists)
 */
export const toggleBookmark = async (bookId: string): Promise<ToggleBookmarkResponse> => {
  try {
    const response = await api.post<ToggleBookmarkResponse>(
      TOGGLE_BOOKMARK,
      { book_id: bookId }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to toggle bookmark:', error);
    return {
      success: false,
      message: 'Failed to toggle bookmark',
      error: 'Failed to toggle bookmark'
    };
  }
};
