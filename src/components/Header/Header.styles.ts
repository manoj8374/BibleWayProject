import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants/UI';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px;
  height: ${HEADER_HEIGHT}px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  margin-left: 12px;
  gap: 24px;
  position: relative;

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 12px 16px;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 12px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;

  @media (max-width: 768px) {
    flex: 1;
    gap: 12px;
    min-width: 0;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  flex-shrink: 0;
  
  img {
    height: 32px;
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    img {
      height: 28px;
      margin-right: 0;
    }
    font-size: 16px;
  }
`;


export const SearchWrapper = styled.div`
  display: none;
  flex: 1;
  max-width: 500px;
  position: relative;
  margin-left: 24px;

  @media (min-width: 1025px) {
    display: flex;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 44px;
  border-radius: 24px;
  border: 1px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(90deg, #570000 40%, #0860C4 100%) border-box;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  color: #333;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: transparent;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  pointer-events: none;
`;

export const FilterDropdownsContainer = styled.div`
  display: none;
  align-items: center;
  gap: 12px;
  margin-right: 12px;

  @media (min-width: 1025px) {
    display: flex;
  }
`;

export const MobileFilterDropdownsContainer = styled.div`
  display: none;
  align-items: center;
  gap: 8px;
  margin-right: 8px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const FilterDropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 150px;
`;

export const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #555;
  margin-bottom: 4px;
  display: block;

  @media (max-width: 1024px) {
    font-size: 11px;
    margin-bottom: 2px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    margin-bottom: 2px;
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  padding-right: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: white;
  cursor: pointer;
  color: #333;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: border-color 0.2s;

  &:hover {
    border-color: #999;
  }

  &:focus {
    border-color: #570000;
  }

  @media (max-width: 1024px) {
    padding: 8px 10px;
    padding-right: 32px;
    font-size: 12px;
    background-position: right 8px center;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    padding-right: 28px;
    font-size: 11px;
  }
`;

export const SearchResultsPopup = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 4px;
`;

export const SearchResultItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const SearchResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SearchResultTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #1a1a1a;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SearchResultSnippet = styled.div`
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
  
  mark {
    background-color: #ffeb3b;
    color: #1a1a1a;
    padding: 1px 2px;
    font-weight: 500;
    border-radius: 2px;
  }
`;

export const SearchResultArrow = styled.div`
  flex-shrink: 0;
  margin-left: 12px;
  color: #1a1a1a;
  display: flex;
  align-items: center;
`;

export const SearchLoadingState = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
`;

export const SearchEmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;

  &:focus {
    border-color: #570000;
  }

  option {
    padding: 8px;
  }
`;

export const SearchIconButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (min-width: 1025px) {
    display: none;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export const SearchHeaderContainer = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  z-index: 99;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: none;

  @media (max-width: 1024px) {
    display: block;
    padding: 12px 16px;
    top: ${HEADER_HEIGHT}px;
  }
`;

export const SearchHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  gap: 12px;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
  padding: 2px;
  border-radius: 12px;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(90deg, #570000 40%, #0860C4 100%) border-box;
  border: 1px solid transparent;
  position: relative;
`;

export const SearchHeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  margin-left: 14px;
  flex-shrink: 0;
`;

export const SearchHeaderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  margin-left: 14px;
  flex-shrink: 0;
`;

export const SearchHeaderInput = styled.input`
  flex: 1;
  padding: 10px 16px 10px 0;
  border-radius: 22px;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: none;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 8px 12px 8px 0;
    font-size: 13px;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  margin-right: 8px;
  flex-shrink: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const AddPostButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  color: white;
  background-color: #0E3A66;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-left: 24px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    padding: 10px 16px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const LanguageSelector = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  border-color: linear-gradient(#570000 50%, #0860C4 100%);
  background-color: transparent;

  &:hover {
    background-color: #ebebeb;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

export const LanguageDropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 1000;
  min-width: 280px;
  max-width: 320px;

  @media (max-width: 768px) {
    right: -20px;
    min-width: 260px;
  }
`;

export const LanguageDropdown = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  overflow: hidden;
  max-height: 400px;
  display: flex;
  flex-direction: column;
`;

export const LanguageSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  outline: none;
  background-color: #f9f9f9;

  &::placeholder {
    color: #999;
  }

  &:focus {
    background-color: #fff;
  }
`;

export const LanguageList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 4px 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const LanguageItem = styled.div<{ $isSelected: boolean }>`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  background-color: ${props => props.$isSelected ? '#f0f0f0' : 'transparent'};
  transition: background-color 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${props => props.$isSelected ? '#e8e8e8' : '#f5f5f5'};
  }
`;

export const NotificationIcon = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 20px;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background-color: #e74c3c;
  color: white;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-sizing: border-box;
`;

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 24px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  @media (min-width: 1020px) and (max-width: 1330px) {
    display: none;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;
