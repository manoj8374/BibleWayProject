export interface Block {
  blockId: string;
  text: string;
  markdown: string;
}

export const extractAllPageText = (blocks: Block[]): string => {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  return blocks
    .map((block) => block.text?.trim() || "")
    .filter((text) => text.length > 0)
    .join("\n\n");
};
