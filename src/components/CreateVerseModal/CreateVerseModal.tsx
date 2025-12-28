import React, { useState, useEffect } from 'react';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
  Form,
  InputGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  InfoBox
} from './CreateVerseModal.styles';
import { adminService } from '../../services/admin/admin.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface CreateVerseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerseCreated?: () => void;
  editingVerse?: {
    verse_id: string;
    title?: string;
    description: string;
  } | null;
}

const CreateVerseModal: React.FC<CreateVerseModalProps> = ({ 
  isOpen, 
  onClose, 
  onVerseCreated,
  editingVerse
}) => {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form when editingVerse changes
  useEffect(() => {
    if (editingVerse) {
      setTitle(editingVerse.title || '');
      setDescription(editingVerse.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingVerse, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showError(t('createVerseModal.errors.descriptionRequired'));
      return;
    }

    setLoading(true);
    try {
      let response;
      
      if (editingVerse) {
        // Update existing verse
        const updateData: { verse_id: string; title?: string; description?: string } = {
          verse_id: editingVerse.verse_id,
          description: description.trim()
        };
        
        if (title.trim()) {
          updateData.title = title.trim();
        }
        
        response = await adminService.updateVerse(updateData);
      } else {
        // Create new verse
        response = await adminService.createVerse({
          title: title.trim() || undefined,
          description: description.trim()
        });
      }

      if (response.success) {
        showSuccess(
          response.message || 
          (editingVerse 
            ? t('createVerseModal.success.verseUpdated')
            : t('createVerseModal.success.verseCreated')
          )
        );
        // Reset form
        setTitle('');
        setDescription('');
        onClose();
        if (onVerseCreated) {
          onVerseCreated();
        }
      } else {
        showError(
          response.error || 
          response.message || 
          response.detail || 
          (editingVerse
            ? t('createVerseModal.errors.failedToUpdateVerse')
            : t('createVerseModal.errors.failedToCreateVerse')
          )
        );
      }
    } catch (error) {
      console.error(`Error ${editingVerse ? 'updating' : 'creating'} verse:`, error);
      showError(t('createVerseModal.errors.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{editingVerse ? t('createVerseModal.editTitle') : t('createVerseModal.title')}</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <InfoBox>
            <strong>Note:</strong> {t('createVerseModal.note')}
          </InfoBox>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>{t('createVerseModal.labels.title')}</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('createVerseModal.placeholders.title')}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createVerseModal.labels.quoteDescription')}</Label>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('createVerseModal.placeholders.quoteDescription')}
                required
                disabled={loading}
              />
            </InputGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose} disabled={loading}>
                {t('createVerseModal.buttons.cancel')}
              </CancelButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading 
                  ? (editingVerse 
                      ? t('createVerseModal.buttons.updating')
                      : t('createVerseModal.buttons.publishing')
                    )
                  : (editingVerse 
                      ? t('createVerseModal.buttons.updateQuote')
                      : t('createVerseModal.buttons.publishQuote')
                    )
                }
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default CreateVerseModal;

