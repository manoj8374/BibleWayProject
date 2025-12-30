import styled from "styled-components";

const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
};

export const CenterContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
export const PrayerRequestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;
export const ContentCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  width: 65%;
  max-width: 1200px;
  height: 100%;
  overflow-y: auto;

  @media (max-width: ${breakpoints.tablet}) {
    flex: 0 0 100%;
  }
`;

export const MainContentWrapper = styled.main`
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    max-width: 98%;
  }
`;
export const CreatePrayerRequestButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  color: white;
  background: #0e3a66;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-left: 24px;
  margin: 10px 0px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;
// Right Panel Wrapper
export const RightPanelWrapper = styled.aside`
  width: 35%;
  max-width: 500px;
  border-left: 1px solid #e0e0e0;
  align-self: flex-start;
  padding: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

// Categories Wrapper for mobile tab
export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
  }

  > * {
    width: 100%;
  }
`;

// Floating Add Post Button for mobile
export const FloatingAddPostButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0e3a66;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9998;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 1025px) {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;