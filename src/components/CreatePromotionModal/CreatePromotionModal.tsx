import React, { useState, useRef } from 'react';
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
  FileInput,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  FilePreview,
  FileList,
  FileItem,
  RemoveFileButton
} from './CreatePromotionModal.styles';
import { adminService } from '../../services/admin/admin.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface CreatePromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPromotionCreated?: () => void;
}

const CreatePromotionModal: React.FC<CreatePromotionModalProps> = ({ 
  isOpen, 
  onClose, 
  onPromotionCreated 
}) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    redirect_link: '',
    meta_data: ''
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showError(t('createPromotionModal.errors.titleRequired'));
      return;
    }

    let priceNum: number | undefined;
    if (formData.price.trim()) {
      priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum < 0) {
        showError(t('createPromotionModal.errors.priceInvalid'));
        return;
      }
    }

    if (!formData.redirect_link.trim()) {
      showError(t('createPromotionModal.errors.redirectLinkRequired'));
      return;
    }

    // Validate URL format
    try {
      new URL(formData.redirect_link);
    } catch {
      showError(t('createPromotionModal.errors.redirectLinkInvalid'));
      return;
    }

    let metaDataString: string | undefined;
    if (formData.meta_data.trim()) {
      try {
        // Validate JSON format
        JSON.parse(formData.meta_data);
        metaDataString = formData.meta_data;
      } catch {
        showError(t('createPromotionModal.errors.metaDataInvalid'));
        return;
      }
    }

    setLoading(true);
    try {
      const response = await adminService.createPromotion({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        price: priceNum,
        redirect_link: formData.redirect_link.trim(),
        meta_data: metaDataString,
        media: mediaFile || undefined,
        images: imageFiles.length > 0 ? imageFiles : undefined
      });

      if (response.success) {
        showSuccess(response.message || t('createPromotionModal.success.promotionCreated'));
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          redirect_link: '',
          meta_data: ''
        });
        setMediaFile(null);
        setImageFiles([]);
        if (mediaInputRef.current) mediaInputRef.current.value = '';
        if (imagesInputRef.current) imagesInputRef.current.value = '';
        onClose();
        if (onPromotionCreated) {
          onPromotionCreated();
        }
      } else {
        showError(response.error || response.message || t('createPromotionModal.errors.failedToCreatePromotion'));
      }
    } catch (error) {
      console.error('Error creating promotion:', error);
      showError(t('createPromotionModal.errors.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        description: '',
        price: '',
        redirect_link: '',
        meta_data: ''
      });
      setMediaFile(null);
      setImageFiles([]);
      if (mediaInputRef.current) mediaInputRef.current.value = '';
      if (imagesInputRef.current) imagesInputRef.current.value = '';
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{t('createPromotionModal.title')}</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>{t('createPromotionModal.labels.title')}</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={t('createPromotionModal.placeholders.enterPromotionTitle')}
                required
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createPromotionModal.labels.description')}</Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('createPromotionModal.placeholders.enterDescription')}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createPromotionModal.labels.price')}</Label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={t('createPromotionModal.placeholders.price')}
                step="0.01"
                min="0"
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createPromotionModal.labels.redirectLink')}</Label>
              <Input
                type="url"
                name="redirect_link"
                value={formData.redirect_link}
                onChange={handleChange}
                placeholder={t('createPromotionModal.placeholders.redirectLink')}
                required
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createPromotionModal.labels.metaData')}</Label>
              <TextArea
                name="meta_data"
                value={formData.meta_data}
                onChange={handleChange}
                placeholder={t('createPromotionModal.placeholders.metaData')}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createPromotionModal.labels.mediaFile')}</Label>
              <FileInput
                ref={mediaInputRef}
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleMediaChange}
                disabled={loading}
              />
              {mediaFile && (
                <FilePreview>
                  {t('createPromotionModal.selected')} {mediaFile.name}
                </FilePreview>
              )}
            </InputGroup>

            <InputGroup>
              <Label>{t('createPromotionModal.labels.images')}</Label>
              <FileInput
                ref={imagesInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                disabled={loading}
              />
              {imageFiles.length > 0 && (
                <FileList>
                  {imageFiles.map((file, index) => (
                    <FileItem key={index}>
                      <span>{file.name}</span>
                      <RemoveFileButton
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={loading}
                      >
                        ×
                      </RemoveFileButton>
                    </FileItem>
                  ))}
                </FileList>
              )}
            </InputGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose} disabled={loading}>
                {t('createPromotionModal.buttons.cancel')}
              </CancelButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? t('createPromotionModal.buttons.creating') : t('createPromotionModal.buttons.createPromotion')}
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default CreatePromotionModal;

