import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import CreateVerseModal from "../../../components/CreateVerseModal/CreateVerseModal";
import {
  verseService,
  type Verse,
} from "../../../services/verse/verse.service";
import { adminService } from "../../../services/admin/admin.service";
import { showError, showSuccess } from "../../../utils/toast";
import { useI18n } from "../../../i18n/hooks";

const PageContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #1a1a1a;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 24px;
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
    width: 100%;
    padding: 12px;
  }
`;

const VersesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const VerseCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const VerseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VerseTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const VerseDescription = styled.p`
  margin: 0 0 12px 0;
  color: #4b5563;
  font-size: 15px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const VerseMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6b7280;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
    font-size: 12px;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 10px 16px;
  }
`;

const EditButton = styled(ActionButton)`
  background: #f3f4f6;
  color: #374151;

  &:hover:not(:disabled) {
    background: #e5e7eb;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #fee2e2;
  color: #991b1b;

  &:hover:not(:disabled) {
    background: #fecaca;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  margin: 12px 0 0 0;
`;

const CreateVerse: React.FC = () => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVerse, setEditingVerse] = useState<Verse | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const fetchVerses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await verseService.getAllVerses();
      if (response.success && response.data) {
        setVerses(response.data);
      } else {
        showError(
          response.message || t("pages.createVerse.failedToLoadVerses")
        );
      }
    } catch (error) {
      console.error("Error fetching verses:", error);
      showError(t("pages.createVerse.failedToLoadVerses"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchVerses();
  }, [fetchVerses]);

  const handleVerseCreated = () => {
    setIsModalOpen(false);
    setEditingVerse(null);
    fetchVerses(); // Refresh the verses list
  };

  const handleEditVerse = (verse: Verse) => {
    setEditingVerse(verse);
    setIsModalOpen(true);
  };

  const handleDeleteVerse = async (verseId: string) => {
    if (!window.confirm(t("pages.createVerse.confirmDelete"))) {
      return;
    }

    setDeletingIds((prev) => new Set(prev).add(verseId));

    try {
      const response = await adminService.deleteVerse({ verse_id: verseId });
      if (response.success) {
        showSuccess(
          response.message || t("pages.createVerse.deletedSuccessfully")
        );
        fetchVerses(); // Refresh the verses list
      } else {
        showError(
          response.error ||
            response.message ||
            t("pages.createVerse.failedToDelete")
        );
      }
    } catch (error) {
      console.error("Error deleting verse:", error);
      showError(t("pages.createVerse.failedToDelete"));
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(verseId);
        return newSet;
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVerse(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageContainer>
      <Header>
        <Title>{t("pages.createVerse.verses")}</Title>
        <CreateButton onClick={() => setIsModalOpen(true)}>
          {t("pages.createVerse.createVerse")}
        </CreateButton>
      </Header>

      {loading ? (
        <LoadingState>{t("pages.createVerse.loadingVerses")}</LoadingState>
      ) : verses.length === 0 ? (
        <EmptyState>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b7280"
            strokeWidth="1.5"
            style={{ margin: "0 auto" }}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <EmptyStateText>{t("pages.createVerse.noVersesYet")}</EmptyStateText>
        </EmptyState>
      ) : (
        <VersesList>
          {verses.map((verse) => (
            <VerseCard key={verse.verse_id}>
              <VerseHeader>
                <div style={{ flex: 1 }}>
                  <VerseTitle>
                    {verse.title || t("pages.createVerse.quoteOfTheDay")}
                  </VerseTitle>
                  <VerseDescription>{verse.description}</VerseDescription>
                </div>
                <ActionButtons>
                  <EditButton
                    onClick={() => handleEditVerse(verse)}
                    disabled={deletingIds.has(verse.verse_id)}
                  >
                    <span>✏️</span>
                    {t("pages.createVerse.edit")}
                  </EditButton>
                  <DeleteButton
                    onClick={() => handleDeleteVerse(verse.verse_id)}
                    disabled={deletingIds.has(verse.verse_id)}
                  >
                    <span>🗑️</span>
                    {deletingIds.has(verse.verse_id)
                      ? t("pages.createVerse.deleting")
                      : t("pages.createVerse.delete")}
                  </DeleteButton>
                </ActionButtons>
              </VerseHeader>
              <VerseMeta>
                <MetaItem>
                  <span>❤️</span>
                  <strong>{verse.likes_count}</strong>{" "}
                  {t("pages.createVerse.likes")}
                </MetaItem>
                <MetaItem>
                  <span>📅</span>
                  {t("pages.createVerse.created")}:{" "}
                  {formatDate(verse.created_at)}
                </MetaItem>
                {verse.updated_at !== verse.created_at && (
                  <MetaItem>
                    <span>🔄</span>
                    {t("pages.createVerse.updated")}:{" "}
                    {formatDate(verse.updated_at)}
                  </MetaItem>
                )}
              </VerseMeta>
            </VerseCard>
          ))}
        </VersesList>
      )}

      <CreateVerseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onVerseCreated={handleVerseCreated}
        editingVerse={editingVerse}
      />
    </PageContainer>
  );
};

export default CreateVerse;
