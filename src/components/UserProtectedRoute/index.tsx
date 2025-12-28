import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContextBase';
import { useI18n } from '../../i18n';

const UserProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(ProfileContext);
    const { t } = useI18n();

    if (context === undefined) {
        throw new Error('UserProtectedRoute must be used within a ProfileProvider');
    }

    const { profile, isProfileLoading } = context;

    if (isProfileLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: '#fff' }}>
                {t('userProtectedRoute.loading')}
            </div>
        );
    }

    // If user is an admin, redirect to admin dashboard
    if (profile?.is_admin) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
};

export default UserProtectedRoute;
