import api from '../../AxiosClient';
import type {
  ReadingNote,
  CreateReadingNoteRequest,
  CreateReadingNoteResponse,
  GetReadingNotesResponse,
  UpdateReadingNoteRequest,
  UpdateReadingNoteResponse,
  DeleteReadingNoteResponse,
  GetAllReadingNotesResponse
} from '../../types/readingNote';
import {
  CREATE_READING_NOTE,
  GET_READING_NOTES_BY_BOOK,
  UPDATE_READING_NOTE,
  DELETE_READING_NOTE,
  GET_ALL_READING_NOTES
} from '../../constants/ApiUrls';
import type { GetAllReadingNotesResponse } from '../../types/readingNote';

export const readingNoteService = {
  /**
   * Create a new reading note
   */
  createReadingNote: async (
    note: CreateReadingNoteRequest
  ): Promise<string | null> => {
    try {
      const response = await api.post<CreateReadingNoteResponse>(
        CREATE_READING_NOTE,
        note
      );

      if (response.data.success) {
        return response.data.note_id;
      }

      console.error('Failed to create reading note:', response.data.message);
      return null;
    } catch (error) {
      console.error('Error creating reading note:', error);
      return null;
    }
  },

  /**
   * Get all reading notes for a specific book
   */
  getReadingNotesByBook: async (bookId: string): Promise<ReadingNote[]> => {
    try {
      const response = await api.get<GetReadingNotesResponse>(
        `${GET_READING_NOTES_BY_BOOK}/${bookId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (response.data.success) {
        return response.data.data;
      }

      console.error('Failed to fetch reading notes:', response.data.message);
      return [];
    } catch (error) {
      console.error('Error fetching reading notes:', error);
      return [];
    }
  },

  /**
   * Update an existing reading note
   */
  updateReadingNote: async (
    noteId: string,
    content: string
  ): Promise<boolean> => {
    try {
      const updateData: UpdateReadingNoteRequest = {
        note_id: noteId,
        content: content
      };

      const response = await api.put<UpdateReadingNoteResponse>(
        UPDATE_READING_NOTE,
        updateData
      );

      if (response.data.success) {
        return true;
      }

      console.error('Failed to update reading note:', response.data.message);
      return false;
    } catch (error) {
      console.error('Error updating reading note:', error);
      return false;
    }
  },

  /**
   * Delete a reading note
   */
  deleteReadingNote: async (noteId: string): Promise<boolean> => {
    try {
      // Use DELETE method but send payload with data property if backend requires body,
      // or usually DELETE takes ID in URL. The user said "send note_id in the request".
      // Assuming it's a POST or DELETE with body.
      // Standard REST usually does DELETE /resource/:id.
      // But user said: "reading-note/delete just send note_id in the request".
      // This implies POST or DELETE with body. Axios DELETE with body requires `data` key.
      
      const response = await api.post<DeleteReadingNoteResponse>(
        DELETE_READING_NOTE,
        { note_id: noteId }
      );

      if (response.data.success) {
        return true;
      }

      console.error('Failed to delete reading note:', response.data.message);
      return false;
    } catch (error) {
      console.error('Error deleting reading note:', error);
      return false;
    }
  },

  /**
   * Get all reading notes organized by books and chapters
   */
  getAllReadingNotes: async (): Promise<GetAllReadingNotesResponse> => {
    try {
      const response = await api.get<GetAllReadingNotesResponse>(
        GET_ALL_READING_NOTES,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching all reading notes:', error);
      return {
        success: false,
        message: 'Failed to fetch reading notes',
        data: [],
        error: 'Failed to fetch reading notes'
      };
    }
  }
};

