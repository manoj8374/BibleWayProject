import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 576px) {
    width: 95%;
    max-height: 90vh;
  }
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  line-height: 1;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;

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
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #f0f0f0;
  flex-shrink: 0;
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  color: ${props => props.$isActive ? '#0E3965' : '#666'};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.$isActive ? '#0E3965' : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: #0E3965;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
  justify-content: space-between;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const UserAvatar = styled.div<{ $bgColor: string; $imgUrl?: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  background-image: ${props => props.$imgUrl ? `url(${props.$imgUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  border: 2px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  word-break: break-word;
`;

export const FollowButton = styled.button<{ $isFollowing: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  background-color: ${props => props.$isFollowing ? '#e5e7eb' : '#0E3965'};
  color: ${props => props.$isFollowing ? '#374151' : 'white'};

  &:hover:not(:disabled) {
    background-color: ${props => props.$isFollowing ? '#d1d5db' : '#991b1b'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 576px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

export const EmptyStateText = styled.div`
  font-size: 16px;
  color: #999;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  font-size: 16px;
  color: #666;
`;

