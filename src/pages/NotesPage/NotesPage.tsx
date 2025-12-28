import React, { useEffect, useState } from 'react';
import { readingNoteService } from '../../services/readingNote/readingNote.service';
import type { BookWithNotes, NoteItem } from '../../types/readingNote';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n/hooks';
import {
    Container,
    MainContent,
    Sidebar,
    SidebarOverlay,
    SidebarToggleButton,
    Header,
    Title,
    BooksList,
    BookItem,
    BookName,
    BookInfo,
    SidebarHeader,
    SidebarTitle,
    CloseButton,
    SidebarContent,
    ChaptersList,
    ChapterItem,
    ChapterName,
    NotesList,
    NoteCard,
    NoteContent,
    NoteActions,
    EditButton,
    DeleteButton,
    SaveButton,
    CancelButton,
    NoteTextarea,
    EmptyState,
    EmptyStateText,
    LoadingContainer,
    NoteMeta,
    NoteDate
} from './NotesPage.styles';

const NotesPage: React.FC = () => {
    const { t } = useI18n();
    const [books, setBooks] = useState<BookWithNotes[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookWithNotes | null>(null);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchNotes = async () => {
        setLoading(true);
        const response = await readingNoteService.getAllReadingNotes();
        if (response.success) {
            setBooks(response.data);
        } else {
            showError(response.message || t('pages.notesPage.failedToLoad'));
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchNotes();
    }, []);


    const handleBookSelect = (book: BookWithNotes) => {
        setSelectedBook(book);
        setEditingNoteId(null);
        // On mobile, open sidebar; on desktop it's always visible
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        // Delay clearing selected book to allow animation
        setTimeout(() => {
            setSelectedBook(null);
            setEditingNoteId(null);
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
            showError(t('pages.notesPage.contentRequired'));
            return;
        }

        setSaving(true);
        const success = await readingNoteService.updateReadingNote(noteId, editContent);
        if (success) {
            showSuccess(t('pages.notesPage.updatedSuccessfully'));
            setEditingNoteId(null);
            setEditContent('');
            // Refresh notes
            const response = await readingNoteService.getAllReadingNotes();
            if (response.success) {
                setBooks(response.data);
                // Restore selected book state
                if (selectedBook) {
                    const updatedBook = response.data.find(b => b.book_id === selectedBook.book_id);
                    if (updatedBook) {
                        setSelectedBook(updatedBook);
                    }
                }
            }
        } else {
            showError(t('pages.notesPage.failedToUpdate'));
        }
        setSaving(false);
    };

    const handleDelete = async (noteId: string) => {
        if (!window.confirm(t('pages.notesPage.confirmDelete'))) {
            return;
        }

        const success = await readingNoteService.deleteReadingNote(noteId);
        if (success) {
            showSuccess(t('pages.notesPage.deletedSuccessfully'));
            // Refresh notes
            const response = await readingNoteService.getAllReadingNotes();
            if (response.success) {
                setBooks(response.data);
                // Restore selected book state
                if (selectedBook) {
                    const updatedBook = response.data.find(b => b.book_id === selectedBook.book_id);
                    if (updatedBook) {
                        setSelectedBook(updatedBook);
                    } else {
                        // Book has no more notes, go back
                        setSelectedBook(null);
                    }
                }
            }
        } else {
            showError(t('pages.notesPage.failedToDelete'));
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
            <Container>
                <LoadingContainer>
                    <div>{t('pages.notesPage.loading')}</div>
                </LoadingContainer>
            </Container>
        );
    }

    if (books.length === 0) {
        return (
            <Container>
                <Header>
                    <Title>{t('pages.notesPage.title')}</Title>
                </Header>
                <EmptyState>
                    <EmptyStateText>{t('pages.notesPage.noNotes')}</EmptyStateText>
                </EmptyState>
            </Container>
        );
    }

    return (
        <Container>
            <MainContent>
                <Header>
                    <Title>{t('pages.notesPage.title')}</Title>
                </Header>

                {books.length === 0 ? (
                    <EmptyState>
                        <EmptyStateText>{t('pages.notesPage.noNotes')}</EmptyStateText>
                    </EmptyState>
                ) : (
                    <BooksList>
                        {books.map((book) => {
                            const totalNotes = getTotalNotesCount(book);
                            const isSelected = selectedBook?.book_id === book.book_id;
                            return (
                                <BookItem 
                                    key={book.book_id} 
                                    onClick={() => handleBookSelect(book)}
                                    $isSelected={isSelected}
                                >
                                    <BookName>{book.book_name}</BookName>
                                    <BookInfo>
                                        {totalNotes} {totalNotes === 1 ? t('pages.notesPage.note') : t('pages.notesPage.notes')}
                                    </BookInfo>
                                </BookItem>
                            );
                        })}
                    </BooksList>
                )}
            </MainContent>

            {selectedBook && (
                <>
                    <SidebarOverlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
                    <SidebarToggleButton 
                        $isOpen={isSidebarOpen}
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </SidebarToggleButton>
                    <Sidebar $isOpen={isSidebarOpen}>
                        <SidebarHeader>
                            <SidebarTitle>{selectedBook.book_name}</SidebarTitle>
                            <CloseButton onClick={closeSidebar} aria-label="Close sidebar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </CloseButton>
                        </SidebarHeader>

                        <SidebarContent>
                            <ChaptersList>
                                {selectedBook.chapters.map((chapter, chapterIndex) => (
                                    chapter.notes.length > 0 && (
                                        <ChapterItem key={chapter.chapter_id || `no-chapter-${chapterIndex}`}>
                                            <ChapterName>
                                                {chapter.chapter_name || t('pages.notesPage.noChapter')}
                                            </ChapterName>
                                            <NotesList>
                                                {chapter.notes.map((note) => (
                                                    <NoteCard key={note.note_id}>
                                                        {editingNoteId === note.note_id ? (
                                                            <>
                                                                <NoteTextarea
                                                                    value={editContent}
                                                                    onChange={(e) => setEditContent(e.target.value)}
                                                                    placeholder={t('pages.notesPage.notePlaceholder')}
                                                                    rows={4}
                                                                />
                                                                <NoteActions>
                                                                    <SaveButton
                                                                        onClick={() => handleSave(note.note_id)}
                                                                        disabled={saving}
                                                                    >
                                                                        {saving ? t('pages.notesPage.saving') : t('pages.notesPage.save')}
                                                                    </SaveButton>
                                                                    <CancelButton
                                                                        onClick={handleCancelEdit}
                                                                        disabled={saving}
                                                                    >
                                                                        {t('pages.notesPage.cancel')}
                                                                    </CancelButton>
                                                                </NoteActions>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <NoteContent>{note.content}</NoteContent>
                                                                <NoteMeta>
                                                                    <NoteDate>
                                                                        {formatDate(note.created_at)}
                                                                        {note.updated_at !== note.created_at && (
                                                                            <span> • {t('pages.notesPage.edited')}</span>
                                                                        )}
                                                                    </NoteDate>
                                                                    <NoteActions>
                                                                        <EditButton onClick={() => handleEdit(note)}>
                                                                            {t('pages.notesPage.edit')}
                                                                        </EditButton>
                                                                        <DeleteButton onClick={() => handleDelete(note.note_id)}>
                                                                            {t('pages.notesPage.delete')}
                                                                        </DeleteButton>
                                                                    </NoteActions>
                                                                </NoteMeta>
                                                            </>
                                                        )}
                                                    </NoteCard>
                                                ))}
                                            </NotesList>
                                        </ChapterItem>
                                    )
                                ))}
                            </ChaptersList>
                        </SidebarContent>
                    </Sidebar>
                </>
            )}
        </Container>
    );
};

export default NotesPage;

