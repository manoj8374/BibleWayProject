import React from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalDescription, ButtonContainer, CancelButton, ConfirmButton } from './LogoutConfirmationModal.styles';
import { useI18n } from '../../i18n';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  loading = false 
}) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalTitle>{t('logoutConfirmation.title')}</ModalTitle>
        <ModalDescription>
          {t('logoutConfirmation.description')}
        </ModalDescription>
        
        <ButtonContainer>
          <CancelButton 
            type="button" 
            onClick={onCancel}
            disabled={loading}
          >
            {t('logoutConfirmation.buttons.cancel')}
          </CancelButton>
          <ConfirmButton 
            type="button" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? t('logoutConfirmation.buttons.loggingOut') : t('logoutConfirmation.buttons.confirm')}
          </ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LogoutConfirmationModal;

