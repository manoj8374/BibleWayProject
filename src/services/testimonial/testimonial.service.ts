import {
    CREATE_TESTIMONIAL,
    GET_ALL_TESTIMONIALS,
    GET_USER_TESTIMONIALS,
    ADMIN_GET_TESTIMONIALS,
    ADMIN_APPROVE_TESTIMONIAL,
    ADMIN_REJECT_TESTIMONIAL
} from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';

export interface TestimonialMedia {
    media_id: string;
    media_type: 'image' | 'video' | 'audio';
    url: string;
    created_at: string;
}

export interface TestimonialUser {
    user_id: string;
    user_name: string;
    profile_picture_url: string;
}

export interface Testimonial {
    testimonial_id: string;
    user: TestimonialUser;
    description: string;
    rating: number;
    is_verified?: boolean;
    media: TestimonialMedia[];
    created_at: string;
    updated_at: string;
}

export interface Pagination {
    limit: number;
    offset: number;
    total_count: number;
    has_next: boolean;
    has_previous: boolean;
}

export interface GetAllTestimonialsResponse {
    success: boolean;
    message: string;
    data: Testimonial[];
    pagination: Pagination;
    error?: string;
    error_code?: string;
}

export interface CreateTestimonialData {
    description: string;
    rating: number;
    media?: File[];
}

export interface CreateTestimonialResponse {
    success: boolean;
    message?: string;
    testimonial_id?: string;
    error?: string;
    error_code?: string;
}

export interface ApproveRejectTestimonialResponse {
    success: boolean;
    message?: string;
    error?: string;
    error_code?: string;
}

export const testimonialService = {
    createTestimonial: async (data: CreateTestimonialData): Promise<CreateTestimonialResponse> => {
        try {
            const formData = new FormData();

            formData.append('description', data.description);
            formData.append('rating', data.rating.toString());

            if (data.media && data.media.length > 0) {
                data.media.forEach((file) => {
                    formData.append('media', file);
                });
            }

            const response = await api.post<CreateTestimonialResponse>(CREATE_TESTIMONIAL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'An unexpected error occurred during testimonial creation.',
                error_code: err?.error_code
            };
        }
    },

    getAllTestimonials: async (limit: number = 10, offset: number = 0): Promise<GetAllTestimonialsResponse> => {
        try {
            const response = await api.get<GetAllTestimonialsResponse>(GET_ALL_TESTIMONIALS, {
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
                message: err?.message || 'Failed to fetch testimonials.',
                data: [],
                pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
                error_code: err?.error_code
            };
        }
    },

    getUserTestimonials: async (limit: number = 10, offset: number = 0): Promise<GetAllTestimonialsResponse> => {
        try {
            const response = await api.get<GetAllTestimonialsResponse>(GET_USER_TESTIMONIALS, {
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
                message: err?.message || 'Failed to fetch user testimonials.',
                data: [],
                pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
                error_code: err?.error_code
            };
        }
    },

    adminGetTestimonials: async (limit: number = 10, offset: number = 0, status: 'all' | 'pending' | 'verified' = 'all'): Promise<GetAllTestimonialsResponse> => {
        try {
            const response = await api.get<GetAllTestimonialsResponse>(ADMIN_GET_TESTIMONIALS, {
                params: { limit, offset, status },
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to fetch testimonials.',
                data: [],
                pagination: { limit, offset, total_count: 0, has_next: false, has_previous: false },
                error_code: err?.error_code
            };
        }
    },

    approveTestimonial: async (testimonialId: string): Promise<ApproveRejectTestimonialResponse> => {
        try {
            const response = await api.post<ApproveRejectTestimonialResponse>(ADMIN_APPROVE_TESTIMONIAL, {
                testimonial_id: testimonialId
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to approve testimonial.',
                error_code: err?.error_code
            };
        }
    },

    rejectTestimonial: async (testimonialId: string): Promise<ApproveRejectTestimonialResponse> => {
        try {
            const response = await api.post<ApproveRejectTestimonialResponse>(ADMIN_REJECT_TESTIMONIAL, {
                testimonial_id: testimonialId
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to reject testimonial.',
                error_code: err?.error_code
            };
        }
    }
};

