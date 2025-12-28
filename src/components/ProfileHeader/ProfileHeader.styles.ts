import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const HeaderBackground = styled.div`
  background: #1e3a8a;
  border-radius: 24px 24px 0px 0px;
  padding: 20px;
  position: relative;
  min-height: 280px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const ShareButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  margin: 0 auto;
  width: 100%;
`;

export const AvatarContainer = styled.div`
  margin-bottom: 16px;
`;

export const Avatar = styled.div<{ $bgColor: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  background-color: ${props => props.$bgColor || '#E74C3C'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 28px;
  }
`;

export const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const NameWithSocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const ProfileTitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: center;
`;

export const Badge = styled.div`
  background: #DC2626;
  color: white;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 24px 0 0 0;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
`;

export const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: capitalize;
  margin-top: 4px;
`;

export const SocialIconsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const SocialIcon = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ActionButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
`;

export const FollowButton = styled.button`
  padding: 10px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid white;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.9);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MessageButton = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  border: 2px solid white;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.9);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;
