import { GET_ALL_PROMOTIONS } from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';

export interface PromotionMedia {
  media_id: string;
  media_type: 'image' | 'video' | 'audio';
  url: string;
}

export interface PromotionImage {
  promotion_image_id: string;
  image_url: string;
  image_type: string;
  order: number;
}

export interface Promotion {
  promotion_id: string;
  title: string;
  description: string;
  price: string;
  redirect_link: string;
  meta_data: Record<string, any>;
  media: PromotionMedia;
  images: PromotionImage[];
  created_at: string;
  updated_at: string;
}

export interface GetAllPromotionsResponse {
  success: boolean;
  message: string;
  data: Promotion[];
  error?: string;
  error_code?: string;
}

export const promotionService = {
  getAllPromotions: async (): Promise<GetAllPromotionsResponse> => {
    try {
      const response = await api.get<GetAllPromotionsResponse>(GET_ALL_PROMOTIONS, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || 'Failed to fetch promotions.',
        data: [],
        error_code: err?.error_code
      };
    }
  }
};

