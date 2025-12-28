import { useEffect, useState, useRef } from "react";
import { parseMarkdown } from "../../utils/markdown";
import { astToBlocks } from "../../utils/markdown/astToBlocks";
import normalizeMarkdown from "../../utils/markdown/normalizeMarkdown";
import { type BlockDTO, type ChapterDTO } from "../../utils/markdown/convertDTO";
import { markdownToHtml } from "../../utils/markdown/markdownToHTML";
import { MarkdownContainer } from "../../utils/markdown/markdown.styles";
import { PREDEFINED_HIGHLIGHTS } from "../../utils/markdown/highlights";
import Markdown from 'react-markdown'
import styled from "styled-components";
import { useI18n } from "../../i18n/hooks";

import "./index.css";
import "github-markdown-css/github-markdown-light.css";
import { MarkDownWrapper, BlockWrapper } from "./styledComponents";

const ViewerContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: calc(100vh - 60px);
  position: relative;
  justify-content: center;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  background-color: #083f9b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: #0a4fb8;
  }

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.6;
`;

const EmptyStateTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #181821;
  margin-bottom: 12px;
  font-family: 'Quicksand', sans-serif;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  color: #666;
  max-width: 400px;
  line-height: 1.5;
  font-family: 'Quicksand', sans-serif;
`;

const books = [
  'testingImages2.md',
  'testingImages.md',
]

const BibleViewer = () => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState<ChapterDTO[]>([]); // Stores ALL chapter metadata
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number | null>(null); // Track current chapter (null = none selected)
  const [allBlocks, setAllBlocks] = useState<BlockDTO[]>([]); // Blocks for current chapter only
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [markdown, setMarkdown] = useState<string>('');

  const sendMetadataToBackend = async (chaptersData: ChapterDTO[]) => {
    try {
      const response = await fetch('/api/save-book-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookName: 'Book Name',
          chapters: chaptersData,
          createdAt: new Date().toISOString(),
        }),
      });

     
    } catch (error) {
      console.error("❌ Error sending metadata to backend:", error);
    }
  };

  useEffect(() => {
      const loadAllChapters = async () => {
        try {
          setLoading(true);
          const chaptersData: ChapterDTO[] = [];

          // Load each chapter file
          for (let i = 0; i < books.length; i++) {
            const chapterFile = books[i];
            const response = await fetch(`/${chapterFile}`);
            const text = await response.text();

            setMarkdown(text);

            // Parse markdown
            const normalizedText = normalizeMarkdown(text);
            const tree = parseMarkdown(normalizedText);
            const parsedBlocks = astToBlocks(tree, normalizedText);

            // Extract chapter title from first heading or use filename
            // const chapterTitle = parsedBlocks.find(b => b.chapterTitle)?.chapterTitle || 
            //                     `Chapter ${i + 1}`;

            // Create chapter object
            const chapter: ChapterDTO = {
              chapterName: chapterFile.replace('.md', ''),
              chapterTitle: chapterFile.replace('.md', ''),
              blocks: parsedBlocks
            };

            chaptersData.push(chapter);
          }

        // Store ALL chapters in memory
        setChapters(chaptersData);
        
        // DON'T flatten all blocks yet - will be done based on currentChapterNumber

        // Create metadata to send to backend
        const metadata = JSON.stringify(chaptersData, null, 2);
        console.log("📚 Book Metadata:", metadata);

        // Send to backend
        await sendMetadataToBackend(chaptersData);

      } catch (e) {
        console.error("Error loading chapters:", e);
      } finally {
        setLoading(false);
      }
    };

    loadAllChapters();
  }, []);

  // Load current chapter when selected
  useEffect(() => {
    if (chapters.length === 0) return;

    // If no chapter selected, don't render any blocks
    if (currentChapterNumber === null) {
      setAllBlocks([]);
      return;
    }

    // Load current chapter
    const chapter = chapters[currentChapterNumber - 1];
    if (chapter?.blocks) {
      console.log(`📥 Loading chapter ${currentChapterNumber} with ${chapter.blocks.length} blocks`);
      setAllBlocks(chapter.blocks);
    }
  }, [chapters, currentChapterNumber]);

  function highlightByOffsets(
    block: HTMLElement,
    startOffset: number,
    endOffset: number
  ) {
    const walker = document.createTreeWalker(
      block,
      NodeFilter.SHOW_TEXT,
      null
    );

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
      span.className = "highlight";
      range.surroundContents(span);
    }
  }

  useEffect(() => {
    if (allBlocks.length === 0) return;

    requestAnimationFrame(() => {
      PREDEFINED_HIGHLIGHTS.forEach(h => {
        const el = document.querySelector<HTMLElement>(
          `[data-block-id="${h.blockId}"]`
        );
        if (el) highlightByOffsets(el, h.startOffset, h.endOffset);
      });
    });
  }, [allBlocks]);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      if (range.collapsed) return;

      const getBlock = (node: Node) =>
        (node as HTMLElement)?.parentElement?.closest("[data-block-id]");

      const startBlock = getBlock(range.startContainer) as HTMLElement;
      const endBlock = getBlock(range.endContainer) as HTMLElement;
      if (!startBlock || !endBlock) return;

      const allBlocks = Array.from(
        document.querySelectorAll<HTMLElement>("[data-block-id]")
      );

      const startIndex = allBlocks.indexOf(startBlock);
      const endIndex = allBlocks.indexOf(endBlock);

      const ordered = allBlocks.slice(
        Math.min(startIndex, endIndex),
        Math.max(startIndex, endIndex) + 1
      );

      ordered.forEach(block => {
        const walker = document.createTreeWalker(
          block,
          NodeFilter.SHOW_TEXT,
          null
        );

        let start = 0;
        let end = 0;
        let offset = 0;

        while (walker.nextNode()) {
          const node = walker.currentNode as Text;

          if (block === startBlock && node === range.startContainer)
            start = offset + range.startOffset;

          if (block === endBlock && node === range.endContainer) {
            end = offset + range.endOffset;
            break;
          }

          offset += node.length;
        }

        if (block !== startBlock) start = 0;
        if (block !== endBlock) end = offset;

        if (start < end) highlightByOffsets(block, start, end);
      });

      selection.removeAllRanges();
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleChapterClick = (chapterId: string | null) => {
    if (!chapterId) return;

    // Extract chapter number from chapterId (e.g., "chapter-1" -> 1)
    const chapterNumMatch = chapterId.match(/\d+/);
    if (!chapterNumMatch) {
      console.error("Could not extract chapter number from:", chapterId);
      return;
    }

    const chapterNum = parseInt(chapterNumMatch[0]);
    
    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > chapters.length) {
      console.error("Invalid chapter number:", chapterNum);
      return;
    }

    console.log(`🔽 User clicked chapter ${chapterNum}`);

    // Update current chapter number (this will trigger loading)
    setCurrentChapterNumber(chapterNum);
    setCurrentChapterId(chapterId);
    
    // Scroll to top of content
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }, 100);
  };

  // const isChapterStart = (block: BlockDTO, index: number): boolean => {
  //   if (!block.chapterId) return false;
  //   return allBlocks.findIndex(b => b.chapterId === block.chapterId) === index;
  // };

  if (loading) return <p>{t('pages.bibleViewer.loading')}</p>;

  return (
    <ViewerContainer>
      <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        <svg viewBox="0 0 24 24">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </svg>
      </ToggleButton>

       <MarkDownWrapper ref={contentRef}>
        <MarkdownContainer className="markdown-body">
          {allBlocks.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>📖</EmptyStateIcon>
              <EmptyStateTitle>Select a Chapter to Begin</EmptyStateTitle>
              <EmptyStateText>
                Choose a chapter from the sidebar to start reading
              </EmptyStateText>
            </EmptyState>
          ) : (
            allBlocks.map((block, index) => (
              <BlockWrapper
                key={block.blockId}
                data-block-id={block.blockId}
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(block.markdown),
                }}
              />
            ))
          )}
        </MarkdownContainer>
        {/* <Markdown>{markdown}</Markdown> */}
       </MarkDownWrapper>

{/* 
      <ChapterSidebar
        chapters={chapters}
        currentChapterId={currentChapterId}
        onChapterClick={handleChapterClick}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      /> */}
    </ViewerContainer>
  );
};

export default BibleViewer;