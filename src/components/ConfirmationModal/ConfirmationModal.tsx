import React from 'react';
import {
    ModalOverlay,
    ModalContainer,
    ModalTitle,
    ModalDescription,
    ButtonContainer,
    CancelButton,
    ConfirmButton
} from './ConfirmationModal.styles';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
    confirmButtonColor?: 'red' | 'blue' | 'green';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    loading = false,
    confirmButtonColor = 'red'
}) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onCancel}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <ModalTitle>{title}</ModalTitle>
                <ModalDescription>{description}</ModalDescription>
                
                <ButtonContainer>
                    <CancelButton
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </CancelButton>
                    <ConfirmButton
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        $color={confirmButtonColor}
                    >
                        {loading ? 'Processing...' : confirmText}
                    </ConfirmButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ConfirmationModal;

