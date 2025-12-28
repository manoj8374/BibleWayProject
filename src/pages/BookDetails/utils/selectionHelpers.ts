import type { HighlightOffsets } from '../../../types/highlight';

/**
 * Calculate highlight offsets from current text selection
 */
export function calculateHighlightOffsets(selection: Selection): HighlightOffsets | null {
  if (!selection.rangeCount) return null;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return null;

  // Find the containing block
  const startContainer = range.startContainer;
  const block = (startContainer.nodeType === Node.TEXT_NODE
    ? startContainer.parentElement
    : startContainer as HTMLElement
  )?.closest('[data-block-id]') as HTMLElement;

  if (!block) {
    console.warn('No block element found for selection');
    return null;
  }

  const blockId = block.getAttribute('data-block-id');
  if (!blockId) {
    console.warn('Block has no data-block-id attribute');
    return null;
  }

  // Check if selection spans multiple blocks (not supported yet)
  const endContainer = range.endContainer;
  const endBlock = (endContainer.nodeType === Node.TEXT_NODE
    ? endContainer.parentElement
    : endContainer as HTMLElement
  )?.closest('[data-block-id]') as HTMLElement;

  if (endBlock && endBlock !== block) {
    console.warn('Multi-block selection not supported');
    return null;
  }

  // Calculate character offsets within the block
  const walker = document.createTreeWalker(
    block,
    NodeFilter.SHOW_TEXT,
    null
  );

  let currentOffset = 0;
  let startOffset = 0;
  let endOffset = 0;
  let found = false;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;

    // Check if this is the start node
    if (node === range.startContainer) {
      startOffset = currentOffset + range.startOffset;
    }

    // Check if this is the end node
    if (node === range.endContainer) {
      endOffset = currentOffset + range.endOffset;
      found = true;
      break;
    }

    currentOffset += node.length;
  }

  if (!found) {
    // Handle case where end is at the end of block
    endOffset = currentOffset;
  }

  // Extract the highlighted text
  const text = range.toString().trim();

  if (!text) {
    console.warn('Empty text selection');
    return null;
  }

  return {
    blockId,
    startOffset,
    endOffset,
    text
  };
}

/**
 * Check if a given node is within a highlight span
 */
export function isWithinHighlight(node: Node): HTMLElement | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.parentElement)?.closest('[data-highlight-id]') as HTMLElement | null;
  }
  return (node as HTMLElement)?.closest('[data-highlight-id]') as HTMLElement | null;
}

/**
 * Get highlight ID from a DOM element or selection
 */
export function getHighlightIdFromSelection(selection: Selection): string | null {
  if (!selection.rangeCount) return null;

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;

  const highlightSpan = isWithinHighlight(container);
  if (highlightSpan) {
    return highlightSpan.getAttribute('data-highlight-id');
  }

  return null;
}

/**
 * Clear current text selection
 */
export function clearTextSelection(): void {
  const selection = window.getSelection();
  selection?.removeAllRanges();
}

/**
 * Check if selection is valid for highlighting
 */
export function isValidSelection(selection: Selection | null): boolean {
  if (!selection || selection.rangeCount === 0) return false;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return false;

  const text = range.toString().trim();
  if (!text || text.length === 0) return false;

  // Check if selection is within a block
  const startContainer = range.startContainer;
  const block = (startContainer.nodeType === Node.TEXT_NODE
    ? startContainer.parentElement
    : startContainer as HTMLElement
  )?.closest('[data-block-id]');

  return !!block;
}

