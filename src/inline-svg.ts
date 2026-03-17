import type { Plugin } from 'unified';
import type { Root, Image } from 'mdast';
import path from 'node:path';
import fs from 'node:fs';
import { visit } from 'unist-util-visit';

const remarkInlineSvg: Plugin<[string?, string?], Root, Root> = (
  relativePath = '',
  customHtmlWrapper = '',
) => {
  const baseDirectory = process.cwd();
  const options = { relativePath, customHtmlWrapper };

  return function transformer(tree: Root): void {
    visit(tree, 'image', (node: Image, index: number, parent: any | undefined) => {
      if (!node.url?.endsWith('.svg') || !index || !parent) return;

      try {
        const svgPath = path.resolve(baseDirectory, options.relativePath + node.url);
        const svgContent = fs.readFileSync(svgPath, 'utf8');

        parent.children[index] = {
          type: 'html',
          value: customHtmlWrapper
            ? wrapInCustomHtmlWrapper(svgContent, customHtmlWrapper)
            : svgContent,
        };
      } catch (error) {
        console.warn(error);
      }
    });
  };
};

function wrapInCustomHtmlWrapper(content: string, customHtmlWrapper: string): string {
  const i = customHtmlWrapper.lastIndexOf('</');
  const w = customHtmlWrapper;

  if (i === -1) {
    throw new Error(`Invalid HTML wrapper`);
  }

  return w.slice(0, i) + content + w.slice(i);
}

export { remarkInlineSvg };
