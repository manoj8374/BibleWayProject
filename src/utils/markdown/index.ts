import { unified } from "unified";
import remarkParse from "remark-parse";

import type { Root } from "mdast";


/**
 * Parses markdown text into an AST (Abstract Syntax Tree)
 * @param markdown - The markdown string to parse
 * @returns The parsed AST tree
 */
export const parseMarkdown = (markdown: string): Root => {
  const tree = unified()
    .use(remarkParse)
    .parse(markdown);
  
  return tree;
};

