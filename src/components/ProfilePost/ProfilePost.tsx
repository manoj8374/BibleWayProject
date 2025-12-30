import React from 'react';
import {
  PostContainer,
  PostHeader,
  UserAvatar,
  UserInfo,
  UserName,
  UserTitle,
  MenuButton,
  PostContent,
  PostText,
  Hashtag,
  MediaContainer,
  VideoOverlay,
  PlayButton,
  ImageMedia,
  AudioMedia,
  EngagementStats,
  StatItem,
  StatText,
  StatNumber,
  StatLabel,
  Divider,
  CommentSection,
  CommentAvatar,
  CommentInput,
  AddButton,
  LeftSideEles,
  BookMarkIconWrapper,
  CarouselContainer,
  NavigationButton,
  PageIndicator,
  IndicatorDot,
  DropdownMenu,
  DropdownItem,
  PostTextArea,
  EditActions,
  ActionButton
} from './ProfilePost.styles';

import CommentsSection from '../CommentsSection';
import BookMarkIcon from '../../Icons/BookMarkIcon';
import { postService, type Post as PostType } from '../../services/post/post.service';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n';
import EditPostModal from '../EditPostModal/EditPostModal';

import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDots } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { FaThumbsUp } from 'react-icons/fa';


export type MediaType = 'video' | 'audio' | 'image' | 'none';

export interface MediaItem {
  media_type: MediaType;
  url: string;
  thumbnail?: string;
}

export interface ProfilePostProps {
  id: string;
  userName: string;
  userTitle: string;
  userAvatar?: string;
  content: string;

  mediaItems?: MediaItem[];
  mediaType?: MediaType;
  mediaUrl?: string;
  mediaThumbnail?: string;

  likes?: number;
  comments?: number;
  isLiked?: boolean;

  onLike?: () => void;
  onComment?: (comment: string) => void;
  onShare?: () => void;

  hideEngagementStats?: boolean;
  onClick?: () => void;
  className?: string;

  enableEditDelete?: boolean;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, newContent: string, mediaUrls?: string[]) => void;
  onPostUpdated?: () => void;
}


const ProfilePost: React.FC<ProfilePostProps> = (props) => {
  const { t } = useI18n();
  const {
    id,
    userName,
    userTitle,
    userAvatar,
    content,

    mediaItems = [],
    mediaType = 'none',
    mediaUrl,
    mediaThumbnail,

    likes = 0,
    comments = 0,
    isLiked = false,

    onLike,
    onComment,
    onShare,

    hideEngagementStats = false,
    onClick,
    className,

    enableEditDelete = false,
    onDelete,
    onUpdate,
    onPostUpdated
  } = props;


  const [commentText, setCommentText] = React.useState('');
  const [shouldShowComments, setShouldShowComments] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [postData, setPostData] = React.useState<PostType | null>(null);

  const [isLikedPost, setIsLikedPost] = React.useState(isLiked);
  const [likesCount, setLikesCount] = React.useState(likes);
  const [commentsCount, setCommentsCount] = React.useState(comments);
  const [refreshKey, setRefreshKey] = React.useState(0);


  React.useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    if (isMenuOpen) document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);


  React.useEffect(() => {
    setCommentsCount(comments);
  }, [comments]);


  const allMedia: MediaItem[] =
    mediaItems.length > 0
      ? mediaItems
      : mediaType !== 'none' && mediaUrl
      ? [{ media_type: mediaType, url: mediaUrl, thumbnail: mediaThumbnail }]
      : [];


  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    const response = await postService.createComment(id, commentText);

    if (!response.success) {
      showError(response.message || t('posts.failedToComment'));
      return;
    }

    setCommentText('');
    setShouldShowComments(true);
    setCommentsCount(prev => prev + 1);
    setRefreshKey(prev => prev + 1);
    onComment?.(commentText);
  };

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const prevLiked = isLikedPost;
    const prevLikes = likesCount;

    setIsLikedPost(!prevLiked);
    setLikesCount((v) => (prevLiked ? Math.max(0, v - 1) : v + 1));

    const response = prevLiked
      ? await postService.unlikePost(id)
      : await postService.likePost(id);

    if (!response.success) {
      setIsLikedPost(prevLiked);
      setLikesCount(prevLikes);
      showError(response.message || t('posts.actionFailed'));
      return;
    }

    if (!prevLiked) onLike?.();
  };

  const handleEditClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    
    // Fetch full post details to get media
    try {
      const response = await postService.getPostDetails(id);
      if (response.success && response.data) {
        setPostData(response.data);
        setIsEditModalOpen(true);
      } else {
        showError(response.message || t('posts.failedToLoadPost') || 'Failed to load post');
      }
    } catch (error) {
      showError(t('posts.failedToLoadPost') || 'Failed to load post');
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    if (onDelete && window.confirm(t('posts.deleteConfirm'))) onDelete(id);
  };

  const handlePostUpdated = () => {
    // EditPostModal already handled the update, just close and trigger parent refresh
    setIsEditModalOpen(false);
    setPostData(null);
    // Trigger parent refresh callback
    if (onPostUpdated) {
      onPostUpdated();
    }
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((v) => (v + 1) % allMedia.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((v) => (v - 1 + allMedia.length) % allMedia.length);
  };


  const renderHashtags = (text: string) =>
    text.split(' ').map((word, i) =>
      word.startsWith('#') ? <Hashtag key={i}>{word} </Hashtag> : <span key={i}>{word} </span>
    );

  const renderSingleMedia = (item: MediaItem) => {
    if (item.media_type === 'image') {
      return (
        <MediaContainer>
          <ImageMedia src={item.url} />
        </MediaContainer>
      );
    }

    if (item.media_type === 'audio') {
      return (
        <AudioMedia controls onClick={(e) => e.stopPropagation()}>
          <source src={item.url} />
        </AudioMedia>
      );
    }

    if (item.media_type === 'video') {
      return (
        <MediaContainer>
          {/* {item.thumbnail && <ImageMedia src={item.thumbnail} />} */}
          <video src={item.url} controls style={{ width: '100%', height: 'auto' }} autoPlay muted/>
          {/* <VideoOverlay>
            <PlayButton onClick={(e) => { e.stopPropagation(); window.open(item.url); }}>
              ▶
            </PlayButton>
          </VideoOverlay> */}
        </MediaContainer>
      );
    }

    return null;
  };

  const renderMedia = () => {
    if (!allMedia.length) return null;
    if (allMedia.length === 1) return renderSingleMedia(allMedia[0]);

    return (
      <CarouselContainer>
        {renderSingleMedia(allMedia[currentSlide])}

        <NavigationButton position="left" onClick={prevSlide}>‹</NavigationButton>
        <NavigationButton position="right" onClick={nextSlide}>›</NavigationButton>

        <PageIndicator>
          {allMedia.map((_, i) => (
            <IndicatorDot key={i} active={i === currentSlide} />
          ))}
        </PageIndicator>
      </CarouselContainer>
    );
  };


  console.log('userAvatar in ProfilePost', userAvatar);
  const renderHeader = () => (
    <PostHeader>
      <UserAvatar $bgColor={userAvatar ? 'transparent' : '#E74C3C'}>
        {userAvatar ? (
          <img 
            src={userAvatar} 
            alt={userName} 
            style={{
              width: '100%', 
              height: '100%', 
              borderRadius: '50%', 
              objectFit: 'cover'
            }} 
          />
        ) : (
          userName[0]
        )}
      </UserAvatar>

      <UserInfo>
        <UserName>{userName}</UserName>
        <UserTitle>{userTitle}</UserTitle>
      </UserInfo>

      {enableEditDelete && (
        <div style={{ position: 'relative' }}>
          <MenuButton onClick={(e) => { e.stopPropagation(); setIsMenuOpen(v => !v); }}>⋮</MenuButton>
          {isMenuOpen && (
            <DropdownMenu onClick={(e) => e.stopPropagation()}>
              <DropdownItem onClick={handleEditClick}>{t('posts.edit')}</DropdownItem>
              <DropdownItem onClick={handleDeleteClick} style={{ color: 'red' }}>
                {t('posts.delete')}
              </DropdownItem>
            </DropdownMenu>
          )}
        </div>
      )}
    </PostHeader>
  );

  const renderContent = () => (
    <PostContent>
      <PostText>{renderHashtags(content)}</PostText>
    </PostContent>
  );

  const renderEngagement = () =>
    hideEngagementStats ? null : (
      <EngagementStats>
        <LeftSideEles>
          <StatItem onClick={handleLikeToggle}>
            {isLikedPost ? <FaThumbsUp color="#0860C4" size={18} /> : <AiOutlineLike size={20} />}
            <StatText>
              <StatNumber>{likesCount}</StatNumber>
              <StatLabel>{t('posts.likes')}</StatLabel>
            </StatText>
          </StatItem>

          <StatItem onClick={() => setShouldShowComments(v => !v)}>
            <BiCommentDots size={20} />
            <StatText>
              <StatNumber>{commentsCount}</StatNumber>
              <StatLabel>{t('posts.comments')}</StatLabel>
            </StatText>
          </StatItem>

          <StatItem onClick={onShare}>
            <RiShareForwardLine size={20} />
            <StatText>
              <StatLabel>{t('posts.share')}</StatLabel>
            </StatText>
          </StatItem>
        </LeftSideEles>

        {/* <BookMarkIconWrapper>
          <BookMarkIcon />
        </BookMarkIconWrapper> */}
      </EngagementStats>
    );

  const renderCommentBox = () =>
    hideEngagementStats ? null : (
      <CommentSection>
        <CommentAvatar $bgColor="#666" />
        <CommentInput
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
          placeholder={t('posts.writeComment')}
        />
        <AddButton onClick={handleCommentSubmit}>+</AddButton>
      </CommentSection>
    );


  return (
    <PostContainer className={className} onClick={onClick}>
      {renderHeader()}
      {renderContent()}
      {renderMedia()}
      {renderEngagement()}
      {!hideEngagementStats && <Divider />}
      {!hideEngagementStats && shouldShowComments && (
        <CommentsSection 
          postId={id} 
          refreshKey={refreshKey}
          onCommentCountChange={(count) => setCommentsCount(count)}
        />
      )}
      {renderCommentBox()}
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setPostData(null);
        }}
        post={postData}
        onPostUpdated={handlePostUpdated}
      />
    </PostContainer>
  );
};

export default ProfilePost;

