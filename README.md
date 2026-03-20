> 🚧 **Work in progress** This plugin is still under active development. Expect changes.

# remark-inline-svg-flex

[![MIT License](https://img.shields.io/npm/l/rehype-svg-inline.svg?style=flat-square)](https://github.com/gass-git/remark-inline-svg-flex/blob/main/LICENSE)

Flexible Remark plugin that inlines and optimizes SVGs with SVGO, featuring customizable path resolution, wrappers and others.

## Installation

`npm i remark-inline-svg-flex`

## Robust path resolution:

First, it checks whether the SVG path is absolute. If it is, it uses it as-is.
If not, and the assetsDir option is defined, the path is resolved relative to that directory. Otherwise, the path is treated as relative to the Markdown file’s location.

## Options

| Key                       | type                  | Default value                            | Description                                                |
| ------------------------- | --------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| [`suffix`](#suffix)       | `string`              | `'.svg'`                                 | The plugin only processes SVG files ending with this value |
| [`assetsDir`](#assetsDir) | `string`, `undefined` | `undefined`                              | Base directory where SVG files are located                 |
| [`wrapper`](#wrapper)     | `string`              | `'<figure class="inline-svg"></figure>'` | HTML wrapper used to wrap the inlined SVG                  |
| [`svgo`](#wrapper)        | `boolean`             | `true`                                   | Enable or disable SVG optimization                         |

### HTML Wrapper

- If you don't want any wrapper set the wrapper option to an empty string `''`.

### assetsDir

- assetsDir by default is `undefined` and it will resolve paths
