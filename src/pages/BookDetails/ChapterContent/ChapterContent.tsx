import React, { useEffect, useRef, useState, useMemo, useLayoutEffect, useCallback } from "react";
import type { Chapter } from "../../../services/book/book.service";
import { bookService } from "../../../services/book/book.service";
import { useI18n } from '../../../i18n';
import { toggleBookmark } from "../../../services/book/toggleBookmark";
import { highlightContent } from "../utils/highlightUtils";
import { extractAllPageText } from "../utils/pageTextUtils";
import { useSearch } from "../../../contexts/SearchContext";
import { useBook } from "../../../contexts/BookContext";
import { showSuccess, showError } from "../../../utils/toast";
import { textToSpeechService } from "../../../services/textToSpeech/textToSpeech.service";
import { getYouTubeEmbedUrl } from "../../../utils/youtubeHelpers";
import { highlightService } from "../../../services/highlight/highlight.service";
import type { Highlight } from "../../../types/highlight";
import { bookmarkService } from "../../../services/bookmark/bookmark.service";
import BookMarkIcon from "../../../Icons/BookMarkIcon";
import {
  ContentContainer,
  ChapterHeader,
  ChapterTitle,
  ChapterDescription,
  ChapterMeta,
  MetaItem,
  BlocksContainer,
  PageContainer,
  BlockItem,
  VideoContainer,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  EmptyStateSubtext,
  PageWrapper,
  PagePlayButton,
  LoadingSpinner,
  LanguageDropdownContainer,
  LanguageLabel,
  LanguageSelect,
  BookmarkButton,
  HeaderActions,
} from "./ChapterContent.styles";
import { markdownToHtml } from "../../../utils/markdown/markdownToHTML";
import "github-markdown-css/github-markdown-light.css";
import { t } from "i18next";

interface ChapterContentProps {
  chapter: Chapter | null;
  chapterIndex?: number;
  totalChapters?: number;
}

interface Block {
  blockId: string;
  text: string;
  markdown: string;
}

export const ChapterContent: React.FC<ChapterContentProps> = ({
  chapter,
  chapterIndex = 0,
  totalChapters = 1,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const progressUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const [colorWantToApply, setColorWantToApply] = useState<string>("");

  const { searchText } = useSearch();
  const { isBookmarked, setIsBookmarked, setBookmarkId } = useBook();

  const highlightQuery = searchText;

  const [selectedColor, setSelectedColor] = useState<
    "yellow" | "green" | "blue"
  >("green");
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[]>([
    {
      id: "1",
      blockId: "1",
      startOffset: 0,
      endOffset: 100,
      color: "#FEF08A",
      text: "This is a highlight",
      createdAt: new Date().toISOString(),
      userId: "1",
      chapterId: "1",
      bookId: "1",
    },
  ]);
  const [isLoadingHighlights, setIsLoadingHighlights] = useState(false);



  /* ---------------- Text-to-Speech State ---------------- */
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPlayingPage, setCurrentPlayingPage] = useState<number | null>(
    null
  );
  const [isPaused, setIsPaused] = useState(false);
  const [generatingPage, setGeneratingPage] = useState<number | null>(null);
  const [selectedTTSLanguage, setSelectedTTSLanguage] =
    useState<string>("en-US");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const generationAbortControllerRef = useRef<AbortController | null>(null);

  const BLOCKS_PER_PAGE = 16;

  function highlightByOffsets(
    block: HTMLElement,
    startOffset: number,
    endOffset: number,
    color: string
  ) {
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null);

    let currentOffset = 0;
    const segments: { node: Text; start: number; end: number }[] = [];

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const nextOffset = currentOffset + node.length;

      if (endOffset > currentOffset && startOffset < nextOffset) {
        segments.push({
          node,
          start: Math.max(0, startOffset - currentOffset),
          end: Math.min(node.length, endOffset - currentOffset),
        });
      }
      currentOffset = nextOffset;
    }

    for (const { node, start, end } of segments.reverse()) {
      const range = document.createRange();
      range.setStart(node, start);
      range.setEnd(node, end);

      const span = document.createElement("span");
      span.className = `highlight highlight-${color}`;
      range.surroundContents(span);
    }
  }

  function removeAllHighlightsFromDOM() {
    document.querySelectorAll(".highlight").forEach((span) => {
      const parent = span.parentNode;
      if (!parent) return;

      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    });
  }

  useEffect(() => {
    //every 3 selecods change the color
    // const interval = setInterval(() => {
    //   setColorWantToApply((prev) => {
    //     return prev === "yellow" ? "green" : prev === "green" ? "blue" : "yellow";
    //   });
    // }, 3000);
    // return () => clearInterval();
  },[colorWantToApply]);

  /* ---------------- Text selection highlight ---------------- */


  function highlightByBlockIds({
  startBlockId,
  endBlockId,
  startOffset,
  endOffset,
  color,
}: {
  startBlockId: string;
  endBlockId: string;
  startOffset: number;
  endOffset: number;
  color: string;
}) {
  const blocks = Array.from(
    document.querySelectorAll<HTMLElement>("[data-block-id]")
  );

  const startIndex = blocks.findIndex(
    b => b.dataset.blockId === startBlockId
  );
  const endIndex = blocks.findIndex(
    b => b.dataset.blockId === endBlockId
  );

  if (startIndex === -1 || endIndex === -1) return;

  const ordered = blocks.slice(
    Math.min(startIndex, endIndex),
    Math.max(startIndex, endIndex) + 1
  );

  ordered.forEach((block, i) => {
    let start = 0;
    let end = getBlockTextLength(block);

    if (i === 0) start = startOffset;
    if (i === ordered.length - 1) end = endOffset;

    if (start < end) {
      highlightByOffsets(block, start, end, color);
    }
  });
}

function getBlockTextLength(block: HTMLElement) {
  const walker = document.createTreeWalker(
    block,
    NodeFilter.SHOW_TEXT,
    null
  );
  let len = 0;
  while (walker.nextNode()) {
    len += (walker.currentNode as Text).length;
  }
  return len;
}

// useLayoutEffect(() => {
//   const h = {
//   "book_id": "1f0775ae-11c1-4694-8a83-2041052da052",
//   "chapter_id": "1b867c50-eb27-4dad-b31e-62e1b4c7ebb8",
//   "start_block_id": "block-0",
//   "end_block_id": "block-7",
//   "start_offset": "0",
//   "end_offset": "12",
//   "color": "#86EFAC"
// }

//   highlightByBlockIds({
//     startBlockId: h.start_block_id,
//     endBlockId: h.end_block_id,
//     startOffset: parseInt(h.start_offset),
//     endOffset: parseInt(h.end_offset),
//     color: "orange",
//   });
// }, [highlights, chapter]);



   const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      if (range.collapsed) return;

      const getBlock = (node: Node) =>
        (node as HTMLElement)?.parentElement?.closest(
          "[data-block-id]"
        ) as HTMLElement | null;

      const startBlock = getBlock(range.startContainer);
      const endBlock = getBlock(range.endContainer);
      if (!startBlock || !endBlock) return;

      const startBlockId = startBlock.getAttribute("data-block-id");
      const endBlockId = endBlock.getAttribute("data-block-id");
      
      if (!startBlockId || !endBlockId) return;

      const selectedText = selection.toString().trim();

      const blocks = Array.from(
        document.querySelectorAll<HTMLElement>("[data-block-id]")
      );

      const startIndex = blocks.indexOf(startBlock);
      const endIndex = blocks.indexOf(endBlock);
      if (startIndex === -1 || endIndex === -1) return;

      const orderedBlocks = blocks.slice(
        Math.min(startIndex, endIndex),
        Math.max(startIndex, endIndex) + 1
      );

      let startBlockTotalLength = 0;
      const startBlockWalker = document.createTreeWalker(
        startBlock,
        NodeFilter.SHOW_TEXT,
        null
      );
      while (startBlockWalker.nextNode()) {
        const node = startBlockWalker.currentNode as Text;
        startBlockTotalLength += node.length;
      }

      let startOffset = 0;
      let endOffset = 0;

      orderedBlocks.forEach((block) => {
        const walker = document.createTreeWalker(
          block,
          NodeFilter.SHOW_TEXT,
          null
        );
        let offset = 0;
        let start = 0;
        let end = 0;

        while (walker.nextNode()) {
          const node = walker.currentNode as Text;

          if (block === startBlock && node === range.startContainer) {
            start = offset + range.startOffset;
            startOffset = start;
          }

          if (block === endBlock && node === range.endContainer) {
            end = offset + range.endOffset;
            if (startBlockId === endBlockId) {
              endOffset = end;
            } else {
              endOffset = startBlockTotalLength;
            }
            break;
          }

          offset += node.length;
        }

        if (block !== startBlock) start = 0;
        if (block !== endBlock) end = offset;

        if (start < end) {
          highlightByOffsets(block, start, end, colorWantToApply);
        }
      });

      // Map color to hex values
      const colorMap: Record<string, string> = {
        yellow: "#FEF08A",
        green: "#86EFAC",
        blue: "#93C5FD",
      };
      const hexColor = colorMap[selectedColor] || colorMap.green;

      // Prepare API request data
      if (chapter) {
        const highlightData = {
          book_id: chapter.book_id,
          chapter_id: chapter.chapter_id,
          start_block_id: startBlockId,
          end_block_id: endBlockId,
          start_offset: startOffset.toString(),
          end_offset: endOffset.toString(),
          color: hexColor,
        };
      }

      selection.removeAllRanges();
    };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [selectedColor, chapter]);

  useEffect(() => {
    if (!chapter) return;
    removeAllHighlightsFromDOM();
    setHighlights([]);
  }, [chapter]);

  /* ---------------- Check Bookmark Status on Chapter Load ---------------- */
  useEffect(() => {
    if (!chapter?.book_id) return;

    const checkBookmarkStatus = async () => {
      try {
        const response = await bookmarkService.getAllBookmarks();
        if (response.success && response.bookmarks) {
          const bookmarkedBook = response.bookmarks.find(
            (bookmark) => bookmark.book_id === chapter.book_id
          );
          if (bookmarkedBook) {
            setIsBookmarked(true);
            setBookmarkId(bookmarkedBook.bookmark_id);
          } else {
            setIsBookmarked(false);
            setBookmarkId(null);
          }
        }
      } catch (error) {
        console.error("Failed to check bookmark status:", error);
      }
    };

    checkBookmarkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter?.book_id]);

  const blocks =
    (chapter?.metadata as { blocks?: Block[] } | undefined)?.blocks || [];

  const processedBlocks = useMemo(() => {
    return blocks.map((block) => {
      let html = markdownToHtml(block.markdown);
      if (highlightQuery) {
        html = highlightContent(html, highlightQuery);
      }
      return { ...block, html };
    });
  }, [blocks, highlightQuery]);

  const pages = useMemo(() => {
    const groups: (typeof processedBlocks)[] = [];
    for (let i = 0; i < processedBlocks.length; i += BLOCKS_PER_PAGE) {
      groups.push(processedBlocks.slice(i, i + BLOCKS_PER_PAGE));
    }
    return groups;
  }, [processedBlocks]);

  const pageTexts = useMemo(() => {
    return pages.map((page, pageIndex) => {
      const pageBlocks = page.map((block) => ({
        blockId: block.blockId,
        text: block.text,
        markdown: block.markdown,
      }));
      const text = extractAllPageText(pageBlocks);
      return {
        pageIndex: pageIndex + 1,
        text,
        blockCount: page.length,
      };
    });
  }, [pages]);


  useEffect(() => {
    if (!highlightQuery || !chapter) return;

    const timer = setTimeout(() => {
      const firstMatch = document.querySelector(".highlight-match");
      firstMatch?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);

    return () => clearTimeout(timer);
  }, [highlightQuery, chapter]);


  const handleBookmark = async () => {
    if (!chapter || isBookmarking) return;

    setIsBookmarking(true);
    try {
      const response = await toggleBookmark(chapter.book_id);
      if (response.success && response.data) {
        if (response.data.action === "created") {
          showSuccess("Bookmark created successfully");
          setIsBookmarked(true);
          setBookmarkId(response.data.bookmark_id || null);
        } else {
          showSuccess("Bookmark removed successfully");
          setIsBookmarked(false);
          setBookmarkId(null);
        }
      } else {
        showError(response.error || "Failed to update bookmark");
      }
    } catch {
      showError("Failed to update bookmark");
    } finally {
      setIsBookmarking(false);
    }
  };

  const TTS_LANGUAGES = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    { code: "es-MX", name: "Spanish (Mexico)" },
    { code: "te-IN", name: "Telugu (India)" },
    { code: "hi-IN", name: "Hindi (India)" },
    { code: "ta-IN", name: "Tamil (India)" },
    { code: "kn-IN", name: "Kannada (India)" },
    { code: "ml-IN", name: "Malayalam (India)" },
    { code: "mr-IN", name: "Marathi (India)" },
    { code: "gu-IN", name: "Gujarati (India)" },
    { code: "bn-IN", name: "Bengali (India)" },
    { code: "pa-IN", name: "Punjabi (India)" },
    { code: "or-IN", name: "Odia (India)" },
    { code: "as-IN", name: "Assamese (India)" },
    { code: "ur-IN", name: "Urdu (India)" },
    { code: "fr-FR", name: "French (France)" },
    { code: "de-DE", name: "German (Germany)" },
    { code: "it-IT", name: "Italian (Italy)" },
    { code: "pt-PT", name: "Portuguese (Portugal)" },
    { code: "pt-BR", name: "Portuguese (Brazil)" },
    { code: "ru-RU", name: "Russian (Russia)" },
    { code: "zh-CN", name: "Chinese (Mandarin)" },
    { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
    { code: "ja-JP", name: "Japanese (Japan)" },
    { code: "ko-KR", name: "Korean (Korea)" },
  ];

  const playAudioFromBase64 = (base64Data: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const base64String = base64Data.includes(",")
          ? base64Data.split(",")[1]
          : base64Data;

        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        audioUrlRef.current = url;

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          setCurrentPlayingPage(null);
          setIsPaused(false);
          cleanupAudio();
          resolve();
        };

        audio.onpause = () => {
          setIsPaused(true);
        };

        audio.onplay = () => {
          setIsPaused(false);
        };

        audio.onerror = (error) => {
          console.error("Audio playback error:", error);
          setCurrentPlayingPage(null);
          cleanupAudio();
          reject(new Error("Failed to play audio"));
        };

        audio.play().catch((error) => {
          console.error("Audio play error:", error);
          setCurrentPlayingPage(null);
          cleanupAudio();
          reject(error);
        });
      } catch (error) {
        console.error("Error processing audio:", error);
        reject(error);
      }
    });
  };

  /**
   * Cleans up audio resources
   */
  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  };

  /**
   * Cancels ongoing generation
   */
  const cancelGeneration = () => {
    if (generationAbortControllerRef.current) {
      generationAbortControllerRef.current.abort();
      generationAbortControllerRef.current = null;
    }
    setIsGenerating(false);
    setGeneratingPage(null);
  };

  /**
   * Stops current audio playback
   */
  const stopAudio = () => {
    cleanupAudio();
    setCurrentPlayingPage(null);
    setIsPaused(false);
  };

  /**
   * Pauses current audio playback
   */
  const pauseAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  /**
   * Resumes paused audio playback
   */
  const resumeAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.error("Audio resume error:", error);
        showError("Failed to resume audio playback");
      });
      setIsPaused(false);
    }
  };

  const handlePlayPage = async (pageIndex: number) => {
    if (!pageTexts[pageIndex]) return;

    if (generatingPage === pageIndex && isGenerating) {
      cancelGeneration();
      return;
    }

    if (currentPlayingPage === pageIndex && audioRef.current) {
      if (audioRef.current.paused || isPaused) {
        resumeAudio();
      } else {
        pauseAudio();
      }
      return;
    }

    if (currentPlayingPage !== null && currentPlayingPage !== pageIndex) {
      stopAudio();
    }

    if (currentPlayingPage === pageIndex && isPaused) {
      resumeAudio();
      return;
    }

    if (isGenerating) {
      cancelGeneration();
    }

    setGeneratingPage(pageIndex);
    setIsGenerating(true);

    const abortController = new AbortController();
    generationAbortControllerRef.current = abortController;

    try {
      const pageData = pageTexts[pageIndex];
      if (!pageData.text.trim()) {
        showError("No text content available for this page");
        return;
      }

      const response = await textToSpeechService.generateSpeech({
        text: pageData.text,
        language: selectedTTSLanguage,
      });

      if (abortController.signal.aborted) {
        return;
      }

      if (response.success && response.audio) {
        setCurrentPlayingPage(pageIndex);
        setIsPaused(false);
        await playAudioFromBase64(response.audio);
      } else {
        showError(
          response.error || response.message || "Failed to generate speech"
        );
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        return;
      }
      console.error("TTS error:", error);
      showError("Failed to generate or play speech");
    } finally {
      if (!abortController.signal.aborted) {
        setIsGenerating(false);
        setGeneratingPage(null);
      }
      generationAbortControllerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);

  useEffect(() => {
    if (!chapter || blocks.length === 0) return;

    observerRef.current?.disconnect();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries.find((e) => e.isIntersecting);
      if (!entry) return;

      const blockId = entry.target.getAttribute("data-block-id");
      if (!blockId) return;

      const index = blocks.findIndex((b) => b.blockId === blockId);
      if (index === -1) return;

      const chapterProgress = index / blocks.length;
      const globalProgress =
        totalChapters > 0
          ? ((chapterIndex + chapterProgress) / totalChapters) * 100
          : 0;

      if (progressUpdateTimeout.current) {
        clearTimeout(progressUpdateTimeout.current);
      }

      progressUpdateTimeout.current = setTimeout(() => {
        bookService.updateReadingProgress({
          book_id: chapter.book_id,
          chapter_id: chapter.chapter_id,
          block_id: blockId,
          progress_percentage: parseFloat(globalProgress.toFixed(2)),
        });
      }, 2000);
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const timer = setTimeout(() => {
      document
        .querySelectorAll("[data-block-id]")
        .forEach((el) => observerRef.current?.observe(el));
    }, 500);

    return () => {
      observerRef.current?.disconnect();
      progressUpdateTimeout.current &&
        clearTimeout(progressUpdateTimeout.current);
      clearTimeout(timer);
    };
  }, [chapter, blocks, chapterIndex, totalChapters]);

  if (!chapter) {
    return (
      <ContentContainer>
        <EmptyState>
          <EmptyStateIcon>📖</EmptyStateIcon>
          <EmptyStateText>{t('chapterSidebar.noChapterSelected')}</EmptyStateText>
          <EmptyStateSubtext>
            {t('chapterSidebar.selectChapterToBegin')}
          </EmptyStateSubtext>
        </EmptyState>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <ChapterHeader>
        <ChapterTitle>{chapter.title}</ChapterTitle>
        {chapter.description && (
          <ChapterDescription>{chapter.description}</ChapterDescription>
        )}
        <ChapterMeta>
          <MetaItem>{t('chapterSidebar.chapter')} {chapter.chapter_number}</MetaItem>
          <MetaItem>
            {new Date(chapter.created_at).toLocaleDateString()}
          </MetaItem>
        </ChapterMeta>
        <HeaderActions>
          {/* <LanguageDropdownContainer>
            <LanguageLabel htmlFor="tts-language">TTS Language:</LanguageLabel>
            <LanguageSelect
              id="tts-language"
              value={selectedTTSLanguage}
              onChange={(e) => setSelectedTTSLanguage(e.target.value)}
            >
              {TTS_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </LanguageSelect>
          </LanguageDropdownContainer> */}
          
          <BookmarkButton
            $isBookmarked={isBookmarked}
            onClick={handleBookmark}
            disabled={isBookmarking}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <BookMarkIcon 
              fill={isBookmarked ? "white" : "#0860C4"} 
              width={16} 
              height={16} 
            />
            <span>
              {isBookmarking 
                ? "Processing..." 
                : isBookmarked 
                ? "Bookmarked" 
                : "Bookmark"}
            </span>
          </BookmarkButton>
        </HeaderActions>
      </ChapterHeader>

      {/* Text-to-Speech Controls */}
      {/* {pageTexts.length > 0 && (
        <TTSControlsContainer>
          <TTSHeader>
            <TTSTitle>Text-to-Speech</TTSTitle>
            <SelectAllButton onClick={handleSelectAllPages}>
              {selectedPages.size === pageTexts.length
                ? "Deselect All"
                : "Select All"}
            </SelectAllButton>
          </TTSHeader>
          <PageSelector>
            {pageTexts.map((pageData, index) => (
              <PageCheckboxLabel key={index}>
                <input
                  type="checkbox"
                  checked={selectedPages.has(index)}
                  onChange={() => handlePageSelection(index)}
                  disabled={isGenerating}
                />
                <span>Page {pageData.pageIndex}</span>
              </PageCheckboxLabel>
            ))}
          </PageSelector>
          <PlayButton
            onClick={handlePlaySelectedPages}
            disabled={isGenerating || selectedPages.size === 0}
          >
            {isGenerating && generatingPage === null ? (
              <>
                <LoadingSpinner />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Play Selected ({selectedPages.size})</span>
              </>
            )}
          </PlayButton>
        </TTSControlsContainer>
      )} */}

      {chapter.video_url && (
        <VideoContainer>
          <iframe
            src={getYouTubeEmbedUrl(chapter.video_url)!}
            title={chapter.title}
            allowFullScreen
          />
        </VideoContainer>
      )}

      <PageWrapper>
        <BlocksContainer ref={contentRef}>
          {pages.map((page, pageIndex) => (
            <PageContainer key={pageIndex} className="markdown-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  Page {pageIndex + 1}
                </span>
                <PagePlayButton
                  onClick={() => handlePlayPage(pageIndex)}
                  disabled={isGenerating && generatingPage !== pageIndex}
                  isPlaying={currentPlayingPage === pageIndex && !isPaused}
                >
                  {generatingPage === pageIndex ? (
                    <>
                      <LoadingSpinner />
                      <span>Generating...</span>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        style={{ marginLeft: "8px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span style={{ marginLeft: "4px" }}>Cancel</span>
                    </>
                  ) : currentPlayingPage === pageIndex && !isPaused ? (
                    <>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Pause</span>
                    </>
                  ) : currentPlayingPage === pageIndex && isPaused ? (
                    <>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Play</span>
                    </>
                  )}
                </PagePlayButton>
              </div>
              {page.map((block) => (
                <BlockItem
                  key={block.blockId}
                  data-block-id={block.blockId}
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              ))}
            </PageContainer>
          ))}
        </BlocksContainer>
      </PageWrapper>
    </ContentContainer>
  );
};
