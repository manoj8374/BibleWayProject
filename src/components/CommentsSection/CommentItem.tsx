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
    CommentLikeAndDescription,
    CommentActions,
    EditButton,
    DeleteButton,
    EditInput,
    EditActions,
    SaveButton,
    CancelButton
} from "./styledComponents";
import { postService, type Comment } from '../../services/post/post.service';
import { prayerPostService } from '../../services/prayerPost/post.service';
import { useI18n } from '../../i18n';
import { useProfile } from '../../contexts/useProfile';
import { showError, showSuccess } from '../../utils/toast';
import DeleteCommentModal from '../DeleteCommentModal/DeleteCommentModal';

interface CommentItemProps {
    comment: Comment;
    isPrayerPost?: boolean;
    onRefresh?: () => void;
    onCommentDeleted?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment: initialComment, isPrayerPost = false, onRefresh, onCommentDeleted }) => {
    const { t } = useI18n();
    const { profile } = useProfile();
    const [isLiked, setIsLiked] = useState(initialComment.is_liked);
    const [likesCount, setLikesCount] = useState(initialComment.likes_count);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(initialComment.description);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const isOwnComment = profile?.user_id === initialComment.user.user_id;

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

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(initialComment.description);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditText(initialComment.description);
    }

    const handleSaveEdit = async () => {
        if (!editText.trim()) {
            showError(t('comments.emptyComment') || 'Comment cannot be empty');
            return;
        }

        setIsUpdating(true);
        try {
            const response = isPrayerPost
                ? await prayerPostService.updateComment(initialComment.comment_id, editText)
                : await postService.updateComment(initialComment.comment_id, editText);

            if (response.success) {
                showSuccess(t('comments.commentUpdated') || 'Comment updated successfully');
                setIsEditing(false);
                onRefresh?.();
            } else {
                showError(response.message || t('comments.failedToUpdate') || 'Failed to update comment');
            }
        } catch (error) {
            console.error('Error updating comment:', error);
            showError(t('comments.failedToUpdate') || 'Failed to update comment');
        } finally {
            setIsUpdating(false);
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            const response = isPrayerPost
                ? await prayerPostService.deleteComment(initialComment.comment_id)
                : await postService.deleteComment(initialComment.comment_id);

            if (response.success) {
                showSuccess(t('comments.commentDeleted') || 'Comment deleted successfully');
                setShowDeleteModal(false);
                onCommentDeleted?.();
                onRefresh?.();
            } else {
                showError(response.message || t('comments.failedToDelete') || 'Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            showError(t('comments.failedToDelete') || 'Failed to delete comment');
        } finally {
            setIsDeleting(false);
        }
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
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
                {isEditing ? (
                    <>
                        <EditInput
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            placeholder={t('comments.writeComment') || 'Write a comment...'}
                        />
                        <EditActions>
                            <CancelButton onClick={handleCancelEdit} disabled={isUpdating}>
                                {t('posts.cancel') || 'Cancel'}
                            </CancelButton>
                            <SaveButton onClick={handleSaveEdit} disabled={isUpdating || !editText.trim()}>
                                {isUpdating ? (t('posts.saving') || 'Saving...') : (t('posts.save') || 'Save')}
                            </SaveButton>
                        </EditActions>
                    </>
                ) : (
                    <>
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
                        {isOwnComment && (
                            <CommentActions>
                                <EditButton onClick={handleEdit} disabled={isDeleting || isUpdating}>
                                    {t('posts.edit') || 'Edit'}
                                </EditButton>
                                <DeleteButton onClick={handleDeleteClick} disabled={isDeleting || isUpdating}>
                                    {t('posts.delete') || 'Delete'}
                                </DeleteButton>
                            </CommentActions>
                        )}
                    </>
                )}
            </CommentContent>
            <DeleteCommentModal
                isOpen={showDeleteModal}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                loading={isDeleting}
            />
        </StyledCommentItem>
    );
};

export default CommentItem;
