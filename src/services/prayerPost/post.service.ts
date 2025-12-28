import {
    CREATE_PRAYER_POST,
    GET_ALL_PRAYER_REQUESTS,
    CREATE_PRAYER_COMMENT,
    GET_PRAYER_COMMENTS_DETAILS,
    GET_USER_PRAYER_REQUESTS,
    LIKE_PRAYER_REQUEST,
    UNLIKE_PRAYER_REQUEST
} from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import type { GetAllPostsResponse, CreateCommentResponse, GetCommentsResponse } from '../post/post.service';
import type { ApiError } from '../../constants/Error';

export interface CreatePrayerPostResponse {
    success: boolean;
    message?: string;
    prayer_request_id?: string;
    error?: string;
    error_code?: string;
}
export interface CreatePostData {
    description: string;
    media?: File[];
}
export const prayerPostService = {
    createPost: async (data: CreatePostData): Promise<CreatePrayerPostResponse> => {
        try {
            const formData = new FormData();

            formData.append('description', data.description);
            
            if (data.media && data.media.length > 0) {
                data.media.forEach((file) => {
                    formData.append('media', file);
                });
            }

            const response = await api.post<CreatePrayerPostResponse>(CREATE_PRAYER_POST, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'An unexpected error occurred during post creation.',
                error_code: err?.error_code
            };
        }
    },

    getAllPrayerRequests: async (limit: number = 10, offset: number = 0): Promise<GetAllPostsResponse> => {
        try {
            const response = await api.get<GetAllPostsResponse>(GET_ALL_PRAYER_REQUESTS, {
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
                message: err?.message || 'Failed to fetch prayer requests.',
                data: [],
                pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
                error_code: err?.error_code
            };
        }
    },

    getUserPrayerRequests: async (limit: number = 10, offset: number = 0): Promise<GetAllPostsResponse> => {
        try {
            const response = await api.get<GetAllPostsResponse>(GET_USER_PRAYER_REQUESTS, {
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
                message: err?.message || 'Failed to fetch user prayer requests.',
                data: [],
                pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
                error_code: err?.error_code
            };
        }
    },

    createComment: async (prayerRequestId: string, description: string): Promise<CreateCommentResponse> => {
        try {
            const response = await api.post<CreateCommentResponse>(CREATE_PRAYER_COMMENT, {
                prayer_request_id: prayerRequestId,
                description
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to create comment.',
                error_code: err?.error_code
            };
        }
    },

    getComments: async (prayerRequestId: string): Promise<GetCommentsResponse> => {
        try {
            const response = await api.get<GetCommentsResponse>(`${GET_PRAYER_COMMENTS_DETAILS}/${prayerRequestId}/v1`);
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to fetch comments.',
                post_id: prayerRequestId,
                data: [],
                error_code: err?.error_code
            };
        }
    },

    likePrayerRequest: async (prayerRequestId: string): Promise<CreatePrayerPostResponse> => {
        try {
            const response = await api.post(LIKE_PRAYER_REQUEST, {
                prayer_request_id: prayerRequestId
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to like prayer request',
                error_code: err?.error_code
            };
        }
    },

    unlikePrayerRequest: async (prayerRequestId: string): Promise<CreatePrayerPostResponse> => {
        try {
            const response = await api.post(UNLIKE_PRAYER_REQUEST, {
                prayer_request_id: prayerRequestId
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to unlike prayer request',
                error_code: err?.error_code
            };
        }
    }
};