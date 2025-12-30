import api from "../../AxiosClient";
import { AxiosError } from "axios";
import {
  ADMIN_CREATE_VERSE,
  ADMIN_DELETE_VERSE,
  ADMIN_UPDATE_VERSE,
  ADMIN_CREATE_BOOK,
  GET_ALL_CATEGORIES,
  GET_ALL_AGE_GROUPS,
  GET_ALL_LANGUAGES,
  ADMIN_CREATE_CATEGORY,
  ADMIN_UPDATE_CATEGORY,
  ADMIN_UPDATE_AGE_GROUP,
  ADMIN_UPDATE_BOOK,
  GET_BOOKS,
  ADMIN_CREATE_PROMOTION,
  ADMIN_DELETE_PROMOTION,
  GET_BOOK_CHAPTERS,
  ADMIN_UPLOAD_CHAPTERS,
  ADMIN_BULK_DELETE_CHAPTERS,
  ADMIN_GET_CHAPTER_FEEDBACKS,
} from "../../constants/ApiUrls";
import type { ApiError } from "../../constants/Error";
import i18n from "../../i18n/config";

export interface CreateVerseData {
  title?: string;
  description: string;
}

export interface CreateVerseResponse {
  success: boolean;
  message: string;
  verse_id?: string;
  detail?: string;
  error?: string;
  error_code?: string;
}

export interface DeleteVerseData {
  verse_id: string;
}

export interface DeleteVerseResponse {
  success: boolean;
  message?: string;
  verse_id?: string;
  error?: string;
  error_code?: string;
}

export interface UpdateVerseData {
  verse_id: string;
  title?: string;
  description?: string;
}

export interface UpdateVerseResponse {
  success: boolean;
  message?: string;
  data?: {
    verse_id: string;
    title?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
  };
  error?: string;
  error_code?: string;
}

export interface CreateBookResponse {
  success: boolean;
  message?: string;
  book_id?: string;
  detail?: string;
  error?: string;
  error_code?: string;
}

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

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
  error?: string;
  error_code?: string;
}

export interface GetAgeGroupsResponse {
  success: boolean;
  message: string;
  data: AgeGroup[];
  error?: string;
  error_code?: string;
}

export interface Language {
  language_id: string;
  language_name: string;
  display_name: string;
}

export interface GetLanguagesResponse {
  success: boolean;
  message: string;
  data: Language[];
  error?: string;
  error_code?: string;
}

export interface CreateCategoryData {
  category_name: string;
  description?: string;
  display_order?: number;
  cover_image?: File;
}

export interface CreateCategoryResponse {
  success: boolean;
  message?: string;
  data?: Category;
  error?: string;
  error_code?: string;
}

export interface UpdateCategoryData {
  category_id: string;
  cover_image?: File;
  cover_image_url?: string;
  description?: string;
}

export interface UpdateCategoryResponse {
  success: boolean;
  message?: string;
  data?: Category;
  error?: string;
  error_code?: string;
}

export interface UpdateAgeGroupData {
  age_group_id: string;
  cover_image?: File;
  description?: string;
}

export interface UpdateAgeGroupResponse {
  success: boolean;
  message?: string;
  data?: AgeGroup;
  error?: string;
  error_code?: string;
}

export interface UpdateBookData {
  book_id: string;
  title?: string;
  description?: string;
  cover_image?: File;
  cover_image_url?: string;
}

export interface UpdateBookResponse {
  success: boolean;
  message?: string;
  data?: Book;
  error?: string;
  error_code?: string;
}

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
  created_at: string;
  updated_at: string;
}

export interface GetBooksResponse {
  success: boolean;
  message: string;
  data: Book[];
  error?: string;
  error_code?: string;
}

export interface CreatePromotionData {
    title: string;
    description?: string;
    price?: number;
    redirect_link: string;
    meta_data?: string;
    media?: File;
    images?: File[];
}

export interface CreatePromotionResponse {
  success: boolean;
  message?: string;
  promotion_id?: string;
  error?: string;
  error_code?: string;
}

export interface DeletePromotionData {
  promotion_id: string;
}

export interface DeletePromotionResponse {
  success: boolean;
  message?: string;
  promotion_id?: string;
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
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GetChaptersResponse {
  success: boolean;
  message: string;
  data: Chapter[];
  error?: string;
  error_code?: string;
}

export interface UploadChaptersResponse {
  success: boolean;
  message?: string;
  chaptersCount?: number;
  book_id?: string;
  error?: string;
  error_code?: string;
}

export interface BulkDeleteChaptersRequest {
  chapter_ids: string[];
}

export interface BulkDeleteChaptersResponse {
  success: boolean;
  message?: string;
  deleted_count: number;
  deleted_ids: string[];
  failed_count: number;
  failed_ids: string[];
  errors: string[];
  error?: string;
  error_code?: string;
}

export interface ChapterFeedbackUser {
  user_id: string;
  username: string;
  email: string;
  profile_picture: string | null;
}

export interface ChapterFeedback {
  feedback_id: string;
  user: ChapterFeedbackUser;
  description: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface ChapterWithFeedbacks {
  chapter_id: string;
  chapter_title: string;
  chapter_number: number;
  chapter_name: string;
  total_feedbacks: number;
  average_rating: number;
  feedbacks: ChapterFeedback[];
}

export interface Book {
  book_id: string;
  book_title: string;
  book_description: string;
  total_feedbacks: number;
  chapters: ChapterWithFeedbacks[];
}

export interface GetChapterFeedbacksResponse {
  success: boolean;
  message: string;
  data: {
    total_feedbacks: number;
    total_books: number;
    books: Book[];
  };
  error?: string;
  error_code?: string;
}

export const adminService = {
  createVerse: async (data: CreateVerseData): Promise<CreateVerseResponse> => {
    try {
      const response = await api.post<CreateVerseResponse>(
        ADMIN_CREATE_VERSE,
        data
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<CreateVerseResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || i18n.t('services.auth.unexpectedError'),
                error_code: err?.error_code
            };
        }
    },

    createBook: async (formData: FormData): Promise<CreateBookResponse> => {
        try {
            const response = await api.post<CreateBookResponse>(ADMIN_CREATE_BOOK, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<CreateBookResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || i18n.t('services.auth.unexpectedError'),
                error_code: err?.error_code
            };
        }
    },

    getCategories: async (): Promise<GetCategoriesResponse> => {
        try {
            const response = await api.get<GetCategoriesResponse>(GET_ALL_CATEGORIES, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<GetCategoriesResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || "Failed to fetch categories.",
                data: [],
                error_code: err?.error_code
            };
        }
    },

    getAgeGroups: async (): Promise<GetAgeGroupsResponse> => {
        try {
            const response = await api.get<GetAgeGroupsResponse>(GET_ALL_AGE_GROUPS, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<GetAgeGroupsResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || "Failed to fetch age groups.",
                data: [],
                error_code: err?.error_code
            };
        }
    },

    getLanguages: async (): Promise<GetLanguagesResponse> => {
        try {
            const response = await api.get<GetLanguagesResponse>(GET_ALL_LANGUAGES, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<GetLanguagesResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || "Failed to fetch languages.",
                data: [],
                error_code: err?.error_code
            };
        }
    },

    createCategory: async (data: CreateCategoryData): Promise<CreateCategoryResponse> => {
        try {
            const formData = new FormData();
            formData.append('category_name', data.category_name);
            
            if (data.description) {
                formData.append('description', data.description);
            }
            
            if (data.display_order !== undefined) {
                formData.append('display_order', String(data.display_order));
            }
            
            if (data.cover_image) {
                formData.append('cover_image', data.cover_image);
            }

            const response = await api.post<CreateCategoryResponse>(ADMIN_CREATE_CATEGORY, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<CreateCategoryResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                error: err?.message || "Failed to create category.",
                error_code: err?.error_code
            };
        }
    },

    getBooks: async (category_id: string, age_group: string): Promise<GetBooksResponse> => {
        try {
            const response = await api.post<GetBooksResponse>(GET_BOOKS, {
                category_id,
                age_group
            }, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<GetBooksResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || i18n.t('services.admin.failedToLoadBooks'),
                data: [],
                error_code: err?.error_code
            };
        }
    },

    createPromotion: async (data: CreatePromotionData): Promise<CreatePromotionResponse> => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            if (data.price !== undefined) {
                formData.append('price', String(data.price));
            }
            formData.append('redirect_link', data.redirect_link);

            if (data.description) {
                formData.append('description', data.description);
            }

            if (data.meta_data) {
                formData.append('meta_data', data.meta_data);
            }

            if (data.media) {
                formData.append('media', data.media);
            }

            if (data.images && data.images.length > 0) {
                data.images.forEach((image) => {
                    formData.append('images', image);
                });
            }

            const response = await api.post<CreatePromotionResponse>(ADMIN_CREATE_PROMOTION, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<CreatePromotionResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                error: err?.message || "Failed to create promotion.",
                error_code: err?.error_code
            };
        }
    },

    getBookChapters: async (book_id: string): Promise<GetChaptersResponse> => {
        try {
            const response = await api.post<GetChaptersResponse>(GET_BOOK_CHAPTERS, {
                book_id
            }, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<GetChaptersResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
                success: false,
                message: err?.message || "Failed to fetch chapters.",
                data: [],
                error_code: err?.error_code
            };
        }
    },

    uploadChapters: async (formData: FormData): Promise<UploadChaptersResponse> => {
        try {
            const response = await api.post<UploadChaptersResponse>(ADMIN_UPLOAD_CHAPTERS, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<UploadChaptersResponse>;
            if (axiosError.response && axiosError.response.data) {
                return axiosError.response.data;
            }

            const err = error as ApiError;
            return {
              success: false,
              message: err?.message || i18n.t("services.auth.unexpectedError"),
              error_code: err?.error_code,
            };
        }
    },

  // createBook: async (formData: FormData): Promise<CreateBookResponse> => {
  //   try {
  //     const response = await api.post<CreateBookResponse>(
  //       ADMIN_CREATE_BOOK,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<CreateBookResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       message: err?.message || i18n.t("services.auth.unexpectedError"),
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // getCategories: async (): Promise<GetCategoriesResponse> => {
  //   try {
  //     const response = await api.get<GetCategoriesResponse>(
  //       GET_ALL_CATEGORIES,
  //       {
  //         headers: {
  //           "ngrok-skip-browser-warning": "true",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<GetCategoriesResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       message: err?.message || "Failed to fetch categories.",
  //       data: [],
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // getAgeGroups: async (): Promise<GetAgeGroupsResponse> => {
  //   try {
  //     const response = await api.get<GetAgeGroupsResponse>(GET_ALL_AGE_GROUPS, {
  //       headers: {
  //         "ngrok-skip-browser-warning": "true",
  //       },
  //     });
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<GetAgeGroupsResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       message: err?.message || "Failed to fetch age groups.",
  //       data: [],
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // getLanguages: async (): Promise<GetLanguagesResponse> => {
  //   try {
  //     const response = await api.get<GetLanguagesResponse>(GET_ALL_LANGUAGES, {
  //       headers: {
  //         "ngrok-skip-browser-warning": "true",
  //       },
  //     });
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<GetLanguagesResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       message: err?.message || "Failed to fetch languages.",
  //       data: [],
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // createCategory: async (
  //   data: CreateCategoryData
  // ): Promise<CreateCategoryResponse> => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("category_name", data.category_name);

  //     if (data.description) {
  //       formData.append("description", data.description);
  //     }

  //     if (data.display_order !== undefined) {
  //       formData.append("display_order", String(data.display_order));
  //     }

  //     if (data.cover_image) {
  //       formData.append("cover_image", data.cover_image);
  //     }

  //     const response = await api.post<CreateCategoryResponse>(
  //       ADMIN_CREATE_CATEGORY,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<CreateCategoryResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       error: err?.message || "Failed to create category.",
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // getBooks: async (
  //   category_id: string,
  //   age_group: string
  // ): Promise<GetBooksResponse> => {
  //   try {
  //     const response = await api.post<GetBooksResponse>(
  //       GET_BOOKS,
  //       {
  //         category_id,
  //         age_group,
  //       },
  //       {
  //         headers: {
  //           "ngrok-skip-browser-warning": "true",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<GetBooksResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       message: err?.message || i18n.t("services.admin.failedToLoadBooks"),
  //       data: [],
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // createPromotion: async (
  //   data: CreatePromotionData
  // ): Promise<CreatePromotionResponse> => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", data.title);
  //     formData.append("price", String(data.price));
  //     formData.append("redirect_link", data.redirect_link);

  //     if (data.description) {
  //       formData.append("description", data.description);
  //     }

  //     if (data.meta_data) {
  //       formData.append("meta_data", data.meta_data);
  //     }

  //     if (data.media) {
  //       formData.append("media", data.media);
  //     }

  //     if (data.images && data.images.length > 0) {
  //       data.images.forEach((image) => {
  //         formData.append("images", image);
  //       });
  //     }

  //     const response = await api.post<CreatePromotionResponse>(
  //       ADMIN_CREATE_PROMOTION,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<CreatePromotionResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       error: err?.message || "Failed to create promotion.",
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // getBookChapters: async (book_id: string): Promise<GetChaptersResponse> => {
  //   try {
  //     const response = await api.post<GetChaptersResponse>(
  //       GET_BOOK_CHAPTERS,
  //       {
  //         book_id,
  //       },
  //       {
  //         headers: {
  //           "ngrok-skip-browser-warning": "true",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<GetChaptersResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       message: err?.message || "Failed to fetch chapters.",
  //       data: [],
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  // uploadChapters: async (
  //   formData: FormData
  // ): Promise<UploadChaptersResponse> => {
  //   try {
  //     const response = await api.post<UploadChaptersResponse>(
  //       ADMIN_UPLOAD_CHAPTERS,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<UploadChaptersResponse>;
  //     if (axiosError.response && axiosError.response.data) {
  //       return axiosError.response.data;
  //     }

  //     const err = error as ApiError;
  //     return {
  //       success: false,
  //       message: err?.message || "Failed to upload chapters.",
  //       error_code: err?.error_code,
  //     };
  //   }
  // },

  bulkDeleteChapters: async (chapterIds: string[]): Promise<BulkDeleteChaptersResponse> => {
    try {
      const response = await api.post<BulkDeleteChaptersResponse>(
        ADMIN_BULK_DELETE_CHAPTERS,
        {
          chapter_ids: chapterIds,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<BulkDeleteChaptersResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "Failed to delete chapters.",
        error: err?.message || "Failed to delete chapters.",
        error_code: err?.error_code,
        deleted_count: 0,
        deleted_ids: [],
        failed_count: chapterIds.length,
        failed_ids: chapterIds,
        errors: [err?.message || "Failed to delete chapters."],
      };
    }
  },

  deleteVerse: async (data: DeleteVerseData): Promise<DeleteVerseResponse> => {
    try {
      const response = await api.delete<DeleteVerseResponse>(
        ADMIN_DELETE_VERSE,
        {
          data: data,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<DeleteVerseResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "Failed to delete verse.",
        error: err?.message || "Failed to delete verse.",
        error_code: err?.error_code,
      };
    }
  },

  updateVerse: async (data: UpdateVerseData): Promise<UpdateVerseResponse> => {
    try {
      const response = await api.put<UpdateVerseResponse>(
        ADMIN_UPDATE_VERSE,
        data
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<UpdateVerseResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "Failed to update verse.",
        error: err?.message || "Failed to update verse.",
        error_code: err?.error_code,
      };
    }
  },

  updateCategory: async (
    data: UpdateCategoryData
  ): Promise<UpdateCategoryResponse> => {
    try {
      let requestData: FormData | Record<string, string | undefined>;
      const headers: Record<string, string> = {
        "ngrok-skip-browser-warning": "true",
      };

      if (data.cover_image) {
        // Use FormData for file upload
        const formData = new FormData();
        formData.append("category_id", data.category_id);

        if (data.description) {
          formData.append("description", data.description);
        }

        formData.append("cover_image", data.cover_image);
        requestData = formData;
      } else {
        // Use JSON for URL-based or description-only updates
        requestData = {
          category_id: data.category_id,
          ...(data.description && { description: data.description }),
          ...(data.cover_image_url && {
            cover_image_url: data.cover_image_url,
          }),
        };
        headers["Content-Type"] = "application/json";
      }

      const response = await api.put<UpdateCategoryResponse>(
        ADMIN_UPDATE_CATEGORY,
        requestData,
        {
          headers,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<UpdateCategoryResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        error: err?.message || "Failed to update category.",
        error_code: err?.error_code,
      };
    }
  },

  updateAgeGroup: async (
    data: UpdateAgeGroupData
  ): Promise<UpdateAgeGroupResponse> => {
    try {
      let requestData: FormData | Record<string, string>;
      const headers: Record<string, string> = {
        "ngrok-skip-browser-warning": "true",
      };

      if (data.cover_image) {
        // Use FormData for file upload (multipart/form-data)
        const formData = new FormData();
        formData.append("age_group_id", data.age_group_id);

        if (data.description) {
          formData.append("description", data.description);
        }

        formData.append("cover_image", data.cover_image);
        requestData = formData;
        // Note: Don't set Content-Type header when using FormData,
        // browser will set it automatically with boundary
      } else {
        // Use JSON for description-only updates
        requestData = {
          age_group_id: data.age_group_id,
          ...(data.description && { description: data.description }),
        };
        headers["Content-Type"] = "application/json";
      }

      const response = await api.put<UpdateAgeGroupResponse>(
        ADMIN_UPDATE_AGE_GROUP,
        requestData,
        {
          headers,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<UpdateAgeGroupResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        error: err?.message || "Failed to update age group.",
        error_code: err?.error_code,
      };
    }
  },

  updateBook: async (data: UpdateBookData): Promise<UpdateBookResponse> => {
    try {
      let requestData: FormData | Record<string, string | undefined>;
      const headers: Record<string, string> = {
        "ngrok-skip-browser-warning": "true",
      };

      if (data.cover_image) {
        // Use FormData for file upload
        const formData = new FormData();
        formData.append("book_id", data.book_id);

        if (data.title) {
          formData.append("title", data.title);
        }

        if (data.description) {
          formData.append("description", data.description);
        }

        formData.append("cover_image", data.cover_image);
        requestData = formData;
      } else {
        // Use JSON for URL-based or text-only updates
        requestData = {
          book_id: data.book_id,
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.cover_image_url && {
            cover_image_url: data.cover_image_url,
          }),
        };
        headers["Content-Type"] = "application/json";
      }

      const response = await api.put<UpdateBookResponse>(
        ADMIN_UPDATE_BOOK,
        requestData,
        {
          headers,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<UpdateBookResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        error: err?.message || "Failed to update book.",
        error_code: err?.error_code,
      };
    }
  },

  deletePromotion: async (data: DeletePromotionData): Promise<DeletePromotionResponse> => {
    try {
      const response = await api.post<DeletePromotionResponse>(
        ADMIN_DELETE_PROMOTION,
        data
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<DeletePromotionResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "Failed to delete promotion.",
        error: err?.message || "Failed to delete promotion.",
        error_code: err?.error_code,
      };
    }
  },

  getChapterFeedbacks: async (): Promise<GetChapterFeedbacksResponse> => {
    try {
      const response = await api.get<GetChapterFeedbacksResponse>(
        ADMIN_GET_CHAPTER_FEEDBACKS,
        {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<GetChapterFeedbacksResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "Failed to retrieve chapter feedbacks.",
        data: {
          total_feedbacks: 0,
          total_books: 0,
          books: []
        },
        error: err?.message || "Failed to retrieve chapter feedbacks.",
        error_code: err?.error_code,
      };
    }
  },
};
