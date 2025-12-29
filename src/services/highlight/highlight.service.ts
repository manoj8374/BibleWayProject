import api from '../../AxiosClient';
import type { 
  Highlight, 
  CreateHighlightRequest,
  CreateHighlightResponse,
  DeleteHighlightRequest,
  DeleteHighlightResponse
} from '../../types/highlight';
import { CREATE_HIGHLIGHT } from '../../constants/ApiUrls';

interface GetHighlightsResponse {
  success: boolean;
  message?: string;
  data: Highlight[];
  error?: string;
  error_code?: string;
}


export const highlightService = {
  /**
   * Get all highlights for a specific book
   * Note: API returns highlights for the book, filter by chapter_id on frontend if needed
   */
  getHighlightsByBook: async (bookId: string): Promise<Highlight[]> => {
    try {
      const response = await api.get<GetHighlightsResponse>(
        `/highlight/book/${bookId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (response.data.success) {
        // Normalize the API response to match our Highlight interface
        return response.data.data.map((h: any) => ({
          ...h,
          id: h.highlight_id || h.id,
          highlight_id: h.highlight_id,
          chapterId: h.chapter_id || h.chapterId,
          bookId: h.book_id || h.bookId,
          createdAt: h.created_at || h.createdAt,
          startOffset: h.start_offset ? parseInt(h.start_offset, 10) : undefined,
          endOffset: h.end_offset ? parseInt(h.end_offset, 10) : undefined,
          // Handle null values from API
          start_block_id: h.start_block_id ?? null,
          end_block_id: h.end_block_id ?? null,
        }));
      }

      console.error('Failed to fetch highlights:', response.data.message);
      return [];
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return [];
    }
  },

  /**
   * Get all highlights for a specific chapter
   * Fetches all book highlights and filters by chapter_id
   */
  getHighlightsByChapter: async (bookId: string, chapterId: string): Promise<Highlight[]> => {
    try {
      const allHighlights = await highlightService.getHighlightsByBook(bookId);
      // Filter highlights for the specific chapter
      return allHighlights.filter(
        (h) => h.chapter_id === chapterId || h.chapterId === chapterId
      );
    } catch (error) {
      console.error('Error fetching highlights by chapter:', error);
      return [];
    }
  },

  /**
   * Create a new highlight
   * POST /highlight/create
   */
  createHighlight: async (highlight: CreateHighlightRequest): Promise<string | null> => {
    try {
      const response = await api.post<CreateHighlightResponse>(
        CREATE_HIGHLIGHT,
        highlight
      );

      if (response.data.success && response.data.highlight_id) {
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
   * Delete a highlight
   * DELETE /highlight/delete
   */
  deleteHighlight: async (highlightId: string): Promise<boolean> => {
    try {
      const response = await api.delete<DeleteHighlightResponse>(
        '/highlight/delete',
        {
          data: {
            highlight_id: highlightId
          } as DeleteHighlightRequest
        }
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
  }
};

