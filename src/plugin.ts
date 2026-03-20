import type { Plugin } from 'unified';
import type { Root, Image } from 'mdast';
import path from 'node:path';
import fs from 'node:fs';
import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';
import { optimize } from 'svgo';
import type { Output } from 'svgo';
import type { Options } from './types';

const inlineSvg: Plugin<[Options], Root, Root> = ({
  suffix = '.svg',
  assetsDir = undefined,
  wrapper = '<figure class="inline-svg"></figure>',
  svgo = true,
}) => {
  return function transformer(tree: Root, file: VFile): void {
    visit(tree, 'image', (node, i, parent) => {
      if (!node.url?.endsWith(suffix) || !parent) return;

      try {
        const svgPath = resolvePath(assetsDir, node, path.dirname(file.history[0]));
        const svgString = processSvg(svgPath, svgo);

        parent.children[i] = {
          type: 'html',
          value: wrapper ? wrap(svgString, wrapper) : svgString,
        };
      } catch (error) {
        console.warn(error);
      }
    });
  };
};

function processSvg(path: string, svgo: boolean): string {
  const svgString = fs.readFileSync(path, 'utf8');

  return svgo ? optimizeSvg(svgString).data : svgString;
}

function wrap(svgString: string, htmlWrapper: string): string {
  const i = htmlWrapper.lastIndexOf('</');

  if (i === -1) {
    throw new Error(`Invalid HTML wrapper`);
  }

  return htmlWrapper.slice(0, i) + svgString + htmlWrapper.slice(i);
}

function resolvePath(
  assetsDir: string | undefined,
  node: Image,
  markdownFileDir: string,
): string {
  if (path.isAbsolute(node.url)) {
    // Treat as relative to project root.
    return path.resolve(process.cwd(), node.url);
  } else if (assetsDir) {
    // If path is not absolute, use the assets directory provided in options.
    return path.resolve(process.cwd(), assetsDir, node.url);
  } else {
    // Treat as relative to markdown file directory.
    return path.resolve(markdownFileDir, node.url);
  }
}

function optimizeSvg(svgString: string): Output {
  return optimize(svgString, {
    plugins: ['preset-default', 'removeXMLNS', 'removeDimensions'],
  });
}

export { inlineSvg };
