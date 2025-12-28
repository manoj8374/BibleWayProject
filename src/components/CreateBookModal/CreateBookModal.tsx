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
  Select,
  FileInput,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  FilePreview,
  GridRow
} from './CreateBookModal.styles';
import { adminService, type Category, type AgeGroup, type Language } from '../../services/admin/admin.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCreated?: () => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({ 
  isOpen, 
  onClose, 
  onBookCreated 
}) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    category_id: '',
    age_group_id: '',
    language_id: '',
    title: '',
    description: '',
    book_order: 0
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingAgeGroups, setLoadingAgeGroups] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await adminService.getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          showError(response.message || t('createBookModal.errors.failedToLoadCategories'));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        showError(t('createBookModal.errors.failedToLoadCategories'));
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchAgeGroups = async () => {
      setLoadingAgeGroups(true);
      try {
        const response = await adminService.getAgeGroups();
        if (response.success && response.data) {
          setAgeGroups(response.data);
        } else {
          showError(response.message || t('createBookModal.errors.failedToLoadAgeGroups'));
        }
      } catch (error) {
        console.error('Error fetching age groups:', error);
        showError(t('createBookModal.errors.failedToLoadAgeGroups'));
      } finally {
        setLoadingAgeGroups(false);
      }
    };

    const fetchLanguages = async () => {
      setLoadingLanguages(true);
      try {
        const response = await adminService.getLanguages();
        if (response.success && response.data) {
          setLanguages(response.data);
        } else {
          showError(response.message || t('createBookModal.errors.failedToLoadLanguages'));
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
        showError(t('createBookModal.errors.failedToLoadLanguages'));
      } finally {
        setLoadingLanguages(false);
      }
    };

    fetchCategories();
    fetchAgeGroups();
    fetchLanguages();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showError(t('createBookModal.errors.titleRequired'));
      return;
    }

    if (!formData.category_id) {
      showError(t('createBookModal.errors.categoryRequired'));
      return;
    }

    if (!formData.age_group_id) {
      showError(t('createBookModal.errors.ageGroupRequired'));
      return;
    }

    if (!formData.language_id) {
      showError(t('createBookModal.errors.languageRequired'));
      return;
    }

    const data = new FormData();
    data.append('title', formData.title.trim());
    data.append('description', formData.description.trim() || '');
    data.append('category', formData.category_id);
    data.append('agegroup', formData.age_group_id);
    data.append('language', formData.language_id);

    if (coverImage) {
      data.append('cover_image', coverImage);
    }

    setLoading(true);
    try {
      const response = await adminService.createBook(data);
      if (response.success) {
        showSuccess(response.message || t('createBookModal.success.bookCreated'));
        // Reset form
        setFormData({
          category_id: '',
          age_group_id: '',
          language_id: '',
          title: '',
          description: '',
          book_order: 0
        });
        setCoverImage(null);
        onClose();
        if (onBookCreated) {
          onBookCreated();
        }
      } else {
        showError(response.error || response.message || response.detail || t('createBookModal.errors.failedToUploadBook'));
      }
    } catch (error) {
      console.error(error);
      showError(t('createBookModal.errors.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        category_id: '',
        age_group_id: '',
        language_id: '',
        title: '',
        description: '',
        book_order: 0
      });
      setCoverImage(null);
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{t('createBookModal.title')}</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {/* <InputGroup> */}
              <Label>Cover Image</Label>
              {/* <Label>{t('createBookModal.labels.sourceFile')}</Label>
              <FileInput
                type="file"
                accept=".md"
                onChange={(e) => handleFileChange(e, 'source')}
                required
                disabled={loading}
              />
              {sourceFile && (
                <FilePreview>
                  {t('createBookModal.selected')} {sourceFile.name}
                </FilePreview>
              )}
            </InputGroup> */}

            <InputGroup>
              <Label>{t('createBookModal.labels.coverImage')}</Label>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              {coverImage && (
                <FilePreview>
                  {t('createBookModal.selected')} {coverImage.name}
                </FilePreview>
              )}
            </InputGroup>

            <GridRow>
              <InputGroup>
                <Label>{t('createBookModal.labels.category')}</Label>
                <Select 
                  name="category_id" 
                  value={formData.category_id} 
                  onChange={handleSelectChange} 
                  required
                  disabled={loadingCategories || loading}
                >
                  <option value="">{t('createBookModal.placeholders.selectCategory')}</option>
                  {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.display_name}
                    </option>
                  ))}
                </Select>
                {loadingCategories && <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{t('createBookModal.loading.categories')}</div>}
              </InputGroup>
              <InputGroup>
                <Label>{t('createBookModal.labels.ageGroup')}</Label>
                <Select 
                  name="age_group_id" 
                  value={formData.age_group_id} 
                  onChange={handleSelectChange} 
                  required
                  disabled={loadingAgeGroups || loading}
                >
                  <option value="">{t('createBookModal.placeholders.selectAgeGroup')}</option>
                  {ageGroups.map((ageGroup) => (
                    <option key={ageGroup.age_group_id} value={ageGroup.age_group_id}>
                      {ageGroup.display_name}
                    </option>
                  ))}
                </Select>
                {loadingAgeGroups && <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{t('createBookModal.loading.ageGroups')}</div>}
              </InputGroup>
              <InputGroup>
                <Label>{t('createBookModal.labels.language')}</Label>
                <Select 
                  name="language_id" 
                  value={formData.language_id} 
                  onChange={handleSelectChange} 
                  required
                  disabled={loadingLanguages || loading}
                >
                  <option value="">{t('createBookModal.placeholders.selectLanguage')}</option>
                  {languages.map((language) => (
                    <option key={language.language_id} value={language.language_id}>
                      {language.display_name}
                    </option>
                  ))}
                </Select>
                {loadingLanguages && <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{t('createBookModal.loading.languages')}</div>}
              </InputGroup>
            </GridRow>

            <InputGroup>
              <Label>{t('createBookModal.labels.bookTitle')}</Label>
              <Input 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder={t('createBookModal.placeholders.enterBookTitle')}
                required
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createBookModal.labels.description')}</Label>
              <TextArea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder={t('createBookModal.placeholders.enterBookDescription')} 
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('createBookModal.labels.bookOrder')}</Label>
              <Input 
                type="number" 
                name="book_order" 
                value={formData.book_order} 
                onChange={(e) => setFormData(prev => ({ ...prev, book_order: parseInt(e.target.value) || 0 }))} 
                placeholder="0"
                min="0"
                disabled={loading}
              />
            </InputGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose} disabled={loading}>
                {t('createBookModal.buttons.cancel')}
              </CancelButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? t('createBookModal.loading.uploading') : t('createBookModal.buttons.uploadBook')}
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default CreateBookModal;

