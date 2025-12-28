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
  overflow-y: auto;
  padding: 24px;
`;

export const ModalContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow:hidden;
  animation: slideIn 0.3s ease-out;
  margin: auto;

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
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #8B1F1F;
    box-shadow: 0 0 0 3px rgba(139, 31, 31, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #8B1F1F;
    box-shadow: 0 0 0 3px rgba(139, 31, 31, 0.1);
  }
`;

export const FileInput = styled.input`
  padding: 10px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f9fafb;
    border-color: #8B1F1F;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #8B1F1F;
    box-shadow: 0 0 0 3px rgba(139, 31, 31, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const SubmitButton = styled.button`
  flex: 1;
  background: #8B1F1F;
  color: white;
  padding: 14px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e8e8e8;
  }
`;

export const FilePreview = styled.div`
  margin-top: 8px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

