import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: #1a1a1a;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #8B1F1F;
  }
`;

export const Button = styled.button`
  background: linear-gradient(to right, #8B1F1F, #5C1414);
  color: white;
  padding: 14px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const GoogleButton = styled(Button)`
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;

  &:hover {
    background-color: #f9fafb;
    opacity: 1;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #6B7280;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

export const ErrorMessage = styled.div`
  background-color: #FEF2F2;
  color: #991B1B;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

export const SuccessMessage = styled.div`
  background-color: #F0FDF4;
  color: #166534;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  color: #8B1F1F;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
