import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileViewer from '../../components/ProfileViewer/ProfileViewer';
import { useI18n } from '../../i18n/hooks';

const PageWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  overflow-y:scroll;

  justify-content: center;
  align-items: flex-start;

  @media (max-width: 968px) {
    padding: 10px;
  }
`;

const UserProfilePage: React.FC = () => {
  const { t } = useI18n();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    // If there's a previous page in history, go back, otherwise go to people page
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/people');
    }
  };

  if (!userId) {
    return (
      <PageWrapper>
        <div style={{ padding: '40px', textAlign: 'center', color: '#888', width: '100%' }}>
          {t('pages.userProfilePage.invalidUserId')}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ProfileViewer
        userId={userId}
        onBack={handleBack}
      />
    </PageWrapper>
  );
};

export default UserProfilePage;

