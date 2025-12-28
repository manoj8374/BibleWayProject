import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContextBase';
import { useI18n } from '../../i18n';

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { t } = useI18n();
    const context = useContext(ProfileContext);

    if (context === undefined) {
        throw new Error(t('admin.error.mustBeInProfileProvider'));
    }

    const { profile, isProfileLoading } = context;

    if (isProfileLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: '#fff' }}>
                {t('admin.loading')}
            </div>
        );
    }

    if (!profile || !profile.is_admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};

export default AdminProtectedRoute;
