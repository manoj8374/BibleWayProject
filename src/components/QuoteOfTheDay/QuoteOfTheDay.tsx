import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  QuoteContainer,
  QuoteTitle,
  QuoteText,
  LikesSection,
  IconWrapper,
  AddPostButtonMobile,
} from "./QuoteOfTheDay.styles";
import LikeIcon from "../../Icons/LikeIcon";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import { useRefresh } from "../../contexts/RefreshContext";
import { useI18n } from "../../i18n";
import { verseService } from "../../services/verse/verse.service";
import { showError } from "../../utils/toast";

interface QuoteOfTheDayProps {
  quote?: string;
  likes_count?: number; // Kept for prop override/testing capability
}

const QuoteOfTheDay: React.FC<QuoteOfTheDayProps> = (props) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [apiTitle, setApiTitle] = React.useState<string | null>(null);
  const [verseText, setVerseText] = React.useState(
    props.quote
  );
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { triggerRefresh } = useRefresh();
  const [verseId, setVerseId] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState(props.likes_count ?? 0);
  const [isLiked, setIsLiked] = useState(false);

  // Use API title if available, otherwise use translation
  const verseTitle = apiTitle || t("quoteOfTheDay.title");

  React.useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        const response = await verseService.getDailyVerse();
        if (response.success && response.data) {
          setVerseText(response.data.description);
          if (response.data.title) {
            setApiTitle(response.data.title);
          }
          if (response.data.verse_id) {
            setVerseId(response.data.verse_id);
          }
          if (response.data.likes_count !== undefined) {
            setLikesCount(response.data.likes_count);
          }
          if (response.data.is_liked !== undefined) {
            setIsLiked(response.data.is_liked);
          }
        }
      } catch (error) {
        console.error("Failed to load daily verse", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on like section or its children
    const target = e.target as HTMLElement;
    if (target.closest("[data-likes-section]")) {
      return;
    }
    navigate("/verses");
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!verseId) return;

    const wasLiked = isLiked;

    // Optimistic update
    setIsLiked(!wasLiked);
    setLikesCount((prev) => (wasLiked ? prev - 1 : prev + 1));

    // Call API
    const response = wasLiked
      ? await verseService.unlikeVerse(verseId)
      : await verseService.likeVerse(verseId);

    if (!response.success) {
      // Revert on error
      setIsLiked(wasLiked);
      setLikesCount((prev) => (wasLiked ? prev + 1 : prev - 1));
      showError(response.message || t("quoteOfTheDay.failedToUpdateLike"));
    }
  };

  return (
    <>
    {props.quote && (<>
      <QuoteContainer onClick={handleClick} style={{ cursor: "pointer" }}>
        <QuoteTitle>{verseTitle}</QuoteTitle>
        <QuoteText>
          {}
          {loading ? t("quoteOfTheDay.loading") : verseText}
        </QuoteText>
        <LikesSection
          data-likes-section
          onClick={handleLike}
          onMouseDown={(e) => e.stopPropagation()}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <IconWrapper>
            <LikeIcon color={isLiked ? "#ff6b6b" : "white"} />
          </IconWrapper>
          <p>
            {likesCount} {t("quoteOfTheDay.likes")}
          </p>
        </LikesSection>
      </QuoteContainer>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={triggerRefresh}
      />
    </>)}
    </>
  );
};

export default QuoteOfTheDay;
