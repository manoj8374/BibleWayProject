import styled from 'styled-components';

export const ToolbarContainer = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 8px;
  display: flex;
  gap: 8px;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: white;
    transform: translateX(-50%) rotate(45deg);
  }
`;

export const ColorButton = styled.button<{ $color: string; $isActive?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid ${props => props.$isActive ? '#2c4057' : 'transparent'};
  background: ${props => props.$color};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }

  ${props => props.$isActive && `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${props.$color === '#FFD700' || props.$color === '#FFE5B4' ? '#1a1a1a' : 'white'};
      font-size: 18px;
      font-weight: bold;
    }
  `}
`;

export const RemoveButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #fee;
    border-color: #ef4444;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6b7280;
  }

  &:hover svg {
    color: #ef4444;
  }
`;

export const FloatingActionButtons = styled.div`
  position: fixed;
  right: 440px;
  top: 20%;
  left: 58%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 999;

  @media (max-width: 1024px) {
    right: 370px;
  }

  @media (max-width: 768px) {
    right: 20px;
  }
`;

export const ActionButton = styled.button<{ $isActive?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#2c4057' : '#2c4057'};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(44, 64, 87, 0.3);
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(44, 64, 87, 0.4);
    background: #1f2d3d;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export const Tooltip = styled.div<{ $show: boolean }>`
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: #2c4057;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1001;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: #2c4057;
  }
`;

export const HighlightableText = styled.span<{ $highlightColor?: string }>`
  background: ${props => props.$highlightColor || 'transparent'};
  padding: ${props => props.$highlightColor ? '2px 0' : '0'};
  border-radius: 2px;
  transition: background 0.2s;
  cursor: text;
`;

