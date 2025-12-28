import { useState, useEffect } from 'react';

export const useTextSelection = () => {
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ top: 0, left: 0 });
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        setSelectedText(text);

        // Get selection position
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectionPosition({
            top: rect.top - 60 + window.scrollY, // Position above selection
            left: rect.left + rect.width / 2 - 110, // Center toolbar
          });
          setIsToolbarVisible(true);
        }
      } else {
        setIsToolbarVisible(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, []);

  const clearSelection = () => {
    setSelectedText('');
    setIsToolbarVisible(false);
    window.getSelection()?.removeAllRanges();
  };

  return {
    selectedText,
    selectionPosition,
    isToolbarVisible,
    clearSelection,
  };
};

