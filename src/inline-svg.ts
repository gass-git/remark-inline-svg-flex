import type { Plugin } from 'unified';
import type { Root, Image } from 'mdast';
import path, { relative } from 'node:path';
import fs from 'node:fs';

const remarkInlineSvg: Plugin<[], Root, Root> = function () {
  const baseDirectory = process.cwd();

  // These might be a options
  const relativePath = '';
  const wrapInCenterDiv = false;

  return function transformer(tree: Root) {
    visit(tree, 'image', (node: Image, index, parent: any | undefined) => {
      if (!node.url?.endsWith('.svg')) return;
      if (index === undefined || !parent) return;

      try {
        const svgPath = path.resolve(baseDirectory, relativePath + node.url);
        const svgContent = fs.readFileSync(svgPath, 'utf8');

        let val = svgContent;

        if (wrapInCenterDiv) {
          val = `<div align="center">${svgContent}</div>`;
        }

        parent.children[index] = { type: 'html', value: val };
      } catch (error) {
        console.warn(error);
      }
    });
  };
};

export { remarkInlineSvg };
