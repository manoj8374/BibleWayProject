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
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
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

export const TermsCheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 16px 0;

  @media (max-width: 480px) {
    margin: 12px 0;
    gap: 8px;
  }
`;

export const TermsCheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  color: #333;

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 8px;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    min-width: 18px;
    margin-top: 2px;
    border-radius: 4px;
    border: 2px solid #181821;
    cursor: pointer;
    accent-color: #570000;
    flex-shrink: 0;

    &:checked {
      background-color: #570000;
      border-color: #570000;
    }

    &:focus {
      outline: 2px solid #570000;
      outline-offset: 2px;
    }
  }

  a {
    color: #570000;
    text-decoration: underline;
    font-weight: 600;

    &:hover {
      text-decoration: none;
    }
  }
`;

export const TermsErrorText = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;