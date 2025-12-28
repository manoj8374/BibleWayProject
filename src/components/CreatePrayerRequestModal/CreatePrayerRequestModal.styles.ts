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
`;

export const ModalContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 650px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow:hidden;
  max-height: 90vh; /* Prevent it from being taller than screen */
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
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
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

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto; /* Allow scrolling if content is too long */
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
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #570000;
  }

  &::placeholder {
    color: #999;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #570000;
  }

  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #570000;
  }
`;

export const UploadArea = styled.div`
  border: 2px dashed #d0d0d0;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: all 0.2s;
  min-height: 180px;

  &:hover {
    background-color: #f0f0f0;
    border-color: #b0b0b0;
  }
`;

export const UploadIcon = styled.div`
  margin-bottom: 12px;
  color: #888;
  
  svg {
    width: 48px;
    height: 48px;
  }
`;

export const UploadText = styled.p`
  color: #666;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  width: 100%;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #f9f9f9;
  padding: 10px 14px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 14px;
`;

export const FileRemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

export const AddMoreButton = styled.button`
  background: none;
  border: 1px dashed #570000;
  color: #570000;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #fff5f5;
  }
`;



export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #570000;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 13px;
  color: #666;
  cursor: pointer;

  a {
    color: #570000;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #0E3A66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;
  flex-shrink: 0;

  &:hover {
    background-color: #0E3A66;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


