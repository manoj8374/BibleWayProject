import React from "react";
import {
  LayoutContainer,
  HeaderWrapper,
  SidebarWrapper,
  Wrapper,
  ContentArea,
} from "./Layout.styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MobileNav from "../MobileNav/MobileNav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Wrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
        <ContentArea>{children}</ContentArea>
      </Wrapper>
      <MobileNav />
    </LayoutContainer>
  );
};

export default Layout;
