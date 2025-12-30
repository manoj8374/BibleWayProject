import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ModalContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 90vh;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 95vh;
    border-radius: 8px;
  }
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  line-height: 1;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;
  
  &::after {
    content: ' *';
    color: #ef4444;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0860C4;
    box-shadow: 0 0 0 3px rgba(8, 96, 196, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    min-height: 100px;
    font-size: 14px;
    padding: 10px;
  }
`;

export const StarSelector = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StarButton = styled.button<{ $isSelected: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${props => props.$isSelected ? '#FFD700' : '#CCCCCC'};
  transition: transform 0.1s, color 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #FFD700;
  }

  &:active {
    transform: scale(1.1);
  }

  svg {
    width: 32px;
    height: 32px;

    @media (max-width: 768px) {
      width: 28px;
      height: 28px;
    }
  }
`;

export const RatingLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-left: 4px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  background-color: transparent;
  color: #666;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    border-color: #b0b0b0;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 15px;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  background-color: #0860C4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0651a8;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 15px;
  }
`;

