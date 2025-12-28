import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Book } from '../services/book/book.service';

interface BookContextType {
  currentBook: Book | null;
  setCurrentBook: (book: Book | null) => void;
  isBookmarked: boolean;
  setIsBookmarked: (value: boolean) => void;
  bookmarkId: string | null;
  setBookmarkId: (id: string | null) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);

  return (
    <BookContext.Provider value={{ currentBook, setCurrentBook, isBookmarked, setIsBookmarked, bookmarkId, setBookmarkId }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};
