import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../../services/auth/auth.service';
import { showError, showSuccess } from '../../utils/toast';
import imgBwLogo1 from '../../components/loginpageComponent/Create Responsive UI/src/assets/82047ace63f043a9c60ca2a632bb00501ce9a8b9.png';
import imgAroundTheWorldInEightyDays from '../../components/loginpageComponent/Create Responsive UI/src/assets/9aaae29b6c07406edb1f6a65e4a6657422706cc6.png';
import imgTheWindInTheWillows from '../../components/loginpageComponent/Create Responsive UI/src/assets/aafc66062aa03a5ed3e5308bc867816729d83e4d.png';
import imgLesMiserables from '../../components/loginpageComponent/Create Responsive UI/src/assets/8f6ffdd24b559646ed4084463db4215720009996.png';
import {
  VerifyEmailContainer,
  BackgroundContainer,
  BookImage,
  Book1,
  Book2,
  Book3,
  CurvedBackground,
  LogoContainer,
  MobileLogoContainer,
  FormContainer,
  FormWrapper,
  Title,
  Description,
  EmailDisplay,
  OTPInputContainer,
  OTPInput,
  VerifyButton,
  ResendLink,
  BackLink,
  FooterText,
  FooterLink,
} from './VerifyEmailPage.styles';

// SVG paths for icons
const svgPaths = {
  p3e83480: "M1671 1100H151C151 1100 209 1067 257 1062C421 1044.92 343 987 427 904C479.868 851.761 686.908 885 735 684C766.025 554.331 666 437 507 396C439.833 378.68 481 299 427 266C362.151 226.37 317 280 233 248C179 216.823 183.5 187.187 173 148C147.845 54.1192 25 20 25 20H1671V1100ZM573.967 900.945C549.934 900.405 523.83 906.056 498.829 919.945C444.829 949.945 435.82 995.443 442.967 1022.12C450.114 1048.79 504.967 1003.71 573.967 1022.12C635.966 1022.12 641.193 966.415 632.966 935.711C628.47 918.935 602.915 901.597 573.967 900.945ZM312.406 146.979C287.594 118.776 261.683 140.179 251.009 156.209C240.334 172.239 258.295 207.673 281.981 219.92C317.238 232.478 329.558 225.298 338.831 211.373C348.104 197.447 337.219 175.182 312.406 146.979Z",
};

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    // Get email from location state
    const stateEmail = (location.state as { email?: string })?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      // If no email in state, redirect to signup
      navigate('/signup');
    }
  }, [location, navigate]);

  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) {
      return `${localPart[0]}***@${domain}`;
    }
    return `${localPart[0]}${'*'.repeat(Math.min(localPart.length - 2, 3))}${localPart[localPart.length - 1]}@${domain}`;
  };

  const handleOTPChange = (index: number, value: string) => {
    // Only allow numeric input
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('').slice(0, 4);
      setOtp(newOtp);
      inputRefs[3].current?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      showError('Please enter the complete 4-digit code');
      return;
    }

    if (!email) {
      showError('Email not found. Please try signing up again.');
      navigate('/signup');
      return;
    }

    setLoading(true);
    const response = await authService.verifyEmail(email, otpString);
    
    if (response.success) {
      showSuccess(response.message || 'Email verified successfully');
      navigate('/home');
    } else {
      if (response.error_code === 'EMAIL_ALREADY_VERIFIED') {
        showError(response.message || 'Email is already verified');
        navigate('/login');
      } else if (response.error_code === 'USER_NOT_FOUND') {
        showError(response.message || 'User not found');
        navigate('/signup');
      } else {
        showError(response.message || 'Verification failed. Please try again.');
        // Clear OTP on error
        setOtp(['', '', '', '']);
        inputRefs[0].current?.focus();
      }
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!email) {
      showError('Email not found. Please try signing up again.');
      navigate('/signup');
      return;
    }

    setResendLoading(true);
    const response = await authService.resendVerificationEmail(email);
    
    if (response.success) {
      showSuccess(response.message || 'Verification email sent successfully. Please check your email.');
      // Clear OTP
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    } else {
      if (response.error_code === 'EMAIL_ALREADY_VERIFIED') {
        showError(response.message || 'Email is already verified');
        navigate('/login');
      } else if (response.error_code === 'USER_NOT_FOUND') {
        showError(response.message || 'User not found');
        navigate('/signup');
      } else {
        showError(response.message || 'Failed to resend verification email. Please try again.');
      }
    }
    setResendLoading(false);
  };

  // Auto-submit when all 4 digits are entered
  useEffect(() => {
    const otpString = otp.join('');
    if (otpString.length === 4 && !loading && email) {
      const timer = setTimeout(async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 4) return;
        
        setLoading(true);
        const response = await authService.verifyEmail(email, otpValue);
        
        if (response.success) {
          showSuccess(response.message || 'Email verified successfully');
          navigate('/home');
        } else {
          if (response.error_code === 'EMAIL_ALREADY_VERIFIED') {
            showError(response.message || 'Email is already verified');
            navigate('/login');
          } else if (response.error_code === 'USER_NOT_FOUND') {
            showError(response.message || 'User not found');
            navigate('/signup');
          } else {
            showError(response.message || 'Verification failed. Please try again.');
            setOtp(['', '', '', '']);
            inputRefs[0].current?.focus();
          }
        }
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp.join(''), loading, email]);

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <VerifyEmailContainer>
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
      </BackgroundContainer>

      {/* Logo - Desktop */}
      <LogoContainer>
        <img src="/logo.png" alt="BibleWay Logo" />
      </LogoContainer>

      {/* Logo - Mobile */}
      <MobileLogoContainer>
        <img src="/logo.png" alt="BibleWay Logo" />
      </MobileLogoContainer>

      <FormContainer>
        <FormWrapper>
          <Title>Verify Your Email</Title>
          <Description>
            We've sent a 4-digit verification code to:
          </Description>
          <EmailDisplay>{maskEmail(email)}</EmailDisplay>
          
          <OTPInputContainer onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <OTPInput
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleOTPKeyDown(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </OTPInputContainer>

          <VerifyButton 
            type="button" 
            onClick={handleVerify} 
            disabled={loading || otp.join('').length !== 4}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </VerifyButton>

          <ResendLink 
            type="button" 
            onClick={handleResend} 
            disabled={resendLoading}
          >
            {resendLoading ? 'Sending...' : "Didn't receive the code? Resend"}
          </ResendLink>

          <BackLink to="/login">
            Back to Login
          </BackLink>

          <FooterText>
            <span>Don't have an account? </span>
            <FooterLink to="/signup">
              Sign up
            </FooterLink>
          </FooterText>
        </FormWrapper>
      </FormContainer>
    </VerifyEmailContainer>
  );
};

export default VerifyEmailPage;

