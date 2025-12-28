import { GET_ALL_AGE_GROUPS } from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';

export interface AgeGroup {
  age_group_id: string;
  age_group_name: string;
  display_name: string;
  cover_image_url: string;
  description: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GetAllAgeGroupsResponse {
  success: boolean;
  message: string;
  data: AgeGroup[];
  error?: string;
  error_code?: string;
}

export const ageGroupService = {
  getAllAgeGroups: async (): Promise<GetAllAgeGroupsResponse> => {
    try {
      const response = await api.get<GetAllAgeGroupsResponse>(GET_ALL_AGE_GROUPS, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch age groups.',
        data: [],
        error_code: err?.error_code
      };
    }
  }
};

