import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 16px;
    
    @media (max-width: 480px) {
        padding: 12px;
    }
`;

export const ModalContainer = styled.div`
    background: white;
    padding: 32px;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: slideIn 0.2s ease-out;
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 480px) {
        padding: 24px;
        max-width: 100%;
        border-radius: 8px;
    }
    
    @media (max-width: 360px) {
        padding: 20px;
    }
`;

export const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #111827;
    text-align: center;
    
    @media (max-width: 480px) {
        font-size: 20px;
        margin-bottom: 10px;
    }
    
    @media (max-width: 360px) {
        font-size: 18px;
    }
`;

export const ModalDescription = styled.p`
    font-size: 14px;
    color: #6B7280;
    margin-bottom: 28px;
    text-align: center;
    line-height: 1.5;
    white-space: pre-line;
    
    @media (max-width: 480px) {
        font-size: 13px;
        margin-bottom: 24px;
    }
    
    @media (max-width: 360px) {
        font-size: 12px;
        margin-bottom: 20px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    
    @media (max-width: 480px) {
        flex-direction: column-reverse;
        gap: 10px;
        margin-top: 20px;
    }
`;

export const CancelButton = styled.button`
    padding: 12px 24px;
    border-radius: 8px;
    border: 1px solid #E5E7EB;
    background: #FFFFFF;
    color: #374151;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 100px;

    &:hover:not(:disabled) {
        background: #F9FAFB;
        border-color: #D1D5DB;
    }

    &:active:not(:disabled) {
        transform: scale(0.98);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        width: 100%;
        padding: 14px;
        min-width: unset;
    }
    
    @media (max-width: 360px) {
        padding: 12px;
        font-size: 14px;
    }
`;

export const ConfirmButton = styled.button<{ $color: 'red' | 'blue' | 'green' }>`
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    background: ${props => {
        switch (props.$color) {
            case 'blue':
                return 'linear-gradient(to right, #3B82F6, #2563EB)';
            case 'green':
                return 'linear-gradient(to right, #10B981, #059669)';
            case 'red':
            default:
                return 'linear-gradient(to right, #EF4444, #DC2626)';
        }
    }};
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 120px;

    &:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${props => {
            switch (props.$color) {
                case 'blue':
                    return 'rgba(59, 130, 246, 0.3)';
                case 'green':
                    return 'rgba(16, 185, 129, 0.3)';
                case 'red':
                default:
                    return 'rgba(239, 68, 68, 0.3)';
            }
        }};
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    @media (max-width: 480px) {
        width: 100%;
        padding: 14px;
        min-width: unset;
    }
    
    @media (max-width: 360px) {
        padding: 12px;
        font-size: 14px;
    }
`;

