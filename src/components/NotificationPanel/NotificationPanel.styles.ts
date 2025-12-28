import styled from 'styled-components';

export const PanelOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 998;
`;

export const PanelContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 24px;
  width: 400px;
  max-height: calc(100vh - 100px);
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: calc(100vw - 48px);
    right: 24px;
    left: 24px;
    max-height: calc(100vh - 120px);
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
`;

export const PanelTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  color: #0860C4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e8f4fd;
  }
`;

export const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 200px;
  max-height: calc(100vh - 180px);
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #999;

  div {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 14px;
    color: #bbb;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
  font-size: 14px;
`;

