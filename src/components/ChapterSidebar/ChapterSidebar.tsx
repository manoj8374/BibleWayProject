import React from "react";
import styled from "styled-components";
import type { ChapterDTO } from "../../utils/markdown/convertDTO";
import { HEADER_HEIGHT, MOBILE_NAVBAR_HEIGHT } from "../../constants/UI";
import { breakpoints } from "../Layout/Layout.styles";
import { useI18n } from "../../i18n";

interface ChapterSidebarProps {
  chapters: ChapterDTO[];
  currentChapterId: string | null;
  onChapterClick: (chapterId: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  chapterId: string;
  chapterTitle: string;
}

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-height: calc(100vh - ${HEADER_HEIGHT}px);
  background-color: #e5e5ea;
  padding: 35px 48px;
  overflow-y: auto;
  z-index: 1000;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 90px;

  @media (min-width: 768px) {
    position: relative;
    width: 410px;
    min-width: 410px;
    transform: translateX(0);
    border-left: 3px solid #c9c9c9;
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-height: calc(100vh - ${HEADER_HEIGHT + MOBILE_NAVBAR_HEIGHT}px);
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button<{ $active?: boolean }>`
  background-color: ${(props) => (props.$active ? "#083f9b" : "transparent")};
  border: none;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "#083f9b" : "rgba(8, 63, 155, 0.1)"};
  }

  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => (props.$active ? "#ffffff" : "#181821")};
  }
`;

const ChaptersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 320px;
`;

const ChapterItem = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? "#083f9b" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "#181821")};
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: normal;
  transition: background-color 0.2s, color 0.2s;
  width: 100%;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "#083f9b" : "rgba(8, 63, 155, 0.1)"};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #181821;
  z-index: 1001;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const ChapterSidebar = ({
  chapters: chaptersData,
  currentChapterId,
  onChapterClick,
  isOpen,
  onClose,
}: ChapterSidebarProps) => {
  const { t } = useI18n();

  // Convert ChapterDTO to Chapter format for display
  const chapters: Chapter[] = chaptersData.map((chapter, index) => ({
    chapterId: chapter.chapterId || `chapter-${index + 1}`,
    chapterTitle:
      chapter.chapterTitle || chapter.chapterName || `Chapter ${index + 1}`,
  }));

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <ButtonsContainer>
          <Button $active={true} title={t("chapterSidebar.list")}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </Button>
          <Button title={t("chapterSidebar.bookmark")}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </Button>
          <Button title={t("chapterSidebar.quickNote")}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </Button>
        </ButtonsContainer>

        <ChaptersList>
          {chapters.map((chapter) => (
            <ChapterItem
              key={chapter.chapterId}
              $active={currentChapterId === chapter.chapterId}
              onClick={() => {
                onChapterClick(chapter.chapterId);
                // Close sidebar on mobile after selection
                if (window.innerWidth < 768) {
                  onClose();
                }
              }}
            >
              {chapter.chapterTitle}
            </ChapterItem>
          ))}
        </ChaptersList>
      </SidebarContainer>
    </>
  );
};
