import api from '../../AxiosClient';
import { GET_ALL_WALLPAPERS } from '../../constants/ApiUrls';
import type { ApiError } from '../../constants/Error';
import i18n from '../../i18n/config';

export interface Wallpaper {
  wallpaper_id: string;
  image_url: string;
  filename: string;
  created_at: string;
}

export interface GetAllWallpapersResponse {
  success: boolean;
  message: string;
  data: Wallpaper[];
  error_code?: string;
}

export const wallpaperService = {
  getAllWallpapers: async (): Promise<GetAllWallpapersResponse> => {
    try {
      const response = await api.get<GetAllWallpapersResponse>(GET_ALL_WALLPAPERS, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.wallpaper.failedToLoadWallpapers'),
        data: [],
        error_code: err?.error_code
      };
    }
  },
};

