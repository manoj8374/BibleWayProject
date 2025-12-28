import { CREATE_POST, UPDATE_POST, DELETE_POST, GET_ALL_POSTS, GET_USER_POSTS, GET_SPECIFIC_USER_POSTS, CREATE_COMMENT, GET_COMMENTS_DETAILS, LIKE_COMMENT, UNLIKE_COMMENT, LIKE_POST, UNLIKE_POST } from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';
import i18n from '../../i18n/config';

export interface CommentUser {
  user_id: string;
  user_name: string;
  profile_picture_url: string;
}

export interface Comment {
  comment_id: string;
  user: CommentUser;
  description: string;
  likes_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetCommentsResponse {
  success: boolean;
  message: string;
  post_id: string;
  data: Comment[];
  error?: string;
  error_code?: string;
}

export interface CreateCommentResponse {
  success: boolean;
  message?: string;
  comment_id?: string;
  error?: string;
  error_code?: string;
}

export interface CreatePostResponse {
  success: boolean;
  message?: string;
  post_id?: string;
  error?: string;
  error_code?: string;
}

export interface CreatePostData {
  description?: string;
  title?: string;
  media: File[];
}

export interface PostUser {
  user_id: string;
  user_name: string;
  profile_picture_url: string;
}

export interface PostMedia {
  media_id: string;
  media_type: 'image' | 'video' | 'audio';
  url: string;
}

export interface Post {
  post_id: string;
  user: PostUser;
  title: string;
  description: string;
  media: PostMedia[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  name?: string;
  email?: string;
  phone?: string;
  is_liked: boolean;
}

export interface Pagination {
  limit: number;
  offset: number;
  total_count: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface GetAllPostsResponse {
  success: boolean;
  message: string;
  data: Post[];
  pagination: Pagination;
  error?: string;
  error_code?: string;
}

export const postService = {
  createPost: async (data: CreatePostData): Promise<CreatePostResponse> => {
    try {
      const formData = new FormData();

      if (data.description) formData.append('description', data.description);
      if (data.title) formData.append('title', data.title);

      data.media.forEach((file) => {
        formData.append('media', file);
      });

      const response = await api.post<CreatePostResponse>(CREATE_POST, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        message: response.data.message,
        post_id: response.data.post_id
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.unexpectedErrorPostCreation'),
        error_code: err?.error_code
      };
    }
  },

  getAllPosts: async (limit: number = 10, offset: number = 0): Promise<GetAllPostsResponse> => {
    try {
      const response = await api.get<GetAllPostsResponse>(GET_ALL_POSTS, {
        params: { limit, offset },
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToFetchPosts'),
        data: [],
        pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
        error_code: err?.error_code
      };
    }
  },

  getUserPosts: async (limit: number = 10, offset: number = 0): Promise<GetAllPostsResponse> => {
    try {
      const response = await api.get<GetAllPostsResponse>(GET_USER_POSTS, {
        params: { limit, offset },
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToFetchUserPosts'),
        data: [],
        pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
        error_code: err?.error_code
      };
    }
  },

  getSpecificUserPosts: async (userId: string, limit: number = 10, offset: number = 0): Promise<GetAllPostsResponse> => {
    try {
      const response = await api.post<GetAllPostsResponse>(GET_SPECIFIC_USER_POSTS, {
        user_id: userId
      }, {
        params: { limit, offset },
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToFetchUserPosts'),
        data: [],
        pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
        error_code: err?.error_code
      };
    }
  },

  updatePost: async (postId: string, description: string): Promise<CreatePostResponse> => {
    try {
      const response = await api.put(UPDATE_POST, {
        post_id: postId,
        description
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToUpdatePost'),
        error_code: err?.error_code
      };
    }
  },

  deletePost: async (postId: string): Promise<CreatePostResponse> => {
    try {
      // The API spec says DELETE /post/delete with body. 
      // Axios delete usually takes config as 2nd arg.
      // We need to pass data in the config object.
      const response = await api.delete(DELETE_POST, {
        data: {
          post_id: postId
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToDeletePost'),
        error_code: err?.error_code
      };
    }
  },

  createComment: async (postId: string, description: string): Promise<CreateCommentResponse> => {
    try {
      const response = await api.post<CreateCommentResponse>(CREATE_COMMENT, {
        post_id: postId,
        description
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToCreateComment'),
        error_code: err?.error_code
      };
    }
  },

  getComments: async (postId: string): Promise<GetCommentsResponse> => {
    try {
      const response = await api.get<GetCommentsResponse>(`${GET_COMMENTS_DETAILS}/${postId}/v1`);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToFetchComments'),
        post_id: postId,
        data: [],
        error_code: err?.error_code
      };
    }
  },

  likeComment: async (commentId: string): Promise<CreateCommentResponse> => {
    try {
      const response = await api.post<CreateCommentResponse>(LIKE_COMMENT, {
        comment_id: commentId
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToLikeComment'),
        error_code: err?.error_code
      };
    }
  },

  unlikeComment: async (commentId: string): Promise<CreateCommentResponse> => {
    try {
      const response = await api.post<CreateCommentResponse>(UNLIKE_COMMENT, {
        comment_id: commentId
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToUnlikeComment'),
        error_code: err?.error_code
      };
    }
  },

  likePost: async (postId: string): Promise<CreateCommentResponse> => {
    try {
      const response = await api.post<CreateCommentResponse>(LIKE_POST, {
        post_id: postId
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToLikePost'),
        error_code: err?.error_code
      };
    }
  },

  unlikePost: async (postId: string): Promise<CreateCommentResponse> => {
    try {
      const response = await api.post<CreateCommentResponse>(UNLIKE_POST, {
        post_id: postId
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.post.failedToUnlikePost'),
        error_code: err?.error_code
      };
    }
  }
};
