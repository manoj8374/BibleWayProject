import styled from "styled-components";

export const ContentContainer = styled.div`
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ChapterHeader = styled.div`
  padding-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
`;

export const ChapterTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const ChapterDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
`;

export const ChapterMeta = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
  font-size: 14px;
  color: #9ca3af;
  flex-wrap: wrap;
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  height: auto;
`;

export const BlocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PageContainer = styled.div`
  padding: 24px 16px;
  background-color: #f3f4f6;
  border-radius: 12px;
  border-bottom: 2px solid #e5e7eb;
  page-break-after: always;

  hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 0px solid #d1d9e0b3 !important;
    height: 0.25em;
    padding: 0;
    margin: 1.5rem 0;
    background-color: #d1d9e0 !important;
    border: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  @media print {
    page-break-after: always;
    page-break-inside: avoid;
  }
`;

export const BlockItem = styled.div`
  line-height: 1.8;
  font-size: 16px;
  color: #374151;

  /* Search Highlight styles */
  .highlight-match {
    background-color: #fef08a; /* yellow-200 */
    color: #000;
    padding: 0 2px;
    border-radius: 2px;
    font-weight: 500;
  }

  /* Prevent selection styling conflicts */
  ::selection {
    background: rgba(59, 130, 246, 0.3);
  }

  ::-moz-selection {
    background: rgba(59, 130, 246, 0.3);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 100px 20px;
  color: #6b7280;
`;

export const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const EmptyStateText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #1a1a1a;
`;

export const EmptyStateSubtext = styled.p`
  font-size: 14px;
  margin: 0;
  color: #6b7280;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 2px solid #e5e7eb;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${(props) => (props.disabled ? "#f3f4f6" : "#0860C4")};
  color: ${(props) => (props.disabled ? "#9ca3af" : "white")};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background: #0651a8;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const PageInfo = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  text-align: center;

  span {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

/* ---------------- Text-to-Speech Styled Components ---------------- */

export const TTSControlsContainer = styled.div`
  margin-top: 24px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

export const PageSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
`;

export const PageCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  input[type="checkbox"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
    accent-color: #0860C4;
  }
`;

export const PlayButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${(props) => (props.disabled ? "#f3f4f6" : "#0860C4")};
  color: ${(props) => (props.disabled ? "#9ca3af" : "white")};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background: #0651a8;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PagePlayButton = styled.button<{ 
  disabled?: boolean; 
  isPlaying?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${(props) => 
    props.isPlaying ? "#10b981" : 
    props.disabled ? "#f3f4f6" : "#0860C4"};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background: ${(props) => props.isPlaying ? "#059669" : "#0651a8"};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #0860C4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const AudioPlayer = styled.audio`
  display: none;
`;

export const TTSHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TTSTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const SelectAllButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  color: #0860C4;
  border: 1px solid #0860C4;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #0860C4;
    color: white;
  }
`;

export const LanguageDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

export const LanguageLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
`;

export const LanguageSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #1a1a1a;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px;

  &:hover {
    border-color: #0860C4;
  }

  &:focus {
    outline: none;
    border-color: #0860C4;
    box-shadow: 0 0 0 3px rgba(8, 96, 196, 0.1);
  }

  option {
    padding: 8px;
  }
`;

export const BookmarkButton = styled.button<{ $isBookmarked: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${props => props.$isBookmarked ? "#0860C4" : "transparent"};
  color: ${props => props.$isBookmarked ? "white" : "#0860C4"};
  border: 1px solid #0860C4;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover {
    background: ${props => props.$isBookmarked ? "#0651a8" : "#0860C4"};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const HighlightButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${props => props.$isActive ? "#0860C4" : "transparent"};
  color: ${props => props.$isActive ? "white" : "#0860C4"};
  border: 1px solid #0860C4;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover {
    background: ${props => props.$isActive ? "#0651a8" : "#0860C4"};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

export const ColorPickerLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
`;

export const ColorOptions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ColorOption = styled.button<{ $color: string; $isSelected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid ${props => props.$isSelected ? "#0860C4" : "transparent"};
  background-color: ${props => props.$color};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isSelected ? "0 0 0 2px white, 0 0 0 4px #0860C4" : "0 2px 4px rgba(0, 0, 0, 0.1)"};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;