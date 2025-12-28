import api from '../../AxiosClient';
import { DELETE_BOOKMARK } from '../../constants/ApiUrls';

export interface DeleteBookmarkRequest {
  bookmark_id: string;
}

export interface DeleteBookmarkResponse {
  success: boolean;
  message: string;
  error?: string;
  error_code?: string;
}

/**
 * Delete a bookmark
 */
export const deleteBookmark = async (bookmarkId: string): Promise<DeleteBookmarkResponse> => {
  try {
    const response = await api.post<DeleteBookmarkResponse>(
      DELETE_BOOKMARK,
      { bookmark_id: bookmarkId }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to delete bookmark:', error);
    return {
      success: false,
      message: 'Failed to delete bookmark',
      error: 'Failed to delete bookmark'
    };
  }
};
