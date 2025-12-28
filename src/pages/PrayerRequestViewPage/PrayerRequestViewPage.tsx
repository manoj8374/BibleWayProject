import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PrayerRequestPost from '../../components/PrayerRequestPost/PrayerRequestPost';
import { prayerPostService } from '../../services/prayerPost/post.service';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n';
import ShareDialog from '../../components/ShareDialog/ShareDialog';
import { getShareUrl, getShareTitle } from '../../utils/share';
import { MainContentWrapper } from '../../components/Layout/Layout.styles';

interface PrayerRequest {
  prayer_request_id: string;
  user?: {
    user_id: string;
    user_name: string;
    profile_picture_url?: string;
  };
  name?: string;
  email?: string;
  phone?: string;
  description: string;
  likes_count?: number;
  reactions_count?: number;
  comments_count: number;
  shares_count?: number;
  is_liked?: boolean;
}

const PrayerRequestViewPage: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [prayerRequest, setPrayerRequest] = useState<PrayerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    const fetchPrayerRequest = async () => {
      if (!requestId) {
        showError(t('pages.prayerRequestViewPage.invalidRequestId'));
        navigate('/home');
        return;
      }

      setLoading(true);
      try {
        // Fetch all prayer requests and find the one with matching ID
        // Note: Ideally, there should be a GET /prayer-request/:requestId endpoint
        const response = await prayerPostService.getAllPrayerRequests(100, 0);
        if (response.success) {
          const foundRequest = response.data.find(
            (pr: any) => pr.prayer_request_id === requestId
          );
          if (foundRequest) {
            setPrayerRequest(foundRequest);
          } else {
            showError(t('pages.prayerRequestViewPage.requestNotFound'));
            navigate('/home');
          }
        } else {
          showError(response.message || t('pages.prayerRequestViewPage.failedToLoadRequest'));
          navigate('/home');
        }
      } catch (error) {
        showError(t('pages.prayerRequestViewPage.failedToLoadRequest'));
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerRequest();
  }, [requestId, navigate, t]);

  const handleShare = () => {
    if (requestId) {
      setShowShareDialog(true);
    }
  };

  // Prevent navigation when clicking on prayer request in view page
  const handlePostClick = () => {
    // Do nothing - we're already on the prayer request page
  };

  if (loading) {
    return (
      <MainContentWrapper>
        <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
          {t('pages.prayerRequestViewPage.loading')}
        </div>
      </MainContentWrapper>
    );
  }

  if (!prayerRequest) {
    return null;
  }

  return (
    <>
      <MainContentWrapper>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px 0' }}>
          <PrayerRequestPost
            id={prayerRequest.prayer_request_id}
            userId={prayerRequest.user?.user_id || ''}
            name={prayerRequest.name}
            userName={prayerRequest.user?.user_name}
            email={prayerRequest.email}
            phone={prayerRequest.phone}
            userTitle={t('pages.homePage.member')}
            userAvatar={prayerRequest.user?.profile_picture_url}
            content={prayerRequest.description || ''}
            likes={prayerRequest.likes_count || prayerRequest.reactions_count || 0}
            comments={prayerRequest.comments_count}
            shares={prayerRequest.shares_count || 0}
            isLiked={prayerRequest.is_liked}
            onShare={handleShare}
            onClick={handlePostClick}
            hideEngagementStats={false}
          />
        </div>
      </MainContentWrapper>
      {requestId && (
        <ShareDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          title={getShareTitle('prayer-request')}
          url={getShareUrl(requestId, 'prayer-request')}
          description={prayerRequest.description || ''}
        />
      )}
    </>
  );
};

export default PrayerRequestViewPage;

