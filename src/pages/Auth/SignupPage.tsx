import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, type UserSignupData } from '../../services/auth/auth.service';
import { showError, showSuccess } from '../../utils/toast';
import GoogleInfoModal from '../../components/GoogleInfoModal/GoogleInfoModal';
import { useI18n } from '../../i18n/hooks';
import imgBwLogo1 from '../../components/loginpageComponent/Create Responsive UI/src/assets/82047ace63f043a9c60ca2a632bb00501ce9a8b9.png';
import imgAroundTheWorldInEightyDays from '../../components/loginpageComponent/Create Responsive UI/src/assets/9aaae29b6c07406edb1f6a65e4a6657422706cc6.png';
import imgTheWindInTheWillows from '../../components/loginpageComponent/Create Responsive UI/src/assets/aafc66062aa03a5ed3e5308bc867816729d83e4d.png';
import imgLesMiserables from '../../components/loginpageComponent/Create Responsive UI/src/assets/8f6ffdd24b559646ed4084463db4215720009996.png';
import {
  SignupContainer,
  BackgroundContainer,
  Book1,
  Book2,
  Book3,
  CurvedBackground,
  LogoContainer,
  FormContainer,
  FormWrapper,
  Title,
  GoogleButton,
  DividerContainer,
  DividerLine,
  DividerText,
  InputContainer,
  FloatingLabel,
  PasswordToggle,
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
  DropdownSearchInput,
  DropdownItemsContainer,
  SignupButton,
  FooterText,
  FooterLink,
  MobileSignUpContainer,
  MobileLogoImageContainer,
  MobileLogoImage,
  TermsCheckboxContainer,
  TermsCheckboxLabel,
  TermsErrorText,
} from './SignupPage.styles';

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

// SVG paths for icons
const svgPaths = {
  p14eb5a00: "M19.9905 10.1871C19.9905 9.36771 19.9224 8.76977 19.7752 8.14969H10.1992V11.848H15.8201C15.7068 12.7671 15.0948 14.1512 13.7349 15.0813L13.7159 15.2051L16.7436 17.4969L16.9534 17.5174C18.8798 15.7789 19.9905 13.2211 19.9905 10.1871Z",
  p14ade600: "M10.1992 19.9313C12.953 19.9313 15.2648 19.0454 16.9534 17.5174L13.7349 15.0813C12.8737 15.6682 11.7177 16.0779 10.1992 16.0779C7.50211 16.0779 5.21297 14.3395 4.39695 11.9366L4.27734 11.9466L1.12906 14.3273L1.08789 14.4391C2.76508 17.6945 6.21016 19.9313 10.1992 19.9313Z",
  p19c9b3c0: "M4.39695 11.9366C4.18164 11.3166 4.05703 10.6521 4.05703 9.96565C4.05703 9.27908 4.18164 8.61473 4.38563 7.99466L4.37992 7.8626L1.19219 5.44366L1.08789 5.49214C0.396641 6.84305 0 8.36008 0 9.96565C0 11.5712 0.396641 13.0882 1.08789 14.4391L4.39695 11.9366Z",
  p2fa07400: "M10.1992 3.85336C12.1144 3.85336 13.4063 4.66168 14.1429 5.33718L17.0213 2.59107C15.2535 0.985496 12.953 0 10.1992 0C6.21016 0 2.76508 2.23672 1.08789 5.49214L4.38563 7.99466C5.21297 5.59183 7.50211 3.85336 10.1992 3.85336Z",
  p2562cc0: "M6.31875 4.05703C6.23642 3.96423 6.13649 3.88869 6.02475 3.83479C5.91301 3.78089 5.79168 3.7497 5.6678 3.74304C5.54392 3.73637 5.41995 3.75436 5.30307 3.79596C5.1862 3.83756 5.07874 3.90195 4.98693 3.98538C4.89512 4.06882 4.82078 4.16965 4.76822 4.28203C4.71567 4.3944 4.68594 4.51609 4.68076 4.64005C4.67558 4.764 4.69505 4.88775 4.73805 5.00412C4.78105 5.12049 4.84672 5.22716 4.93125 5.31797L7.18594 7.79883C2.92969 10.4109 1.09922 14.4375 1.01836 14.6203C0.965054 14.7402 0.937511 14.87 0.937511 15.0012C0.937511 15.1324 0.965054 15.2621 1.01836 15.382C1.05937 15.4746 2.05195 17.6754 4.25859 19.882C7.19883 22.8211 10.9125 24.375 15 24.375C17.1007 24.387 19.1802 23.9545 21.102 23.1059L23.6801 25.943C23.7624 26.0358 23.8623 26.1113 23.9741 26.1652C24.0858 26.2191 24.2071 26.2503 24.331 26.257C24.4549 26.2636 24.5789 26.2456 24.6958 26.204C24.8126 26.1624 24.9201 26.0981 25.0119 26.0146C25.1037 25.9312 25.1781 25.8304 25.2306 25.718C25.2832 25.6056 25.3129 25.4839 25.3181 25.36C25.3232 25.236 25.3038 25.1123 25.2608 24.9959C25.2178 24.8795 25.1521 24.7728 25.0676 24.682L6.31875 4.05703ZM11.8652 12.9445L16.7484 18.3176C16.0131 18.7044 15.1701 18.8361 14.3518 18.6919C13.5335 18.5477 12.7862 18.1358 12.2274 17.5209C11.6685 16.906 11.3297 16.1229 11.2642 15.2946C11.1986 14.4663 11.4101 13.6397 11.8652 12.9445ZM15 22.5C11.393 22.5 8.2418 21.1887 5.6332 18.6035C4.56248 17.5394 3.65182 16.3256 2.92969 15C3.4793 13.9699 5.23359 11.0871 8.47852 9.21328L10.5879 11.5277C9.77125 12.5736 9.35067 13.8746 9.40047 15.2006C9.45027 16.5266 9.96725 17.7923 10.86 18.774C11.7528 19.7557 12.9639 20.3902 14.2793 20.5653C15.5946 20.7404 16.9295 20.4448 18.048 19.7309L19.7742 21.6293C18.2508 22.2138 16.6317 22.5091 15 22.5ZM15.7031 11.3168C15.4588 11.2702 15.2431 11.1284 15.1033 10.9227C14.9635 10.717 14.9112 10.4642 14.9578 10.2199C15.0044 9.97563 15.1462 9.75987 15.3519 9.6201C15.5576 9.48032 15.8104 9.42799 16.0547 9.47461C17.2495 9.70625 18.3375 10.3179 19.1563 11.2185C19.9751 12.119 20.4808 13.26 20.598 14.4715C20.6212 14.719 20.5451 14.9656 20.3864 15.1571C20.2277 15.3485 19.9995 15.469 19.752 15.4922C19.7227 15.4939 19.6933 15.4939 19.6641 15.4922C19.4297 15.4932 19.2035 15.4064 19.03 15.2489C18.8565 15.0915 18.7482 14.8747 18.7266 14.6414C18.6477 13.8356 18.3108 13.0768 17.7661 12.4778C17.2213 11.8788 16.4978 11.4716 15.7031 11.3168ZM28.9781 15.382C28.9289 15.4922 27.7418 18.1207 25.0688 20.5148C24.9774 20.5993 24.8702 20.6646 24.7533 20.7072C24.6365 20.7498 24.5123 20.7687 24.3881 20.7628C24.2639 20.7569 24.1421 20.7264 24.0297 20.6729C23.9174 20.6195 23.8169 20.5443 23.7339 20.4516C23.651 20.359 23.5873 20.2507 23.5466 20.1332C23.5059 20.0157 23.489 19.8912 23.4968 19.7671C23.5047 19.643 23.5372 19.5217 23.5924 19.4102C23.6476 19.2988 23.7244 19.1994 23.8184 19.118C25.1297 17.9398 26.2314 16.5473 27.0762 15C26.3524 13.6732 25.4398 12.4585 24.3668 11.3941C21.7582 8.81133 18.607 7.5 15 7.5C14.24 7.49907 13.4812 7.56061 12.7313 7.68398C12.6093 7.70555 12.4843 7.70274 12.3634 7.67572C12.2426 7.64869 12.1282 7.59799 12.0271 7.52653C11.9259 7.45508 11.8399 7.36429 11.7741 7.25942C11.7082 7.15454 11.6638 7.03765 11.6433 6.9155C11.6229 6.79336 11.6269 6.66837 11.655 6.54776C11.6832 6.42716 11.7349 6.31332 11.8073 6.21284C11.8797 6.11235 11.9713 6.0272 12.0768 5.96231C12.1822 5.89742 12.2995 5.85407 12.4219 5.83477C13.274 5.69406 14.1363 5.6239 15 5.625C19.0875 5.625 22.8012 7.17891 25.7414 10.1191C27.948 12.3258 28.9406 14.5277 28.9816 14.6203C29.0349 14.7402 29.0625 14.87 29.0625 15.0012C29.0625 15.1324 29.0349 15.2621 28.9816 15.382H28.9781Z",
  p3e83480: "M1671 1100H151C151 1100 209 1067 257 1062C421 1044.92 343 987 427 904C479.868 851.761 686.908 885 735 684C766.025 554.331 666 437 507 396C439.833 378.68 481 299 427 266C362.151 226.37 317 280 233 248C179 216.823 183.5 187.187 173 148C147.845 54.1192 25 20 25 20H1671V1100ZM573.967 900.945C549.934 900.405 523.83 906.056 498.829 919.945C444.829 949.945 435.82 995.443 442.967 1022.12C450.114 1048.79 504.967 1003.71 573.967 1022.12C635.966 1022.12 641.193 966.415 632.966 935.711C628.47 918.935 602.915 901.597 573.967 900.945ZM312.406 146.979C287.594 118.776 261.683 140.179 251.009 156.209C240.334 172.239 258.295 207.673 281.981 219.92C317.238 232.478 329.558 225.298 338.831 211.373C348.104 197.447 337.219 175.182 312.406 146.979Z",
};

const SignupPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserSignupData>({
    user_name: '',
    email: '',
    password: '',
    confirm_password: '',
    country: '',
    age: undefined,
    preferred_language: '',
    profile_picture_url: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleToken, setGoogleToken] = useState('');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate terms acceptance
    if (!agreedToTerms) {
      setShowTermsError(true);
      showError(t('pages.signupPage.termsRequired') || 'You must agree to the Terms and Conditions to continue');
      return;
    }
    
    setLoading(true);
    setShowTermsError(false);

    if (formData.password !== formData.confirm_password) {
      showError(t('pages.signupPage.passwordsDoNotMatch'));
      setLoading(false);
      return;
    }

    const response = await authService.signup(formData);
    if (response.success) {
      if (response.error_code === "EMAIL_VERIFICATION_REQUIRED") {
        navigate('/verify-email', { state: { email: formData.email } });
        showSuccess(response.message);
      } else {
        navigate('/home');
        showSuccess(response.message);
      }
    } else {
      showError(response.message);
    }
    setLoading(false);
  };

  const handleGoogleClick = async () => {
    const response = await authService.getGoogleToken();
    if (response.success && response.token) {
      setGoogleToken(response.token);
      const googleResponse = await authService.continueWithGoogle(response.token);
      if (googleResponse.success) {
        showSuccess(t('pages.signupPage.signupSuccessful'));
        navigate('/home');
      } else if (googleResponse.error_code === 'ACCOUNT_NOT_FOUND') {
        setShowGoogleModal(true);
      } else {
        showError(googleResponse.message);
      }
    } else if (!response.success) {
      showError(response.message);
    }
  };

  const handlePopUpSubmission = async (country: string, age: number, preferred_language: string) => {
    setLoading(true);
    try {
      const response = await authService.continueWithGoogle(googleToken, { country, age, preferred_language });
      if (response.success) {
        showSuccess(t('pages.signupPage.signupSuccessful'));
        setShowGoogleModal(false);
        navigate('/home');
      } else {
        showError(response.message || 'Failed to complete signup');
      }
    } catch (error) {
      console.error('Error completing Google signup:', error);
      showError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.user_name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirm_password.trim() !== '' &&
      formData.age !== undefined &&
      formData.preferred_language !== '' &&
      formData.country !== '' &&
      agreedToTerms
    );
  };

  return (
    <SignupContainer>
      {/* Background with books - hidden on mobile, visible on larger screens */}
      <BackgroundContainer>
        <Book1>
          <img 
            alt="Around the World in Eighty Days" 
            src={imgAroundTheWorldInEightyDays}
          />
        </Book1>

        <Book2>
          <img 
            alt="The Wind in the Willows" 
            src={imgTheWindInTheWillows}
          />
        </Book2>

        <Book3>
          <img 
            alt="Les Misérables" 
            src={imgLesMiserables}
          />
        </Book3>

        <CurvedBackground>
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1686 1120">
            <g filter="url(#filter0_d_1_192)">
              <path d={svgPaths.p3e83480} fill="white" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1120" id="filter0_d_1_192" width="1686" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="-5" />
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_192" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_192" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </CurvedBackground>

        <LogoContainer>
          <img 
            alt="BibleWay Logo" 
            src="/logo.png"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/logo.png';
            }}
          />
        </LogoContainer>
      </BackgroundContainer>

      {/* Mobile/Tablet logo */}

      {/* Signup Form Container */}
      <FormContainer>
      <MobileSignUpContainer>
      <MobileLogoImageContainer>

        <MobileLogoImage 
          alt="BibleWay Logo" 
          src="/logo.png"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/logo.png';
          }}
        />
      </MobileLogoImageContainer>
      </MobileSignUpContainer>
        <FormWrapper onSubmit={handleSubmit}>
          <Title>{t('pages.signupPage.signUp')}</Title>

          {/* Google Sign In Button */}
       
          {/* Or Divider */}
        

          {/* Username Field */}
          <InputContainer>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <FloatingLabel $hasValue={!!formData.user_name}>
              {t('pages.signupPage.username')}
            </FloatingLabel>
          </InputContainer>

          {/* Email Field */}
          <InputContainer>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <FloatingLabel $hasValue={!!formData.email}>
              {t('pages.signupPage.email')}
            </FloatingLabel>
          </InputContainer>

          {/* Password Field */}
          <InputContainer>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <FloatingLabel $hasValue={!!formData.password}>
              {t('pages.signupPage.password')}
            </FloatingLabel>
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg width="30" height="30" fill="none" viewBox="0 0 30 30">
                <path d={svgPaths.p2562cc0} fill="#181821" />
              </svg>
            </PasswordToggle>
          </InputContainer>

          {/* Confirm Password Field */}
          <InputContainer>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <FloatingLabel $hasValue={!!formData.confirm_password}>
              {t('pages.signupPage.confirmPassword')}
            </FloatingLabel>
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <svg width="30" height="30" fill="none" viewBox="0 0 30 30">
                <path d={svgPaths.p2562cc0} fill="#181821" />
              </svg>
            </PasswordToggle>
          </InputContainer>

          {/* Age Field */}
          <InputContainer>
            <input
              type="number"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              required
              placeholder=" "
              min="1"
              max="120"
            />
            <FloatingLabel $hasValue={!!formData.age}>
              {t('pages.signupPage.age')}
            </FloatingLabel>
          </InputContainer>

          {/* Language Dropdown */}
          <div style={{ display: 'flex', gap: '10px' }}>
          <DropdownContainer>
            <DropdownButton
              ref={languageButtonRef}
              type="button"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              $isOpen={isLanguageDropdownOpen}
            >
              <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between', gap: '10px' }}>
              <span>
                {formData.preferred_language ? (
                  <>
                    <span style={{ fontSize: '18px', marginRight: '8px' }}>
                      {LANGUAGE_FLAGS[formData.preferred_language] || '🌐'}
                    </span>
                    {formData.preferred_language}
                  </>
                ) : (
                  t('pages.signupPage.language')
                )}
              </span>
              <div style={{ display: 'flex', alignItems: 'end',justifyContent: 'space-between', gap: '10px' }}>
              <span style={{ fontSize: '10px' }}>▼</span>
              </div>
              </div>
            </DropdownButton>
            {isLanguageDropdownOpen && (
              <DropdownList ref={languageDropdownRef}>
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

          {/* Country Dropdown */}
          <DropdownContainer>
            <DropdownButton
              ref={countryButtonRef}
              type="button"
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              $isOpen={isCountryDropdownOpen}
            >
              <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between', gap: '10px',width: '100%' }}>
              <span>
                {formData.country || t('pages.signupPage.country')}
              </span>
              <div style={{ display: 'flex', alignItems: 'end',justifyContent: 'space-between', gap: '10px', }}>
              <span style={{ fontSize: '10px' }}>▼</span>
              </div>
              </div>
            </DropdownButton>
            {isCountryDropdownOpen && (
              <DropdownList ref={countryDropdownRef}>
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
          </div>
          
          <TermsCheckboxContainer>
            <TermsCheckboxLabel>
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  setShowTermsError(false);
                }}
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
              {t('pages.signupPage.termsRequired') || 'You must agree to the Terms and Conditions'}
            </TermsErrorText>
          )}
          
          <SignupButton type="submit" disabled={loading || !isFormValid()}>
            {loading ? t('pages.signupPage.creatingAccount') : t('pages.signupPage.signUpButton')}
          </SignupButton>
          <DividerContainer>
            <DividerLine />
            <DividerText>{t('pages.signupPage.or')}</DividerText>
          </DividerContainer>
          <GoogleButton type="button" onClick={handleGoogleClick} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g>
                <path d={svgPaths.p14eb5a00} fill="#4285F4" />
                <path d={svgPaths.p14ade600} fill="#34A853" />
                <path d={svgPaths.p19c9b3c0} fill="#FBBC05" />
                <path d={svgPaths.p2fa07400} fill="#EB4335" />
              </g>
            </svg>
            <span>{t('pages.signupPage.signUpUsingGoogle')}</span>
          </GoogleButton>

          {/* Signup Button */}
         

          {/* Login Link */}
          <FooterText>
            <span>{t('pages.signupPage.alreadyHaveAccount')} </span>
            <FooterLink to="/login" replace>
              {t('pages.signupPage.logIn')}
            </FooterLink>
          </FooterText>
          <FooterText>
            <span>{t('pages.signupPage.forgotPassword')} </span>
            <FooterLink to="/forgot-password" replace>
              {t('pages.signupPage.clickHere')}
            </FooterLink>
          </FooterText>
        </FormWrapper>
      </FormContainer>
      
      <GoogleInfoModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSubmit={handlePopUpSubmission}
        loading={loading}
      />
    </SignupContainer>
  );
};

export default SignupPage;
