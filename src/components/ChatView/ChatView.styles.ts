import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  background-color: #e5e5e5;
  border-radius: 12px;
`;

export const ChatHeader = styled.div`
  flex: 0 0 auto;
  padding: 16px 24px;
  background-color: #ffefef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 60px;
  z-index: 10;
  border-radius: 12px 12px 0 0;
`;

export const UserInfo = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  flex: 1;
  margin-left: 12px;
`;

export const Avatar = styled.div<{ $bgColor?: string }>`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.$bgColor || "#E74C3C"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  overflow: hidden;
  font-size: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
`;

export const Status = styled.span<{ $isActive?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.$isActive ? "#2ECC71" : "#666")};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  &:hover {
    color: #1a1a1a;
  }
`;

export const MessagesArea = styled.div`
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: 8px;

  height: calc(100% - ${60 + 110}px);

  /* Custom Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    transition: background 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Firefox Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

export const DateSeparator = styled.div`
  align-self: center;
  background-color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const MessageBubble = styled.div<{
  $isOwn: boolean;
  $isMediaOnly?: boolean;
  $isStickerOnly?: boolean;
  isDeletedForEveryone?: boolean;
}>`
  background-color: ${(props) => {
    if (props.$isStickerOnly && !props.isDeletedForEveryone)
      return "transparent";
    if (props.$isMediaOnly && !props.isDeletedForEveryone) return "transparent";
    return props.$isOwn ? "#0E3A66" : "white";
  }};
  color: ${(props) => {
    if (props.$isStickerOnly && !props.isDeletedForEveryone) return "#1A1A1A";
    if (props.$isMediaOnly && !props.isDeletedForEveryone) return "#1A1A1A";
    return props.$isOwn ? "white" : "#1A1A1A";
  }};
  padding: ${(props) => {
    if (props.$isStickerOnly && !props.isDeletedForEveryone) return "0";
    if (props.$isMediaOnly && !props.isDeletedForEveryone) return "0";
    return "10px 14px";
  }};
  border-radius: 12px;
  border-top-left-radius: ${(props) => (props.$isOwn ? "12px" : "0")};
  border-top-right-radius: ${(props) => (props.$isOwn ? "0" : "12px")};
  box-shadow: ${(props) => {
    if (props.$isStickerOnly && !props.isDeletedForEveryone) return "none";
    if (props.$isMediaOnly && !props.isDeletedForEveryone) return "none";
    return "0 1px 2px rgba(0,0,0,0.05)";
  }};
  max-width: 70%;
  align-self: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
  display: flex;
  flex-direction: column;
  position: relative;


  &:hover .delete-btn,
  &.selected .delete-btn {
    opacity: 1;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  color: #ff4444;
  font-size: 12px;
  padding: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #fff5f5;
  }
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
`;

export const ImageModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  cursor: pointer;
`;

export const ImageModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }
`;

export const ImageModalCloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 320px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ModalHeader = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const ModalBody = styled.div`
  margin: 0 0 24px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const PreviewMedia = styled.div`
  width: 100%;
  max-height: 300px;
  background: #f3f4f6;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  img,
  video {
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
`;

export const ModalMessage = styled.p`
  margin: 0 0 24px 0;
  font-size: 14px;
  color: white;
  line-height: 1.5;
  background-color: #ff4a4aff;
  border-radius: 8px;
  padding: 8px 12px;
  text-align: center;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ModalButton = styled.button<{
  $variant?: "primary" | "danger" | "secondary";
}>`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  ${(props) => {
    switch (props.$variant) {
      case "danger":
        return `
          background-color: #DC2626;
          color: white;
          &:hover { opacity: 0.9; }
        `;
      case "secondary":
      default:
        return `
          background-color: #F3F4F6;
          color: #4B5563;
          &:hover { background-color: #E5E7EB; }
        `;
    }
  }}
`;

export const MessageContent = styled.div<{ $isOwn: boolean }>`
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
`;

export const MessageTime = styled.span<{ $isOwn: boolean }>`
  font-size: 10px;
  color: ${(props) => (props.$isOwn ? "rgba(255,255,255,0.7)" : "#999")};
  margin-top: 4px;
  display: block;
  text-align: right;
`;

export const InputArea = styled.div`
  flex: 0 0 auto;
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  z-index: 5;
`;

export const InputWrapper = styled.div`
  background: white;
  border-radius: 24px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5e5;
`;

export const MessageInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 12px;
  font-size: 14px;
  background: transparent;

  &::placeholder {
    color: #999;
  }
`;

export const AttachButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 8px;
  display: flex;
  align-items: center;

  &:hover {
    color: #666;
  }
`;

export const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #8b1f1f;
  padding: 8px;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const TypingIndicatorWrapper = styled.div`
  padding: 8px 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
`;

export const TypingText = styled.span`
  font-size: 16px;
  color: rgba(255, 0, 0, 0.55);
  font-style: italic;

  // animation: pulse 1.5s infinite;

  // @keyframes pulse {
  //   0% { opacity: 0.5; }
  //   50% { opacity: 1; }
  //   100% { opacity: 0.5; }
  // }
`;

export const StickerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 8px;
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    color: #666;
  }
`;

export const StickerPopup = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  width: 420px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  row-gap: 80px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StickerItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &:hover {
    background-color: #f3f4f6;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const TranslationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 4px 0;
`;

export const LanguageSelect = styled.select`
  padding: 4px 8px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 12px;
  background-color: white;
  color: #1a1a1a;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #999;
  }

  &:focus {
    border-color: #0e3a66;
  }
`;

export const TranslateButton = styled.button`
  padding: 4px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 12px;
  background-color: #0e3a66;
  color: white;
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: relative;
  min-width: fit-content;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 500px) {
    padding: 6px 8px;
    min-width: 36px;
    width: 36px;
    height: 36px;

    .translate-text {
      display: none;
    }

    .translate-icon {
      display: block;
    }
  }

  .translate-icon {
    display: none;
    width: 18px;
    height: 18px;
  }

  @media (min-width: 501px) {
    .translate-icon {
      display: none;
    }
  }
`;
