import { processMarkdown } from '../utils/processor';
import { describe, it, expect } from 'vitest';

describe('path resolution', () => {
  it('works without trailing slash in assetsDir', async () => {
    const file = await processMarkdown('![some svg](alien.svg)', {assetsDir: './tests/fixtures'});
    expect(String(file)).toContain('<svg');
  });

  it('works with trailing slash in assetsDir', async () => {
    const file = await processMarkdown('![some svg](alien.svg)', {assetsDir: './tests/fixtures/'});
    expect(String(file)).toContain('<svg');
  });

  it('works with an absolute path', async () => {
    const file = await processMarkdown('![some svg](/tests/assets/alarm.svg)');
    expect(String(file)).toContain('<svg');
  });

  it('works with a relative path', async () => {
    const file = await processMarkdown('![some svg](../assets/alarm.svg)');
    expect(String(file)).toContain('<svg');
  });

  it('do NOT inline an SVG with a https URL', async () => {
    const file = await processMarkdown('![some svg](https://example.com/example.svg)');
    expect(String(file)).toContain('![some svg]');
  });

   it('do NOT inline an SVG with a http URL', async () => {
    const file = await processMarkdown('![some svg](http://example.com/example.svg)');
    expect(String(file)).toContain('![some svg]');
  });
});
