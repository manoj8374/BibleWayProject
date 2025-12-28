import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiHome, HiUserGroup, HiBookmark } from 'react-icons/hi';
import { MdCloudDownload, MdNote } from 'react-icons/md';
import { SidebarContainer, IconWrapper } from './Sidebar.styles';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const isHome = path.startsWith('/home');
  const isPeople = path.startsWith('/people');
  const isDownloads = path.startsWith('/downloads');
  const isBookmarks = path.startsWith('/bookmarks');
  const isNotes = path.startsWith('/notes');
  
  // Icon colors based on active state
  const activeIconColor = '#f2f2f7'; // Light/white for active
  const inactiveIconColor = '#0e3a66'; // Dark blue for inactive

  return (
    <SidebarContainer>
      <IconWrapper isActive={isHome} onClick={() => navigate('/home')}>
        <HiHome 
          size={30} 
          color={isHome ? activeIconColor : inactiveIconColor}
        />
      </IconWrapper>
      <IconWrapper isActive={isPeople} onClick={() => navigate('/people')}>
        <HiUserGroup 
          size={30} 
          color={isPeople ? activeIconColor : inactiveIconColor}
        />
      </IconWrapper>
      <IconWrapper isActive={isDownloads} onClick={() => navigate('/downloads')}>
        <MdCloudDownload 
          size={30} 
          color={isDownloads ? activeIconColor : inactiveIconColor}
        />
      </IconWrapper>
      <IconWrapper isActive={isBookmarks} onClick={() => navigate('/bookmarks')}>
        <HiBookmark 
          size={30} 
          color={isBookmarks ? activeIconColor : inactiveIconColor}
        />
      </IconWrapper>
      <IconWrapper isActive={isNotes} onClick={() => navigate('/notes')}>
        <MdNote 
          size={30} 
          color={isNotes ? activeIconColor : inactiveIconColor}
        />
      </IconWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
