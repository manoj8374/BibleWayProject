import React, { useState, useEffect, useRef } from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalDescription, TermsCheckboxContainer, TermsCheckboxLabel, TermsErrorText } from './GoogleInfoModal.styles';
import {
  Form,
  InputGroup,
  Label,
  Input,
  Button
} from '../../pages/Auth/Auth.styles';
import {
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
  DropdownSearchInput,
  DropdownItemsContainer,
} from '../../pages/Auth/SignupPage.styles';
import { useI18n } from '../../i18n';
import { showError } from '../../utils/toast';

// Language to flag mapping
const LANGUAGE_FLAGS: { [key: string]: string } = {
  'Afrikaans': '🇿🇦',
  'Arabic': '🇸🇦',
  'Assamese': '🇮🇳',
  'Bengali': '🇮🇳',
  'Bodo': '🇮🇳',
  'Chinese (Mandarin)': '🇨🇳',
  'Dogri': '🇮🇳',
  'Dutch': '🇳🇱',
  'English': '🇺🇸',
  'French': '🇫🇷',
  'German': '🇩🇪',
  'Greek': '🇬🇷',
  'Gujarati': '🇮🇳',
  'Hausa': '🇳🇬',
  'Hindi': '🇮🇳',
  'Italian': '🇮🇹',
  'Kannada': '🇮🇳',
  'Kashmiri': '🇮🇳',
  'Konkani': '🇮🇳',
  'Maithili': '🇮🇳',
  'Malayalam': '🇮🇳',
  'Manipuri': '🇮🇳',
  'Marathi': '🇮🇳',
  'Nepali': '🇳🇵',
  'Odia': '🇮🇳',
  'Polish': '🇵🇱',
  'Portuguese': '🇵🇹',
  'Punjabi': '🇮🇳',
  'Russian': '🇷🇺',
  'Sanskrit': '🇮🇳',
  'Santali': '🇮🇳',
  'Sindhi': '🇮🇳',
  'Spanish': '🇪🇸',
  'Swahili': '🇰🇪',
  'Swedish': '🇸🇪',
  'Tamil': '🇮🇳',
  'Telugu': '🇮🇳',
  'Urdu': '🇮🇳',
  'Yoruba': '🇳🇬',
  'Zulu': '🇿🇦',
};

// All languages sorted alphabetically
const ALL_LANGUAGES = [
  'Afrikaans',
  'Arabic',
  'Assamese',
  'Bengali',
  'Bodo',
  'Chinese (Mandarin)',
  'Dogri',
  'Dutch',
  'English',
  'French',
  'German',
  'Greek',
  'Gujarati',
  'Hausa',
  'Hindi',
  'Italian',
  'Kannada',
  'Kashmiri',
  'Konkani',
  'Maithili',
  'Malayalam',
  'Manipuri',
  'Marathi',
  'Nepali',
  'Odia',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Russian',
  'Sanskrit',
  'Santali',
  'Sindhi',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tamil',
  'Telugu',
  'Urdu',
  'Yoruba',
  'Zulu',
];

// Countries list (alphabetically sorted)
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

interface GoogleInfoModalProps {
  isOpen: boolean;
  onSubmit: (country: string, age: number, preferred_language: string ) => void;
  onClose: () => void;
  loading: boolean;
}

const GoogleInfoModal: React.FC<GoogleInfoModalProps> = ({ isOpen, onSubmit, onClose, loading }) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    country: 'India',
    age: '',
    preferred_language: 'English'
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  // Dropdown states
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [languageSearchQuery, setLanguageSearchQuery] = useState('');
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryButtonRef = useRef<HTMLButtonElement>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Set defaults when modal opens
      setFormData({
        country: 'India',
        age: '',
        preferred_language: 'English'
      });
      setAgreedToTerms(false);
      setShowTermsError(false);
      setIsLanguageDropdownOpen(false);
      setIsCountryDropdownOpen(false);
      setLanguageSearchQuery('');
      setCountrySearchQuery('');
    } else {
      // Clear form when modal closes
      setFormData({
        country: 'India',
        age: '',
        preferred_language: 'English'
      });
      setAgreedToTerms(false);
      setShowTermsError(false);
      setIsLanguageDropdownOpen(false);
      setIsCountryDropdownOpen(false);
      setLanguageSearchQuery('');
      setCountrySearchQuery('');
    }
  }, [isOpen]);

  // Filter languages and countries based on search query
  const filteredLanguages = ALL_LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(languageSearchQuery.toLowerCase())
  );
  
  const filteredCountries = ALL_COUNTRIES.filter(country =>
    country.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(target) &&
        languageButtonRef.current &&
        !languageButtonRef.current.contains(target)
      ) {
        setIsLanguageDropdownOpen(false);
        setLanguageSearchQuery('');
      }
      
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(target) &&
        countryButtonRef.current &&
        !countryButtonRef.current.contains(target)
      ) {
        setIsCountryDropdownOpen(false);
        setCountrySearchQuery('');
      }
    };

    if (isLanguageDropdownOpen || isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen, isCountryDropdownOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageSelect = (language: string) => {
    setFormData(prev => ({ ...prev, preferred_language: language }));
    setIsLanguageDropdownOpen(false);
    setLanguageSearchQuery('');
  };

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({ ...prev, country }));
    setIsCountryDropdownOpen(false);
    setCountrySearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate terms acceptance
    if (!agreedToTerms) {
      setShowTermsError(true);
      showError(t('googleInfoModal.errors.termsRequired') || 'You must agree to the Terms and Conditions to continue');
      return;
    }
    
    // Validation - only age is required since language and country have defaults
    if (!formData.age || !formData.age.trim()) {
      showError(t('googleInfoModal.errors.ageRequired') || 'Age is required');
      return;
    }
    
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 120) {
      showError(t('googleInfoModal.errors.invalidAge') || 'Please enter a valid age between 1 and 120');
      return;
    }
    
    setShowTermsError(false);
    
    // Use defaults if somehow they're missing (shouldn't happen, but safety check)
    const preferred_language = formData.preferred_language || 'English';
    const country = formData.country || 'India';
    
    onSubmit(country, age, preferred_language);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalTitle>{t('googleInfoModal.title')}</ModalTitle>
        <ModalDescription>
          {t('googleInfoModal.description')}
        </ModalDescription>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup style={{ marginBottom: '20px' }}>
            <Label>{t('googleInfoModal.labels.age')}</Label>
            <Input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder={t('googleInfoModal.placeholders.age')}
              min="1"
              max="120"
              required
              disabled={loading}
            />
          </InputGroup>

          <InputGroup style={{ marginBottom: '20px' }}>
            <Label>{t('googleInfoModal.labels.language')}</Label>
            <DropdownContainer>
              <DropdownButton
                ref={languageButtonRef}
                type="button"
                onClick={() => !loading && setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                $isOpen={isLanguageDropdownOpen}
                disabled={loading}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
                  <span>
                    {formData.preferred_language ? (
                      <>
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>
                          {LANGUAGE_FLAGS[formData.preferred_language] || '🌐'}
                        </span>
                        {formData.preferred_language}
                      </>
                    ) : (
                      t('googleInfoModal.placeholders.language')
                    )}
                  </span>
                  <span style={{ fontSize: '10px' }}>▼</span>
                </div>
              </DropdownButton>
              {isLanguageDropdownOpen && (
                <DropdownList ref={languageDropdownRef} style={{ zIndex: 1001 }}>
                  <DropdownSearchInput
                    type="text"
                    placeholder={t('pages.signupPage.searchLanguages')}
                    value={languageSearchQuery}
                    onChange={(e) => setLanguageSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <DropdownItemsContainer>
                    {filteredLanguages.length > 0 ? (
                      filteredLanguages.map((language) => (
                        <DropdownItem
                          key={language}
                          onClick={() => handleLanguageSelect(language)}
                          $isSelected={formData.preferred_language === language}
                        >
                          <span style={{ fontSize: '18px', marginRight: '10px' }}>
                            {LANGUAGE_FLAGS[language] || '🌐'}
                          </span>
                          {language}
                        </DropdownItem>
                      ))
                    ) : (
                      <DropdownItem $isSelected={false} style={{ color: '#999', cursor: 'default' }}>
                        {t('pages.signupPage.noLanguagesFound')}
                      </DropdownItem>
                    )}
                  </DropdownItemsContainer>
                </DropdownList>
              )}
            </DropdownContainer>
          </InputGroup>

          <InputGroup style={{ marginBottom: '20px' }}>
            <Label>{t('googleInfoModal.labels.country')}</Label>
            <DropdownContainer>
              <DropdownButton
                ref={countryButtonRef}
                type="button"
                onClick={() => !loading && setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                $isOpen={isCountryDropdownOpen}
                disabled={loading}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
                  <span>
                    {formData.country || t('googleInfoModal.placeholders.country')}
                  </span>
                  <span style={{ fontSize: '10px' }}>▼</span>
                </div>
              </DropdownButton>
              {isCountryDropdownOpen && (
                <DropdownList ref={countryDropdownRef} style={{ zIndex: 1001 }}>
                  <DropdownSearchInput
                    type="text"
                    placeholder={t('pages.signupPage.searchCountries')}
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <DropdownItemsContainer>
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <DropdownItem
                          key={country}
                          onClick={() => handleCountrySelect(country)}
                          $isSelected={formData.country === country}
                        >
                          {country}
                        </DropdownItem>
                      ))
                    ) : (
                      <DropdownItem $isSelected={false} style={{ color: '#999', cursor: 'default' }}>
                        {t('pages.signupPage.noCountriesFound')}
                      </DropdownItem>
                    )}
                  </DropdownItemsContainer>
                </DropdownList>
              )}
            </DropdownContainer>
          </InputGroup>

          <TermsCheckboxContainer>
            <TermsCheckboxLabel>
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  setShowTermsError(false);
                }}
                disabled={loading}
                required
              />
              <span>
                I agree to the{' '}
                <a 
                  href="/terms-and-conditions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms and Conditions
                </a>
              </span>
            </TermsCheckboxLabel>
          </TermsCheckboxContainer>
          {showTermsError && (
            <TermsErrorText>
              {t('googleInfoModal.errors.termsRequired') || 'You must agree to the Terms and Conditions'}
            </TermsErrorText>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
            <Button 
              type="button" 
              onClick={handleClose} 
              disabled={loading}
              style={{ 
                background: '#E5E7EB', 
                color: '#374151',
                marginTop: 0,
                minWidth: '100px'
              }}
            >
              {t('googleInfoModal.buttons.cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.age || !formData.age.trim() || !agreedToTerms}
              style={{ marginTop: 0, minWidth: '120px' }}
            >
              {loading ? t('googleInfoModal.buttons.creating') : t('googleInfoModal.buttons.continue')}
            </Button>
          </div>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GoogleInfoModal;
