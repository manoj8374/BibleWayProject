import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 24px 16px;
    gap: 32px;
  }

  h1 {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;
