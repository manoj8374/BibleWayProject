import { GET_ALL_CATEGORIES } from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';

export interface Category {
  category_id: string;
  category_name: string;
  display_name: string;
  cover_image_url: string;
  description: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GetAllCategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
  error?: string;
  error_code?: string;
}

export const categoryService = {
  getAllCategories: async (): Promise<GetAllCategoriesResponse> => {
    try {
      const response = await api.get<GetAllCategoriesResponse>(GET_ALL_CATEGORIES, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch categories.',
        data: [],
        error_code: err?.error_code
      };
    }
  }
};

