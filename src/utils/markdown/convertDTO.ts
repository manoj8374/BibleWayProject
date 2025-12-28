import type { Block } from "./astToBlocks";
import { extractImages } from "./extractTextFromNode";

export interface ImageInfo {
  url: string;
  alt?: string;
  title?: string;
}

export interface BlockDTO {
  blockId: string;
  text: string;
  markdown: string;
  images?: ImageInfo[];
}

export interface ChapterDTO {
  chapterName: string;
  chapterTitle: string;
  blocks: BlockDTO[];
}

export function blocksToDTO(blocks: Block[]): BlockDTO[] {
  return blocks.map(block => {
    const images = extractImages(block.node);
    
    return {
      blockId: block.blockId,
      text: block.text,
      markdown: block.markdown,
      ...(images.length > 0 && { images }),
    };
  });
}
