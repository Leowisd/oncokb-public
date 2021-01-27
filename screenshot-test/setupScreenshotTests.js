import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { setDefaultOptions } from 'jsdom-screenshot';

setDefaultOptions({
  launch: { args: ['--no-sandbox'] }
});

jest.setTimeout(15000);

expect.extend({ toMatchImageSnapshot });