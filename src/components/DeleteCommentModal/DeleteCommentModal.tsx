import React from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, ModalDescription, ButtonContainer, CancelButton, ConfirmButton } from './DeleteCommentModal.styles';
import { useI18n } from '../../i18n';

interface DeleteCommentModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const DeleteCommentModal: React.FC<DeleteCommentModalProps> = ({ 
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
        <ModalTitle>{t('comments.deleteModal.title') || 'Delete Comment'}</ModalTitle>
        <ModalDescription>
          {t('comments.deleteModal.description') || 'Are you sure you want to delete this comment? This action cannot be undone.'}
        </ModalDescription>
        
        <ButtonContainer>
          <CancelButton 
            type="button" 
            onClick={onCancel}
            disabled={loading}
          >
            {t('comments.deleteModal.cancel') || 'Cancel'}
          </CancelButton>
          <ConfirmButton 
            type="button" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (t('comments.deleteModal.deleting') || 'Deleting...') : (t('comments.deleteModal.delete') || 'Delete')}
          </ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteCommentModal;

