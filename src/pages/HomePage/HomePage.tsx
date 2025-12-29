import React from 'react';
import {
  ContentCenterWrapper,
  MainContentWrapper,
  RightPanelWrapper,
  CenterContainerWrapper,
  CreatePrayerRequestButton,
  PrayerRequestWrapper,
  CategoriesWrapper,
  FloatingAddPostButton,
} from './HomePage.styles'
import QuoteOfTheDay from '../../components/QuoteOfTheDay/QuoteOfTheDay';
import TabsView from '../../components/TabNavigation/TabNavigation';
import Post from '../../components/Post/Post';
import PrayerRequestPost from '../../components/PrayerRequestPost/PrayerRequestPost';
import RecommendedPeople from '../../components/RecommendedPeople/RecommendedPeople';
import Promotions from '../../components/Promotion/Promotion';
import Testimonials from '../../components/Testimonials/Testimonials';
import LanguagesVersionsCard from '../../components/LanguagesVersionsCard/LanguagesVersionsCard';
import CreatePrayerRequestModal from '../../components/CreatePrayerRequestModal/CreatePrayerRequestModal';
import CreatePostModal from '../../components/CreatePostModal/CreatePostModal';
import { postService } from '../../services/post/post.service';
import { prayerPostService } from '../../services/prayerPost/post.service';
import { useRefresh } from '../../contexts/RefreshContext';
import SegmentedBibles from '../../components/SegmentedBibles/SegmentedBible';
import { useI18n } from '../../i18n/hooks';
import { MdAddCircle } from 'react-icons/md';

const HomePage: React.FC = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = React.useState('posts');
  const [isPrayerModalOpen, setIsPrayerModalOpen] = React.useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth < 1024);
  const { refreshKey } = useRefresh();

  // Track window width to show/hide categories tab
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileView(mobile);
      // If categories tab is active and window becomes >= 1024px, switch to posts
      if (!mobile && activeTab === 'categories') {
        setActiveTab('posts');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setPosts([]); 

    let response;
    if (activeTab === 'posts') {
      response = await postService.getAllPosts();
    } else if (activeTab === 'prayer-request') {
      response = await prayerPostService.getAllPrayerRequests();
    }

    if (response && response.success) {
      setPosts(response.data);
    }
    setLoading(false);
  };

   React.useEffect(() => {
      fetchData();
  }, [refreshKey])

  React.useEffect(() => {
    fetchData();
  }, [activeTab, refreshKey]);

  const renderQuoteOfTheDay = () => {
    return <QuoteOfTheDay />
  }

  const renderTabsView = () => {
    const tabs = [
      { id: 'posts', label: t('pages.homePage.posts') },
      { id: 'prayer-request', label: t('pages.homePage.prayerRequest') },
      ...(isMobileView ? [{ id: 'categories', label: t('pages.homePage.categories') }] : [])
    ]
    return <TabsView tabs={tabs} defaultTab='posts' onTabChange={(tabId) => setActiveTab(tabId)} />
  }

  const renderPosts = () => {
    if (loading) {
      return <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>{t('pages.homePage.loading')}</div>;
    }

    if (posts.length === 0) {
      return <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>{t('pages.homePage.noItemsFound')}</div>;
    }

    return (
      <>
        {posts.map((post, index) => {
          if (activeTab === 'prayer-request') {
            const mediaItems = post.media ? post.media.map((m: any) => ({
              media_type: m.media_type,
              url: m.url,
              thumbnail: m.thumbnail
            })) : [];

            return (
              <PrayerRequestPost
                key={post.prayer_request_id || `prayer-${index}`}
                id={post.prayer_request_id}
                userId={post.user?.user_id}
                name={post.name}
                userName={post.user?.user_name}
                email={post.email}
                phone={post.phone}
                userTitle=""
                userAvatar={post.user?.profile_picture_url}
                content={post.description || ''}
                mediaItems={mediaItems}
                likes={post.likes_count || post?.reactions_count || 0}
                comments={post.comments_count}
                shares={post.shares_count}
                isLiked={(post as any).is_liked}
              />
            );
          }

          // Regular Post
          const mediaItems = post.media ? post.media.map((m: any) => ({
            media_type: m.media_type,
            url: m.url,
            thumbnail: m.thumbnail
          })) : [];

          return (
            <Post
              key={post.post_id}
              id={post.post_id}
              userId={post.user?.user_id}
              userName={post.user?.user_name || t('pages.homePage.unknownUser')}
              userAvatar={post.user?.profile_picture_url}
              userTitle=""
              content={post.description || ''}
              mediaItems={mediaItems}
              likes={post.likes_count}
              comments={post.comments_count}
              isLiked={post.is_liked}
            />
          );
        })}
      </>
    );
  }


 ;

  const renderRightPanel = () => {
    return (
      <>
        <LanguagesVersionsCard />
        <RecommendedPeople />
        <SegmentedBibles/>
        <Promotions />
        <Testimonials />
      </>
    );
  }

  const renderPrayerRequests = () => {
    return (
      <PrayerRequestWrapper>
        <CreatePrayerRequestButton onClick={() => setIsPrayerModalOpen(true)}>
          {t('pages.homePage.createPrayerRequest')}
        </CreatePrayerRequestButton>
        {renderPosts()}
      </PrayerRequestWrapper>
    );
  }

  const renderCategories = () => {
    return (
      <CategoriesWrapper>
        <SegmentedBibles />
        <RecommendedPeople />
        <Promotions />
        <Testimonials />
      </CategoriesWrapper>
    );
  }

  const renderContent = () => {
    if (activeTab === 'categories') {
      return renderCategories();
    }
    return (
      <>
        {activeTab === 'posts' ? renderPosts() : renderPrayerRequests()}
      </>
    );
  }

  return (
    <CenterContainerWrapper>
      <ContentCenterWrapper>
        <MainContentWrapper>
          {renderQuoteOfTheDay()}
          {renderTabsView()}
          {renderContent()}
        </MainContentWrapper>
      </ContentCenterWrapper>
      <RightPanelWrapper>
        {renderRightPanel()}
      </RightPanelWrapper>
      {isMobileView && (
        <FloatingAddPostButton onClick={() => setIsPostModalOpen(true)}>
          <MdAddCircle size={24} color="#f2f2f7" />
        </FloatingAddPostButton>
      )}
      <CreatePrayerRequestModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        onRequestCreated={fetchData}
      />
      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPostCreated={fetchData}
      />
    </CenterContainerWrapper>
  );
};

export default HomePage;
