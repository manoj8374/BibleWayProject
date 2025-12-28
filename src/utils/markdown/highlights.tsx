type Highlight = {
  blockId: string;
  startOffset: number;
  endOffset: number;
};

export const PREDEFINED_HIGHLIGHTS: Highlight[] = [
    {blockId: "block-0", startOffset: 0, endOffset: 100 },
  { blockId: "block-1", startOffset: 0, endOffset: 100 },
  { blockId: "block-1", startOffset: 10, endOffset: 15 },
  { blockId: "block-2", startOffset: 3, endOffset: 9 },
  { blockId: "block-3", startOffset: 0, endOffset: 4 },
  { blockId: "block-4", startOffset: 12, endOffset: 20 },
  
];
