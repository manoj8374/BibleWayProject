import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { adminService } from '../../../../../services/admin/admin.service';
import { showError } from '../../../../../utils/toast';
import { parseMarkdown } from '../../../../../utils/markdown';
import { astToBlocks } from '../../../../../utils/markdown/astToBlocks';
import normalizeMarkdown from '../../../../../utils/markdown/normalizeMarkdown';
import { blocksToDTO, type BlockDTO } from '../../../../../utils/markdown/convertDTO';

interface AddChapterModalProps {
  isOpen: boolean;
  bookId: string;
  onClose: () => void;
  onChapterUploaded: () => void;
}

interface ChapterDetails {
  title: string;
  description: string;
  video_url: string;
  metadata: {
    chapterName: string;
    blocks: BlockDTO[];
  };
}

interface FileWithDetails {
  file: File;
  details: ChapterDetails;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

const DropZone = styled.div<{ $isDragging: boolean }>`
  border: 3px dashed ${props => props.$isDragging ? '#8B1F1F' : '#e0e0e0'};
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  background: ${props => props.$isDragging ? 'rgba(139, 31, 31, 0.05)' : '#fafafa'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #8B1F1F;
    background: rgba(139, 31, 31, 0.05);
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const UploadText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
`;

const UploadSubText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ChapterFormList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChapterFormCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
`;

const ChapterFormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ChapterNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ChapterBadge = styled.span`
  background: #8B1F1F;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 14px;
`;

const FileName = styled.span`
  font-size: 14px;
  color: #6b7280;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const Required = styled.span`
  color: #ef4444;
  margin-left: 4px;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#8B1F1F'};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#8B1F1F'};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorText = styled.span`
  display: block;
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button<{ $variant?: 'primary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$variant === 'primary' ? '#8B1F1F' : '#f3f4f6'};
  color: ${props => props.$variant === 'primary' ? 'white' : '#374151'};

  &:hover {
    background: ${props => props.$variant === 'primary' ? '#6b1616' : '#e5e7eb'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 16px 0 0 0;
  text-align: center;
`;

const ParsingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10;
  border-radius: 12px;
`;

const ParsingText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ParsingProgress = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const Spinner = styled.div`
  border: 3px solid #f3f4f6;
  border-top: 3px solid #8B1F1F;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const AddChapterModal: React.FC<AddChapterModalProps> = ({
  isOpen,
  bookId,
  onClose,
  onChapterUploaded
}) => {
  const [step, setStep] = useState<'select' | 'details'>('select'); 
  const [filesWithDetails, setFilesWithDetails] = useState<FileWithDetails[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parsingProgress, setParsingProgress] = useState({ current: 0, total: 0 });
  const [errors, setErrors] = useState<Record<number, { title?: string; description?: string; video_url?: string }>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const parseMarkdownFile = async (file: File): Promise<BlockDTO[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          
          // Parse markdown
          const normalizedText = normalizeMarkdown(text);
          const tree = parseMarkdown(normalizedText);
          const parsedBlocks = astToBlocks(tree, normalizedText);
          
          // Convert to DTO
          const blockDTOs = blocksToDTO(parsedBlocks);
          
          resolve(blockDTOs);
        } catch (error) {
          console.error('Error parsing markdown:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  };

  const processFiles = async (files: File[]) => {
    setParsing(true);
    setParsingProgress({ current: 0, total: files.length });
    
    const newFilesWithDetails: FileWithDetails[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setParsingProgress({ current: i + 1, total: files.length });
      
      try {
        const blocks = await parseMarkdownFile(file);
        
        newFilesWithDetails.push({
          file,
          details: {
            title: file.name.replace(/\.(md|markdown)$/, ''),
            description: '',
            video_url: '',
            metadata: {
              chapterName: file.name.replace(/\.(md|markdown)$/, ''),
              blocks: blocks
            }
          }
        });
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        showError(`Failed to parse ${file.name}`);
      }
    }
    
    setFilesWithDetails(prev => [...prev, ...newFilesWithDetails]);
    setParsing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const markdownFiles = droppedFiles.filter(file =>
      file.name.endsWith('.md') || file.name.endsWith('.markdown')
    );

    if (markdownFiles.length > 0) {
      await processFiles(markdownFiles);
    } else {
      showError('Please upload only .md or .markdown files');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      await processFiles(Array.from(selectedFiles));
    }
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    setFilesWithDetails(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleDetailChange = (index: number, field: 'title' | 'description' | 'video_url', value: string) => {
    setFilesWithDetails(prev => prev.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          details: {
            ...item.details,
            [field]: value
          }
        };
      }
      return item;
    }));

    // Clear error for this field
    if (errors[index]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: undefined
        }
      }));
    }
  };

  const validateDetails = (): boolean => {
    const newErrors: Record<number, { title?: string; description?: string }> = {};
    let hasError = false;

    filesWithDetails.forEach((item, index) => {
      if (!item.details.title.trim()) {
        newErrors[index] = { ...newErrors[index], title: 'Title is required' };
        hasError = true;
      }
    });

    setErrors(newErrors);
    return !hasError;
  };

  const handleNextStep = () => {
    if (filesWithDetails.length === 0) {
      showError('Please select at least one file');
      return;
    }
    setStep('details');
  };

  const handleBackToSelect = () => {
    setStep('select');
  };

  const handleUpload = async () => {
    if (!validateDetails()) {
      showError('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('book_id', bookId);

    // Build bookdata array
    const bookdata = filesWithDetails.map(item => ({
      title: item.details.title,
      description: item.details.description,
      video_url: item.details.video_url || null,
      metadata: item.details.metadata
    }));
    formData.append('bookdata', JSON.stringify(bookdata));

    // Append files with indexed names
    filesWithDetails.forEach((item, index) => {
      formData.append(`file_${index}`, item.file);
    });

    setUploading(true);
    try {
      //here for each chapter call this function and update the form data accordingly
      
      const response = await adminService.uploadChapters(formData);
      if (response.success) {
        onChapterUploaded();
        handleReset();
      } else {
        showError(response.message || response.error || 'Failed to upload chapters');
      }
    } catch (error) {
      console.error('Error uploading chapters:', error);
      showError('An unexpected error occurred');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFilesWithDetails([]);
    setStep('select');
    setErrors({});
    setParsing(false);
    setParsingProgress({ current: 0, total: 0 });
  };

  const handleClose = () => {
    if (!uploading && !parsing) {
      handleReset();
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Title>Upload Chapters</Title>
            <StepIndicator>
              Step {step === 'select' ? '1' : '2'} of 2
            </StepIndicator>
          </div>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          {step === 'select' ? (
            <>
              <div style={{ position: 'relative' }}>
                <DropZone
                  $isDragging={isDragging}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={parsing ? undefined : handleClick}
                  style={{ opacity: parsing ? 0.5 : 1, pointerEvents: parsing ? 'none' : 'auto' }}
                >
                  <UploadIcon>📤</UploadIcon>
                  <UploadText>
                    {isDragging ? 'Drop files here' : 'Drag & Drop Files Here'}
                  </UploadText>
                  <UploadSubText>or click to browse</UploadSubText>
                  <UploadSubText style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
                    Accepted: .md, .markdown | Max: 50 files
                  </UploadSubText>
                </DropZone>
                
                {parsing && (
                  <ParsingOverlay>
                    <Spinner />
                    <ParsingText>Parsing Markdown Files...</ParsingText>
                    <ParsingProgress>
                      {parsingProgress.current} of {parsingProgress.total} files processed
                    </ParsingProgress>
                  </ParsingOverlay>
                )}
              </div>

              {filesWithDetails.length > 0 && !parsing && (
                <>
                  <HelperText>
                    {filesWithDetails.length} {filesWithDetails.length === 1 ? 'file' : 'files'} selected
                  </HelperText>
                  <ButtonGroup>
                    <Button onClick={handleClose} disabled={uploading || parsing}>
                      Cancel
                    </Button>
                    <Button $variant="primary" onClick={handleNextStep} disabled={parsing}>
                      Next: Add Details
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </>
          ) : (
            <>
              <ChapterFormList>
                {filesWithDetails.map((item, index) => (
                  <ChapterFormCard key={index}>
                    <ChapterFormHeader>
                      <ChapterNumber>
                        <ChapterBadge>Chapter {index + 1}</ChapterBadge>
                        <FileName title={item.file.name}>📄 {item.file.name}</FileName>
                      </ChapterNumber>
                      <RemoveButton onClick={() => handleRemoveFile(index)}>
                        Remove
                      </RemoveButton>
                    </ChapterFormHeader>

                    <FormGroup>
                      <Label>
                        Title<Required>*</Required>
                      </Label>
                      <Input
                        type="text"
                        value={item.details.title}
                        onChange={(e) => handleDetailChange(index, 'title', e.target.value)}
                        placeholder="Enter chapter title"
                        $hasError={!!errors[index]?.title}
                      />
                      {errors[index]?.title && <ErrorText>{errors[index].title}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                      <Label>
                        Description
                      </Label>
                      <TextArea
                        value={item.details.description}
                        onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                        placeholder="Enter chapter description (optional)"
                        $hasError={!!errors[index]?.description}
                      />
                      {errors[index]?.description && <ErrorText>{errors[index].description}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                      <Label>Video URL</Label>
                      <Input
                        type="url"
                        value={item.details.video_url}
                        onChange={(e) => handleDetailChange(index, 'video_url', e.target.value)}
                        placeholder="Enter video URL (optional)"
                      />
                    </FormGroup>
                  </ChapterFormCard>
                ))}
              </ChapterFormList>

              <ButtonGroup>
                <Button onClick={handleBackToSelect} disabled={uploading}>
                  Back
                </Button>
                <Button onClick={handleClose} disabled={uploading}>
                  Cancel
                </Button>
                <Button
                  $variant="primary"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : `Upload ${filesWithDetails.length} ${filesWithDetails.length === 1 ? 'Chapter' : 'Chapters'}`}
                </Button>
              </ButtonGroup>
            </>
          )}
        </ModalBody>

        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown"
          multiple
          onChange={handleFileInput}
        />
      </ModalContainer>
    </Overlay>
  );
};
