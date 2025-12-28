import api from '../../AxiosClient';
import type { 
  Highlight, 
  CreateHighlightRequest,
  CreateHighlightResponse,
  UpdateHighlightRequest 
} from '../../types/highlight';
import { CREATE_HIGHLIGHT, GET_HIGHLIGHTS_BY_CHAPTER } from '../../constants/ApiUrls';

interface GetHighlightsResponse {
  success: boolean;
  message?: string;
  data: Highlight[];
  error?: string;
  error_code?: string;
}

interface GetHighlightResponse {
  success: boolean;
  message?: string;
  data: Highlight;
  error?: string;
  error_code?: string;
}

interface UpdateHighlightResponse {
  success: boolean;
  message?: string;
  data: Highlight;
  error?: string;
  error_code?: string;
}

interface DeleteHighlightResponse {
  success: boolean;
  message?: string;
  error?: string;
  error_code?: string;
}

export const highlightService = {
  /**
   * Get all highlights for a specific chapter
   */
  getHighlightsByChapter: async (chapterId: string): Promise<Highlight[]> => {
    try {
      const response = await api.get<GetHighlightsResponse>(
        `/highlights/chapter/${chapterId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }

      console.error('Failed to fetch highlights:', response.data.message);
      return [];
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return [];
    }
  },

  /**
   * Get all highlights for a specific book
   */
  getHighlightsByBook: async (bookId: string): Promise<Highlight[]> => {
    try {
      const response = await api.get<GetHighlightsResponse>(
        `/highlights/book/${bookId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }

      console.error('Failed to fetch highlights:', response.data.message);
      return [];
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return [];
    }
  },

  /**
   * Create a new highlight
   */
  createHighlight: async (highlight: CreateHighlightRequest): Promise<string | null> => {
    try {
      const response = await api.post<CreateHighlightResponse>(
        CREATE_HIGHLIGHT,
        highlight
      );

      if (response.data.success) {
        return response.data.highlight_id;
      }

      console.error('Failed to create highlight:', response.data.message);
      return null;
    } catch (error) {
      console.error('Error creating highlight:', error);
      return null;
    }
  },

  /**
   * Update an existing highlight
   */
  updateHighlight: async (
    highlightId: string,
    updates: UpdateHighlightRequest
  ): Promise<Highlight | null> => {
    try {
      const response = await api.patch<UpdateHighlightResponse>(
        `/highlights/${highlightId}`,
        updates
      );

      if (response.data.success) {
        return response.data.data;
      }

      console.error('Failed to update highlight:', response.data.message);
      return null;
    } catch (error) {
      console.error('Error updating highlight:', error);
      return null;
    }
  },

  /**
   * Delete a highlight
   */
  deleteHighlight: async (highlightId: string): Promise<boolean> => {
    try {
      const response = await api.delete<DeleteHighlightResponse>(
        `/highlights/${highlightId}`
      );

      if (response.data.success) {
        return true;
      }

      console.error('Failed to delete highlight:', response.data.message);
      return false;
    } catch (error) {
      console.error('Error deleting highlight:', error);
      return false;
    }
  },

  /**
   * Get a single highlight by ID
   */
  getHighlightById: async (highlightId: string): Promise<Highlight | null> => {
    try {
      const response = await api.get<GetHighlightResponse>(
        `/highlights/${highlightId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }

      console.error('Failed to fetch highlight:', response.data.message);
      return null;
    } catch (error) {
      console.error('Error fetching highlight:', error);
      return null;
    }
  }
};

