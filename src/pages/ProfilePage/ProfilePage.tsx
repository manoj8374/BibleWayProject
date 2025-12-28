import React, { useEffect, useState, useRef } from 'react';
import {
    ProfilePageContainer,
    ProfileHeaderSection,
    HeaderContent,
    ProfileImageWrapper,
    ProfileImageContainer,
    ProfileImageImg,
    ProfileImagePlaceholder,
    ProfileImagePreview,
    ImageEditButton,
    HeaderInfo,
    UserName,
    UserEmail,
    StatsContainer,
    StatButton,
    StatNumber,
    StatLabel,
    MainContent,
    ContentGrid,
    ProfileCard,
    CardTitle,
    ActionButton,
    SaveButton,
    LogoutButton,
    FormGroup,
    Label,
    StyledInput,
    Row,
    Col,
    SubprofilePageContainer,
    UserContentWrapper,
    RemovePhotoButton,
    DropdownContainer,
    DropdownButton,
    DropdownList,
    DropdownItem,
    DropdownSearch
} from './ProfilePage.styles';
import { userService, type UserProfile } from '../../services/user/user.service';
import { postService } from '../../services/post/post.service';
import { prayerPostService } from '../../services/prayerPost/post.service';
import { authService } from '../../services/auth/auth.service';
import { publicService, type PublicLanguage } from '../../services/public/public.service';
import { showError, showSuccess } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import TabsView from '../../components/TabNavigation/TabNavigation';
import Post from '../../components/Post/Post';
import PrayerRequestPost from '../../components/PrayerRequestPost/PrayerRequestPost';
import { useI18n } from '../../i18n/hooks';
import LogoutConfirmationModal from '../../components/LogoutConfirmationModal/LogoutConfirmationModal';
import FollowersFollowingModal from '../../components/FollowersFollowingModal/FollowersFollowingModal';

const ALL_COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bangladesh', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'China',
  'Colombia', 'Croatia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia',
  'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'Iceland',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands',
  'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Philippines', 'Poland',
  'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Vietnam', 'Zimbabwe'
];


const ProfilePage: React.FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    // Feed States
    const [activeTab, setActiveTab] = useState('posts');
    const [posts, setPosts] = useState<any[]>([]);
    const [postsLoading, setPostsLoading] = useState(false);

    // Form states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [preferredLanguage, setPreferredLanguage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Dropdown states
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [countrySearchQuery, setCountrySearchQuery] = useState('');
    const [languageSearchQuery, setLanguageSearchQuery] = useState('');
    const [languages, setLanguages] = useState<PublicLanguage[]>([]);
    
    // Followers/Following states
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTab, setModalTab] = useState<'followers' | 'following'>('followers');
    
    // Logout confirmation state
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    
    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const countryButtonRef = useRef<HTMLButtonElement>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);
    const languageButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        fetchProfile();
        fetchLanguages();
        setImageError(false); // Reset image error when profile changes
    }, []);

    const fetchLanguages = async () => {
        const response = await publicService.getAllLanguages();
        if (response.success && response.data) {
            setLanguages(response.data);
        }
    };

    useEffect(() => {
        fetchUserContent();
    }, [activeTab]);

    // Click outside handlers for dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            
            if (
                countryDropdownRef.current &&
                !countryDropdownRef.current.contains(target) &&
                countryButtonRef.current &&
                !countryButtonRef.current.contains(target)
            ) {
                setIsCountryDropdownOpen(false);
                setCountrySearchQuery('');
            }
            
            if (
                languageDropdownRef.current &&
                !languageDropdownRef.current.contains(target) &&
                languageButtonRef.current &&
                !languageButtonRef.current.contains(target)
            ) {
                setIsLanguageDropdownOpen(false);
                setLanguageSearchQuery('');
            }
        };

        if (isCountryDropdownOpen || isLanguageDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCountryDropdownOpen, isLanguageDropdownOpen]);

    const filteredCountries = ALL_COUNTRIES.filter(c =>
        c.toLowerCase().includes(countrySearchQuery.toLowerCase())
    );

    const filteredLanguages = languages.filter(lang =>
        lang.display_name.toLowerCase().includes(languageSearchQuery.toLowerCase())
    );

    const fetchProfile = async () => {
        setLoading(true);
        setImageError(false); // Reset image error when fetching new profile
        const response = await userService.getUserProfile();
        if (response.success && response.data) {
            const data = response.data;
            setProfile(data);

            setFollowersCount(data.followers_count || 0);
            setFollowingCount(data.following_count || 0);

            // Populate form
            setUsername(data.user_name || '');
            setEmail(data.email || '');
            setCountry(data.country || '');
            setAge(data.age || '');
            setPreferredLanguage(data.preferred_language || '');
        } else {
            showError(response.message || t('pages.profilePage.failedToLoadProfile'));
        }
        setLoading(false);
    };

    const fetchUserContent = async () => {
        setPostsLoading(true);
        setPosts([]);
        let response;
        if (activeTab === 'posts') {
            response = await postService.getUserPosts();
        } else if (activeTab === 'prayer-request') {
            response = await prayerPostService.getUserPrayerRequests();
        }

        if (response && response.success) {
            setPosts(response.data);
        }
        setPostsLoading(false);
    }

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authService.logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Error during logout:', error);
            showError('Failed to logout. Please try again.');
        } finally {
            setIsLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    const handleDeletePost = async (postId: string) => {
        const response = await postService.deletePost(postId);
        if (response.success) {
            showSuccess(t('pages.profilePage.postDeletedSuccessfully'));
            setPosts(prevPosts => prevPosts.filter(p => p.post_id !== postId));
        } else {
            showError(response.message || t('pages.profilePage.failedToDeletePost'));
        }
    };

    const handleUpdatePost = async (postId: string, newContent: string) => {
        const response = await postService.updatePost(postId, newContent);
        if (response.success) {
            showSuccess(t('pages.profilePage.postUpdatedSuccessfully'));
            setPosts(prevPosts => prevPosts.map(p =>
                p.post_id === postId ? { ...p, description: newContent } : p
            ));
        } else {
            showError(response.message || t('pages.profilePage.failedToUpdatePost'));
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showError('Please select an image file');
                return;
            }
            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showError('Image size should be less than 5MB');
                return;
            }

            // Create preview immediately
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Automatically upload the image
            setIsUploadingImage(true);
            setProfilePicture(file);
            
            try {
                const response = await userService.updateProfile({
                    profile_picture: file
                });
                
                if (response.success) {
                    showSuccess('Profile picture updated successfully');
                    if (response.data) {
                        setProfile(response.data);
                        // Clear preview and file after successful upload
                        setProfilePicture(null);
                        setProfilePicturePreview(null);
                        // Reset file input
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    }
                } else {
                    showError(response.message || 'Failed to update profile picture');
                    // Remove preview on error
                    setProfilePicturePreview(null);
                    setProfilePicture(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                showError('Failed to update profile picture');
                // Remove preview on error
                setProfilePicturePreview(null);
                setProfilePicture(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } finally {
                setIsUploadingImage(false);
            }
        }
    };

    const handleRemovePicture = () => {
        setProfilePicture(null);
        setProfilePicturePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleOpenFollowersModal = () => {
        setModalTab('followers');
        setIsModalOpen(true);
    };

    const handleOpenFollowingModal = () => {
        setModalTab('following');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const updateData: {
                country?: string;
                age?: number;
                preferred_language?: string;
            } = {};

            // Profile picture is uploaded automatically when selected, so don't include it here
            if (country) updateData.country = country;
            if (age) updateData.age = typeof age === 'number' ? age : Number(age);
            if (preferredLanguage) updateData.preferred_language = preferredLanguage;

            const response = await userService.updateProfile(updateData);
            
            if (response.success) {
                showSuccess('Profile updated successfully');
                if (response.data) {
                    setProfile(response.data);
                }
            } else {
                showError(response.message || 'Failed to update profile');
            }
        } catch {
            showError('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const renderTabsView = () => {
        const tabs = [
            { id: 'posts', label: t('pages.profilePage.myPosts') },
            { id: 'prayer-request', label: t('pages.profilePage.myPrayerRequests') }
        ]
        return <TabsView tabs={tabs} defaultTab='posts' onTabChange={(tabId) => setActiveTab(tabId)} />
    }

    const renderPosts = () => {
        if (postsLoading) {
            return <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>{t('pages.profilePage.loadingContent')}</div>;
        }

        if (posts.length === 0) {
            return <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>{t('pages.profilePage.noItemsFound')}</div>;
        }

        return (
            <>
                {posts.map((post) => {
                    if (activeTab === 'prayer-request') {
                        const mediaItems = post.media ? post.media.map((m: any) => ({
                            media_type: m.media_type,
                            url: m.url,
                            thumbnail: m.thumbnail
                        })) : [];

                        return (
                            <PrayerRequestPost
                                key={post.prayer_request_id}
                                id={post.prayer_request_id}
                                userId={post.user?.user_id}
                                name={post.name}
                                userName={post.user?.user_name || ''}
                                email={post.email}
                                phone={post.phone}
                                userTitle={t('pages.homePage.member')}
                                userAvatar={post.user?.profile_picture_url || profile?.profile_picture_url}
                                content={post.description || ''}
                                mediaItems={mediaItems}
                                likes={post.likes_count}
                                comments={post.comments_count}
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
                            userName={post.user?.user_name || profile?.user_name || t('pages.profilePage.you')}
                            userAvatar={post.user?.profile_picture_url || profile?.profile_picture_url}
                            userTitle="Member"
                            content={post.description || ''}
                            mediaItems={mediaItems}
                            likes={post.likes_count}
                            comments={post.comments_count}
                            enableEditDelete={true}
                            onDelete={handleDeletePost}
                            onUpdate={handleUpdatePost}
                            isLiked={post.is_liked}
                        />
                    );
                })}
            </>
        );
    }

    if (loading) {
        return (
            <ProfilePageContainer>
                <div>{t('pages.profilePage.loading')}</div>
            </ProfilePageContainer>
        );
    }

    return (
        <ProfilePageContainer>
            {/* Header Section */}
            <ProfileHeaderSection>
                <HeaderContent>
                    <ProfileImageWrapper>
                        <ProfileImageContainer>
                            {isUploadingImage ? (
                                <ProfileImagePlaceholder style={{ fontSize: '24px' }}>
                                    ⏳
                                </ProfileImagePlaceholder>
                            ) : profilePicturePreview ? (
                                <ProfileImagePreview $imgUrl={profilePicturePreview} />
                            ) : profile?.profile_picture_url && profile.profile_picture_url.trim() !== '' && !imageError ? (
                                <ProfileImageImg 
                                    src={profile.profile_picture_url} 
                                    alt={profile.user_name || 'Profile'}
                                    onError={() => setImageError(true)}
                                    onLoad={() => setImageError(false)}
                                />
                            ) : (
                                <ProfileImagePlaceholder>
                                    {profile?.user_name?.charAt(0).toUpperCase() || '?'}
                                </ProfileImagePlaceholder>
                            )}
                        </ProfileImageContainer>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="profile-picture-input"
                            disabled={isUploadingImage}
                        />
                        <ImageEditButton
                            onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                            title="Edit Photo"
                            disabled={isUploadingImage}
                        >
                            {isUploadingImage ? '⏳' : '✏️'}
                        </ImageEditButton>
                    </ProfileImageWrapper>
                    
                    <HeaderInfo>
                        <UserName>{profile?.user_name || 'User'}</UserName>
                        <UserEmail>{profile?.email || ''}</UserEmail>
                        
                        <StatsContainer>
                            <StatButton onClick={handleOpenFollowersModal}>
                                <StatNumber>{followersCount}</StatNumber>
                                <StatLabel>{t('pages.profilePage.followers')}</StatLabel>
                            </StatButton>
                            <StatButton onClick={handleOpenFollowingModal}>
                                <StatNumber>{followingCount}</StatNumber>
                                <StatLabel>{t('pages.profilePage.following')}</StatLabel>
                            </StatButton>
                        </StatsContainer>
                    </HeaderInfo>
                </HeaderContent>
            </ProfileHeaderSection>

            {/* Main Content Section */}
            <MainContent>
                <ContentGrid>
                    {/* Profile Settings Card */}
                    <ProfileCard>
                        <CardTitle>Profile Information</CardTitle>
                        
                        <FormGroup>
                            <Label>{t('pages.profilePage.username')}</Label>
                            <StyledInput
                                value={username}
                                readOnly
                                disabled
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>{t('pages.profilePage.email')}</Label>
                            <StyledInput
                                value={email}
                                readOnly
                                disabled
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>{t('pages.profilePage.country')}</Label>
                            <DropdownContainer>
                                <DropdownButton
                                    ref={countryButtonRef}
                                    type="button"
                                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                >
                                    <span>{country || 'Select Country'}</span>
                                    <span>▼</span>
                                </DropdownButton>
                                {isCountryDropdownOpen && (
                                    <DropdownList ref={countryDropdownRef}>
                                        <DropdownSearch
                                            type="text"
                                            placeholder="Search country..."
                                            value={countrySearchQuery}
                                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        {filteredCountries.map((c) => (
                                            <DropdownItem
                                                key={c}
                                                onClick={() => {
                                                    setCountry(c);
                                                    setIsCountryDropdownOpen(false);
                                                    setCountrySearchQuery('');
                                                }}
                                            >
                                                {c}
                                            </DropdownItem>
                                        ))}
                                    </DropdownList>
                                )}
                            </DropdownContainer>
                        </FormGroup>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>{t('pages.profilePage.age')}</Label>
                                    <StyledInput
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : '')}
                                        min="1"
                                        max="120"
                                        placeholder="Age"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>{t('pages.profilePage.preferredLanguage')}</Label>
                                    <DropdownContainer>
                                        <DropdownButton
                                            ref={languageButtonRef}
                                            type="button"
                                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                        >
                                            <span>{preferredLanguage || 'Select Language'}</span>
                                            <span>▼</span>
                                        </DropdownButton>
                                        {isLanguageDropdownOpen && (
                                            <DropdownList ref={languageDropdownRef}>
                                                <DropdownSearch
                                                    type="text"
                                                    placeholder="Search language..."
                                                    value={languageSearchQuery}
                                                    onChange={(e) => setLanguageSearchQuery(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                {filteredLanguages.map((lang) => (
                                                    <DropdownItem
                                                        key={lang.language_id}
                                                        onClick={() => {
                                                            setPreferredLanguage(lang.display_name);
                                                            setIsLanguageDropdownOpen(false);
                                                            setLanguageSearchQuery('');
                                                        }}
                                                    >
                                                        {lang.display_name}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownList>
                                        )}
                                    </DropdownContainer>
                                </FormGroup>
                            </Col>
                        </Row>

                        <SaveButton onClick={handleSaveProfile} disabled={isSaving || isUploadingImage}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </SaveButton>
                    </ProfileCard>

                    {/* Account Actions Card */}
                    <ProfileCard>
                        <CardTitle>Account Actions</CardTitle>
                        <LogoutButton onClick={handleLogout}>
                            {t('pages.profilePage.logOut')}
                        </LogoutButton>
                    </ProfileCard>
                </ContentGrid>
            </MainContent>

            {/* User Posts Section */}
            <SubprofilePageContainer>
                <UserContentWrapper>
                    {renderTabsView()}
                    {renderPosts()}
                </UserContentWrapper>
            </SubprofilePageContainer>

            <LogoutConfirmationModal
                isOpen={showLogoutModal}
                onConfirm={confirmLogout}
                onCancel={() => setShowLogoutModal(false)}
                loading={isLoggingOut}
            />

            <FollowersFollowingModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialTab={modalTab}
                onCountsUpdate={(followers, following) => {
                    setFollowersCount(followers);
                    setFollowingCount(following);
                }}
            />

        </ProfilePageContainer>
    );
};

export default ProfilePage;
