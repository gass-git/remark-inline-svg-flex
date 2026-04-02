# remark-inline-svg-flex

[![Downloads](https://img.shields.io/npm/dm/remark-inline-svg-flex.svg?style=flat-square)](https://www.npmjs.com/package/remark-inline-svg-flex)
[![version](https://img.shields.io/npm/v/remark-inline-svg-flex.svg?style=flat-square)](https://www.npmjs.com/package/remark-inline-svg-flex)
[![MIT License](https://img.shields.io/npm/l/remark-inline-svg-flex.svg?style=flat-square)](https://github.com/gass-git/remark-inline-svg-flex/blob/main/LICENSE)

Flexible Remark plugin that inlines and optimizes SVGs with SVGO, featuring customizable path resolution, HTML wrappers and more.

- [remark-inline-svg-flex](#remark-inline-svg-flex)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
    - [`suffix`](#suffix)
    - [`assetsDir`](#assetsdir)
    - [`wrapper`](#wrapper)
    - [`svgo`](#svgo)
  - [Paths supported](#path-supported)
  - [SVGO configuration](#svgo-configuration)

## Features

### ✔️ Robust and customizable path resolution

- If the SVG path is absolute, it will use the project directory as root.
- If the path is relative and `assetsDir` is defined, it is resolved relative to the `assetsDir` directory.
- Otherwise, the path is resolved relative to the Markdown file’s location.

### ✔️ Custom HTML wrapper support

Use your own custom HTML wrapper, no wrapper at all, or the default:

```
<figure class="inline-svg"></figure>
```

### ✔️ Optional SVG optimization

SVG optimization can be disabled if needed e.g. if SVGO removes required attributes.

### ✔️ Configurable suffix

By default, only files ending in `.svg` are processed. You can customize the suffix to suit your needs.

## Installation

```
npm i remark-inline-svg-flex
```

## Usage

Say we have the following file `example.md`:

```markdown
# Some Title

This is a test markdown document.

![some svg](./alien.svg)
```

And our module `example.js` looks as the one below:

```js
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { remarkInlineSvg } from 'remark-inline-svg-flex';
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
```

Now running `node example.js` yields:

```markdown
# Some Title

This is a test markdown document.

<figure class="inline-svg">
  <svg width="800" height="800" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="m8 16-4.458-3.662A6.96 6.96 0 0 1 1 6.96C1 3.116 4.156 0 8 0s7 3.116 7 6.96a6.96 6.96 0 0 1-2.542 5.378zM3 6h2a2 2 0 0 1 2 2v1L3 7.5zm8 0a2 2 0 0 0-2 2v1l4-1.5V6z" clip-rule="evenodd"/></svg>
</figure>
```

## Options

| Key                       | type                  | Default value                            | Description                                                |
| ------------------------- | --------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| [`suffix`](#suffix)       | `string`              | `'.svg'`                                 | The plugin only processes SVG files ending with this value |
| [`assetsDir`](#assetsdir) | `string \| undefined` | `undefined`                              | Base directory where SVG files are located                 |
| [`wrapper`](#wrapper)     | `string`              | `'<figure class="inline-svg"></figure>'` | HTML wrapper used to wrap the inlined SVG                  |
| [`svgo`](#svgo)           | `boolean`             | `true`                                   | Enable or disable SVG optimization                         |

### `suffix`

Only image nodes whose URL ends with the specified suffix will be processed. Defaults to `'.svg'`.

### `assetsDir`

Base directory where SVG files are located. By default is `undefined` and it will resolve paths either in an absolute or relative manner.

### `wrapper`

Defines the HTML wrapper used around the inlined SVG.

- Set to an empty string `''` to disable wrapping entirely.
- Defaults to:

```
<figure class="inline-svg"></figure>
```

### `svgo`

The SVG's are optimized by default. Disable it by setting it to `false`.

## Path supported

Remote URLs `http://`, `https://` and other external URLs are ignored.

Examples of supported paths:

```
example.svg
/example.svg
/tests/assets/example.svg
./example.svg
../assets/example.svg
```

## SVGO configuration

SVGO is configured to use the [default preset](https://svgo.dev/docs/preset-default/) of plugins and the [removeXMLNS](https://svgo.dev/docs/plugins/removeXMLNS/) plugin.

```
{ plugins: ['preset-default', 'removeXMLNS'] }
```
