import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';
import { GET_BOOKS, GET_BOOK_CHAPTERS, GET_CHAPTER_METADATA, CREATE_READING_PROGRESS, GET_TOP_BOOKS, GET_LATEST_CHAPTERS_BY_AGE_GROUP, LIKE_CHAPTER, UNLIKE_CHAPTER, CREATE_CHAPTER_FEEDBACK } from '../../constants/ApiUrls';
import type { AxiosError } from 'axios';

export interface Book {
  book_id: string;
  title: string;
  description: string;
  category_id: string;
  age_group_id: string;
  language_id: string;
  cover_image_url: string | null;
  book_order: number;
  is_active: boolean;
  is_bookmarked?: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetBooksByCategoryAndAgeGroupResponse {
  success: boolean;
  message: string;
  data: Book[];
  error?: string;
  error_code?: string;
}

export interface Chapter {
  chapter_id: string;
  book_id: string;
  title: string;
  description: string;
  chapter_number: number;
  chapter_name: string | null;
  chapter_url: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  video_url: string | null;
}

export interface GetBookChaptersResponse {
  success: boolean;
  message: string;
  category_id?: string;
  category_name?: string;
  data: Chapter[];
  error?: string;
  error_code?: string;
}

export interface GetChapterMetadataResponse {
  success: boolean;
  message: string;
  data: {
    chapter_id: string;
    metadata: Record<string, unknown> | null;
    like_count: number;
    is_liked: boolean;
  };
  error?: string;
  error_code?: string;
}

export interface UpdateReadingProgressRequest {
  book_id: string;
  chapter_id: string;
  block_id?: string; // Optional as per user spec (not listed but might be useful)
  progress_percentage: number;
}

export interface GetReadingProgressResponse {
  success: boolean;
  data: {
    book_id: string;
    chapter_id: string;
    block_id: string;
    percentage: number;
    updated_at: string;
  } | null;
  message?: string;
  error?: string;
}

export interface CreateBookmarkRequest {
  book_id: string;
}

export interface CreateBookmarkResponse {
  success: boolean;
  message: string;
  bookmark_id?: string;
  error?: string;
  error_code?: string;
}

export interface LikeChapterResponse {
  success: boolean;
  message: string;
  reaction_id?: string;
  chapter_id: string;
  reaction_type?: string;
  error?: string;
  error_code?: string;
}

export interface UnlikeChapterResponse {
  success: boolean;
  message: string;
  chapter_id: string;
  error?: string;
  error_code?: string;
}

export interface CreateChapterFeedbackRequest {
  chapter_id: string;
  description: string;
  rating: number;
}

export interface CreateChapterFeedbackResponse {
  success: boolean;
  message: string;
  feedback_id?: string;
  chapter_id: string;
  rating?: number;
  error?: string;
  error_code?: string;
}

export interface BookDetails {
  book_id: string;
  title: string;
  description: string;
  cover_image_url: string;
  category_id: string;
  category_name: string;
  age_group_id: string;
  age_group_name: string;
  language_id: string;
  language_name: string;
  book_order: number;
  is_active: boolean;
  is_bookmarked: boolean;
}

export interface TopBookReadingProgress {
  reading_progress_id: string;
  book_id: string;
  progress_percentage: number;
  block_id: string | null;
  chapter_id: string | null;
  last_read_at: string;
  created_at: string;
  updated_at: string;
  book_details: BookDetails;
}

export interface GetTopBooksResponse {
  success: boolean;
  message: string;
  data: TopBookReadingProgress[];
  error?: string;
  error_code?: string;
}

export const getLatestChaptersByAgeGroup = async (): Promise<GetLatestChaptersByAgeGroupResponse> => {
  try {
    const response = await api.get<GetLatestChaptersByAgeGroupResponse>(
      GET_LATEST_CHAPTERS_BY_AGE_GROUP
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError;
    console.error('Failed to get latest chapters by age group:', error);
    return {
      success: false,
      data: [],
      error: err?.message || 'Failed to get latest chapters by age group',
      error_code: err?.error_code || 'INTERNAL_ERROR'
    };
  }
};

export const bookService = {
  getBooksByCategoryAndAgeGroup: async (
    categoryId: string,
    ageGroupId: string
  ): Promise<GetBooksByCategoryAndAgeGroupResponse> => {
    try {
      const response = await api.post<GetBooksByCategoryAndAgeGroupResponse>(
        GET_BOOKS,
        {
          category_id: categoryId,
          age_group: ageGroupId
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<GetBooksByCategoryAndAgeGroupResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch books.',
        data: [],
        error: err?.message || 'Failed to fetch books.',
        error_code: err?.error_code
      };
    }
  },

  getBookChapters: async (bookId: string): Promise<GetBookChaptersResponse> => {
    try {
      const response = await api.post<GetBookChaptersResponse>(
        GET_BOOK_CHAPTERS,
        {
          book_id: bookId
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<GetBookChaptersResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch chapters.',
        data: [],
        error: err?.message || 'Failed to fetch chapters.',
        error_code: err?.error_code
      };
    }
  },

  updateReadingProgress: async (
    progress: UpdateReadingProgressRequest
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post<{ success: boolean; message: string; progress_percentage: string }>(
        CREATE_READING_PROGRESS,
        progress
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update reading progress:', error);
      return { success: false, message: 'Failed to update progress' };
    }
  },

  getReadingProgress: async (
    bookId: string
  ): Promise<GetReadingProgressResponse> => {
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return null or mock data to test resume
        resolve({
          success: true,
          data: null, // Change this to test resume functionality
          // data: {
          //   book_id: bookId,
          //   chapter_id: "some-chapter-id", 
          //   block_id: "some-block-id",
          //   percentage: 10,
          //   updated_at: new Date().toISOString()
          // }
        });
      }, 500);
    });
    /*
    // Real implementation:
    try {
      const response = await api.get(`/books/${bookId}/progress`);
      return response.data;
    } catch (error) { ... }
    */
  },

  getTopBooks: async (): Promise<GetTopBooksResponse> => {
    try {
      const response = await api.get<GetTopBooksResponse>(
        GET_TOP_BOOKS,
        {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<GetTopBooksResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch top books.',
        data: [],
        error: err?.message || 'Failed to fetch top books.',
        error_code: err?.error_code
      };
    }
  },
  getLatestChaptersByAgeGroup,

  getChapterMetadata: async (chapterId: string): Promise<GetChapterMetadataResponse> => {
    try {
      if (!chapterId || typeof chapterId !== 'string' || chapterId.trim() === '') {
        return {
          success: false,
          message: 'Missing or invalid chapter_id',
          data: {
            chapter_id: chapterId,
            metadata: null,
            like_count: 0,
            is_liked: false
          },
          error: 'Missing or invalid chapter_id',
          error_code: 'INVALID_CHAPTER_ID'
        };
      }

      const response = await api.post<GetChapterMetadataResponse>(
        GET_CHAPTER_METADATA,
        {
          chapter_id: chapterId
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<GetChapterMetadataResponse>;
      
      // Handle specific HTTP status codes
      if (axiosError.response) {
        const status = axiosError.response.status;
        
        if (status === 400) {
          return {
            success: false,
            message: 'Missing or invalid chapter_id',
            data: {
              chapter_id: chapterId,
              metadata: null,
              like_count: 0,
              is_liked: false
            },
            error: 'Missing or invalid chapter_id',
            error_code: 'INVALID_CHAPTER_ID'
          };
        }
        
        if (status === 404) {
          return {
            success: false,
            message: 'Chapter not found',
            data: {
              chapter_id: chapterId,
              metadata: null,
              like_count: 0,
              is_liked: false
            },
            error: 'Chapter not found',
            error_code: 'CHAPTER_NOT_FOUND'
          };
        }
        
        if (status === 500) {
          return {
            success: false,
            message: 'Internal server error',
            data: {
              chapter_id: chapterId,
              metadata: null,
              like_count: 0,
              is_liked: false
            },
            error: 'Internal server error',
            error_code: 'INTERNAL_SERVER_ERROR'
          };
        }
        
        // If response has data, return it
        if (axiosError.response.data) {
          return axiosError.response.data;
        }
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch chapter metadata.',
        data: {
          chapter_id: chapterId,
          metadata: null,
          like_count: 0,
          is_liked: false
        },
        error: err?.message || 'Failed to fetch chapter metadata.',
        error_code: err?.error_code || 'UNKNOWN_ERROR'
      };
    }
  },

  likeChapter: async (chapterId: string): Promise<LikeChapterResponse> => {
    try {
      if (!chapterId || typeof chapterId !== 'string' || chapterId.trim() === '') {
        return {
          success: false,
          message: 'Chapter ID is required',
          chapter_id: chapterId,
          error: 'Chapter ID is required',
          error_code: 'VALIDATION_ERROR'
        };
      }

      const response = await api.post<LikeChapterResponse>(
        LIKE_CHAPTER,
        {
          chapter_id: chapterId
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<LikeChapterResponse>;
      
      if (axiosError.response) {
        const status = axiosError.response.status;
        
        if (status === 400) {
          return {
            success: false,
            message: axiosError.response.data?.error || 'Chapter ID is required',
            chapter_id: chapterId,
            error: axiosError.response.data?.error || 'Chapter ID is required',
            error_code: axiosError.response.data?.error_code || 'VALIDATION_ERROR'
          };
        }
        
        if (status === 404) {
          return {
            success: false,
            message: 'Chapter not found',
            chapter_id: chapterId,
            error: 'Chapter not found',
            error_code: 'CHAPTER_NOT_FOUND'
          };
        }
        
        if (axiosError.response.data) {
          return axiosError.response.data;
        }
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to like chapter',
        chapter_id: chapterId,
        error: err?.message || 'Failed to like chapter',
        error_code: err?.error_code || 'INTERNAL_ERROR'
      };
    }
  },

  unlikeChapter: async (chapterId: string): Promise<UnlikeChapterResponse> => {
    try {
      if (!chapterId || typeof chapterId !== 'string' || chapterId.trim() === '') {
        return {
          success: false,
          message: 'Chapter ID is required',
          chapter_id: chapterId,
          error: 'Chapter ID is required',
          error_code: 'VALIDATION_ERROR'
        };
      }

      const response = await api.post<UnlikeChapterResponse>(
        UNLIKE_CHAPTER,
        {
          chapter_id: chapterId
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<UnlikeChapterResponse>;
      
      if (axiosError.response) {
        const status = axiosError.response.status;
        
        if (status === 400) {
          return {
            success: false,
            message: axiosError.response.data?.error || 'Chapter ID is required',
            chapter_id: chapterId,
            error: axiosError.response.data?.error || 'Chapter ID is required',
            error_code: axiosError.response.data?.error_code || 'VALIDATION_ERROR'
          };
        }
        
        if (status === 404) {
          return {
            success: false,
            message: 'Chapter not found',
            chapter_id: chapterId,
            error: 'Chapter not found',
            error_code: 'CHAPTER_NOT_FOUND'
          };
        }
        
        if (axiosError.response.data) {
          return axiosError.response.data;
        }
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to unlike chapter',
        chapter_id: chapterId,
        error: err?.message || 'Failed to unlike chapter',
        error_code: err?.error_code || 'INTERNAL_ERROR'
      };
    }
  },

  createChapterFeedback: async (feedbackData: CreateChapterFeedbackRequest): Promise<CreateChapterFeedbackResponse> => {
    try {
      // Validation
      if (!feedbackData.chapter_id || typeof feedbackData.chapter_id !== 'string' || feedbackData.chapter_id.trim() === '') {
        return {
          success: false,
          message: 'Chapter ID is required',
          chapter_id: feedbackData.chapter_id || '',
          error: 'Chapter ID is required',
          error_code: 'VALIDATION_ERROR'
        };
      }

      if (!feedbackData.description || typeof feedbackData.description !== 'string' || feedbackData.description.trim() === '') {
        return {
          success: false,
          message: 'Feedback description is required',
          chapter_id: feedbackData.chapter_id,
          error: 'Feedback description is required',
          error_code: 'VALIDATION_ERROR'
        };
      }

      if (typeof feedbackData.rating !== 'number' || feedbackData.rating < 1 || feedbackData.rating > 5) {
        return {
          success: false,
          message: 'Rating must be between 1 and 5',
          chapter_id: feedbackData.chapter_id,
          error: 'Rating must be between 1 and 5',
          error_code: 'INVALID_RATING'
        };
      }

      const response = await api.post<CreateChapterFeedbackResponse>(
        CREATE_CHAPTER_FEEDBACK,
        feedbackData
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<CreateChapterFeedbackResponse>;
      
      if (axiosError.response) {
        const status = axiosError.response.status;
        
        if (status === 400) {
          // Handle validation errors
          if (axiosError.response.data) {
            return axiosError.response.data;
          }
          return {
            success: false,
            message: 'Validation error',
            chapter_id: feedbackData.chapter_id,
            error: 'Validation error',
            error_code: 'VALIDATION_ERROR'
          };
        }
        
        if (status === 404) {
          return {
            success: false,
            message: 'Chapter not found',
            chapter_id: feedbackData.chapter_id,
            error: 'Chapter not found',
            error_code: 'CHAPTER_NOT_FOUND'
          };
        }
        
        if (status === 500) {
          return {
            success: false,
            message: axiosError.response.data?.error || 'Failed to create feedback',
            chapter_id: feedbackData.chapter_id,
            error: axiosError.response.data?.error || 'Failed to create feedback',
            error_code: axiosError.response.data?.error_code || 'INTERNAL_ERROR'
          };
        }
        
        if (axiosError.response.data) {
          return axiosError.response.data;
        }
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to create feedback',
        chapter_id: feedbackData.chapter_id,
        error: err?.message || 'Failed to create feedback',
        error_code: err?.error_code || 'INTERNAL_ERROR'
      };
    }
  }
};

/**
 * Create a bookmark for a book
 */
export const createBookmark = async (bookId: string): Promise<CreateBookmarkResponse> => {
  try {
    const response = await api.post<CreateBookmarkResponse>(
      CREATE_BOOKMARK,
      { book_id: bookId }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create bookmark:', error);
    return {
      success: false,
      message: 'Failed to create bookmark',
      error: 'Failed to create bookmark'
    };
  }
};

