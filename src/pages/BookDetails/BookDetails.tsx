// import React, { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { bookService, type Chapter, type GetReadingProgressResponse } from '../../services/book/book.service';
// import { showError } from '../../utils/toast';
// import { 
//   Container, 
//   MainContent, 
//   Sidebar, 
//   LoadingContainer, 
//   LoadingText,
//   SidebarHeader,
//   IconTabButton,
//   SidebarContent
// } from './BookDetails.styles';
// import { ChaptersSidebar } from './ChaptersSidebar/ChaptersSidebar';
// import { ChapterContent } from './ChapterContent/ChapterContent';
// import { ChapterNotes } from './ChapterNotes';

// const BookDetails: React.FC = () => {
//   const { bookId } = useParams<{ bookId: string }>();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
//   const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'chapters' | 'notes'>('chapters');
//   const [blockIdToScroll, setBlockIdToScroll] = useState<string | null>(null);
//   const [readingProgress, setReadingProgress] = useState<GetReadingProgressResponse['data']>(null);
//   const [hasCheckedProgress, setHasCheckedProgress] = useState(false);
//   const hasScrolledRef = useRef(false);
//   const mainContentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       if (!bookId) return;

//       setLoading(true);
//       try {
//         const response = await bookService.getBookChapters(bookId);

//         if (response.success && response.data) {
//           setChapters(response.data);
//           console.log('✅ Chapters loaded successfully:', response.data.length, 'chapters');
//         } else {
//           console.error('❌ Failed to load chapters:', response.error || response.message);
//           showError(response.error || response.message || 'Failed to load chapters');
//         }
//       } catch (error) {
//         console.error('❌ Error fetching chapters:', error);
//         showError('Failed to load chapters');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChapters();
//   }, [bookId]);

//   useLayoutEffect(() => {
//       if (mainContentRef.current) {
//         mainContentRef.current.scrollTo(0, 0);
//       }
//   }, [selectedChapterId]);

//   useEffect(() => {
//     const fetchProgress = async () => {
//       if (!bookId) return;
//       try {
//         const response = await bookService.getReadingProgress(bookId);
//         if (response.success) {
//           setReadingProgress(response.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch progress', error);
//       } finally {
//         setHasCheckedProgress(true);
//       }
//     };
//     fetchProgress();
//   }, [bookId]);

//   useEffect(() => {
//     if (chapters.length === 0) return;

//     const chapterIdFromUrl = searchParams.get('chapter_id');
//     const blockIdFromUrl = searchParams.get('block_id');

//     if (chapterIdFromUrl) {
//       const chapterFromUrl = chapters.find(
//         ch => ch.chapter_id === chapterIdFromUrl
//       );

//       if (chapterFromUrl) {
//         if (chapterFromUrl.chapter_id !== selectedChapterId) {
//           setSelectedChapterId(chapterFromUrl.chapter_id);
//           setSelectedChapter(chapterFromUrl);
//         }

//         if (blockIdFromUrl && blockIdFromUrl !== blockIdToScroll) {
//           setBlockIdToScroll(blockIdFromUrl);
//         }
//       } else {
//         const firstChapter = chapters[0];
//         if (firstChapter.chapter_id !== selectedChapterId) {
//           setSelectedChapterId(firstChapter.chapter_id);
//           setSelectedChapter(firstChapter);
//         }
//       }
//     } else {
//       if (!selectedChapterId && hasCheckedProgress) {
//         if (readingProgress) {
//           const savedChapter = chapters.find(c => c.chapter_id === readingProgress.chapter_id);
//           if (savedChapter) {
//             setSelectedChapterId(savedChapter.chapter_id);
//             setSelectedChapter(savedChapter);
//             if (readingProgress.block_id) {
//               setBlockIdToScroll(readingProgress.block_id);
//             }
//             console.log('Resume reading from:', savedChapter.title);
//             return;
//           }
//         }

//         const firstChapter = chapters[0];
//         setSelectedChapterId(firstChapter.chapter_id);
//         setSelectedChapter(firstChapter);
//       }
//     }
//   }, [chapters, searchParams, selectedChapterId, blockIdToScroll, readingProgress, hasCheckedProgress]);

//   useEffect(() => {
//     if (blockIdToScroll && selectedChapter && !hasScrolledRef.current) {
//       const timer = setTimeout(() => {
//         const blockElement = document.querySelector(`[data-block-id="${blockIdToScroll}"]`);
        
//         if (blockElement) {
//           blockElement.scrollIntoView({
//             // behavior: 'smooth',
//             block: 'center'
//           });
//           console.log('✅ Scrolled to block:', blockIdToScroll);
//           hasScrolledRef.current = true;
//           setBlockIdToScroll(null);
//         }
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, [blockIdToScroll, selectedChapter]);

//   const handleChapterSelect = useCallback((chapterId: string) => {
//     const chapter = chapters.find(ch => ch.chapter_id === chapterId);
//     if (chapter) {
//       setSearchParams(prev => {
//         const newParams = new URLSearchParams(prev);
//         newParams.set('chapter_id', chapterId);
//         return newParams;
//       });
//     }
//   }, [chapters, setSearchParams]);

//   if (loading) {
//     return (
//       <LoadingContainer>
//         <LoadingText>Loading chapters...</LoadingText>
//       </LoadingContainer>
//     );
//   }

//   return (
//     <Container>
//       <MainContent ref={mainContentRef}>
//         <ChapterContent 
//           chapter={selectedChapter} 
//           chapterIndex={chapters.findIndex(c => c.chapter_id === selectedChapter?.chapter_id)}
//           totalChapters={chapters.length}
//         />
//       </MainContent>
      
//       <Sidebar>
//         <SidebarHeader>
//           <IconTabButton 
//             $isActive={activeTab === 'chapters'}
//             onClick={() => setActiveTab('chapters')}
//             title="Chapters"
//           >
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <rect x="3" y="3" width="18" height="18" rx="2" />
//               <path d="M9 3v18" />
//             </svg>
//           </IconTabButton>
//           <IconTabButton 
//             $isActive={activeTab === 'notes'}
//             onClick={() => setActiveTab('notes')}
//             title="Notes"
//           >
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//               <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//             </svg>
//           </IconTabButton>
//         </SidebarHeader>

//         <SidebarContent>
//           {activeTab === 'chapters' && (
//             <ChaptersSidebar
//               chapters={chapters}
//               selectedChapterId={selectedChapterId}
//               onChapterSelect={handleChapterSelect}
//             />
//           )}
//           {activeTab === 'notes' && (
//             <ChapterNotes 
//               chapterId={selectedChapterId}
//               bookId={bookId}
//             />
//           )}
//         </SidebarContent>
//       </Sidebar>
//     </Container>
//   );
// };

// export default BookDetails;


import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  bookService,
  type Chapter,
  type GetReadingProgressResponse,
} from '../../services/book/book.service';
import { showError } from '../../utils/toast';
import {
  Container,
  MainContent,
  Sidebar,
  SidebarOverlay,
  SidebarToggleButton,
  LoadingContainer,
  LoadingText,
  SidebarHeader,
  CloseButton,
  IconTabButton,
  SidebarContent,
} from './BookDetails.styles';
import { ChaptersSidebar } from './ChaptersSidebar/ChaptersSidebar';
import { ChapterContent } from './ChapterContent/ChapterContent';
import { ChapterNotes } from './ChapterNotes';
import { useSearch } from '../../contexts/SearchContext';

const BookDetails: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setHighlightWords } = useSearch();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chapters' | 'notes'>('chapters');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoryName, setCategoryName] = useState<string | undefined>(undefined);

  const [readingProgress, setReadingProgress] =
    useState<GetReadingProgressResponse['data']>(null);
  const [hasCheckedProgress, setHasCheckedProgress] = useState(false);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const hasInitialScrolledRef = useRef(false);



  // Track previous chapter ID to detect actual changes (not initial load)
  const prevChapterIdRef = useRef<string | null>(null);

  // Clear highlight words when book changes
  useEffect(() => {
    if (bookId) {
      setHighlightWords([]);
      prevChapterIdRef.current = null; // Reset chapter tracking when book changes
    }
  }, [bookId, setHighlightWords]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!bookId) return;

      setLoading(true);
      try {
        const response = await bookService.getBookChapters(bookId);
        if (response.success && response.data) {
          setChapters(response.data);
          setCategoryName(response.category_name);
        } else {
          showError(response.error || response.message || 'Failed to load chapters');
        }
      } catch {
        showError('Failed to load chapters');
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [bookId]);

  useLayoutEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [selectedChapterId]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!bookId) return;
      try {
        const response = await bookService.getReadingProgress(bookId);
        if (response.success) {
          setReadingProgress(response.data);
        }
      } finally {
        setHasCheckedProgress(true);
      }
    };

    fetchProgress();
  }, [bookId]);

  useEffect(() => {
    if (chapters.length === 0) return;

    const chapterIdFromUrl = searchParams.get('chapter_id');

    if (chapterIdFromUrl) {
      const chapter = chapters.find(c => c.chapter_id === chapterIdFromUrl);
      if (chapter) {
        // Clear highlight words when chapter changes (if it's actually different)
        // Don't clear on initial load (when prevChapterIdRef.current is null)
        if (prevChapterIdRef.current !== null && selectedChapterId !== chapter.chapter_id) {
          setHighlightWords([]);
        }
        prevChapterIdRef.current = chapter.chapter_id;
        setSelectedChapterId(chapter.chapter_id);
        setSelectedChapter(chapter);
        return;
      }
    }

    if (!selectedChapterId && hasCheckedProgress && readingProgress) {
      const savedChapter = chapters.find(
        c => c.chapter_id === readingProgress.chapter_id
      );
      if (savedChapter) {
        prevChapterIdRef.current = savedChapter.chapter_id;
        setSelectedChapterId(savedChapter.chapter_id);
        setSelectedChapter(savedChapter);
        return;
      }
    }

    if (!selectedChapterId) {
      const firstChapter = chapters[0];
      prevChapterIdRef.current = firstChapter.chapter_id;
      setSelectedChapterId(firstChapter.chapter_id);
      setSelectedChapter(firstChapter);
    }
  }, [
    chapters,
    searchParams,
    readingProgress,
    hasCheckedProgress,
    selectedChapterId,
    setHighlightWords,
  ]);

  useEffect(() => {
    if (!selectedChapter) return;
    
    const blockIdFromUrl = searchParams.get('block_id');
    if (!blockIdFromUrl) return;
    
    if (hasInitialScrolledRef.current) {
      hasInitialScrolledRef.current = false;
    }

    const findAndScrollToBlock = (retries = 30, delay = 100) => {
      const blockElement = document.querySelector(`[data-block-id="${blockIdFromUrl}"]`) as HTMLElement | null;
      
      if (blockElement) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (mainContentRef.current) {
              const containerRect = mainContentRef.current.getBoundingClientRect();
              const elementRect = blockElement.getBoundingClientRect();
              const scrollTop = mainContentRef.current.scrollTop;
              
              const relativeTop = elementRect.top - containerRect.top + scrollTop;
              
              const centerOffset = (mainContentRef.current.clientHeight / 2) - (elementRect.height / 2);
              mainContentRef.current.scrollTo({
                top: Math.max(0, relativeTop - centerOffset),
                left: 0,
                behavior: 'smooth'
              });
            } else {
              blockElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center' 
              });
            }
            
            hasInitialScrolledRef.current = true;
          });
        });
      } else if (retries > 0) {
        setTimeout(() => findAndScrollToBlock(retries - 1, delay), delay);
      } else {
        console.warn('⚠️ Block not found after retries:', blockIdFromUrl);
      }
    };

    const timer = setTimeout(() => {
      findAndScrollToBlock();
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedChapter, searchParams]);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      if (isSidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const handleChapterSelect = useCallback(
    (chapterId: string) => {
      // Clear highlight words when user manually selects a different chapter
      if (selectedChapterId !== chapterId) {
        setHighlightWords([]);
      }
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        params.set('chapter_id', chapterId);
        params.delete('block_id');
        return params;
      });
      // Close sidebar on mobile after selecting a chapter
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    },
    [setSearchParams, selectedChapterId, setHighlightWords]
  );

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading chapters...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <MainContent ref={mainContentRef}>
        <ChapterContent
          chapter={selectedChapter}
          chapterIndex={chapters.findIndex(
            c => c.chapter_id === selectedChapter?.chapter_id
          )}
          totalChapters={chapters.length}
          categoryName={categoryName}
        />
      </MainContent>

      <SidebarOverlay $isOpen={isSidebarOpen} onClick={closeSidebar} />

      <SidebarToggleButton 
        $isOpen={isSidebarOpen}
        onClick={toggleSidebar} 
        aria-label="Toggle sidebar"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </SidebarToggleButton>

      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarHeader>
          <CloseButton onClick={closeSidebar} aria-label="Close sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </CloseButton>
          <IconTabButton
            $isActive={activeTab === 'chapters'}
            onClick={() => setActiveTab('chapters')}
            title="Chapters"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </IconTabButton>

          <IconTabButton
            $isActive={activeTab === 'notes'}
            onClick={() => setActiveTab('notes')}
            title="Notes"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </IconTabButton>
        </SidebarHeader>

        <SidebarContent>
          {activeTab === 'chapters' && (
            <ChaptersSidebar
              chapters={chapters}
              selectedChapterId={selectedChapterId}
              onChapterSelect={handleChapterSelect}
            />
          )}
          {activeTab === 'notes' && (
            <ChapterNotes chapterId={selectedChapterId} bookId={bookId} />
          )}
        </SidebarContent>
      </Sidebar>
    </Container>
  );
};

export default BookDetails;
