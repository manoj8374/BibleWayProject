import React, { useEffect, useState } from 'react';
import { userService, type FollowUser } from '../../services/user/user.service';
import { showError, showSuccess } from '../../utils/toast';
import { useI18n } from '../../i18n/hooks';
import { getAvatarProps } from '../../utils/avatarHelpers';
import {
    Overlay,
    ModalContainer,
    ModalHeader,
    Title,
    CloseButton,
    ModalBody,
    TabContainer,
    TabButton,
    UserList,
    UserItem,
    UserAvatar,
    UserInfo,
    UserName,
    FollowButton,
    EmptyState,
    EmptyStateText,
    LoadingContainer
} from './FollowersFollowingModal.styles';

interface FollowersFollowingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'followers' | 'following';
    onCountsUpdate?: (followers: number, following: number) => void;
}

const FollowersFollowingModal: React.FC<FollowersFollowingModalProps> = ({
    isOpen,
    onClose,
    initialTab = 'followers',
    onCountsUpdate
}) => {
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab);
    const [followers, setFollowers] = useState<FollowUser[]>([]);
    const [following, setFollowing] = useState<FollowUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, initialTab]);

    useEffect(() => {
        if (isOpen && activeTab === 'followers' && followers.length === 0) {
            fetchFollowers();
        } else if (isOpen && activeTab === 'following' && following.length === 0) {
            fetchFollowing();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, activeTab]);

    const fetchData = async () => {
        if (activeTab === 'followers') {
            await fetchFollowers();
        } else {
            await fetchFollowing();
        }
    };

    const fetchFollowers = async () => {
        setLoading(true);
        const response = await userService.getFollowers();
        if (response.success) {
            setFollowers(response.data);
            const newCount = response.total_count;
            setFollowersCount(newCount);
            if (onCountsUpdate) {
                onCountsUpdate(newCount, followingCount);
            }
        } else {
            showError(response.error || t('pages.profilePage.failedToLoadFollowers'));
        }
        setLoading(false);
    };

    const fetchFollowing = async () => {
        setLoading(true);
        const response = await userService.getFollowing();
        if (response.success) {
            // All users in following list are being followed, so set is_following to true
            const followingUsers = response.data.map(user => ({
                ...user,
                is_following: true
            }));
            setFollowing(followingUsers);
            const newCount = response.total_count;
            setFollowingCount(newCount);
            if (onCountsUpdate) {
                onCountsUpdate(followersCount, newCount);
            }
        } else {
            showError(response.error || t('pages.profilePage.failedToLoadFollowing'));
        }
        setLoading(false);
    };

    const handleTabChange = (tab: 'followers' | 'following') => {
        setActiveTab(tab);
        if (tab === 'followers' && followers.length === 0) {
            fetchFollowers();
        } else if (tab === 'following' && following.length === 0) {
            fetchFollowing();
        }
    };

    const handleClose = () => {
        onClose();
    };

    const getUserByIdFromUsername = async (username: string): Promise<string | null> => {
        try {
            const searchResponse = await userService.searchUsers(username, 1);
            if (searchResponse.success && searchResponse.data.length > 0) {
                const user = searchResponse.data.find(u => u.user_name === username);
                return user?.user_id || null;
            }
            return null;
        } catch {
            return null;
        }
    };

    const handleFollowToggle = async (user: FollowUser) => {
        const username = user.user_name;
        if (updatingUsers.has(username)) return;

        setUpdatingUsers(prev => new Set(prev).add(username));

        try {
            // Get user_id if not available
            let userId: string | undefined = user.user_id;
            if (!userId) {
                const foundUserId = await getUserByIdFromUsername(username);
                if (!foundUserId) {
                    showError(t('pages.profilePage.userNotFound'));
                    return;
                }
                userId = foundUserId;
            }

            // In "following" tab, all users are being followed, so is_following should be true
            // In "followers" tab, use the actual is_following status from API
            const isCurrentlyFollowing = activeTab === 'following' 
                ? true 
                : (user.is_following || false);
            
            let response;
            
            if (isCurrentlyFollowing) {
                response = await userService.unfollowUser(userId);
            } else {
                response = await userService.followUser(userId);
            }

            if (response.success) {
                if (activeTab === 'followers') {
                    // Update the user's follow status in the followers list
                    const updatedUsers = currentUsers.map(u => 
                        u.user_name === username 
                            ? { ...u, is_following: !isCurrentlyFollowing, user_id: userId }
                            : u
                    );
                    setFollowers(updatedUsers);
                } else {
                    // In following tab, remove the user from the list after unfollowing
                    // (since they're no longer being followed)
                    setFollowing(prev => prev.filter(u => u.user_name !== username));
                    // Update counts
                    const newCount = followingCount - 1;
                    setFollowingCount(newCount);
                    if (onCountsUpdate) {
                        onCountsUpdate(followersCount, newCount);
                    }
                }

                showSuccess(response.message || (isCurrentlyFollowing 
                    ? t('pages.profilePage.unfollowedSuccessfully')
                    : t('pages.profilePage.followedSuccessfully')));
            } else {
                showError(response.message || t('pages.profilePage.failedToUpdateFollowStatus'));
            }
        } catch {
            showError(t('pages.profilePage.failedToUpdateFollowStatus'));
        } finally {
            setUpdatingUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(username);
                return newSet;
            });
        }
    };

    if (!isOpen) return null;

    const currentUsers = activeTab === 'followers' ? followers : following;

    return (
        <Overlay onClick={handleClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title>
                        {activeTab === 'followers' 
                            ? t('pages.profilePage.followers') 
                            : t('pages.profilePage.following')}
                    </Title>
                    <CloseButton onClick={handleClose}>&times;</CloseButton>
                </ModalHeader>

                <ModalBody>
                    <TabContainer>
                        <TabButton
                            $isActive={activeTab === 'followers'}
                            onClick={() => handleTabChange('followers')}
                        >
                            {t('pages.profilePage.followers')} ({followersCount})
                        </TabButton>
                        <TabButton
                            $isActive={activeTab === 'following'}
                            onClick={() => handleTabChange('following')}
                        >
                            {t('pages.profilePage.following')} ({followingCount})
                        </TabButton>
                    </TabContainer>

                    {loading ? (
                        <LoadingContainer>
                            <div>{t('pages.profilePage.loading')}</div>
                        </LoadingContainer>
                    ) : currentUsers.length === 0 ? (
                        <EmptyState>
                            <EmptyStateText>
                                {activeTab === 'followers'
                                    ? t('pages.profilePage.noFollowers')
                                    : t('pages.profilePage.noFollowing')}
                            </EmptyStateText>
                        </EmptyState>
                    ) : (
                        <UserList>
                            {currentUsers.map((user, index) => {
                                const avatarProps = getAvatarProps(
                                    user.profile_picture || undefined,
                                    user.user_name
                                );
                                // In "following" tab, all users are being followed (isFollowing = true)
                                // In "followers" tab, use the actual is_following status from API
                                const isFollowing = activeTab === 'following' 
                                    ? true 
                                    : (user.is_following || false);
                                const isUpdating = updatingUsers.has(user.user_name);
                                
                                return (
                                    <UserItem key={`${user.user_name}-${index}`}>
                                        <UserAvatar
                                            $bgColor={avatarProps.bgColor}
                                            $imgUrl={avatarProps.imageUrl}
                                        >
                                            {avatarProps.displayText}
                                        </UserAvatar>
                                        <UserInfo>
                                            <UserName>{user.user_name}</UserName>
                                        </UserInfo>
                                        <FollowButton
                                            onClick={() => handleFollowToggle(user)}
                                            disabled={isUpdating}
                                            $isFollowing={isFollowing}
                                        >
                                            {isUpdating 
                                                ? t('pages.profilePage.loading')
                                                : isFollowing 
                                                    ? t('pages.profilePage.following')
                                                    : t('pages.profilePage.follow')}
                                        </FollowButton>
                                    </UserItem>
                                );
                            })}
                        </UserList>
                    )}
                </ModalBody>
            </ModalContainer>
        </Overlay>
    );
};

export default FollowersFollowingModal;

