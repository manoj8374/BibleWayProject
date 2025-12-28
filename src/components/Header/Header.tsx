import React, { useState, useEffect, useRef } from "react";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import {
  HeaderContainer,
  LeftSection,
  Logo,
  SearchWrapper,
  SearchInput,
  SearchIcon,
  SearchIconButton,
  AddPostButton,
  RightSection,
  LanguageSelector,
  LanguageDropdown,
  LanguageDropdownContainer,
  LanguageSearchInput,
  LanguageList,
  LanguageItem,
  NotificationIcon,
  NotificationBadge,
  UserAvatar,
  Avatar,
  UserName,
  SearchHeaderContainer,
  SearchHeaderWrapper,
  SearchInputWrapper,
  SearchHeaderInput,
  SearchHeaderIconWrapper,
  CloseButton,
  FilterDropdownsContainer,
  MobileFilterDropdownsContainer,
  FilterDropdown,
  FilterSelect,
  SearchResultsPopup,
  SearchResultItem,
  SearchResultContent,
  SearchResultTitle,
  SearchResultSnippet,
  SearchResultArrow,
  SearchLoadingState,
  SearchEmptyState,
} from "./Header.styles";

import { useRefresh } from "../../contexts/RefreshContext";
import { useProfile } from "../../contexts/useProfile";
import { useNotification } from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useWebSocketEvent } from "../../contexts/WebSocketContext";
import { useI18n } from "../../i18n";
import i18n from "../../i18n/config";
import { publicService, type PublicLanguage, type PublicBook, type SearchResult } from "../../services/public/public.service";
import { useSearch } from "../../contexts/SearchContext";
import WebSocketConnection from "../../utils/WebSocketConnection";

// Language to flag mapping
const LANGUAGE_FLAGS: { [key: string]: string } = {
  Afrikaans: "🇿🇦",
  Arabic: "🇸🇦",
  Assamese: "🇮🇳",
  Bengali: "🇮🇳",
  Bodo: "🇮🇳",
  "Chinese (Mandarin)": "🇨🇳",
  Dogri: "🇮🇳",
  Dutch: "🇳🇱",
  English: "🇺🇸",
  French: "🇫🇷",
  German: "🇩🇪",
  Greek: "🇬🇷",
  Gujarati: "🇮🇳",
  Hausa: "🇳🇬",
  Hindi: "🇮🇳",
  Italian: "🇮🇹",
  Kannada: "🇮🇳",
  Kashmiri: "🇮🇳",
  Konkani: "🇮🇳",
  Maithili: "🇮🇳",
  Malayalam: "🇮🇳",
  Manipuri: "🇮🇳",
  Marathi: "🇮🇳",
  Nepali: "🇳🇵",
  Odia: "🇮🇳",
  Polish: "🇵🇱",
  Portuguese: "🇵🇹",
  Punjabi: "🇮🇳",
  Russian: "🇷🇺",
  Sanskrit: "🇮🇳",
  Santali: "🇮🇳",
  Sindhi: "🇮🇳",
  Spanish: "🇪🇸",
  Swahili: "🇰🇪",
  Swedish: "🇸🇪",
  Tamil: "🇮🇳",
  Telugu: "🇮🇳",
  Urdu: "🇮🇳",
  Yoruba: "🇳🇬",
  Zulu: "🇿🇦",
};

// Language name to i18n language code mapping
const LANGUAGE_CODE_MAP: { [key: string]: string } = {
  "English": "en",
  "Telugu": "te",
  "Spanish": "es",
  "Afrikaans": "af",
  "Arabic": "ar",
  "Assamese": "as",
  "Bengali": "bn",
  "Bodo": "brx",
  "Chinese (Mandarin)": "zh",
  "Dogri": "doi",
  "Dutch": "nl",
  "French": "fr",
  "German": "de",
  "Greek": "el",
  "Gujarati": "gu",
  "Hausa": "ha",
  "Hindi": "hi",
  "Italian": "it",
  "Kannada": "kn",
  "Kashmiri": "ks",
  "Konkani": "kok",
  "Maithili": "mai",
  "Malayalam": "ml",
  "Manipuri": "mni",
  "Marathi": "mr",
  "Nepali": "ne",
  "Odia": "or",
  "Polish": "pl",
  "Portuguese": "pt",
  "Punjabi": "pa",
  "Russian": "ru",
  "Sanskrit": "sa",
  "Santali": "sat",
  "Sindhi": "sd",
  "Swahili": "sw",
  "Swedish": "sv",
  "Tamil": "ta",
  "Urdu": "ur",
  "Yoruba": "yo",
  "Zulu": "zu",
};

// i18n language code to language name mapping
const CODE_TO_LANGUAGE_MAP: { [key: string]: string } = {
  "en": "English",
  "te": "Telugu",
  "es": "Spanish",
  "af": "Afrikaans",
  "ar": "Arabic",
  "as": "Assamese",
  "bn": "Bengali",
  "brx": "Bodo",
  "zh": "Chinese (Mandarin)",
  "doi": "Dogri",
  "nl": "Dutch",
  "fr": "French",
  "de": "German",
  "el": "Greek",
  "gu": "Gujarati",
  "ha": "Hausa",
  "hi": "Hindi",
  "it": "Italian",
  "kn": "Kannada",
  "ks": "Kashmiri",
  "kok": "Konkani",
  "mai": "Maithili",
  "ml": "Malayalam",
  "mni": "Manipuri",
  "mr": "Marathi",
  "ne": "Nepali",
  "or": "Odia",
  "pl": "Polish",
  "pt": "Portuguese",
  "pa": "Punjabi",
  "ru": "Russian",
  "sa": "Sanskrit",
  "sat": "Santali",
  "sd": "Sindhi",
  "sw": "Swahili",
  "sv": "Swedish",
  "ta": "Tamil",
  "ur": "Urdu",
  "yo": "Yoruba",
  "zu": "Zulu",
};

// All languages sorted alphabetically
const ALL_LANGUAGES = [
  "Afrikaans",
  "Arabic",
  "Assamese",
  "Bengali",
  "Bodo",
  "Chinese (Mandarin)",
  "Dogri",
  "Dutch",
  "English",
  "French",
  "German",
  "Greek",
  "Gujarati",
  "Hausa",
  "Hindi",
  "Italian",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Maithili",
  "Malayalam",
  "Manipuri",
  "Marathi",
  "Nepali",
  "Odia",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Russian",
  "Sanskrit",
  "Santali",
  "Sindhi",
  "Spanish",
  "Swahili",
  "Swedish",
  "Tamil",
  "Telugu",
  "Urdu",
  "Yoruba",
  "Zulu",
];

const Header: React.FC = () => {
  const { t, changeLanguage, currentLanguage } = useI18n();
  const navigate = useNavigate();
  const { searchText, setSearchText } = useSearch(); // Use context
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Initialize from current i18n language
    return CODE_TO_LANGUAGE_MAP[currentLanguage] || "English";
  });
  const [languageSearchQuery, setLanguageSearchQuery] = useState("");
  const [selectedFilterLanguage, setSelectedFilterLanguage] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [filterLanguages, setFilterLanguages] = useState<PublicLanguage[]>([]);
  const [filterBooks, setFilterBooks] = useState<PublicBook[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  // Remove local searchText state: const [searchText, setSearchText] = useState("");
  // Remove local searchHeaderText state and just sync/use searchText? 
  // The original code had separate `searchHeaderText` for mobile view. I can keep it local but sync it, 
  // or use context for it too. Let's keep it sync with context.
  const [searchHeaderText, setSearchHeaderText] = useState(searchText); 

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { triggerRefresh } = useRefresh();
  const searchHeaderRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const mainSearchInputRef = useRef<HTMLInputElement>(null);

  const { profile } = useProfile();
  const { unreadCount } = useNotification();

  // Update searchHeaderText when searchText changes (e.g. from context)
  useEffect(() => {
    setSearchHeaderText(searchText);
  }, [searchText]);

  // Sync selectedLanguage when i18n language changes (from external source)
  useEffect(() => {
    const updateLanguage = (lng: string) => {
      const languageName = CODE_TO_LANGUAGE_MAP[lng] || "English";
      setSelectedLanguage(languageName);
    };

    // Update on mount
    updateLanguage(currentLanguage);

    // Listen for language changes
    i18n.on('languageChanged', updateLanguage);

    return () => {
      i18n.off('languageChanged', updateLanguage);
    };
  }, [currentLanguage]);

  // Filter languages based on search query
  const filteredLanguages = ALL_LANGUAGES.filter((lang) =>
    lang.toLowerCase().includes(languageSearchQuery.toLowerCase())
  );

  // Fetch languages and books for filter on mount
  useEffect(() => {
    const fetchFilterData = async () => {
      // Fetch languages
      setLoadingLanguages(true);
      try {
        const languagesResponse = await publicService.getAllLanguages();
        if (languagesResponse.success && languagesResponse.data) {
          setFilterLanguages(languagesResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch languages for filter:", error);
      } finally {
        setLoadingLanguages(false);
      }

      // Fetch books
      setLoadingBooks(true);
      try {
        const booksResponse = await publicService.getAllBooks();
        if (booksResponse.success && booksResponse.data) {
          setFilterBooks(booksResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch books for filter:", error);
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchFilterData();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchHeaderRef.current &&
        !searchHeaderRef.current.contains(target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }

      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(target) &&
        languageButtonRef.current &&
        !languageButtonRef.current.contains(target)
      ) {
        setIsLanguageDropdownOpen(false);
        setLanguageSearchQuery("");
      }

    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    if (isLanguageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, isLanguageDropdownOpen]);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Sync search text when opening
      setSearchHeaderText(searchText);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleLanguageSelect = async (language: string) => {
    const languageCode = LANGUAGE_CODE_MAP[language] || "en";
    await changeLanguage(languageCode);
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
    setLanguageSearchQuery("");
  };

  const handleLanguageToggle = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    if (!isLanguageDropdownOpen) {
      setLanguageSearchQuery("");
    }
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setShowSearchResults(true);
    
    try {
      const searchData: {
        search_text: string;
        book_id?: string;
        language_id?: string;
      } = {
        search_text: searchQuery.trim(),
      };

      // Add optional filters if selected
      if (selectedBook) {
        searchData.book_id = selectedBook;
      }
      if (selectedFilterLanguage) {
        searchData.language_id = selectedFilterLanguage;
      }

      const response = await publicService.searchBooks(searchData);
      
      if (response.success && response.data) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timerId = setTimeout(() => {
      handleSearch(searchText);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, selectedBook, selectedFilterLanguage]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(target) &&
        mainSearchInputRef.current &&
        !mainSearchInputRef.current.contains(target)
      ) {
        setShowSearchResults(false);
      }
    };

    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchResults]);

  const handleResultClick = (result: SearchResult) => {
    // Get book_id from selected book filter or from result
    const bookId = selectedBook || result.book_id;
    
    if (!bookId) {
      console.error('No book_id available for navigation');
      return;
    }

    // Build the navigation URL with query parameters
    const params = new URLSearchParams({
      chapter_id: result.chapter_id,
      block_id: result.block_id,
      // search: searchText, // Optional: keep sending it as param backup, or remove if context is sole source
    });
    
    const url = `/book/${bookId}?${params.toString()}`;
    navigate(url);
    
    setShowSearchResults(false);
    // setSearchText(""); // Do NOT clear searchText if we want it to highlight in the next screen!
    setSearchHeaderText("");
  };
  useWebSocketEvent('notification', (data) => {
    console.log('notification', data);
  });

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <Logo onClick={() => navigate("/home")}>
            <img src="/logo.png" alt="Logo" />
          </Logo>

          {/* <WebSocketConnection/> */}


          <FilterDropdownsContainer>
            <FilterDropdown>
              {/* <FilterLabel>{t('header.filter.selectLanguage')}</FilterLabel> */}
              <FilterSelect
                value={selectedFilterLanguage}
                onChange={(e) => setSelectedFilterLanguage(e.target.value)}
                disabled={loadingLanguages}
              >
                <option value="">{t('header.filter.selectLanguage')}</option>
                {loadingLanguages ? (
                  <option value="" disabled>{t('common.loading')}</option>
                ) : (
                  filterLanguages.map((lang) => (
                    <option key={lang.language_id} value={lang.language_id}>
                      {lang.display_name}
                    </option>
                  ))
                )}
              </FilterSelect>
            </FilterDropdown>
            <FilterDropdown>
              {/* <FilterLabel>{t('header.filter.selectVersion')}</FilterLabel> */}
              <FilterSelect
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                disabled={loadingBooks}
              >
                <option value="">{t('header.filter.selectVersion')}</option>
                {loadingBooks ? (
                  <option value="" disabled>{t('common.loading')}</option>
                ) : (
                  filterBooks.map((book) => (
                    <option key={book.book_id} value={book.book_id}>
                      {book.title}
                    </option>
                  ))
                )}
              </FilterSelect>
            </FilterDropdown>
          </FilterDropdownsContainer>


          <SearchWrapper style={{ position: 'relative' }}>
            <SearchIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </SearchIcon>
            <SearchInput
              ref={mainSearchInputRef}
              type="text"
              placeholder={t('header.searchPlaceholder')}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (e.target.value.trim()) {
                  setShowSearchResults(true);
                } else {
                  setShowSearchResults(false);
                  setSearchResults([]);
                }
              }}
              onFocus={() => {
                if (searchText.trim() && searchResults.length > 0) {
                  setShowSearchResults(true);
                }
              }}
            />
            {showSearchResults && (
              <SearchResultsPopup ref={searchResultsRef}>
                {isSearching ? (
                  <SearchLoadingState>{t('common.loading')}</SearchLoadingState>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <SearchResultItem
                      key={result.block_id || index}
                      onClick={() => handleResultClick(result)}
                    >
                      <SearchResultContent>
                        <SearchResultTitle>
                          {result.chapter_name || result.text.split('\n').filter(line => line.trim())[0] || 'Untitled'}
                        </SearchResultTitle>
                        <SearchResultSnippet
                          dangerouslySetInnerHTML={{
                            __html: result.highlighted_text || result.text || ''
                          }}
                        />
                      </SearchResultContent>
                      <SearchResultArrow>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </SearchResultArrow>
                    </SearchResultItem>
                  ))
                ) : searchText.trim() ? (
                  <SearchEmptyState>{t('header.noResultsFound')}</SearchEmptyState>
                ) : null}
              </SearchResultsPopup>
            )}
          </SearchWrapper>

          <AddPostButton onClick={() => setIsModalOpen(true)}>
            {t('header.addNewPost')}
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>+</span>
          </AddPostButton>
        </LeftSection>

        <RightSection>
          <div style={{ position: "relative" }}>
            <LanguageSelector
              ref={languageButtonRef}
              onClick={handleLanguageToggle}
            >
              <span style={{ fontSize: "18px" }}>
                {LANGUAGE_FLAGS[selectedLanguage] || "🇺🇸"}
              </span>
              {selectedLanguage.substring(0, 2).toUpperCase()}
              <span style={{ fontSize: "10px" }}>▼</span>
            </LanguageSelector>

            {isLanguageDropdownOpen && (
              <LanguageDropdownContainer ref={languageDropdownRef}>
                <LanguageDropdown>
                  <LanguageSearchInput
                    type="text"
                    placeholder={t('header.languageSelector.searchLanguages')}
                    value={languageSearchQuery}
                    onChange={(e) => setLanguageSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <LanguageList>
                    {filteredLanguages.length > 0 ? (
                      filteredLanguages.map((language) => (
                        <LanguageItem
                          key={language}
                          onClick={() => handleLanguageSelect(language)}
                          $isSelected={selectedLanguage === language}
                        >
                          <span
                            style={{ fontSize: "18px", marginRight: "10px" }}
                          >
                            {LANGUAGE_FLAGS[language] || "🌐"}
                          </span>
                          {language}
                        </LanguageItem>
                      ))
                    ) : (
                      <LanguageItem
                        $isSelected={false}
                        style={{ color: "#999", cursor: "default" }}
                      >
                        {t('header.languageSelector.noLanguagesFound')}
                      </LanguageItem>
                    )}
                  </LanguageList>
                </LanguageDropdown>
              </LanguageDropdownContainer>
            )}
          </div>

          <SearchIconButton ref={searchButtonRef} onClick={handleSearchClick}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </SearchIconButton>

          <NotificationIcon
            onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
            data-notification-icon
          >
            <img src="/notification.png" alt="Notification" />
            {unreadCount > 0 && (
              <NotificationBadge>
                {unreadCount > 99 ? "99+" : unreadCount}
              </NotificationBadge>
            )}
          </NotificationIcon>

          <UserAvatar
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <Avatar>
              {profile?.profile_picture_url && profile.profile_picture_url.trim() !== '' ? (
                <img 
                  src={profile.profile_picture_url} 
                  alt={profile.user_name || 'Profile'} 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                profile?.user_name?.charAt(0).toUpperCase() || '?'
              )}
            </Avatar>
            <UserName>{profile?.user_name}</UserName>
          </UserAvatar>
        </RightSection>
      </HeaderContainer>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={triggerRefresh}
      />

      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />

      {isSearchOpen && (
        <SearchHeaderContainer ref={searchHeaderRef}>
          <SearchHeaderWrapper>
            <MobileFilterDropdownsContainer>
              <FilterDropdown>
                <FilterSelect
                  value={selectedFilterLanguage}
                  onChange={(e) => setSelectedFilterLanguage(e.target.value)}
                  disabled={loadingLanguages}
                >
                  <option value="">{t('header.filter.selectLanguage')}</option>
                  {loadingLanguages ? (
                    <option value="" disabled>{t('common.loading')}</option>
                  ) : (
                    filterLanguages.map((lang) => (
                      <option key={lang.language_id} value={lang.language_id}>
                        {lang.display_name}
                      </option>
                    ))
                  )}
                </FilterSelect>
              </FilterDropdown>
              <FilterDropdown>
                <FilterSelect
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  disabled={loadingBooks}
                >
                  <option value="">{t('header.filter.selectVersion')}</option>
                  {loadingBooks ? (
                    <option value="" disabled>{t('common.loading')}</option>
                  ) : (
                    filterBooks.map((book) => (
                      <option key={book.book_id} value={book.book_id}>
                        {book.title}
                      </option>
                    ))
                  )}
                </FilterSelect>
              </FilterDropdown>
            </MobileFilterDropdownsContainer>
            <SearchInputWrapper>
              <SearchHeaderIconWrapper>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </SearchHeaderIconWrapper>
              <SearchHeaderInput
                ref={searchInputRef}
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchHeaderText}
                onChange={(e) => {
                  setSearchHeaderText(e.target.value);
                  setSearchText(e.target.value); // Sync with main search
                }}
              />
            </SearchInputWrapper>
            <CloseButton onClick={handleCloseSearch}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </CloseButton>
          </SearchHeaderWrapper>
        </SearchHeaderContainer>
      )}
    </>
  );
};

export default Header;
