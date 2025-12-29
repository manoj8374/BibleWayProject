export interface Highlight {
  highlight_id?: string;         // UUID for highlight (from API)
  id?: string;                   // UUID for highlight (for compatibility)
  blockId?: string;              // Which block contains this (legacy, for backward compatibility)
  start_block_id?: string | null;       // Block ID where highlight starts
  end_block_id?: string | null;         // Block ID where highlight ends
  startOffset?: number;          // Character start position (for internal use)
  endOffset?: number;            // Character end position (for internal use)
  start_offset?: string;         // Start offset as string (from API)
  end_offset?: string;           // End offset as string (from API)
  color: string;                 // Highlight color (yellow, green, blue, etc.)
  text?: string;                 // Actual highlighted text (optional, for internal use)
  note?: string;                 // Optional note
  created_at?: string;           // ISO timestamp (from API)
  createdAt?: string;            // ISO timestamp (for compatibility)
  updated_at?: string;           // ISO timestamp (from API)
  userId?: string;               // Who created it (for internal use)
  chapter_id?: string | null;    // Which chapter (from API)
  chapterId?: string;            // Which chapter (for compatibility)
  book_id?: string;              // Which book (from API)
  bookId?: string;               // Which book (for compatibility)
}

export interface CreateHighlightRequest {
  book_id: string;
  chapter_id: string;
  block_id?: string;
  start_block_id?: string;
  end_block_id?: string;
  start_offset: string;
  end_offset: string;
  color?: string;
}

// For internal use (camelCase)
export interface CreateHighlightRequestInternal {
  blockId: string;
  startOffset: number;
  endOffset: number;
  color: string;
  text: string;
  note?: string;
  chapterId: string;
  bookId: string;
}

export interface CreateHighlightResponse {
  success: boolean;
  message: string;
  highlight_id: string;
  error?: string;
  error_code?: string;
}

export interface UpdateHighlightRequest {
  color?: string;
  note?: string;
}

export interface DeleteHighlightRequest {
  highlight_id: string;
}

export interface DeleteHighlightResponse {
  success: boolean;
  message?: string;
  error?: string;
  error_code?: string;
}

export interface HighlightOffsets {
  blockId: string;
  startOffset: number;
  endOffset: number;
  text: string;
}

