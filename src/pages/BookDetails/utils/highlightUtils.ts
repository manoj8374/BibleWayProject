export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const highlightContent = (content: string, query: string): string => {
  if (!query || !query.trim()) {
    return content;
  }

  const cleanQuery = escapeRegExp(query.trim());
  const regex = new RegExp(`(${cleanQuery})`, 'gi');

  const parts = content.split(/(<[^>]*>)/g);
  
  return parts.map(part => {
    if (part.startsWith('<')) {
      return part;
    }
    return part.replace(regex, '<mark class="highlight-match">$1</mark>');
  }).join('');
};

/**
 * Highlights multiple words/phrases in content while preserving HTML structure.
 * Handles overlapping matches by prioritizing longer phrases first.
 * Avoids nested mark tags by checking if text is already highlighted.
 * @param content - The HTML content to highlight
 * @param words - Array of words/phrases to highlight
 * @returns HTML string with highlighted words wrapped in <mark> tags
 */
export const highlightMultipleWords = (content: string, words: string[]): string => {
  if (!words || words.length === 0 || !content) {
    return content;
  }

  // Filter out empty words and trim
  const validWords = words
    .map(word => word.trim())
    .filter(word => word.length > 0);

  if (validWords.length === 0) {
    return content;
  }

  // Sort words by length (longest first) to handle overlapping matches correctly
  // Longer phrases should be matched first to avoid partial matches
  const sortedWords = [...validWords].sort((a, b) => b.length - a.length);

  // Split content into HTML tags and text parts
  const parts = content.split(/(<[^>]*>)/g);
  
  return parts.map(part => {
    // Skip HTML tags - don't highlight within tags
    if (part.startsWith('<')) {
      return part;
    }

    // For text parts, apply highlighting for each word
    let highlightedPart = part;
    
    sortedWords.forEach(word => {
      const escapedWord = escapeRegExp(word);
      const regex = new RegExp(`(${escapedWord})`, 'gi');
      
      // Find all matches first with their positions
      const matches: Array<{ index: number; length: number; text: string }> = [];
      let match;
      
      // Reset regex lastIndex to avoid issues
      regex.lastIndex = 0;
      while ((match = regex.exec(highlightedPart)) !== null) {
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[0]
        });
      }
      
      // Apply highlights from end to start to maintain correct positions
      matches.reverse().forEach(({ index, length, text }) => {
        const before = highlightedPart.substring(0, index);
        const matchText = highlightedPart.substring(index, index + length);
        const after = highlightedPart.substring(index + length);
        
        // Check if we're already inside a mark tag by counting open/close tags before this position
        const beforeMatch = before;
        const openMarkTags = (beforeMatch.match(/<mark[^>]*>/gi) || []).length;
        const closeMarkTags = (beforeMatch.match(/<\/mark>/gi) || []).length;
        const isInsideMark = openMarkTags > closeMarkTags;
        
        // Also check if the match text itself contains mark tags (shouldn't happen but safety check)
        const hasMarkInMatch = matchText.includes('<mark') || matchText.includes('</mark>');
        
        if (!isInsideMark && !hasMarkInMatch) {
          highlightedPart = before + `<mark class="highlight-match">${matchText}</mark>` + after;
        }
      });
    });
    
    return highlightedPart;
  }).join('');
};