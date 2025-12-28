import { createContext } from 'react';
import { type UserProfile } from '../services/user/user.service';

export interface ProfileContextType {
  profile: UserProfile | null;
  isProfileLoading: boolean;
  refreshProfile: () => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

