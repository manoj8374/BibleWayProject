import React, { useState } from 'react';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
  InputGroup,
  Label,
  Input,
  TextArea,
  Select,
  FileInput,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  FilePreview
} from './CreateCategoryModal.styles';
import { adminService } from '../../services/admin/admin.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated?: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onCategoryCreated 
}) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    category_name: '',
    description: '',
    display_order: 0
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'display_order' ? parseInt(value) || 0 : value 
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category_name.trim()) {
      showError(t('createCategoryModal.errors.categoryNameRequired'));
      return;
    }

    setLoading(true);
    try {
      const response = await adminService.createCategory({
        category_name: formData.category_name.trim(),
        description: formData.description.trim() || undefined,
        display_order: formData.display_order || undefined,
        cover_image: coverImage || undefined
      });

      if (response.success) {
        showSuccess(response.message || t('createCategoryModal.success.categoryCreated'));
        // Reset form
        setFormData({
          category_name: '',
          description: '',
          display_order: 0
        });
        setCoverImage(null);
        onClose();
        if (onCategoryCreated) {
          onCategoryCreated();
        }
      } else {
        showError(response.error || response.message || t('createCategoryModal.errors.failedToCreateCategory'));
      }
    } catch (error) {
      console.error('Error creating category:', error);
      showError(t('createCategoryModal.errors.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        category_name: '',
        description: '',
        display_order: 0
      });
      setCoverImage(null);
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{t('createCategoryModal.title')}</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>{t('createCategoryModal.labels.categoryName')}</Label>
              <Select 
                name="category_name" 
                value={formData.category_name} 
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">{t('createCategoryModal.placeholders.selectCategoryName')}</option>
                <option value="SEGREGATE_BIBLES">SEGREGATE_BIBLES</option>
                <option value="NORMAL_BIBLES">NORMAL_BIBLES</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>{t('createCategoryModal.labels.description')}</Label>
              <TextArea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                placeholder={t('createCategoryModal.placeholders.enterDescription')}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createCategoryModal.labels.displayOrder')}</Label>
              <Input 
                type="number" 
                name="display_order" 
                value={formData.display_order} 
                onChange={handleChange}
                placeholder="0"
                min="0"
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createCategoryModal.labels.coverImage')}</Label>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              {coverImage && (
                <FilePreview>
                  {t('createCategoryModal.selected')} {coverImage.name}
                </FilePreview>
              )}
            </InputGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose} disabled={loading}>
                {t('createCategoryModal.buttons.cancel')}
              </CancelButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? t('createCategoryModal.buttons.creating') : t('createCategoryModal.buttons.createCategory')}
              </SubmitButton>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default CreateCategoryModal;

