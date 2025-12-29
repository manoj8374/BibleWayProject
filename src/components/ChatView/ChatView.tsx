/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ChatContainer,
  ChatHeader,
  Avatar,
  UserInfo,
  UserName,
  Status,
  CloseButton,
  MessagesArea,
  MessageBubble,
  MessageContent,
  MessageTime,
  InputArea,
  InputWrapper,
  AttachButton,
  MessageInput,
  SendButton,
  TypingIndicatorWrapper,
  TypingText,
  DeleteButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalMessage,
  PreviewMedia,
  StickerButton,
  StickerPopup,
  StickerItem,
  TranslationControls,
  LanguageSelect,
  TranslateButton,
  ImageModalOverlay,
  ImageModalContent,
  ImageModalCloseButton,
} from "./ChatView.styles";
import {
  chatService,
  type MessageDTO,
  type WSMessageSentEvent,
  type WSAckResponse,
  type WSTypingEvent,
  type WSReadReceiptUpdatedEvent,
  type WSMessageDeletedEvent,
  type SharedPost,
  type WSPresenceStatusEvent,
  type WSPresenceUpdatedEvent,
  type PresenceUser,
} from "../../services/chat/chat.service";
import {
  stickerService,
  type Sticker,
} from "../../services/sticker/sticker.service";
import {
  translationService,
  type LanguageCode,
  LANGUAGE_NAMES,
} from "../../services/translation/translation.service";
import { showError } from "../../utils/toast";
import {
  useWebSocketEvent,
  useWebSocket,
} from "../../contexts/WebSocketContext";
import { useProfile } from "../../contexts/useProfile";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  rawTimestamp?: string;
  isOwn: boolean;
  status?: "sending" | "sent" | "error" | "read";
  is_deleted_for_everyone?: boolean;
  file?: {
    url: string;
    type: "IMAGE" | "VIDEO" | "AUDIO";
    size: number;
    name: string;
  } | null;
  shared_post?: SharedPost | null;
}

interface ChatViewProps {
  selectedPersonId: string;
  userName: string;
  userAvatar?: string;
  isActive?: boolean;
  lastActive?: string;
  onClose?: () => void;
  conversationId: string;
  onViewChange: (view: "profile" | "chat" | "peopleSearch" | "") => void;
}

const ChatView: React.FC<ChatViewProps> = ({
  selectedPersonId,
  userName,
  userAvatar,
  onClose,
  conversationId,
  onViewChange,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(
    new Map()
  );
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { service: wsService } = useWebSocket();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { t } = useI18n();

  const [currentConversationId, setCurrentConversationId] =
    useState(conversationId);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    message: string | null;
    timestamp: string | null;
    messageId: string | null;
  }>({
    isOpen: false,
    message: null,
    timestamp: null,
    messageId: null,
  });
  const [uploadModal, setUploadModal] = useState<{
    isOpen: boolean;
    file: File | null;
    previewUrl: string | null;
  }>({
    isOpen: false,
    file: null,
    previewUrl: null,
  });
  const [presenceMap, setPresenceMap] = useState<Map<string, PresenceUser>>(
    new Map()
  );
  const [isStickerPopupOpen, setIsStickerPopupOpen] = useState(false);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [imageModal, setImageModal] = useState<{
    isOpen: boolean;
    imageUrl: string | null;
  }>({
    isOpen: false,
    imageUrl: null,
  });
  const [stickersLoading, setStickersLoading] = useState(false);
  const stickerButtonRef = useRef<HTMLButtonElement>(null);

  // Translation state
  const [messageTranslations, setMessageTranslations] = useState<
    Map<string, string>
  >(new Map());
  const [translatingMessages, setTranslatingMessages] = useState<Set<string>>(
    new Set()
  );
  const [messageTargetLanguages, setMessageTargetLanguages] = useState<
    Map<string, LanguageCode>
  >(new Map());

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Check if content is a URL (sticker or image)
  const isImageUrl = (content: string): boolean => {
    if (!content) return false;
    try {
      const url = new URL(content);
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];
      const pathname = url.pathname.toLowerCase();
      return (
        imageExtensions.some((ext) => pathname.endsWith(ext)) ||
        url.hostname.includes("s3") ||
        url.hostname.includes("amazonaws.com") ||
        (content.startsWith("http") &&
          (content.includes("image") || content.includes("sticker")))
      );
    } catch {
      return false;
    }
  };

  const mapDtoToMessage = (dto: MessageDTO): Message => ({
    id: dto.message_id,
    content: dto.text,
    timestamp: formatTime(dto.created_at),
    rawTimestamp: dto.created_at,
    isOwn: dto.is_sent_by_me,
    status: "sent",
    is_deleted_for_everyone: dto.is_deleted_for_everyone,
    file: dto.file,
    shared_post: dto.shared_post,
  });

  useWebSocketEvent("message.sent", (eventData: WSMessageSentEvent) => {
    // if (String(eventData.data.conversation_id) !== String(currentConversationId)) {
    //   return; 
    // }
    if (currentConversationId == "" || !currentConversationId) {
      if (eventData.data.conversation_id) {
        setCurrentConversationId(eventData.data.conversation_id);
        fetchConversation(eventData.data.conversation_id);
      }
    }

    const incomingMsg: Message = {
      id: eventData.data.message_id,
      content: eventData.data.text,
      timestamp: formatTime(eventData.data.created_at),
      rawTimestamp: eventData.data.created_at,
      isOwn: profile?.user_id == eventData.data.sender_id,
      status: "sent",
      file: eventData.data.file as any,
      shared_post: eventData.data.shared_post,
    };

    setMessages((prev) => {
      if (prev.some((m) => m.id === incomingMsg.id)) return prev;
      const updated = [...prev, incomingMsg];
      // Sort messages by timestamp to maintain order
      updated.sort((a, b) => {
        const timeA = a.rawTimestamp ? new Date(a.rawTimestamp).getTime() : 0;
        const timeB = b.rawTimestamp ? new Date(b.rawTimestamp).getTime() : 0;
        return timeA - timeB;
      });
      return updated;
    });

    if (!incomingMsg.isOwn && getActiveStatus(selectedPersonId)) {
      const conversationIdToUse = eventData.data.conversation_id || currentConversationId;
      markAsRead(incomingMsg.id, conversationIdToUse);
    }
  });

  useWebSocketEvent("ack", (ackData: WSAckResponse) => {
    if (ackData.action === "send_message" && ackData.ok && ackData.data) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === ackData.request_id) {
            return {
              ...msg,
              id: ackData.data!.message_id,
              timestamp: formatTime(ackData.data!.created_at),
              rawTimestamp: ackData.data!.created_at,
              status: "sent",
            };
          }
          return msg;
        })
      );
    }
  });

  useWebSocketEvent("typing", (typingData: WSTypingEvent) => {
    if (typingData.data.user_id === profile?.user_id) return;
    if (String(typingData.data.conversation_id) !== String(currentConversationId)) {
      return;
    }
    setTypingUsers((prev) => {
      const newMap = new Map(prev);
      if (typingData.data.is_typing) {
        newMap.set(typingData.data.user_id, typingData.data.user_name);
      } else {
        newMap.delete(typingData.data.user_id);
      }
      return newMap;
    });
  });

  useWebSocketEvent("message.deleted", (data: WSMessageDeletedEvent) => {
    if (data.data.conversation_id === String(currentConversationId)) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === data.data.message_id) {
            return { ...msg, is_deleted_for_everyone: true };
          }
          return msg;
        })
      );
    }
  });

  useWebSocketEvent("presence.status", (data: WSPresenceStatusEvent) => {
    if (String(data.data.conversation_id) === String(currentConversationId)) {
      setPresenceMap((prev) => {
        const newMap = new Map(prev);
        data.data.users.forEach((user) => {
          newMap.set(user.user_id, user);
        });
        return newMap;
      });
    }
  });

  useWebSocketEvent("presence.updated", (data: WSPresenceUpdatedEvent) => {
    if (data.data.conversation_id === String(currentConversationId)) {
      setPresenceMap((prev) => {
        const newMap = new Map(prev);
        const existingUser = newMap.get(data.data.user_id);

        newMap.set(data.data.user_id, {
          user_id: data.data.user_id,
          user_name: existingUser?.user_name || "",
          is_online: data.data.is_online,
          last_seen:
            data.data.last_seen !== undefined
              ? data.data.last_seen
              : existingUser?.last_seen || null,
        });

        return newMap;
      });
    }
  });

  const fetchConversation = async (conversationIdParam?: string) => {
    const conversationIdToUse = conversationIdParam || currentConversationId;
      if (!conversationIdToUse) return;
      setLoading(true);
      try {
        const response = await chatService.getConversation(conversationIdToUse);
        setCurrentConversationId(conversationIdToUse);
        initializeConversation(conversationIdToUse);
        if (response.success && response.data) {
          const mappedMessages = response.data.messages.map(mapDtoToMessage);
          mappedMessages.sort((a, b) => {
            const timeA = a.rawTimestamp
              ? new Date(a.rawTimestamp).getTime()
              : 0;
            const timeB = b.rawTimestamp
              ? new Date(b.rawTimestamp).getTime()
              : 0;
            return timeA - timeB;
          });
          setMessages(mappedMessages);
          const lastMsg = mappedMessages[mappedMessages.length - 1];
          if (lastMsg) {
            markAsRead(lastMsg.id, conversationIdToUse);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        setLoading(false);
        showError(t("chat.errors.fetchConversation"));
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchConversation();
  }, []);

  const markAsRead = (msgId?: string, conversationIdParam?: string) => {
    const conversationIdToUse = conversationIdParam || currentConversationId;
    if (!conversationIdToUse) return;
    wsService.send({
      action: "mark_read",
      request_id: uuidv4(),
      conversation_id: conversationIdToUse,
      message_id: msgId,
    });
  };

  useWebSocketEvent(
    "read_receipt.updated",
    (event: WSReadReceiptUpdatedEvent) => {
      setMessages((prev) => {
        const lastReadTime = new Date(event.data.last_read_at).getTime();
        return prev.map((msg) => {
          if (!msg.isOwn) return msg;

          if (msg.status === "sent") {
            if (msg.rawTimestamp) {
              const msgTime = new Date(msg.rawTimestamp).getTime();
              if (msgTime <= lastReadTime) {
                return { ...msg, status: "read" };
              }
            } else {
              return { ...msg, status: "read" };
            }
          }
          return msg;
        });
      });
    }
  );

  const joinConversation = (id: string) => {
    if (!id) return;
    wsService.send({
      action: "join_conversation",
      request_id: uuidv4(),
      conversation_id: id,
    });
  };

  const leaveConversation = useCallback((id: string) => {
    if (!id) return;
    wsService.send({
      action: "leave_conversation",
      request_id: uuidv4(),
      conversation_id: id,
    });
  }, [wsService]);

  const initializeConversation = (conversationId?: string)=>{
    if (conversationId) {
      joinConversation(conversationId);
      wsService.send({
        action: "get_presence",
        request_id: uuidv4(),
        conversation_id: conversationId,
      });
      return;
    }

    if (currentConversationId) {
      joinConversation(currentConversationId);
    }
    wsService.send({
      action: "get_presence",
      request_id: uuidv4(),
      conversation_id: currentConversationId,
    });
  }

  useEffect(() => {
    return () => {
      if (currentConversationId) {
        leaveConversation(currentConversationId);
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
    //{ behavior: 'smooth' }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear translations when conversation changes
  useEffect(() => {
    setMessageTranslations(new Map());
    setTranslatingMessages(new Set());
    setMessageTargetLanguages(new Map());
  }, [conversationId]);

  // Fetch stickers when component mounts
  useEffect(() => {
    const fetchStickers = async () => {
      setStickersLoading(true);
      const response = await stickerService.getAllStickers();
      if (response.success && response.data) {
        setStickers(response.data);
      } else {
        showError(response.error || t("chat.errors.failedToLoadStickers"));
      }
      setStickersLoading(false);
    };

    fetchStickers();
  }, [t]);

  // Close sticker popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stickerButtonRef.current &&
        !stickerButtonRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[data-sticker-popup]")
      ) {
        setIsStickerPopupOpen(false);
      }
    };

    if (isStickerPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStickerPopupOpen]);

  const confirmDelete = () => {
    if (deleteModal.messageId) {
      wsService.send({
        action: "delete_message",
        request_id: uuidv4(),
        message_id: deleteModal.messageId,
      });
    }
    setDeleteModal({
      isOpen: false,
      message: null,
      timestamp: null,
      messageId: null,
    });
    setSelectedMessageId(null);
  };

  const handleSend = (content?: string) => {
    const messageContent = content || newMessage.trim();
    if (!messageContent) return;

    const requestId = "random";

    const tempMsg: Message = {
      id: requestId,
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      rawTimestamp: new Date().toISOString(),
      isOwn: true,
      status: "sending",
    };

    setMessages([...messages, tempMsg]);
    setNewMessage("");

    wsService.send({
      action: "send_message",
      request_id: requestId,
      conversation_id: conversationId,
      content: tempMsg.content,
      receiver_id: selectedPersonId,
    });
  };

  const handleStickerSelect = (sticker: Sticker) => {
    // Send sticker image URL as message content
    handleSend(sticker.image_url);
    setIsStickerPopupOpen(false);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];
    if (!validTypes.includes(file.type)) {
      showError(t("chat.errors.invalidFileType"));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showError(t("chat.errors.fileSizeExceeded"));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUploadModal({ isOpen: true, file, previewUrl });
  };

  const handleUploadAndSend = async () => {
    if (!uploadModal.file) return;

    setIsUploading(true);
    try {
      const response = await chatService.uploadFile(
        uploadModal.file,
        conversationId
      );
      if (response.data) {
        const requestId = "random";
        const tempMsg: Message = {
          id: requestId,
          content: "",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          rawTimestamp: new Date().toISOString(),
          isOwn: true,
          status: "sending",
          file: {
            url: response.data.file_url,
            type: response.data.file_type,
            size: response.data.file_size,
            name: response.data.file_name,
          },
        };

        setMessages([...messages, tempMsg]);

        wsService.send({
          action: "send_message",
          request_id: requestId,
          conversation_id: conversationId,
          content: "",
          receiver_id: selectedPersonId,
          file_url: response.data.file_url,
          file_type: response.data.file_type,
          file_size: response.data.file_size,
          file_name: response.data.file_name,
        });

        if (uploadModal.previewUrl) URL.revokeObjectURL(uploadModal.previewUrl);
        setUploadModal({ isOpen: false, file: null, previewUrl: null });
      } else {
        showError(response.error || t("chat.errors.uploadFailed"));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showError(t("chat.errors.uploadFailed"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTranslate = async (
    messageId: string,
    text: string,
    language: LanguageCode
  ) => {
    // Check if already translated for this language
    const cacheKey = `${messageId}_${language}`;
    if (messageTranslations.has(cacheKey)) {
      return; // Already translated
    }

    // Check if currently translating
    if (translatingMessages.has(messageId)) {
      return; // Already translating
    }

    // Add to translating set
    setTranslatingMessages((prev) => new Set(prev).add(messageId));

    try {
      const result = await translationService.translate(text, language);

      if (result.success && result.translatedText) {
        setMessageTranslations((prev) => {
          const newMap = new Map(prev);
          newMap.set(cacheKey, result.translatedText!);
          return newMap;
        });
      } else {
        showError(
          result.error ||
            t("chat.errors.translationFailed") ||
            "Translation failed"
        );
      }
    } catch (error) {
      console.error("Translation error:", error);
      showError(t("chat.errors.translationFailed") || "Translation failed");
    } finally {
      setTranslatingMessages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });
    }
  };

  const handleLanguageChange = (messageId: string, language: LanguageCode) => {
    setMessageTargetLanguages((prev) => {
      const newMap = new Map(prev);
      newMap.set(messageId, language);
      return newMap;
    });
  };

  const getActiveStatus = (personId: string) => {
    const presence = presenceMap.get(personId);
    if (presence) {
      return presence.is_online;
    }
    return false;
  };

  return (
    <ChatContainer>
      <ChatHeader onClick={() => navigate(`/profile/${selectedPersonId}`)}>
        <Avatar>
          {userAvatar ? (
            <img src={userAvatar} alt={userName} />
          ) : (
            userName.charAt(0)
          )}
        </Avatar>
        <UserInfo>
          <UserName>{userName}</UserName>
          <Status $isActive={getActiveStatus(selectedPersonId)}>
            {(() => {
              const presence = presenceMap.get(selectedPersonId);
              if (presence) {
                if (presence.is_online) return t("chat.status.online");
                return t("chat.status.offline");
              }
              return t("chat.status.offline");
            })()}
          </Status>
        </UserInfo>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            if (onClose) onClose();
            onViewChange("peopleSearch");
          }}
        >
          &times;
        </CloseButton>
      </ChatHeader>

      <MessagesArea onClick={() => setSelectedMessageId(null)}>
        {loading ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            {t("chat.messages.loading")}
          </div>
        ) : (
          <>
            {messages.length === 0 && (
              <div
                style={{ padding: "20px", textAlign: "center", color: "#666" }}
              >
                {t("chat.messages.noMessages")}
              </div>
            )}
            {messages.map((msg) => {
              const isStickerOnly =
                !msg.file &&
                isImageUrl(msg.content) &&
                !msg.is_deleted_for_everyone;
              return (
                <MessageBubble
                  key={msg.id}
                  $isOwn={msg.isOwn}
                  $isMediaOnly={!!msg.file && !msg.content}
                  $isStickerOnly={isStickerOnly}
                  isDeletedForEveryone={msg.is_deleted_for_everyone}
                  className={selectedMessageId === msg.id ? "selected" : ""}
                  onClick={(e) => {
                    if (msg.isOwn && !msg.is_deleted_for_everyone) {
                      e.stopPropagation();
                      setSelectedMessageId((prev) =>
                        prev === msg.id ? null : msg.id
                      );
                    }
                  }}
                >
                  {msg.isOwn && !msg.is_deleted_for_everyone && (
                    <>
                      {(() => {
                        const msgDate = msg.rawTimestamp
                          ? new Date(msg.rawTimestamp)
                          : new Date();
                        const now = new Date();
                        const diffTime = Math.abs(
                          now.getTime() - msgDate.getTime()
                        );
                        const diffDays = diffTime / (1000 * 60 * 60 * 24);

                        if (diffDays <= 7) {
                          return (
                            <DeleteButton
                              className="delete-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (msg.rawTimestamp)
                                  setDeleteModal({
                                    isOpen: true,
                                    message: msg.content,
                                    timestamp: msg.rawTimestamp,
                                    messageId: msg.id,
                                  });
                                setSelectedMessageId(null);
                              }}
                              title={t("chat.messages.deleteMessage")}
                            >
                              ×
                            </DeleteButton>
                          );
                        }
                        return null;
                      })()}
                    </>
                  )}

                  {/* Translation controls for incoming messages */}
                  {!msg.isOwn &&
                    !msg.is_deleted_for_everyone &&
                    msg.content &&
                    !isImageUrl(msg.content) && (
                      <TranslationControls onClick={(e) => e.stopPropagation()}>
                        <LanguageSelect
                          value={messageTargetLanguages.get(msg.id) || "en"}
                          onChange={(e) =>
                            handleLanguageChange(
                              msg.id,
                              e.target.value as LanguageCode
                            )
                          }
                        >
                          {Object.entries(LANGUAGE_NAMES).map(
                            ([code, name]) => (
                              <option key={code} value={code}>
                                {name}
                              </option>
                            )
                          )}
                        </LanguageSelect>
                        <TranslateButton
                          onClick={() => {
                            const lang =
                              messageTargetLanguages.get(msg.id) || "en";
                            handleTranslate(msg.id, msg.content, lang);
                          }}
                          disabled={
                            translatingMessages.has(msg.id) ||
                            !msg.content.trim()
                          }
                        >
                          {translatingMessages.has(msg.id)
                            ? "Translating..."
                            : "Translate"}
                        </TranslateButton>
                      </TranslationControls>
                    )}

                  <MessageContent $isOwn={msg.isOwn}>
                    {msg.is_deleted_for_everyone ? (
                      <span style={{ fontStyle: "italic", opacity: 0.7 }}>
                        🚫 {t("chat.messages.deleted")}
                      </span>
                    ) : isImageUrl(msg.content) ? (
                      // Display sticker/image URL as image
                      <img
                        src={msg.content}
                        alt="Sticker"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => window.open(msg.content, "_blank")}
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (
                            parent &&
                            !parent.querySelector(".fallback-text")
                          ) {
                            const fallback = document.createElement("span");
                            fallback.className = "fallback-text";
                            fallback.textContent = msg.content;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      (() => {
                        // Check if translation exists for this message
                        const selectedLang =
                          messageTargetLanguages.get(msg.id) || "en";
                        const translationKey = `${msg.id}_${selectedLang}`;
                        const translatedText =
                          messageTranslations.get(translationKey);
                        return translatedText || msg.content;
                      })()
                    )}

                    {msg.file && !msg.is_deleted_for_everyone && (
                      <div style={{ marginTop: msg.content ? "8px" : "0" }}>
                        {msg.file.type === "IMAGE" ? (
                          <img
                            src={msg.file.url}
                            alt={t("chat.messages.sharedImage")}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "300px",
                              borderRadius: "12px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setImageModal({
                                isOpen: true,
                                imageUrl: msg.file!.url,
                              })
                            }
                          />
                        ) : msg.file.type === "VIDEO" ? (
                          <video
                            src={msg.file.url}
                            controls
                            style={{
                              maxWidth: "100%",
                              maxHeight: "300px",
                              borderRadius: "12px",
                            }}
                          />
                        ) : (
                          <a
                            href={msg.file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: msg.isOwn ? "white" : "blue",
                              textDecoration: "underline",
                            }}
                          >
                            {t("chat.messages.viewAttachment")}
                          </a>
                        )}
                      </div>
                    )}

                    <MessageTime $isOwn={msg.isOwn}>
                      {msg.timestamp}
                      {msg.isOwn &&
                        msg.status === "read" &&
                        messages.filter((m) => m.isOwn).pop()?.id ===
                          msg.id && (
                          <span
                            style={{
                              marginLeft: "4px",
                              fontSize: "10px",
                              color: "#34D399",
                            }}
                          >
                            {t("chat.messages.seen")}
                          </span>
                        )}
                    </MessageTime>
                  </MessageContent>
                </MessageBubble>
              );
            })}
          </>
        )}
        <div ref={messagesEndRef} />
      </MessagesArea>

      {typingUsers.size > 0 && (
        <TypingIndicatorWrapper>
          <TypingText>
            {typingUsers.size === 1
              ? `${Array.from(typingUsers.values())[0]} ${t(
                  "chat.typing.isTyping"
                )}`
              : `${typingUsers.size} ${t("chat.typing.peopleTyping")}`}
          </TypingText>
        </TypingIndicatorWrapper>
      )}

      <InputArea>
        <InputWrapper>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*,video/*"
            onChange={handleFileSelect}
          />
          <AttachButton onClick={() => fileInputRef.current?.click()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </AttachButton>

          <div style={{ position: "relative" }}>
            <StickerButton
              ref={stickerButtonRef}
              onClick={() => setIsStickerPopupOpen(!isStickerPopupOpen)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </StickerButton>
            {isStickerPopupOpen && (
              <StickerPopup data-sticker-popup>
                {stickersLoading ? (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: "20px",
                      color: "#999",
                    }}
                  >
                    {t("chat.stickers.loading")}
                  </div>
                ) : stickers.length > 0 ? (
                  stickers.map((sticker) => (
                    <StickerItem
                      key={sticker.sticker_id}
                      onClick={() => handleStickerSelect(sticker)}
                      title={sticker.filename}
                    >
                      <img
                        src={sticker.image_url}
                        alt={sticker.filename}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </StickerItem>
                  ))
                ) : (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: "20px",
                      color: "#999",
                    }}
                  >
                    {t("chat.stickers.noStickers")}
                  </div>
                )}
              </StickerPopup>
            )}
          </div>

          <MessageInput
            placeholder={t("chat.input.placeholder")}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);

              if (currentConversationId) {
                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current);
                } else {
                  wsService.send({
                    action: "typing",
                    request_id: uuidv4(),
                    conversation_id: currentConversationId,
                    is_typing: true,
                  });
                }

                typingTimeoutRef.current = setTimeout(() => {
                  wsService.send({
                    action: "typing",
                    request_id: uuidv4(),
                    conversation_id: currentConversationId,
                    is_typing: false,
                  });
                  typingTimeoutRef.current = null;
                }, 2000);
              }
            }}
            onKeyPress={handleKeyPress}
          />
          <SendButton
            onClick={() => handleSend()}
            disabled={!newMessage.trim()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </SendButton>
        </InputWrapper>
        <div
          style={{
            textAlign: "center",
            fontSize: "10px",
            color: "#9CA3AF",
            marginTop: "4px",
          }}
        >
          {t("chat.input.pressEnterToSend")}
        </div>
      </InputArea>

      {deleteModal.isOpen && (
        <ModalOverlay
          onClick={() =>
            setDeleteModal({
              isOpen: false,
              message: null,
              timestamp: null,
              messageId: null,
            })
          }
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>{t("chat.deleteModal.title")}</ModalHeader>
            <ModalBody>{t("chat.deleteModal.message")}</ModalBody>
            <ModalMessage>{deleteModal.message}</ModalMessage>
            <ModalFooter>
              <ModalButton
                $variant="secondary"
                onClick={() =>
                  setDeleteModal({
                    isOpen: false,
                    message: null,
                    timestamp: null,
                    messageId: null,
                  })
                }
              >
                {t("chat.deleteModal.cancel")}
              </ModalButton>
              <ModalButton $variant="danger" onClick={confirmDelete}>
                {t("chat.deleteModal.delete")}
              </ModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
      {uploadModal.isOpen && (
        <ModalOverlay
          onClick={() =>
            !isUploading &&
            setUploadModal({ isOpen: false, file: null, previewUrl: null })
          }
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>{t("chat.uploadModal.title")}</ModalHeader>
            <ModalBody>
              {uploadModal.previewUrl && (
                <PreviewMedia>
                  {uploadModal.file?.type.startsWith("video/") ? (
                    <video src={uploadModal.previewUrl} controls />
                  ) : (
                    <img src={uploadModal.previewUrl} alt="Preview" />
                  )}
                </PreviewMedia>
              )}
              <div style={{ textAlign: "center" }}>
                {isUploading
                  ? t("chat.uploadModal.uploading")
                  : t("chat.uploadModal.sendFile", {
                      filename: uploadModal.file?.name,
                    })}
              </div>
            </ModalBody>
            <ModalFooter>
              <ModalButton
                $variant="secondary"
                onClick={() => {
                  if (uploadModal.previewUrl)
                    URL.revokeObjectURL(uploadModal.previewUrl);
                  setUploadModal({
                    isOpen: false,
                    file: null,
                    previewUrl: null,
                  });
                }}
                disabled={isUploading}
              >
                {t("chat.uploadModal.cancel")}
              </ModalButton>
              <ModalButton
                $variant="primary"
                onClick={handleUploadAndSend}
                disabled={isUploading}
                style={{ backgroundColor: "#8B1F1F", color: "white" }}
              >
                {isUploading
                  ? t("chat.uploadModal.sending")
                  : t("chat.uploadModal.send")}
              </ModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
      {imageModal.isOpen && imageModal.imageUrl && (
        <ImageModalOverlay
          onClick={() =>
            setImageModal({ isOpen: false, imageUrl: null })
          }
        >
          <ImageModalContent onClick={(e) => e.stopPropagation()}>
            <ImageModalCloseButton
              onClick={() =>
                setImageModal({ isOpen: false, imageUrl: null })
              }
            >
              ×
            </ImageModalCloseButton>
            <img
              src={imageModal.imageUrl}
              alt={t("chat.messages.sharedImage")}
            />
          </ImageModalContent>
        </ImageModalOverlay>
      )}
    </ChatContainer>
  );
};

export default ChatView;
