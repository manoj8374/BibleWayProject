import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 16px;
  padding: 24px;
  max-height: 550px;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    max-height: none;
    margin-bottom: 16px;
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;


export const PeopleList = styled.div`
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-width: none;
  padding-bottom: 24px;

  @media (max-width: 768px) {
    max-height: 400px;
    margin-top: 16px;
    padding-bottom: 16px;
  }
`;

export const ImgTag = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const PersonItem = styled.div`
  display: flex;
  cursor:pointer;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

export const PersonAvatar = styled.div<{ $bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  background-image: ${props => props.$bgColor.startsWith('http') ? `url(${props.$bgColor})` : 'none'};
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

export const PersonName = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  white-space: nowrap;
  
  text-overflow: ellipsis;
  min-width: 0;

  overflow: hidden;
`;

export const ActionButton = styled.button<{ $isJoinGroup?: boolean; $isActive?: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.$isActive ? 'transparent' : '#0E3A66'};
  border: ${props => props.$isActive ? '2px solid #0E3A66' : 'none'};
  color: ${props => props.$isActive ? '#0E3A66' : 'white'};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

`;


export const SearchWrapper = styled.div`
  width: 100%;
  padding: 2px;
  border-radius: 24px;
  background: #0E3A66;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border-radius: 22px; /* slightly smaller */
  font-size: 14px;
  outline: none;
  background: #fff;
  border: none;

  &::placeholder {
    color: #999;
  }
`;


export const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`;