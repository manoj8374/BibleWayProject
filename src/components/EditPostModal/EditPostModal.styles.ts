import styled from 'styled-components';

export const Overlay = styled.div`
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
`;

export const ModalContainer = styled.div`
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
        max-width: 100%;
        max-height: 95vh;
        border-radius: 8px;
    }
`;

export const ModalHeader = styled.div`
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const ModalBody = styled.div`
    padding: 24px;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const InputGroup = styled.div`
    margin-bottom: 20px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const Label = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    transition: border-color 0.2s;
    
    &:focus {
        outline: none;
        border-color: #0E3A66;
    }
    
    &:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
    transition: border-color 0.2s;
    
    &:focus {
        outline: none;
        border-color: #0E3A66;
    }
    
    &:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
    }
`;

export const UploadArea = styled.div<{ disabled?: boolean }>`
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 32px;
    text-align: center;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s;
    background-color: ${props => props.disabled ? '#f9fafb' : 'white'};
    opacity: ${props => props.disabled ? 0.6 : 1};
    
    &:hover {
        ${props => !props.disabled && `
            border-color: #0E3A66;
            background-color: #f9fafb;
        `}
    }
`;

export const UploadIcon = styled.div`
    color: #6b7280;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    
    svg {
        width: 48px;
        height: 48px;
    }
`;

export const UploadText = styled.div`
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
`;

export const MediaPreview = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 12px;
    
    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
    }
`;

export const MediaPreviewItem = styled.div`
    position: relative;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f3f4f6;
    
    img, video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    audio {
        width: 100%;
    }
`;

export const MediaRemoveButton = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s;
    
    &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.9);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    svg {
        width: 16px;
        height: 16px;
    }
`;

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
`;

export const FileItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
`;

export const FileRemoveButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #ef4444;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    
    &:hover {
        color: #dc2626;
    }
`;

export const AddMoreButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background-color: #f3f4f6;
        border-color: #9ca3af;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    
    @media (max-width: 480px) {
        flex-direction: column-reverse;
    }
`;

export const CancelButton = styled.button`
    padding: 12px 24px;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
        background-color: #f9fafb;
        border-color: #9ca3af;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const SaveButton = styled.button`
    padding: 12px 24px;
    background-color: #0E3A66;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
        background-color: #0a2d4d;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    @media (max-width: 480px) {
        width: 100%;
    }
`;

