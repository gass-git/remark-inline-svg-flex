import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { remarkInlineSvg } from '../dist/index.js';
import { readFile } from 'node:fs/promises';

const filePath = './tests/fixtures/example.md';
const markdownString = await readFile(filePath, { encoding: 'utf8' });

/**
 * `filePath` is used as the virtual file path so that relative links
 * inside the markdown file can be resolved correctly by the plugin.
 */
async function myProcess(markdown, filePath) {
  return await remark()
    .use(remarkParse)
    .use(remarkInlineSvg)
    .process({ value: markdown, path: filePath });
}

const result = await myProcess(markdownString, filePath);

console.log(String(result.value));
