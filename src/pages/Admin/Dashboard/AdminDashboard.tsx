import { useState } from "react";
import styled from "styled-components";
import CreateCategoryModal from "../../../components/CreateCategoryModal/CreateCategoryModal";
import CreatePromotionModal from "../../../components/CreatePromotionModal/CreatePromotionModal";
import SelectAgeGroupModal from "../../../components/SelectAgeGroupModal/SelectAgeGroupModal";
import UpdateAgeGroupModal from "../../../components/UpdateAgeGroupModal/UpdateAgeGroupModal";
import { useI18n } from "../../../i18n/hooks";
import type { AgeGroup } from "../../../services/admin/admin.service";

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 32px;
  color: #1a1a1a;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #f0f0f0;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05),
      0 10px 10px -5px rgba(0, 0, 0, 0.01);
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 12px;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #1a1a1a;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CardText = styled.p`
  margin: 0;
  color: #6b7280;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CreateButton = styled.button`
  background: #8b1f1f;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #6b1616;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const AdminDashboard = () => {
  const { t } = useI18n();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isSelectAgeGroupModalOpen, setIsSelectAgeGroupModalOpen] =
    useState(false);
  const [isUpdateAgeGroupModalOpen, setIsUpdateAgeGroupModalOpen] =
    useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(
    null
  );

  return (
    <div>
      <Title>
        {t("pages.adminDashboard.dashboard")}
        <ButtonGroup>
          <CreateButton onClick={() => setIsPromotionModalOpen(true)}>
            {t("pages.adminDashboard.createPromotion")}
          </CreateButton>
          <CreateButton onClick={() => setIsCategoryModalOpen(true)}>
            {t("pages.adminDashboard.createCategory")}
          </CreateButton>
          <CreateButton onClick={() => setIsSelectAgeGroupModalOpen(true)}>
            Update Age Group
          </CreateButton>
        </ButtonGroup>
      </Title>
      <CardGrid>
        <Card>
          <CardTitle>{t("pages.adminDashboard.welcomeAdmin")}</CardTitle>
          <CardText>{t("pages.adminDashboard.welcomeDescription")}</CardText>
        </Card>
        <Card>
          <CardTitle>{t("pages.adminDashboard.dailyVerse")}</CardTitle>
          <CardText>{t("pages.adminDashboard.dailyVerseDescription")}</CardText>
        </Card>
        <Card>
          <CardTitle>{t("pages.adminDashboard.bookManagement")}</CardTitle>
          <CardText>
            {t("pages.adminDashboard.bookManagementDescription")}
          </CardText>
        </Card>
      </CardGrid>

      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryCreated={() => {
          setIsCategoryModalOpen(false);
        }}
      />

      <CreatePromotionModal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        onPromotionCreated={() => {
          setIsPromotionModalOpen(false);
        }}
      />

      <SelectAgeGroupModal
        isOpen={isSelectAgeGroupModalOpen}
        onClose={() => setIsSelectAgeGroupModalOpen(false)}
        onAgeGroupSelected={(ageGroup) => {
          setSelectedAgeGroup(ageGroup);
          setIsSelectAgeGroupModalOpen(false);
          setIsUpdateAgeGroupModalOpen(true);
        }}
      />

      <UpdateAgeGroupModal
        isOpen={isUpdateAgeGroupModalOpen}
        onClose={() => {
          setIsUpdateAgeGroupModalOpen(false);
          setSelectedAgeGroup(null);
        }}
        onAgeGroupUpdated={() => {
          setIsUpdateAgeGroupModalOpen(false);
          setSelectedAgeGroup(null);
        }}
        ageGroup={selectedAgeGroup}
      />
    </div>
  );
};

export default AdminDashboard;
