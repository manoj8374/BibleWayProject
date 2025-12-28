import styled from "styled-components";

export const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1200px",
};

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const HeaderWrapper = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex: 1;
  padding-bottom: 60px;

  @media (min-width: 1025px) {
    padding-bottom: 0;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  z-index: 10;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const IconWrapper = styled.div<{ isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isActive && "linear-gradient(#570000 50%, #0860C4 100%)"};
  width: 50px;
  height: 50px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
  margin-bottom: 48px;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ContentArea = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  margin-left: 80px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-left: 0;
  }
`;

export const CenterContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const ContentCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  flex: 0 0 65%;
  width: 100%;
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
  }
`;

// Right Panel Wrapper
export const RightPanelWrapper = styled.aside`
  flex: 0 0 35%;
  max-width: 500px;
  border-left: 1px solid #e0e0e0;
  position: sticky;
  top: 60px;
  align-self: flex-start;
  padding: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
