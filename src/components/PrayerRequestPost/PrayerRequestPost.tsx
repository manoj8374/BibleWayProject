import React, { useState } from 'react';
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
    MediaContainer,
    ImageMedia,
    AudioMedia,
    CarouselContainer,
    NavigationButton,
    PageIndicator,
    IndicatorDot
} from '../Post/Post.styles';
import { AiOutlineLike } from 'react-icons/ai';
import { FaThumbsUp } from 'react-icons/fa';
import CommentIcon from '../../Icons/CommentIcon';
import ShareIcon from '../../Icons/ShareIcon';
import CommentsSection from '../CommentsSection';
import BookMarkIcon from '../../Icons/BookMarkIcon';
import { prayerPostService } from '../../services/prayerPost/post.service';
import { showSuccess, showError } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/hooks';
import ShareDialog from '../ShareDialog/ShareDialog';
import { getShareUrl, getShareTitle } from '../../utils/share';
import { getAvatarProps } from '../../utils/avatarHelpers';
import { useProfile } from '../../contexts/useProfile';

export type MediaType = 'video' | 'audio' | 'image' | 'none';

export interface MediaItem {
    media_type: MediaType;
    url: string;
    thumbnail?: string;
}

export interface PrayerRequestPostProps {
    id: string; // This maps to prayer_request_id
    userId: string;
    name?: string;
    userName?: string; // fallback if name not present
    email?: string;
    phone?: string;
    userTitle: string;
    userAvatar?: string;
    content: string;
    mediaItems?: MediaItem[];
    likes?: number;
    comments?: number;
    shares?: number;
    isLiked?: boolean;
    onLike?: () => void;
    onShare?: () => void;
    hideEngagementStats?: boolean;
    onClick?: () => void;
    className?: string;
}

const PrayerRequestPost: React.FC<PrayerRequestPostProps> = (props: PrayerRequestPostProps) => {
    const { t } = useI18n();
    const {
        id,
        userId,
        name,
        userName,
        email,
        phone,
        userTitle,
        userAvatar,
        content,
        mediaItems = [],
        likes = 0,
        comments = 0,
        shares = 0,
        isLiked = false,
        onLike,
        onShare,
        hideEngagementStats = false,
        onClick,
        className
    } = props;

    const [commentText, setCommentText] = useState('');
    const [shouldShowComments, setShouldShowComments] = useState(false);
    const [commentRefreshKey, setCommentRefreshKey] = useState(0);
    const [isLikedPost, setIsLikedPost] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(likes);
    const [commentsCount, setCommentsCount] = useState(comments);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const navigate = useNavigate();

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onShare) {
            onShare();
        } else {
            setShowShareDialog(true);
        }
    };

    const handlePostClick = () => {
        if (onClick) {
            onClick();
        }
    };

    React.useEffect(() => {
        setIsLikedPost(isLiked);
    }, [isLiked]);

    React.useEffect(() => {
        setLikesCount(likes);
    }, [likes]);

    React.useEffect(() => {
        setCommentsCount(comments);
    }, [comments]);

    const handleCommentSubmit = async () => {
        if (commentText.trim()) {
            const response = await prayerPostService.createComment(id, commentText);

            if (response.success) {
                setCommentText('');
                setShouldShowComments(true);
                setCommentsCount(prev => prev + 1);
                setCommentRefreshKey(prev => prev + 1);
                showSuccess(t('posts.commentAdded'));
            } else {
                showError(response.message || t('posts.failedToCreateComment'));
            }
        }
    };

    const handleLikeToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const prevLiked = isLikedPost;
        const prevLikes = likesCount;

        // Optimistic update
        setIsLikedPost(!prevLiked);
        setLikesCount((v) => (prevLiked ? Math.max(0, v - 1) : v + 1));

        try {
            const response = prevLiked
                ? await prayerPostService.unlikePrayerRequest(id)
                : await prayerPostService.likePrayerRequest(id);

            if (!response.success) {
                // Revert optimistic update on error
                setIsLikedPost(prevLiked);
                setLikesCount(prevLikes);
                showError(response.message || t('posts.failedToUpdateLike'));
                return;
            }

            if (!prevLiked) {
                onLike?.();
            }
        } catch (error) {
            // Revert optimistic update on error
            setIsLikedPost(prevLiked);
            setLikesCount(prevLikes);
            showError(t('posts.failedToUpdateLike'));
        }
    };

    const renderHashtags = (text: string) => {
        const parts = text.split(' ');
        return parts.map((part, index) => {
            if (part.startsWith('#')) {
                return <Hashtag key={index}>{part} </Hashtag>;
            }
            return <span key={index}>{part} </span>;
        });
    };

    const renderSingleMedia = (item: MediaItem) => {
        if (item.media_type === 'image') {
            return (
                <MediaContainer>
                    <ImageMedia src={item.url} alt="Prayer request media" />
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
                    <video src={item.url} controls style={{ width: '100%', height: 'auto' }} onClick={(e) => e.stopPropagation()} />
                </MediaContainer>
            );
        }

        return null;
    };

    const renderMedia = () => {
        if (!mediaItems.length) return null;
        if (mediaItems.length === 1) return renderSingleMedia(mediaItems[0]);

        return (
            <CarouselContainer>
                {renderSingleMedia(mediaItems[currentSlide])}

                <NavigationButton position="left" onClick={(e) => { e.stopPropagation(); setCurrentSlide((v) => (v - 1 + mediaItems.length) % mediaItems.length); }}>
                    ‹
                </NavigationButton>
                <NavigationButton position="right" onClick={(e) => { e.stopPropagation(); setCurrentSlide((v) => (v + 1) % mediaItems.length); }}>
                    ›
                </NavigationButton>

                <PageIndicator>
                    {mediaItems.map((_, i) => (
                        <IndicatorDot key={i} active={i === currentSlide} />
                    ))}
                </PageIndicator>
            </CarouselContainer>
        );
    };

    const renderHeader = () => {
        // Priority: name -> userName
        const displayName = name || userName || t('profile.unknownUser');

        return (
            <PostHeader $isPrayerPost={true} onClick={() => navigate(`/profile/${userId}`)}>
                <UserAvatar $bgColor={userAvatar || '#E74C3C'}>
                    {!userAvatar && displayName.charAt(0).toUpperCase()}
                </UserAvatar>
                <UserInfo>
                    <UserName $isPrayerPost={true}>{displayName}</UserName>
                    <UserTitle $isPrayerPost={true}>{userTitle}</UserTitle>
                    {email && <UserTitle $isPrayerPost={true}>{email}</UserTitle>}
                    {phone && <UserTitle $isPrayerPost={true}>{phone}</UserTitle>}
                </UserInfo>
                <MenuButton onClick={(e) => e.stopPropagation()}>⋮</MenuButton>
            </PostHeader>
        );
    };

    const renderEngagementStats = () => {
        if (hideEngagementStats) return null;
        return (
            <EngagementStats>
                <LeftSideEles>
                    <StatItem onClick={handleLikeToggle}>
                        {isLikedPost ? (
                            <FaThumbsUp color="#0860C4" size={18} />
                        ) : (
                            <AiOutlineLike size={20} color="#94A3B8" />
                        )}
                        <StatText>
                            <StatNumber>{likesCount}</StatNumber>
                            <StatLabel>{likesCount === 1 ? t('posts.like') : t('posts.likes')}</StatLabel>
                        </StatText>
                    </StatItem>
                    <StatItem onClick={() => setShouldShowComments(!shouldShowComments)}>
                        <CommentIcon fill="#94A3B8" />
                        <StatText>
                            <StatNumber>{commentsCount}</StatNumber>
                            <StatLabel>{commentsCount === 1 ? t('posts.comment') : t('posts.comments')}</StatLabel>
                        </StatText>
                    </StatItem>
                    <StatItem onClick={handleShare}>
                        <ShareIcon fill="#94A3B8" />
                        <StatText>
                            <StatNumber>{shares}</StatNumber>
                            <StatLabel>{shares === 1 ? t('posts.share') : t('posts.shares')}</StatLabel>
                        </StatText>
                    </StatItem>
                </LeftSideEles>
            </EngagementStats>
        );
    };

    const {profile} = useProfile();

    const renderSendComment = () => {
        if (hideEngagementStats) return null;

        const avatarProps = getAvatarProps(
      profile?.profile_picture_url,
      profile?.user_name
    );
        return (
            <CommentSection onClick={(e) => e.stopPropagation()}>
                <CommentAvatar $bgColor={avatarProps.bgColor} src={avatarProps.imageUrl}>
          {avatarProps.displayText}
        </CommentAvatar>
                <CommentInput
                    type="text"
                    placeholder={t('posts.writeYourComment')}
                    value={commentText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleCommentSubmit()}
                />
                <AddButton onClick={handleCommentSubmit}>+</AddButton>
            </CommentSection>
        );
    };

    return (
        <>
            <PostContainer className={className} onClick={handlePostClick} style={{ cursor: 'pointer' }}>
                {renderHeader()}
                <PostContent>
                    <PostText>{renderHashtags(content)}</PostText>
                </PostContent>
                {renderMedia()}
                {renderEngagementStats()}
                {!hideEngagementStats && <Divider />}
                {!hideEngagementStats && shouldShowComments && (
                    <CommentsSection 
                        postId={id} 
                        isPrayerPost={true} 
                        refreshKey={commentRefreshKey}
                        onCommentCountChange={(count) => setCommentsCount(count)}
                    />
                )}
                {renderSendComment()}
            </PostContainer>
            <ShareDialog
                isOpen={showShareDialog}
                onClose={() => setShowShareDialog(false)}
                title={getShareTitle('prayer-request')}
                url={getShareUrl(id, 'prayer-request')}
                description={content.substring(0, 100)}
            />
        </>
    );
};

export default PrayerRequestPost;
