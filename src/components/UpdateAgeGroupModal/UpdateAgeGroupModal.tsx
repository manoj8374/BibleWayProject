import React, { useState, useEffect } from "react";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
  InputGroup,
  Label,
  TextArea,
  FileInput,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  FilePreview,
} from "../CreateCategoryModal/CreateCategoryModal.styles";
import {
  adminService,
  type AgeGroup,
} from "../../services/admin/admin.service";
import { showSuccess, showError } from "../../utils/toast";

interface UpdateAgeGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgeGroupUpdated?: () => void;
  ageGroup: AgeGroup | null;
}

const UpdateAgeGroupModal: React.FC<UpdateAgeGroupModalProps> = ({
  isOpen,
  onClose,
  onAgeGroupUpdated,
  ageGroup,
}) => {
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [currentCoverImageUrl, setCurrentCoverImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ageGroup && isOpen) {
      setDescription(ageGroup.description || "");
      setCurrentCoverImageUrl(ageGroup.cover_image_url || "");
      setCoverImage(null);
    }
  }, [ageGroup, isOpen]);

  if (!isOpen || !ageGroup) {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await adminService.updateAgeGroup({
        age_group_id: ageGroup.age_group_id,
        ...(description.trim() && { description: description.trim() }),
        ...(coverImage && { cover_image: coverImage }),
      });

      if (response.success) {
        showSuccess(response.message || "Age group updated successfully");
        onClose();
        if (onAgeGroupUpdated) {
          onAgeGroupUpdated();
        }
      } else {
        showError(
          response.error || response.message || "Failed to update age group"
        );
      }
    } catch (error) {
      console.error("Error updating age group:", error);
      showError("Failed to update age group");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Update Age Group: {ageGroup.display_name}</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            <InputGroup style={{ width: "100%" }}>
              <Label style={{ display: "block", marginBottom: "8px" }}>
                Description
              </Label>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter age group description"
                disabled={loading}
                style={{ width: "100%", minHeight: "100px" }}
              />
            </InputGroup>

            <InputGroup style={{ width: "100%" }}>
              <Label style={{ display: "block", marginBottom: "8px" }}>
                Cover Image
              </Label>
              {currentCoverImageUrl && !coverImage && (
                <div style={{ marginBottom: "12px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    Current cover image:
                  </p>
                  <img
                    src={currentCoverImageUrl}
                    alt="Current cover"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>
              )}
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                style={{ width: "100%" }}
              />
              {coverImage && (
                <FilePreview>Selected: {coverImage.name}</FilePreview>
              )}
              <p
                style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}
              >
                Note: Only file uploads are supported. Leave empty to keep
                current image.
              </p>
            </InputGroup>

            <ButtonGroup>
              <CancelButton
                type="button"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </CancelButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Age Group"}
              </SubmitButton>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default UpdateAgeGroupModal;
