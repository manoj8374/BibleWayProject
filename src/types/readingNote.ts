// Base Note Interface (from API response)
export interface ReadingNote {
  note_id: string;
  book_id: string;
  user_id: string;
  content: string;
  chapter_id: string | null;
  block_id: string | null;
  created_at?: string;
  updated_at?: string;
}

// Request interfaces
export interface CreateReadingNoteRequest {
  book_id: string;
  content: string;
  chapter_id?: string;
  block_id: string;
}

export interface UpdateReadingNoteRequest {
  note_id: string;
  content: string;
}

// Response interfaces
export interface CreateReadingNoteResponse {
  success: boolean;
  message: string;
  note_id: string;
  error?: string;
  error_code?: string;
}

export interface GetReadingNotesResponse {
  success: boolean;
  message: string;
  data: ReadingNote[];
  error?: string;
  error_code?: string;
}

export interface UpdateReadingNoteResponse {
  success: boolean;
  message: string;
  note_id: string;
  error?: string;
  error_code?: string;
}

export interface DeleteReadingNoteRequest {
  note_id: string;
}

export interface DeleteReadingNoteResponse {
  success: boolean;
  message: string;
  error?: string;
  error_code?: string;
}

// New types for GET /reading-note/all response
export interface NoteItem {
  note_id: string;
  content: string;
  block_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChapterWithNotes {
  chapter_id: string | null;
  chapter_name: string | null;
  notes: NoteItem[];
}

export interface BookWithNotes {
  book_id: string;
  book_name: string;
  chapters: ChapterWithNotes[];
}

export interface GetAllReadingNotesResponse {
  success: boolean;
  message: string;
  data: BookWithNotes[];
  error?: string;
  error_code?: string;
}

