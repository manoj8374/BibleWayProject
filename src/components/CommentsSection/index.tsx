import React, { useEffect, useState } from 'react';
import {
    CommentsSectionContainer,
    LoadingText,
    CommentList
} from "./styledComponents";
import { postService, type Comment } from '../../services/post/post.service';
import { prayerPostService } from '../../services/prayerPost/post.service';
import CommentItem from './CommentItem';
import { useI18n } from '../../i18n';

interface CommentsSectionProps {
    postId: string;
    isPrayerPost?: boolean;
    refreshKey?: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId, isPrayerPost = false, refreshKey }) => {
    const { t } = useI18n();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            let response;
            if (isPrayerPost) {
                response = await prayerPostService.getComments(postId);
            } else {
                response = await postService.getComments(postId);
            }
            if (response.success) {
                setComments(response.data);
            } else {
                setError(response.message || t('comments.error'));
            }
            setLoading(false);
        };

        fetchComments();
    }, [postId, refreshKey]);

    if (loading) {
        return (
            <CommentsSectionContainer>
                <LoadingText>{t('comments.loading')}</LoadingText>
            </CommentsSectionContainer>
        );
    }

    if (error) {
        return (
            <CommentsSectionContainer>
                <LoadingText style={{ color: 'red' }}>{error}</LoadingText>
            </CommentsSectionContainer>
        );
    }

    if (comments.length === 0) {
        return (
            <CommentsSectionContainer>
                <LoadingText>{t('comments.noComments')}</LoadingText>
            </CommentsSectionContainer>
        );
    }

    return (
        <CommentsSectionContainer>
            <CommentList>
                {comments.map((comment) => (
                    <CommentItem key={comment.comment_id} comment={comment} />
                ))}
            </CommentList>
        </CommentsSectionContainer>
    );
};

export default CommentsSection;