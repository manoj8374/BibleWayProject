import api from '../../AxiosClient';
import { GET_USER_PROFILE, UPDATE_USER_PROFILE, SEARCH_USERS, FOLLOW_USER, UNFOLLOW_USER, GET_RECOMMENDED_USERS, GET_COMPLETE_USER_PROFILE, GET_USER_FOLLOWING, GET_USER_FOLLOWERS } from '../../constants/ApiUrls';
import type { ApiError } from '../../constants/Error';
import i18n from '../../i18n/config';

export interface UserProfile {
    user_id: string;
    user_name: string;
    email?: string;
    country?: string;
    age?: number;
    preferred_language?: string;
    profile_picture_url: string;
    followers_count?: number;
    following_count?: number;
    is_following?: boolean;
    conversation_id?: string;
    is_admin?: boolean;
}

export interface GetUserProfileResponse {
    success: boolean;
    message: string;
    data?: UserProfile;
    error?: string;
    error_code?: string;
}

export interface UserSearchResponse {
    success: boolean;
    data: UserProfile[];
    total_count: number;
    query: string;
    message: string;
    error_code?: string;
}

export interface FollowResponse {
    success: boolean;
    message: string;
    error?: string;
    error_code?: string;
}

export interface RecommendedUser {
    user_id: string;
    user_name: string;
    profile_image: string;
}

export interface RecommendedUsersResponse {
    success: boolean;
    data: RecommendedUser[];
    total_count: number;
    error?: string;
    error_code?: string;
}

export interface CompleteUserProfile {
    user_id: string;
    user_name: string;
    email: string;
    country: string;
    age: number;
    preferred_language: string;
    profile_picture_url: string;
    is_admin: boolean;
    followers_count: number;
    following_count: number;
    posts_count?: number;
    is_following?: boolean;
    conversation_id?: string | null;
}

export interface CompleteUserProfileResponse {
    success: boolean;
    message: string;
    data?: CompleteUserProfile;
    error?: string;
    error_code?: string;
}

export interface UpdateProfileData {
    username?: string;
    profile_picture?: File;
    country?: string;
    age?: number;
    preferred_language?: string;
}

export interface UpdateProfileResponse {
    success: boolean;
    message: string;
    data?: UserProfile;
    error?: string;
    error_code?: string;
}

export interface FollowUser {
    user_name: string;
    profile_picture: string;
    is_following?: boolean;
    user_id?: string;
}

export interface GetFollowingResponse {
    success: boolean;
    data: FollowUser[];
    total_count: number;
    error?: string;
    error_code?: string;
}

export interface GetFollowersResponse {
    success: boolean;
    data: FollowUser[];
    total_count: number;
    error?: string;
    error_code?: string;
}

export const userService = {
    getUserProfile: async (): Promise<GetUserProfileResponse> => {
        try {
            const response = await api.get<GetUserProfileResponse>(GET_USER_PROFILE, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || i18n.t('services.user.failedToFetchUserProfile'),
                error_code: err?.error_code
            };
        }
    },

    searchUsers: async (query: string, limit: number = 20): Promise<UserSearchResponse> => {
        try {
            const response = await api.get<UserSearchResponse>(SEARCH_USERS, {
                params: {
                    q: query,
                    limit: limit
                },
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                data: [],
                total_count: 0,
                query: query,
                message: err.message,
                error_code: err.error_code
            };
        }
    },

    followUser: async (userId: string): Promise<FollowResponse> => {
        try {
            const response = await api.post<FollowResponse>(FOLLOW_USER, {
                followed_id: userId
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || i18n.t('services.user.failedToFollowUser'),
                error_code: err?.error_code
            };
        }
    },

    unfollowUser: async (userId: string): Promise<FollowResponse> => {
        try {
            const response = await api.post<FollowResponse>(UNFOLLOW_USER, {
                followed_id: userId
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || i18n.t('services.user.failedToUnfollowUser'),
                error_code: err?.error_code
            };
        }
    },

    getRecommendedUsers: async (userId: string, limit: number = 20): Promise<RecommendedUsersResponse> => {
        try {
            const response = await api.get<RecommendedUsersResponse>(GET_RECOMMENDED_USERS, {
                params: {
                    user_id: userId,
                    limit: limit
                },
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                data: [],
                total_count: 0,
                error: err?.message || i18n.t('services.user.failedToGetRecommendedUsers'),
                error_code: err?.error_code
            };
        }
    },

    getCompleteUserProfile: async (userId: string, currentUserId?: string): Promise<CompleteUserProfileResponse> => {
        try {
            const response = await api.post<CompleteUserProfileResponse>(GET_COMPLETE_USER_PROFILE, {
                user_id: userId,
                current_user: currentUserId
            }, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || i18n.t('services.user.failedToGetUserProfile'),
                error_code: err?.error_code
            };
        }
    },

    updateProfile: async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {
        try {
            // If profile_picture is present, use FormData, otherwise use JSON
            let requestData: FormData | Record<string, any>;
            let headers: Record<string, string> = {
                "ngrok-skip-browser-warning": "true"
            };

            if (data.profile_picture) {
                // Use FormData for file upload
                const formData = new FormData();
                formData.append('profile_picture', data.profile_picture);
                
                if (data.username) formData.append('username', data.username);
                if (data.country) formData.append('country', data.country);
                if (data.age !== undefined) formData.append('age', data.age.toString());
                if (data.preferred_language) formData.append('preferred_language', data.preferred_language);
                
                requestData = formData;
                // Don't set Content-Type for FormData - let browser set it with boundary
            } else {
                // Use JSON for non-file updates
                requestData = {
                    ...(data.username && { username: data.username }),
                    ...(data.country && { country: data.country }),
                    ...(data.age !== undefined && { age: data.age }),
                    ...(data.preferred_language && { preferred_language: data.preferred_language })
                };
                headers["Content-Type"] = "application/json";
            }

            const response = await api.post<UpdateProfileResponse>(UPDATE_USER_PROFILE, requestData, {
                headers
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || 'Failed to update profile',
                error_code: err?.error_code
            };
        }
    },

    getFollowing: async (): Promise<GetFollowingResponse> => {
        try {
            const response = await api.get<GetFollowingResponse>(GET_USER_FOLLOWING, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                data: [],
                total_count: 0,
                error: err?.message || i18n.t('services.user.failedToGetFollowing'),
                error_code: err?.error_code
            };
        }
    },

    getFollowers: async (): Promise<GetFollowersResponse> => {
        try {
            const response = await api.get<GetFollowersResponse>(GET_USER_FOLLOWERS, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as ApiError;
            return {
                success: false,
                data: [],
                total_count: 0,
                error: err?.message || i18n.t('services.user.failedToGetFollowers'),
                error_code: err?.error_code
            };
        }
    }
};
