import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/auth.service';
import { showError, showSuccess } from '../../utils/toast';
import { GoogleButton } from '../../pages/Auth/Auth.styles'; // Importing styled button
import GoogleInfoModal from '../GoogleInfoModal/GoogleInfoModal';
import { useI18n } from '../../i18n';

interface GoogleLoginButtonProps {
  buttonText?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ buttonText }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleToken, setGoogleToken] = useState('');

  const handleSubmitToGoole = async (tokenId: string)=>{
      const googleResponse = await authService.continueWithGoogle(tokenId)
      if(googleResponse.success){
        showSuccess(t('googleLoginButton.success.loginSuccessful'))
        navigate('/home')
      }else if(googleResponse.error_code == 'ACCOUNT_NOT_FOUND'){
        setShowGoogleModal(true)
      }else{
        showError(googleResponse.message)
      }
  }

  const handlePopUpSubmission = async(country: string, age: number, preferred_language: string)=>{
    const response = await authService.continueWithGoogle(googleToken,{country, age, preferred_language})
    if(response.success){
      navigate('/home')
    }
  }

  const handleGoogleClick = async()=>{
    const response = await authService.getGoogleToken()
    if(response.success && response.token){
      setGoogleToken(response.token)
      handleSubmitToGoole(response.token)
    }else if(!response.success){
      showError(response.message)
    }
  }


  return (
    <>
      <GoogleButton type="button" onClick={handleGoogleClick} disabled={loading}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {buttonText || t('googleLoginButton.buttonText')}
      </GoogleButton>
      <GoogleInfoModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSubmit={handlePopUpSubmission}
        loading={loading}
      />
    </>
  );
};

export default GoogleLoginButton;
