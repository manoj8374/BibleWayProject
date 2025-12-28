import React, { useState, useEffect } from 'react';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
  InputGroup,
  Label,
  Select,
  ButtonGroup,
  SubmitButton,
  CancelButton
} from '../CreateCategoryModal/CreateCategoryModal.styles';
import { adminService, type AgeGroup } from '../../services/admin/admin.service';
import { showError } from '../../utils/toast';

interface SelectAgeGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgeGroupSelected: (ageGroup: AgeGroup) => void;
}

const SelectAgeGroupModal: React.FC<SelectAgeGroupModalProps> = ({ 
  isOpen, 
  onClose, 
  onAgeGroupSelected
}) => {
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchAgeGroups = async () => {
        setLoading(true);
        try {
          const response = await adminService.getAgeGroups();
          if (response.success && response.data) {
            setAgeGroups(response.data);
          } else {
            showError(response.message || 'Failed to load age groups');
          }
        } catch (error) {
          console.error('Error fetching age groups:', error);
          showError('Failed to load age groups');
        } finally {
          setLoading(false);
        }
      };
      fetchAgeGroups();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAgeGroup = ageGroups.find(ag => ag.age_group_id === selectedAgeGroupId);
    if (selectedAgeGroup) {
      onAgeGroupSelected(selectedAgeGroup);
      setSelectedAgeGroupId('');
      onClose();
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSelectedAgeGroupId('');
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Select Age Group to Update</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Age Group</Label>
              <Select 
                value={selectedAgeGroupId} 
                onChange={(e) => setSelectedAgeGroupId(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select an age group</option>
                {ageGroups.map((ageGroup) => (
                  <option key={ageGroup.age_group_id} value={ageGroup.age_group_id}>
                    {ageGroup.display_name}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose} disabled={loading}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit" disabled={loading || !selectedAgeGroupId}>
                {loading ? 'Loading...' : 'Select'}
              </SubmitButton>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default SelectAgeGroupModal;

