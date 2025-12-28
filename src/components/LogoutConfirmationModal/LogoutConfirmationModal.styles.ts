import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  
  @media (max-width: 480px) {
    padding: 24px;
    max-width: 95%;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const ModalDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 28px;
  text-align: center;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 24px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  
  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;

  &:hover:not(:disabled) {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 14px;
  }
`;

export const ConfirmButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(to right, #EF4444, #DC2626);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 14px;
  }
`;

