import type { Root, Content } from "mdast";
import { extractPlainText } from "./extractTextFromNode";

/**
 * Block structure for storing parsed markdown nodes with chapter context
 */
export interface Block {
  blockId: string;
  node: Content;
  text: string;
  markdown: string;
}

/**
 * Converts an MDAST tree into an array of blocks with chapter context
 */
export function astToBlocks(tree: Root, markdownSource: string): Block[] {
  const blocks: Block[] = [];
   
  tree.children.forEach((node, index) => {
    //error might come here
    if (!node.position || !node.position) return;

    const text = extractPlainText(node);

    const markdown = markdownSource.slice(
      node.position.start.offset,
      node.position.end.offset
    );

    blocks.push({
      blockId: `block-${index}`,
      node,
      text,
      markdown,
    });
  });


  return blocks;
}
