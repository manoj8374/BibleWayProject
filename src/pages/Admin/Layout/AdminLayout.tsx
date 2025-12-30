
import { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/auth/auth.service';
import LogoutConfirmationModal from '../../../components/LogoutConfirmationModal/LogoutConfirmationModal';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Inter', sans-serif;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: 260px;
  background-color: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 4px 0 24px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    width: 280px;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.h2`
  color: #fff;
  margin-bottom: 48px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    color: #8B1F1F;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 32px;
  }
`;

const NavItem = styled(NavLink)`
  padding: 14px 16px;
  color: #a0a0a0;
  text-decoration: none;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background-color: rgba(255,255,255,0.05);
    color: #fff;
    transform: translateX(4px);
  }

  &.active {
    background-color: #8B1F1F;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 16px;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 40px;
  overflow-y: auto;

  @media (max-width: 1024px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    padding-top: 60px;
  }
`;

const LogoutBtn = styled.button`
  margin-top: auto;
  padding: 14px;
  background: transparent;
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;

  &:hover {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
  }
`;

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authService.logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <Container>
            <MenuButton onClick={toggleMenu}>
                {isMenuOpen ? '✕' : '☰'}
            </MenuButton>
            <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
            <Sidebar $isOpen={isMenuOpen}>
                <Logo>BibleWay <span>Admin</span></Logo>
                <NavItem to="/admin/dashboard" end onClick={closeMenu}>Dashboard</NavItem>
                <NavItem to="/admin/create-verse" onClick={closeMenu}>Daily Verse</NavItem>
                <NavItem to="/admin/books" onClick={closeMenu}>Books</NavItem>
                <NavItem to="/admin/testimonials" onClick={closeMenu}>Testimonials</NavItem>
                <NavItem to="/admin/promotions" onClick={closeMenu}>Promotions</NavItem>
                <NavItem to="/admin/chapter-feedbacks" onClick={closeMenu}>Chapter Feedbacks</NavItem>

                <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </Sidebar>
            <Content>
                <Outlet />
            </Content>
            
            <LogoutConfirmationModal
                isOpen={showLogoutModal}
                onConfirm={confirmLogout}
                onCancel={() => setShowLogoutModal(false)}
                loading={isLoggingOut}
            />
        </Container>
    );
};

export default AdminLayout;
