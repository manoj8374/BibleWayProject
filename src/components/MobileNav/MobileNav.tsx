import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiHome, HiUserGroup, HiUserCircle } from 'react-icons/hi';
import { MdNote, MdBookmark } from 'react-icons/md';
import {
  MobileNavContainer,
  NavItem,
  IconWrapper
} from './MobileNav.styles';

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active tab from location pathname
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/people') return 'people';
    if (path === '/segregated-bibles') return 'reading';
    if (path === '/profile') return 'profile';
    if (path === '/notes') return 'notes';
    if (path === '/bookmarks') return 'bookmarks';
    return 'home';
  };

  const activeTab = getActiveTab();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Icon colors based on active state
  const activeIconColor = '#f2f2f7'; // Light/white for active
  const inactiveIconColor = '#0e3a66'; // Dark blue for inactive

  return (
    <MobileNavContainer>
      <NavItem onClick={() => handleNavigation('/home')}>
        <IconWrapper isActive={activeTab === 'home'}>
          <HiHome 
            size={24} 
            color={activeTab === 'home' ? activeIconColor : inactiveIconColor}
          />
        </IconWrapper>
      </NavItem>
      
      <NavItem onClick={() => handleNavigation('/people')}>
        <IconWrapper isActive={activeTab === 'people'}>
          <HiUserGroup 
            size={24} 
            color={activeTab === 'people' ? activeIconColor : inactiveIconColor}
          />
        </IconWrapper>
      </NavItem>
      
      <NavItem onClick={() => handleNavigation('/bookmarks')}>
        <IconWrapper isActive={activeTab === 'bookmarks'}>
          <MdBookmark 
            size={24} 
            color={activeTab === 'bookmarks' ? activeIconColor : inactiveIconColor}
          />
        </IconWrapper>
      </NavItem>
      
      <NavItem onClick={() => handleNavigation('/notes')}>
        <IconWrapper isActive={activeTab === 'notes'}>
          <MdNote 
            size={24} 
            color={activeTab === 'notes' ? activeIconColor : inactiveIconColor}
          />
        </IconWrapper>
      </NavItem>
      
      <NavItem onClick={() => handleNavigation('/profile')}>
        <IconWrapper isActive={activeTab === 'profile'}>
          <HiUserCircle 
            size={24} 
            color={activeTab === 'profile' ? activeIconColor : inactiveIconColor}
          />
        </IconWrapper>
      </NavItem>
    </MobileNavContainer>
  );
};

export default MobileNav;
