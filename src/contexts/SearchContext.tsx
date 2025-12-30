import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
  highlightWords: string[];
  setHighlightWords: (words: string[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [highlightWords, setHighlightWords] = useState<string[]>([]);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText, highlightWords, setHighlightWords }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
