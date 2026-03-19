> 🚧 **Work in progress** This plugin is still under active development. Expect changes.

# remark-inline-svg-flex

[![MIT License](https://img.shields.io/npm/l/rehype-svg-inline.svg?style=flat-square)](https://github.com/gass-git/remark-inline-svg-flex/blob/main/LICENSE)

Flexible Remark plugin that inlines and optimizes SVGs with SVGO, featuring customizable path resolution, wrappers and others.

## Installation

`npm i remark-inline-svg-flex`

## Options

| Key                       | type                  | Default value                            | Description                                                |
| ------------------------- | --------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| [`suffix`](#suffix)       | `string`              | `'.svg'`                                 | The plugin only processes SVG files ending with this value |
| [`assetsDir`](#assetsDir) | `string`, `undefined` | `undefined`                              | Base directory where SVG files are located                 |
| [`wrapper`](#wrapper)     | `string`              | `'<figure class="inline-svg"></figure>'` | HTML wrapper used to wrap the inlined SVG                  |
| [`svgo`](#wrapper)        | `boolean`             | `true`                                   | Enable or disable SVG optimization                         |
