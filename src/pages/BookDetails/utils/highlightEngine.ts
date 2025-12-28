import type { Highlight } from '../../../types/highlight';

/**
 * Apply a highlight to a specific block in the DOM
 */
export function applyHighlightToDOM(
  blockElement: HTMLElement,
  highlight: Highlight
): void {
  const walker = document.createTreeWalker(
    blockElement,
    NodeFilter.SHOW_TEXT,
    null
  );

  let currentOffset = 0;
  const segments: { node: Text; start: number; end: number }[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const nextOffset = currentOffset + node.length;

    if (highlight.endOffset > currentOffset && 
        highlight.startOffset < nextOffset) {
      segments.push({
        node,
        start: Math.max(0, highlight.startOffset - currentOffset),
        end: Math.min(node.length, highlight.endOffset - currentOffset),
      });
    }

    currentOffset = nextOffset;
  }

  // Wrap segments in colored spans (reverse order to maintain positions)
  for (const { node, start, end } of segments.reverse()) {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);

    const span = document.createElement('span');
    span.className = 'text-highlight';
    span.style.backgroundColor = highlight.color;
    span.style.cursor = 'pointer';
    span.style.borderRadius = '2px';
    span.style.padding = '2px 0';
    span.style.transition = 'all 0.2s';
    span.setAttribute('data-highlight-id', highlight.id);
    span.setAttribute('data-color', highlight.color);
    span.title = highlight.note || 'Click to edit or remove';

    try {
      range.surroundContents(span);
    } catch (error) {
      console.warn('Failed to apply highlight:', error);
      // If surroundContents fails (e.g., spans elements), try extracting and inserting
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    }
  }
}

/**
 * Remove a highlight from the DOM by its ID
 */
export function removeHighlightFromDOM(highlightId: string): void {
  const spans = document.querySelectorAll(
    `[data-highlight-id="${highlightId}"]`
  );

  spans.forEach(span => {
    const parent = span.parentNode;
    if (!parent) return;

    // Move all children out of the span
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }

    // Remove the empty span
    parent.removeChild(span);

    // Normalize to merge adjacent text nodes
    parent.normalize();
  });
}

/**
 * Remove all highlights from the DOM
 */
export function removeAllHighlightsFromDOM(): void {
  const spans = document.querySelectorAll('.text-highlight');
  spans.forEach(span => {
    const parent = span.parentNode;
    if (!parent) return;

    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
    parent.normalize();
  });
}

/**
 * Update highlight color in the DOM
 */
export function updateHighlightColorInDOM(
  highlightId: string,
  newColor: string
): void {
  const spans = document.querySelectorAll(
    `[data-highlight-id="${highlightId}"]`
  );

  spans.forEach(span => {
    (span as HTMLElement).style.backgroundColor = newColor;
    span.setAttribute('data-color', newColor);
  });
}

/**
 * Get highlight element by ID
 */
export function getHighlightElement(highlightId: string): HTMLElement | null {
  return document.querySelector(`[data-highlight-id="${highlightId}"]`);
}

