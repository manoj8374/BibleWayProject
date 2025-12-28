import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { userService, type UserProfile } from '../services/user/user.service';
import { authService } from '../services/auth/auth.service';
import { webSocketService } from '../services/websocket/websocket.service';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await userService.getUserProfile();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('access_token');
    }
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('access_token');
    
    if (token) {
      await fetchUserProfile();
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  }, [fetchUserProfile]);

  const login = async (token: string) => {
    localStorage.setItem('access_token', token);
    await fetchUserProfile();
  };

  const logout = async () => {
    await authService.logout();
    // Disconnect WebSocket when logging out
    webSocketService.disconnect();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Initialize auth check on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');
      
      if (token) {
        await fetchUserProfile();
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };
    
    initializeAuth();
  }, [fetchUserProfile]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    fetchUserProfile,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

