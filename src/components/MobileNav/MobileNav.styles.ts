import styled from "styled-components";

export const MobileNavContainer = styled.nav`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  z-index: 9999;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
`;

export const IconWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${(props) => (props.isActive ? "#0e3a66" : "transparent")};
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    background: ${(props) =>
      props.isActive ? "#0e3a66" : "rgba(14, 58, 102, 0.1)"};
  }
`;
