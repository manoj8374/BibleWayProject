import React, { useEffect, useState, useCallback } from 'react';
import {
  GridContainer,
  PostWrapper,
  CarouselWrapper,
  PostsContainer,
  NavigationButton,
  PageIndicator,
  IndicatorDot
} from './ProfilePostsGrid.styles';
import Post from '../../components/Post/Post';
import { postService, type Post as PostType } from '../../services/post/post.service';
import { showError } from '../../utils/toast';
import type { CompleteUserProfile } from '../../services/user/user.service';
import { useI18n } from '../../i18n';

interface ProfilePostsGridProps {
  userId: string; 
  profileData: CompleteUserProfile | null;
  onPostClick?: (postId: string) => void;
}

const ProfilePostsGrid: React.FC<ProfilePostsGridProps> = ({
  userId,
  profileData,
  onPostClick
}) => {
  const { t } = useI18n();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const POSTS_PER_PAGE = 2;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const fetchPosts = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await postService.getSpecificUserPosts(userId, 10, 0);
      if (response.success && response.data) {
        setPosts(response.data);
      }else{
        showError(response.message || t('profile.failedToFetchUserPosts'));
      }
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <GridContainer>
        <div style={{ padding: '20px', textAlign: 'center', color: '#888', width: '100%' }}>
          {t('profile.loadingPosts')}
        </div>
      </GridContainer>
    );
  }

  if (posts.length === 0) {
    return (
      <GridContainer>
        <div style={{ padding: '20px', textAlign: 'center', color: '#888', width: '100%' }}>
          {t('profile.noPostsYet')}
        </div>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <CarouselWrapper>
        <PostsContainer $currentIndex={currentIndex}>
          {posts.map((post) => {
            const mediaItems = post.media?.map(m => ({
              media_type: m.media_type,
              url: m.url
            })) || [];

            return (
              <PostWrapper key={post.post_id}>
                <Post
                  id={post.post_id}
                  userId={post.user?.user_id || userId}
                  userName={post.user?.user_name || profileData?.user_name || t('profile.unknownUser')}
                  userAvatar={post.user?.profile_picture_url || profileData?.profile_picture_url}
                  userTitle=""
                  content={post.description || ''}
                  mediaItems={mediaItems}
                  likes={post.likes_count}
                  comments={post.comments_count}
                  onClick={() => onPostClick?.(post.post_id)}
                  isLiked={post.is_liked}
                />
              </PostWrapper>
            );
          })}
        </PostsContainer>
        
        {totalPages > 1 && (
          <>
            <NavigationButton position="left" onClick={prevSlide} disabled={totalPages <= 1}>
              ‹
            </NavigationButton>
            <NavigationButton position="right" onClick={nextSlide} disabled={totalPages <= 1}>
              ›
            </NavigationButton>
            
            <PageIndicator>
              {Array.from({ length: totalPages }).map((_, i) => (
                <IndicatorDot key={i} active={i === currentIndex} onClick={() => setCurrentIndex(i)} />
              ))}
            </PageIndicator>
          </>
        )}
      </CarouselWrapper>
    </GridContainer>
  );
};

export default ProfilePostsGrid;
