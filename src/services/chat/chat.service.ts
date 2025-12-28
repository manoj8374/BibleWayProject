import api from '../../AxiosClient';
import { GET_CONVERSATION, GET_INBOX, UPLOAD_FILE } from '../../constants/ApiUrls';
import type { ApiError } from '../../constants/Error';

export interface MessageSender {
  user_id: string;
  user_name: string;
  profile_picture_url: string;
}

export interface MessageDTO {
  message_id: string;
  sender: MessageSender;
  text: string;
  file: {
    url: string;
    type: 'IMAGE' | 'VIDEO' | 'AUDIO';
    size: number;
    name: string;
  } | null;
  reply_to_id: string | null;
  shared_post: SharedPost | null;
  created_at: string;
  edited_at: string | null;
  is_deleted_for_everyone: boolean;
  is_sent_by_me: boolean;
}

export interface SharedPostMedia {
  media_id: string;
  media_type: 'IMAGE' | 'VIDEO';
  url: string;
}

export interface SharedPost {
  post_id: string;
  title: string;
  description: string;
  created_at: string;
  media: SharedPostMedia[];
}

export interface ConversationMember {
  user_id: string;
  user_name: string;
  profile_picture_url: string;
  is_admin: boolean;
  joined_at: string;
  last_read_at: string;
}

export interface ConversationDTO {
  conversation_id: number;
  type: string;
  name: string;
  description: string;
  image: string;
  created_by: MessageSender;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  members: ConversationMember[];
  members_count: number;
  messages: MessageDTO[];
  messages_count: number;
}

export interface SendMessageRequest {
  action: 'send_message';
  request_id: string;
  conversation_id: string;
  content: string;
  parent_message_id?: string;
  shared_post_id?: string;
  file_url?: string;
  file_type?: 'IMAGE' | 'VIDEO' | 'AUDIO';
  file_size?: number;
  file_name?: string;
}

export interface FileUploadResponse {
  success: boolean;
  data: {
    file_url: string;
    file_type: 'IMAGE' | 'VIDEO' | 'AUDIO';
    file_size: number;
    file_name: string;
  };
  error?: string; // For 400 Bad Request
  error_code?: string;
}

export interface WSAckResponse {
  type: 'ack';
  action: string;
  request_id: string;
  ok: boolean;
  data?: {
    message_id: string;
    created_at: string;
  };
  error?: string; 
}

export interface WSMessageSentEvent {
  type: 'message.sent';
  data: {
    message_id: string;
    conversation_id: string;
    sender_id: string;
    sender_name: string;
    sender_email: string;
    text: string;
    file: {
        url: string;
        type: string;
        size: number;
        name: string;
    } | null;
    reply_to_id: string | null;
    created_at: string;
    edited_at: null;
    is_deleted_for_everyone: boolean;
    shared_post: SharedPost | null;
  };
}

export interface WSTypingEvent {
  type: 'typing';
  data: {
    conversation_id: string;
    user_id: string;
    user_name: string;
    is_typing: boolean;
  };
}

export interface WSReadReceiptUpdatedEvent {
  type: 'read_receipt.updated';
  data: {
    user_id: string;
    conversation_id: string;
    last_read_at: string;
  };
}

export interface MarkReadRequest {
  action: 'mark_read';
  request_id: string;
  conversation_id: string;
  message_id?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface DeleteMessageRequest {
  action: 'delete_message';
  request_id: string;
  message_id: string;
}

export interface WSMessageDeletedEvent {
  type: 'message.deleted';
  data: {
    message_id: string;
    conversation_id: string;
  };
}

export interface GetPresenceRequest {
  action: 'get_presence';
  request_id: string;
  conversation_id: string;
}

export interface PresenceUser {
  user_id: string;
  user_name: string;
  is_online: boolean;
  last_seen: string | null;
}

export interface WSPresenceStatusEvent {
  type: 'presence.status';
  request_id: string;
  data: {
    conversation_id: string;
    users: PresenceUser[];
  };
}

export interface WSPresenceUpdatedEvent {
  type: 'presence.updated';
  data: {
    user_id: string;
    conversation_id: string;
    is_online: boolean;
    last_seen?: string | null;
  };
}

export interface InboxItem {
  conversation_id: string;
  type: string;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
  last_message: MessageDTO;
  other_member?: MessageSender;
  members?: MessageSender[];
  members_count: number;
  unread_count: number;
  last_activity_at: string;
}

export interface InboxResponse {
  success: boolean;
  data: InboxItem[];
  message?: string
}

export const chatService = {
  getConversation: async (conversationId: string): Promise<ApiResponse<ConversationDTO>> => {
     try {
        const response = await api.get<ApiResponse<ConversationDTO>>(`${GET_CONVERSATION}/${conversationId}/`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });
        return response.data;
     } catch (error: unknown) {
        const err = error as ApiError;
        return {
            success: false,
            data: {} as ConversationDTO,
            message: err?.message || 'Failed to fetch conversation.'
        };
     }
  },
  getInbox: async (): Promise<InboxResponse> => {
      try {
          const response = await api.get<InboxResponse>(`${GET_INBOX}/`, {
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
              message: err?.message || 'Failed to fetch inbox.'
          };
      }
  },
  uploadFile: async (file: File, conversationId?: string): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    if (conversationId) {
      formData.append('conversation_id', conversationId);
    }

    try {
      const response = await api.post<FileUploadResponse>(`${UPLOAD_FILE}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "ngrok-skip-browser-warning": "true"
        }
      });
      return response.data;
    } catch (error: unknown) {
        const err = error as ApiError;
        return {
            success: false,
            data: {
                file_url: '',
                file_type: 'IMAGE',
                file_size: 0,
                file_name: ''
            },
            error: err?.message || 'Failed to upload file.',
            error_code: err?.error_code
        };
    }
  }
};
