import React, { useState } from 'react';
import { 
    CommentItem as StyledCommentItem, 
    Avatar, 
    CommentContent, 
    CommentHeader, 
    CommentAuthor, 
    CommentTime, 
    CommentText, 
    ActionContainer,
    LikeButton,
    LikeCount,
    FirstLetter,
    CommentLikeAndDescription
} from "./styledComponents";
import { postService, type Comment } from '../../services/post/post.service';
import { useI18n } from '../../i18n';

interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment: initialComment }) => {
    const { t } = useI18n();
    const [isLiked, setIsLiked] = useState(initialComment.is_liked);
    const [likesCount, setLikesCount] = useState(initialComment.likes_count);

    const handleOnClickCommentLike = async () => {
        const newIsLiked = !isLiked;
        const newLikesCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
        
        setIsLiked(newIsLiked);
        setLikesCount(newLikesCount);

        try {
            if (isLiked) {
                await postService.unlikeComment(initialComment.comment_id);
                
            } else {
                await postService.likeComment(initialComment.comment_id);
            }
        } catch (error) {
            console.error('Error liking/unliking comment:', error);
            setIsLiked(!newIsLiked);
            setLikesCount(likesCount);
        }
    }

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
            
            if (diffInSeconds < 60) return t('comments.time.justNow');
            if (diffInSeconds < 3600) return t('comments.time.minutesAgo', { count: Math.floor(diffInSeconds / 60) });
            if (diffInSeconds < 86400) return t('comments.time.hoursAgo', { count: Math.floor(diffInSeconds / 3600) });
            if (diffInSeconds < 604800) return t('comments.time.daysAgo', { count: Math.floor(diffInSeconds / 86400) });
            return date.toLocaleDateString();
        } catch (e) {
            return '';
        }
    };

    const renderProfileImage = () => {
        const profileImage = initialComment.user.profile_picture_url;
        if (profileImage) {
            return (
                <Avatar 
                    src={profileImage} 
                    alt={initialComment.user.user_name} 
                />
            );
        }

        return (
            <FirstLetter>
                {initialComment.user.user_name.charAt(0).toUpperCase()}
            </FirstLetter>
        );
    }

    return (
        <StyledCommentItem>
            {renderProfileImage()}
            <CommentContent>
                <CommentHeader>
                    <CommentAuthor>{initialComment.user.user_name}</CommentAuthor>
                    <CommentTime>{formatDate(initialComment.created_at)}</CommentTime>
                </CommentHeader>
                <CommentLikeAndDescription>
                <CommentText>{initialComment.description}</CommentText>
                <ActionContainer>
                    <LikeButton liked={isLiked} onClick={handleOnClickCommentLike}>
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </LikeButton>
                    <LikeCount>{likesCount}</LikeCount>
                </ActionContainer>
                </CommentLikeAndDescription>
            </CommentContent>
        </StyledCommentItem>
    );
};

export default CommentItem;
