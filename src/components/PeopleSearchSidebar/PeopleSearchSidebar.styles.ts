import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  background: #f6f6f6;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
`;

export const SidebarTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  padding: 24px 20px 16px 20px;
  margin: 0;
`;

export const SearchWrapper = styled.div`
  position: relative;
  padding: 0 20px 16px 20px;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 32px;
  top: 35%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 16px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  outline: none;
  border-radius: 20px;
  transition: border-color 0.2s ease;
  border: 1px solid black;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const InboxContainer = styled.div`
  padding: 16px;
`;

export const PeopleList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;

    &:hover {
      background: #9ca3af;
    }
  }

  /* Firefox Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;

  @media (max-width: 768px) {
    padding: 0px 16px;
  }
`;

export const PersonCard = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.$isSelected ? "#C7C7CC" : "transparent"};

  &:last-child {
    border-bottom: none;
  }
`;

export const PersonAvatar = styled.div<{ $bgColor: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.$bgColor};
  background-image: ${(props) =>
    props.$bgColor.startsWith("http") ? `url(${props.$bgColor})` : "none"};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
`;

export const PersonInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PersonName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  white-space: nowrap;

  text-overflow: ellipsis;
`;

export const MessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const StatusBadge = styled.div<{ $isOnline: boolean }>`
  padding: 5px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  background-color: #bb2528;
  color: white;
  border: 1px solid #bb2528;
`;
