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
});
