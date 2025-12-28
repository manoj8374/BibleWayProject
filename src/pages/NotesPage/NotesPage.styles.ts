import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #f9f9f9;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f9f9f9;
  position: relative;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Sidebar = styled.div<{ $isOpen?: boolean }>`
  width: 410px;
  flex-shrink: 0;
  background: white;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 350px;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 400px;
    z-index: 1000;
    transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
    transition: transform 0.3s ease-in-out;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  }

  /* On desktop, always visible when rendered */
  @media (min-width: 769px) {
    transform: none !important;
  }
`;

export const SidebarOverlay = styled.div<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
`;

export const SidebarToggleButton = styled.button<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? "none" : "flex")};
    position: fixed;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    background-color: #0e3a66;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    z-index: 998;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;

    &:hover {
      background-color: #0d3459;
      transform: translateY(-50%) scale(1.05);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    svg {
      width: 24px;
      height: 24px;
      stroke: white;
      stroke-width: 2;
      fill: none;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const BooksList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const BookItem = styled.div<{ $isSelected?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 2px solid ${(props) => (props.$isSelected ? "#0e3a66" : "#e5e7eb")};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    border-color: #0e3a66;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const BookName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const BookInfo = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const SidebarTitle = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #f3f4f6;
    color: #1a1a1a;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ChaptersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const ChapterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ChapterName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0e3a66;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoteCard = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 14px;
  }
`;

export const NoteContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #374151;
  margin: 0 0 12px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  line-height: 1.6;
  color: #374151;
  resize: vertical;
  margin-bottom: 12px;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #0e3a66;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const NoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
`;

export const NoteDate = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;

  span {
    color: #9ca3af;
  }
`;

export const NoteActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const EditButton = styled.button`
  padding: 6px 12px;
  background-color: #0e3a66;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0a2d4d;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

export const SaveButton = styled.button`
  padding: 6px 12px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #059669;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

export const CancelButton = styled.button`
  padding: 6px 12px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #4b5563;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

export const EmptyStateText = styled.div`
  font-size: 18px;
  color: #6b7280;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  font-size: 16px;
  color: #6b7280;
`;
