import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from '../../components/Post/Post';
import { postService, type Post as PostType } from '../../services/post/post.service';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n';
import ShareDialog from '../../components/ShareDialog/ShareDialog';
import { getShareUrl, getShareTitle } from '../../utils/share';
import { MainContentWrapper } from '../../components/Layout/Layout.styles';

const PostViewPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      console.log(postId)
      if (!postId) {
        showError(t('pages.postViewPage.invalidPostId'));
        navigate('/home');
        return;
      }

      setLoading(true);
      try {
        const response = await postService.getPostDetails(postId);
        console.log(response)
        if (response.success && response.data) {
          setPost(response.data);
        } else {
          showError(response.message || t('pages.postViewPage.postNotFound'));
          // navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
        showError(t('pages.postViewPage.failedToLoadPost'));
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate, t]);

  const handleShare = () => {
    if (postId) {
      setShowShareDialog(true);
    }
  };

  // Prevent navigation when clicking on post in view page
  const handlePostClick = () => {
    // Do nothing - we're already on the post page
  };

  if (loading) {
    return (
      <MainContentWrapper>
        <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
          {t('pages.postViewPage.loading')}
        </div>
      </MainContentWrapper>
    );
  }

  if (!post) {
    return null;
  }

  const mediaItems = post.media?.map((m) => ({
    media_type: m.media_type,
    url: m.url,
  })) || [];

  return (
    <>
      <MainContentWrapper>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px 0' }}>
          <Post
            id={post.post_id}
            userId={post.user.user_id}
            userName={post.user.user_name}
            userTitle=""
            userAvatar={post.user.profile_picture_url}
            content={post.description || post.title || ''}
            mediaItems={mediaItems}
            likes={post.likes_count}
            comments={post.comments_count}
            isLiked={post.is_liked}
            onShare={handleShare}
            onClick={handlePostClick}
            hideEngagementStats={false}
          />
        </div>
      </MainContentWrapper>
      {postId && (
        <ShareDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          title={getShareTitle('post')}
          url={getShareUrl(postId, 'post')}
          description={post.description || post.title || ''}
        />
      )}
    </>
  );
};

export default PostViewPage;

