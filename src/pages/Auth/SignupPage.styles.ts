import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignupContainer = styled.div`
  min-height: 100vh;
  background-color: #f1eee3;
  position: relative;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BackgroundContainer = styled.div`
  display: none;
  position: absolute;
  inset: 0;

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
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 16px;
  padding-bottom: 40px;
  padding: 20px 0 10px 0;
  width: 100%;

  @media (min-width: 480px) {
    padding: 100px 0 40px 0;
  }

  @media (min-width: 1024px) {
    padding: 32px;
    justify-content: center;
  }
`;
export const MobileLogoImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  padding: 10px 16px;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  @media (max-width: 780px) {
    max-width: 50%;
  }
`;
export const MobileLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const MobileSignUpContainer = styled.div`
  width: 100%;
  max-width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  padding: 0 16px;

  @media (min-width: 480px) {
    max-width: 400px;
    padding: 0;
  }

  @media (min-width: 768px) {
    max-width: 450px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
export const FormWrapper = styled.form`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
  margin: 0 auto;

  @media (min-width: 480px) {
    max-width: 400px;
    padding: 0;
  }

  @media (min-width: 768px) {
    max-width: 450px;
  }

  @media (min-width: 1024px) {
    max-width: 400px;
    margin-left: auto;
    margin-right: 10%;
  }

  @media (max-width: 512px) {
    width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #181821;
  margin: 0;

  @media (min-width: 480px) {
    font-size: 28px;
  }

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (min-width: 1024px) {
    font-size: 30px;
  }
`;

export const GoogleButton = styled.button`
  background: white;
  height: 48px;
  border-radius: 10px;
  border: 2px solid #181821;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  font-weight: 600;
  color: #181821;

  @media (min-width: 480px) {
    height: 50px;
    font-size: 15px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }

  &:hover {
    background-color: #f9fafb;
  }

  svg {
    width: 18px;
    height: 18px;

    @media (min-width: 480px) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const DividerContainer = styled.div`
  position: relative;
  height: 21px;
  display: flex;
  align-items: center;
  opacity: 0.5;
  margin: 8px 0;
`;

export const DividerLine = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    width: 100%;
    border-top: 1px solid #181821;
  }
`;

export const DividerText = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 5px;
  background-color: #f1eee3;
  font-size: 12px;
  color: #181821;

  @media (min-width: 480px) {
    font-size: 13px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    background-color: white;
    font-size: 14px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    height: 48px;
    padding: 12px 16px;
    padding-top: 12px;
    padding-bottom: 4px;
    border-radius: 10px;
    border: 2px solid #181821;
    background: white;
    color: #181821;
    outline: none;
    font-size: 15px;
    transition: border-color 0.2s;

    @media (min-width: 480px) {
      height: 50px;
      font-size: 16px;
    }

    &:focus {
      border-color: #0e3a66;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 4px;
      font-size: 11px;

      @media (min-width: 480px) {
        font-size: 12px;
      }
    }

    &::placeholder {
      color: transparent;
    }
  }
`;

export const FloatingLabel = styled.label<{ $hasValue: boolean }>`
  position: absolute;
  left: 12px;
  top: ${(props) => (props.$hasValue ? "4px" : "50%")};
  transform: ${(props) => (props.$hasValue ? "none" : "translateY(-50%)")};
  font-size: ${(props) => (props.$hasValue ? "11px" : "15px")};
  color: #181821;
  background-color: white;
  padding: 0 5px;
  pointer-events: none;
  transition: all 0.2s;

  @media (min-width: 480px) {
    font-size: ${(props) => (props.$hasValue ? "12px" : "16px")};
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid #181821;
  background: white;
  color: #181821;
  outline: none;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.2s;

  @media (min-width: 480px) {
    height: 50px;
    font-size: 16px;
  }

  &:focus,
  &:hover {
    border-color: #0e3a66;
  }

  span {
    display: flex;
    align-items: center;
    flex: 1;
    text-align: left;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  overflow: hidden;
  z-index: 1000;
  max-height: 300px;
  display: flex;
  flex-direction: column;
`;

export const DropdownSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 13px;
  outline: none;
  background-color: #f9f9f9;

  @media (min-width: 480px) {
    font-size: 14px;
  }

  &::placeholder {
    color: #999;
  }

  &:focus {
    background-color: #fff;
  }
`;

export const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  background-color: ${(props) =>
    props.$isSelected ? "#f0f0f0" : "transparent"};
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (min-width: 480px) {
    font-size: 14px;
  }

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#e8e8e8" : "#f5f5f5")};
  }
`;

export const DropdownItemsContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding: 4px 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const SignupButton = styled.button`
  background-color: #0e3a66;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
  font-weight: 600;
  color: white;

  @media (min-width: 480px) {
    height: 50px;
    font-size: 18px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }

  &:hover {
    background-color: #0d3459;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  color: #181821;
  text-align: center;
  font-size: 14px;
  margin: 0;

  @media (min-width: 480px) {
    font-size: 15px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const FooterLink = styled(Link)`
  color: #0e3a66;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    text-decoration: none;
  }
`;

export const TermsCheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 16px 0;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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