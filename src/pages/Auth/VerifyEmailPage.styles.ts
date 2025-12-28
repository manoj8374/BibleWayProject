import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const VerifyEmailContainer = styled.div`
  min-height: 100vh;
  background-color: #f1eee3;
  position: relative;
  overflow: hidden;
`;

export const BackgroundContainer = styled.div`
  display: none;
  position: absolute;
  inset: 0;
  overflow: hidden;

  @media (min-width: 1024px) {
    display: block;
  }
`;

export const BookImage = styled.div`
  position: absolute;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Book1 = styled(BookImage)`
  left: 37%;
  top: 41%;
  width: 315px;
  height: 473px;
  transform: rotate(15deg);

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Book2 = styled(BookImage)`
  left: 0;
  top: 36%;
  width: 450px;
  height: 659px;
  transform: rotate(-15deg);

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Book3 = styled(BookImage)`
  left: 16%;
  bottom: 1%;
  width: 558px;
  height: 817px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.5);

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const CurvedBackground = styled.div`
  position: absolute;
  left: 21%;
  inset: 0;
  right: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 242px;
  height: 74px;
  border-radius: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const MobileLogoContainer = styled.div`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 56px;
  border-radius: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 1024px) {
    padding: 32px;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 1024px) {
    margin-left: auto;
    margin-right: 10%;
  }
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #181821;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #181821;
  margin: 0;
  line-height: 1.5;
`;

export const EmailDisplay = styled.div`
  font-size: 16px;
  color: #181821;
  font-weight: 600;
  text-align: center;
  padding: 12px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #181821;
`;

export const OTPInputContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
`;

export const OTPInput = styled.input`
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  border-radius: 10px;
  border: 2px solid #181821;
  background: white;
  color: #181821;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0e3a66;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const VerifyButton = styled.button`
  background-color: #0e3a66;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 20px;
  font-weight: 600;
  color: white;

  &:hover {
    background-color: #0d3459;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ResendLink = styled.button`
  background: none;
  border: none;
  color: #0e3a66;
  text-decoration: underline;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin: 0 auto;

  &:hover {
    text-decoration: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BackLink = styled(Link)`
  color: #0e3a66;
  text-decoration: underline;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  margin-top: 8px;

  &:hover {
    text-decoration: none;
  }
`;

export const FooterText = styled.p`
  color: #181821;
  text-align: center;
  font-size: 16px;
  margin: 0;
`;

export const FooterLink = styled(Link)`
  color: #0e3a66;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    text-decoration: none;
  }
`;

