import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: white;
  position: relative;
  height: 100%;
`;

export const Sidebar = styled.div<{ $isOpen?: boolean }>`
  width: 410px;
  flex-shrink: 0;
  background: white;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 350px;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 400px;
    z-index: 1000;
    transform: translateX(${props => props.$isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  }
`;

export const SidebarOverlay = styled.div<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${props => props.$isOpen ? 1 : 0};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
`;

export const SidebarToggleButton = styled.button<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'none' : 'flex'};
    position: fixed;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    background-color: #0e3a66;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    z-index: 998;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;

    &:hover {
      background-color: #0d3459;
      transform: translateY(-50%) scale(1.05);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    svg {
      width: 24px;
      height: 24px;
      stroke: white;
      stroke-width: 2;
      fill: none;
    }
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    right: 12px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 16px;
`;

export const SidebarHeader = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 8px;
  }
`;

export const CloseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f3f4f6;
    }

    svg {
      width: 20px;
      height: 20px;
      stroke: #181821;
    }
  }
`;

export const IconTabButton = styled.button<{ $isActive?: boolean }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  background: ${(props) => (props.$isActive ? "#334155" : "#334155")};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$isActive ? "1" : "0.6")};

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  ${(props) =>
    props.$isActive &&
    `
    box-shadow: 0 2px 8px rgba(51, 65, 85, 0.3);
  `}
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;
