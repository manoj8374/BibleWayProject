import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readingNoteService } from '../../services/readingNote/readingNote.service';
import type { BookWithNotes, NoteItem } from '../../types/readingNote';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n/hooks';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  ContentWrapper,
  BooksSection,
  BooksGrid,
  BookCard,
  BookName,
  BookInfo,
  BookCardContent,
  BookCardActions,
  OpenBookButton,
  ViewNotesButton,
  NotesSection,
  NotesHeader,
  NotesTitle,
  CloseButton,
  ChaptersList,
  ChapterSection,
  ChapterHeader,
  NotesList,
  NoteCard,
  NoteContent,
  NoteTextarea,
  NoteMeta,
  NoteDate,
  NoteActions,
  ActionButton,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  LoadingContainer,
  LoadingText,
  Overlay
} from './ReadingNotesPage.styles';

const ReadingNotesPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookWithNotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<BookWithNotes | null>(null);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await readingNoteService.getAllReadingNotes();
      if (response.success) {
        setBooks(response.data);
      } else {
        showError(response.message || t('pages.readingNotesPage.failedToLoad'));
      }
    } catch (error) {
      console.error('Error fetching reading notes:', error);
      showError(t('pages.readingNotesPage.failedToLoad'));
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book: BookWithNotes) => {
    setSelectedBook(book);
    setIsNotesOpen(true);
    setEditingNoteId(null);
    setEditContent('');
  };

  const handleOpenBook = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    navigate(`/book/${bookId}`);
  };

  const handleViewNotes = (book: BookWithNotes, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    handleBookSelect(book);
  };

  const handleCloseNotes = () => {
    setIsNotesOpen(false);
    // Delay clearing selected book to allow animation
    setTimeout(() => {
      setSelectedBook(null);
      setEditingNoteId(null);
      setEditContent('');
    }, 300);
  };

  const handleEdit = (note: NoteItem) => {
    setEditingNoteId(note.note_id);
    setEditContent(note.content);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditContent('');
  };

  const handleSave = async (noteId: string) => {
    if (!editContent.trim()) {
      showError(t('pages.readingNotesPage.contentRequired'));
      return;
    }

    setSaving(true);
    try {
      const success = await readingNoteService.updateReadingNote(noteId, editContent);
      if (success) {
        showSuccess(t('pages.readingNotesPage.updatedSuccessfully'));
        setEditingNoteId(null);
        setEditContent('');
        // Refresh notes
        await fetchNotes();
        // Restore selected book state
        if (selectedBook) {
          const response = await readingNoteService.getAllReadingNotes();
          if (response.success) {
            const updatedBook = response.data.find(b => b.book_id === selectedBook.book_id);
            if (updatedBook) {
              setSelectedBook(updatedBook);
            }
          }
        }
      } else {
        showError(t('pages.readingNotesPage.failedToUpdate'));
      }
    } catch (error) {
      console.error('Error updating note:', error);
      showError(t('pages.readingNotesPage.failedToUpdate'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!window.confirm(t('pages.readingNotesPage.confirmDelete'))) {
      return;
    }

    try {
      const success = await readingNoteService.deleteReadingNote(noteId);
      if (success) {
        showSuccess(t('pages.readingNotesPage.deletedSuccessfully'));
        // Refresh notes
        await fetchNotes();
        // Restore selected book state
        if (selectedBook) {
          const response = await readingNoteService.getAllReadingNotes();
          if (response.success) {
            const updatedBook = response.data.find(b => b.book_id === selectedBook.book_id);
            if (updatedBook) {
              setSelectedBook(updatedBook);
            } else {
              // Book has no more notes, close notes section
              handleCloseNotes();
            }
          }
        }
      } else {
        showError(t('pages.readingNotesPage.failedToDelete'));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      showError(t('pages.readingNotesPage.failedToDelete'));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalNotesCount = (book: BookWithNotes) => {
    return book.chapters.reduce((total, chapter) => total + chapter.notes.length, 0);
  };

  if (loading) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>{t('pages.readingNotesPage.title')}</PageTitle>
        </PageHeader>
        <LoadingContainer>
          <LoadingText>{t('pages.readingNotesPage.loading')}</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (books.length === 0) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>{t('pages.readingNotesPage.title')}</PageTitle>
        </PageHeader>
        <EmptyState>
          <EmptyStateIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
          </EmptyStateIcon>
          <EmptyStateText>{t('pages.readingNotesPage.noNotes')}</EmptyStateText>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{t('pages.readingNotesPage.title')}</PageTitle>
      </PageHeader>

      <ContentWrapper>
        <BooksSection>
          <BooksGrid>
            {books.map((book) => {
              const totalNotes = getTotalNotesCount(book);
              const isSelected = selectedBook?.book_id === book.book_id;
              return (
                <BookCard
                  key={book.book_id}
                  $isSelected={isSelected}
                >
                  <BookCardContent>
                    <BookName>{book.book_name}</BookName>
                    <BookInfo>
                      {totalNotes} {totalNotes === 1 ? t('pages.readingNotesPage.note') : t('pages.readingNotesPage.notes')}
                    </BookInfo>
                  </BookCardContent>
                  <BookCardActions>
                    <ViewNotesButton
                      onClick={(e) => handleViewNotes(book, e)}
                      aria-label={t('pages.readingNotesPage.viewNotes')}
                    >
                      {t('pages.readingNotesPage.viewNotes')}
                    </ViewNotesButton>
                    <OpenBookButton
                      onClick={(e) => handleOpenBook(book.book_id, e)}
                      aria-label={t('pages.readingNotesPage.openBook')}
                    >
                      {t('pages.readingNotesPage.openBook')}
                    </OpenBookButton>
                  </BookCardActions>
                </BookCard>
              );
            })}
          </BooksGrid>
        </BooksSection>

        {selectedBook && (
          <>
            <Overlay $isOpen={isNotesOpen} onClick={handleCloseNotes} />
            <NotesSection $isOpen={isNotesOpen}>
              <NotesHeader>
                <NotesTitle>{selectedBook.book_name}</NotesTitle>
                <CloseButton onClick={handleCloseNotes} aria-label="Close">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </CloseButton>
              </NotesHeader>

              <ChaptersList>
                {selectedBook.chapters.map((chapter, chapterIndex) => {
                  if (chapter.notes.length === 0) return null;
                  
                  return (
                    <ChapterSection key={chapter.chapter_id || `no-chapter-${chapterIndex}`}>
                      <ChapterHeader>
                        {chapter.chapter_name || t('pages.readingNotesPage.noChapter')}
                      </ChapterHeader>
                      <NotesList>
                        {chapter.notes.map((note) => (
                          <NoteCard key={note.note_id}>
                            {editingNoteId === note.note_id ? (
                              <>
                                <NoteTextarea
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  placeholder={t('pages.readingNotesPage.notePlaceholder')}
                                  rows={4}
                                />
                                <NoteActions>
                                  <ActionButton
                                    $variant="save"
                                    onClick={() => handleSave(note.note_id)}
                                    disabled={saving}
                                  >
                                    {saving ? t('pages.readingNotesPage.saving') : t('pages.readingNotesPage.save')}
                                  </ActionButton>
                                  <ActionButton
                                    $variant="cancel"
                                    onClick={handleCancelEdit}
                                    disabled={saving}
                                  >
                                    {t('pages.readingNotesPage.cancel')}
                                  </ActionButton>
                                </NoteActions>
                              </>
                            ) : (
                              <>
                                <NoteContent>{note.content}</NoteContent>
                                <NoteMeta>
                                  <NoteDate>
                                    {formatDate(note.created_at)}
                                    {note.updated_at !== note.created_at && (
                                      <span> • {t('pages.readingNotesPage.edited')}</span>
                                    )}
                                  </NoteDate>
                                  <NoteActions>
                                    <ActionButton
                                      $variant="edit"
                                      onClick={() => handleEdit(note)}
                                    >
                                      {t('pages.readingNotesPage.edit')}
                                    </ActionButton>
                                    <ActionButton
                                      $variant="delete"
                                      onClick={() => handleDelete(note.note_id)}
                                    >
                                      {t('pages.readingNotesPage.delete')}
                                    </ActionButton>
                                  </NoteActions>
                                </NoteMeta>
                              </>
                            )}
                          </NoteCard>
                        ))}
                      </NotesList>
                    </ChapterSection>
                  );
                })}
              </ChaptersList>

              {selectedBook.chapters.every(ch => ch.notes.length === 0) && (
                <EmptyState>
                  <EmptyStateText>{t('pages.readingNotesPage.noNotesForBook')}</EmptyStateText>
                </EmptyState>
              )}
            </NotesSection>
          </>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ReadingNotesPage;

