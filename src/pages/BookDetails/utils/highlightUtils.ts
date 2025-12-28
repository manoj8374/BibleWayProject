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
