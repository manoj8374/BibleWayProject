import styled from 'styled-components';

export const ProfilePageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

// Header Section
export const ProfileHeaderSection = styled.div`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 48px 24px 32px;
  position: relative;

  @media (max-width: 768px) {
    padding: 32px 16px 24px;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const ProfileImageContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3px solid #e5e7eb;
  overflow: hidden;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

export const ProfileImageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ProfileImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8B1F1F 0%, #5C1414 100%);
  color: white;
  font-weight: 600;
  font-size: 56px;

  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

export const ProfileImagePreview = styled.div<{ $imgUrl?: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url(${props => props.$imgUrl || ''});
  background-size: cover;
  background-position: center;
`;

export const ImageEditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e5e7eb;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    border-color: #8B1F1F;
    color: #8B1F1F;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const HeaderInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const UserName = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  color: #111827;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const UserEmail = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 16px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const StatButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Main Content Section
export const MainContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 24px 16px;
    gap: 20px;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 10px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 14px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
  background-color: white;
  color: #111827;

  &:focus {
    border-color: #8B1F1F;
    box-shadow: 0 0 0 3px rgba(139, 31, 31, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionButton = styled.button`
  background-color: #8B1F1F;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: #5C1414;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled(ActionButton)`
  margin-top: 8px;
`;

export const LogoutButton = styled(ActionButton)`
  background-color: #dc2626;

  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }
`;

export const FileInputLabel = styled.label`
  display: block;
  width: 100%;
  cursor: pointer;
`;

export const RemovePhotoButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 12px;
  width: 100%;

  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
`;

export const UserContentWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 10px;
  }
`;

// Dropdown Styles
export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
  background-color: white;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #111827;

  &:focus {
    border-color: #8B1F1F;
    box-shadow: 0 0 0 3px rgba(139, 31, 31, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #111827;
  font-size: 15px;

  &:hover {
    background-color: #f9fafb;
  }

  &:first-child {
    border-radius: 7px 7px 0 0;
  }

  &:last-child {
    border-radius: 0 0 7px 7px;
  }
`;

export const DropdownSearch = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px 8px 0 0;
  font-size: 14px;
  outline: none;
  background-color: #f9fafb;

  &:focus {
    background-color: white;
    border-bottom-color: #d1d5db;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SubprofilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 32px;

  @media (max-width: 768px) {
    padding: 0 8px 24px;
  }
`;
