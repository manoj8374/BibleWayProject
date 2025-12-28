import React, { useState, useEffect } from 'react';
import { readingNoteService } from '../../../services/readingNote';
import type { ReadingNote } from '../../../types/readingNote';
import { showError, showSuccess } from '../../../utils/toast';
import { useI18n } from '../../../i18n';
import {
  NotesContainer,
  NotesHeader,
  NotesTitle,
  NotesCount,
  NotesContent,
  NoteEditor,
  NoteTextarea,
  EditorActions,
  Button,
  NotesList,
  NoteItem,
  NoteHeader,
  NoteDate,
  NoteActions,
  IconButton,
  NoteText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  EmptyStateSubtext
} from './ChapterNotes.styles';

interface ChapterNotesProps {
  chapterId: string | null;
  bookId: string | undefined;
}

export const ChapterNotes: React.FC<ChapterNotesProps> = ({ chapterId, bookId }) => {
  const { t } = useI18n();
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<ReadingNote[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load notes when bookId changes
  useEffect(() => {
    if (bookId) {
      loadNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  // Reset notes when chapter changes
  useEffect(() => {
    if (chapterId) {
      loadNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  const loadNotes = async () => {
    if (!bookId) return;

    setLoading(true);
    try {
      const fetchedNotes = await readingNoteService.getReadingNotesByBook(bookId);
      
      // Filter notes by chapter if chapterId is provided
      const filteredNotes = chapterId 
        ? fetchedNotes.filter(note => note.chapter_id === chapterId)
        : fetchedNotes;
      
      setNotes(filteredNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
      showError(t('chapterNotes.errors.failedToLoad'));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!noteText.trim() || !bookId) return;

    setSaving(true);
    try {
      if (editingNoteId) {
        // Update existing note
        const success = await readingNoteService.updateReadingNote(
          editingNoteId,
          noteText
        );

        if (success) {
          showSuccess(t('chapterNotes.success.noteUpdated'));
          await loadNotes();
          setNoteText('');
          setIsEditing(false);
          setEditingNoteId(null);
        } else {
          showError(t('chapterNotes.errors.failedToUpdate'));
        }
      } else {
        // Create new note
        const noteId = await readingNoteService.createReadingNote({
          book_id: bookId,
          content: noteText,
          chapter_id: chapterId || undefined,
          block_id: chapterId || 'chapter-note' // Use chapterId or default
        });

        if (noteId) {
          showSuccess(t('chapterNotes.success.noteCreated'));
          await loadNotes();
          setNoteText('');
          setIsEditing(false);
        } else {
          showError(t('chapterNotes.errors.failedToCreate'));
        }
      }
    } catch (error) {
      console.error('Error saving note:', error);
      showError(t('chapterNotes.errors.failedToSave'));
    } finally {
      setSaving(false);
    }
  };

  const handleEditNote = (note: ReadingNote) => {
    setNoteText(note.content);
    setEditingNoteId(note.note_id);
    setIsEditing(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!window.confirm(t('chapterNotes.deleteConfirmation'))) return;

    try {
      const success = await readingNoteService.deleteReadingNote(noteId);
      if (success) {
        showSuccess(t('chapterNotes.success.noteDeleted'));
        setNotes(prev => prev.filter(note => note.note_id !== noteId));
      } else {
        showError(t('chapterNotes.errors.failedToDelete'));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      showError(t('chapterNotes.errors.failedToDelete'));
    }
  };

  const handleCancel = () => {
    setNoteText('');
    setIsEditing(false);
    setEditingNoteId(null);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return t('chapterNotes.justNow');
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!bookId) {
    return (
      <NotesContainer>
        <NotesHeader>
          <NotesTitle>{t('chapterNotes.title')}</NotesTitle>
        </NotesHeader>
        <NotesContent>
          <EmptyState>
            <EmptyStateIcon>📝</EmptyStateIcon>
            <EmptyStateText>{t('chapterNotes.noBookSelected')}</EmptyStateText>
            <EmptyStateSubtext>
              {t('chapterNotes.selectBookMessage')}
            </EmptyStateSubtext>
          </EmptyState>
        </NotesContent>
      </NotesContainer>
    );
  }

  if (!chapterId) {
    return (
      <NotesContainer>
        <NotesHeader>
          <NotesTitle>{t('chapterNotes.title')}</NotesTitle>
        </NotesHeader>
        <NotesContent>
          <EmptyState>
            <EmptyStateIcon>📝</EmptyStateIcon>
            <EmptyStateText>{t('chapterNotes.noChapterSelected')}</EmptyStateText>
            <EmptyStateSubtext>
              {t('chapterNotes.selectChapterMessage')}
            </EmptyStateSubtext>
          </EmptyState>
        </NotesContent>
      </NotesContainer>
    );
  }

  return (
    <NotesContainer>
      <NotesHeader>
        <NotesTitle>{t('chapterNotes.title')}</NotesTitle>
        <NotesCount>{notes.length} {notes.length === 1 ? t('chapterNotes.note') : t('chapterNotes.notes')}</NotesCount>
      </NotesHeader>

      <NotesContent>
        {/* Note Editor */}
        <NoteEditor>
          <NoteTextarea
            placeholder={t('chapterNotes.placeholder')}
            value={noteText}
            onChange={(e) => {
              setNoteText(e.target.value);
              if (!isEditing && e.target.value) {
                setIsEditing(true);
              }
            }}
            disabled={saving}
          />
          {isEditing && (
            <EditorActions>
              <Button onClick={handleCancel} disabled={saving}>
                {t('chapterNotes.cancel')}
              </Button>
              <Button 
                $variant="primary" 
                onClick={handleSaveNote}
                disabled={!noteText.trim() || saving}
              >
                {saving ? t('chapterNotes.saving') : (editingNoteId ? t('chapterNotes.updateNote') : t('chapterNotes.saveNote'))}
              </Button>
            </EditorActions>
          )}
        </NoteEditor>

        {/* Loading State */}
        {loading ? (
          <EmptyState>
            <EmptyStateText>{t('chapterNotes.loadingNotes')}</EmptyStateText>
          </EmptyState>
        ) : (
          <>
            {/* Notes List */}
            {notes.length > 0 ? (
              <NotesList>
                {notes.map(note => (
                  <NoteItem key={note.note_id}>
                    <NoteHeader>
                      <NoteDate>{formatDate(note.created_at)}</NoteDate>
                      <NoteActions>
                        <IconButton
                          onClick={() => handleEditNote(note)}
                          title={t('chapterNotes.editNote')}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteNote(note.note_id)}
                          title={t('chapterNotes.deleteNote')}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </IconButton>
                      </NoteActions>
                    </NoteHeader>
                    <NoteText>{note.content}</NoteText>
                  </NoteItem>
                ))}
              </NotesList>
            ) : (
              !isEditing && (
                <EmptyState>
                  <EmptyStateIcon>📝</EmptyStateIcon>
                  <EmptyStateText>{t('chapterNotes.noNotesYet')}</EmptyStateText>
                  <EmptyStateSubtext>
                    {t('chapterNotes.startWritingMessage')}
                  </EmptyStateSubtext>
                </EmptyState>
              )
            )}
          </>
        )}
      </NotesContent>
    </NotesContainer>
  );
};

