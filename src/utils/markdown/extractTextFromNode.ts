import type { Content } from "mdast";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractPlainText(node: Content): string {
  let text = "";

  function walk(n: any) {
    if (!n) return;

    switch (n.type) {
      case "text":
      case "inlineCode":
        text += n.value ?? "";
        return;

      case "image": {
        // Include image info in readable format: [Image: alt - url]
        const imageAlt = n.alt || "Image";
        const imageUrl = n.url || "";
        text += `[${imageAlt}${imageUrl ? ` - ${imageUrl}` : ""}]`;
        return;
      }

      case "break":
        text += "\n";
        return;

      case "link":
      case "emphasis":
      case "strong":
      case "delete":
      case "heading":
      case "paragraph":
      case "blockquote":
      case "list":
      case "listItem":
        if (n.children) {
          n.children.forEach(walk);
        }
        return;

      case "code":
        text += n.value ?? "";
        return;

      default:
        if (n.children) {
          n.children.forEach(walk);
        }
    }
  }

  walk(node);
  return text;
}

/**
 * Extracts all image information from a markdown node
 */
export interface ImageInfo {
  url: string;
  alt?: string;
  title?: string;
}

export function extractImages(node: Content): ImageInfo[] {
  const images: ImageInfo[] = [];

  function walk(n: any) {
    if (!n) return;

    if (n.type === "image") {
      images.push({
        url: n.url || "",
        alt: n.alt || undefined,
        title: n.title || undefined,
      });
    }

    if (n.children) {
      n.children.forEach(walk);
    }
  }

  walk(node);
  return images;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
