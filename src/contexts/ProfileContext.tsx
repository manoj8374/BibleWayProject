import React, { useEffect, useState, useCallback } from 'react';
import { userService, type UserProfile } from '../services/user/user.service';
import { ProfileContext } from './ProfileContextBase';

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | undefined>(undefined);

  const refreshProfile = useCallback(async () => {
    setIsProfileLoading(true);
    try {
      const res = await userService.getUserProfile();
      if (res.success && res.data) {
        setProfile(res.data);
      } else {
        setProfile(null);
        setError(res.message);
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
      setProfile(null);
      setError('Failed to fetch profile');
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  if (isProfileLoading) {
    return <h1>.</h1>;
  }

  if (error) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: '#fff' }}>
      <h1>OOPs! Something went wrong</h1>
    </div>
  }
  
  return (
    <ProfileContext.Provider value={{ profile, isProfileLoading, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

