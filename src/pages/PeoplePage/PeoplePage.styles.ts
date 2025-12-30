import styled from "styled-components";
import { HEADER_HEIGHT } from "../../constants/UI";
import { MOBILE_NAVBAR_HEIGHT } from "../../constants/UI";

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const EmptyStateTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

export const EmptyStateDescription = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

export const PeopleSearchWrapper = styled.div<{ $shouldShow: boolean }>`
  width: 350px;
  min-width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    max-width: none;
    display: ${(props) => (props.$shouldShow ? "flex" : "none")};
  }
`;

export const ChatOrProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export const ChatViewWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
