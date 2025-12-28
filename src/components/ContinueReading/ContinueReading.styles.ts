import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 40px;
  overflow-x: hidden;
  overflow-y: visible;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
  display: block;
  visibility: visible;
  opacity: 1;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  overflow-x: hidden;
  overflow-y: visible;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Card = styled.div`
  display: flex;
  gap: 16px;
  border-radius: 12px;
  padding: 16px;
  flex: 1 1 calc(50% - 12px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: visible;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    min-width: 0;
  }
`;

export const BookImage = styled.img`
  width: 120px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  min-width: 0;
  gap: 8px;
`;

export const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #610000;
  margin-bottom: 8px;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const BookDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  display: block;
  visibility: visible;
  opacity: 1;
  min-height: auto;
  flex-shrink: 1;
  white-space: normal;
  max-width: 100%;
`;

export const ContinueButton = styled.button`
  padding: 10px 20px;
  background: #0e3a66;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
