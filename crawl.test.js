const { test, expect } = require("@jest/globals");
const {normalizeUrl} = require("./crawl.js");

test('normalizeUrl strip protocol', ()=>{
    const inputUrl = 'https://blog.boot.dev/path';
    const expected = 'blog.boot.dev/path';

    const actual = normalizeUrl(inputUrl);

    expect(actual).toEqual(expected)
});

test('normalizeUrl strip http', ()=>{
    const inputUrl = 'http://blog.boot.dev/path';
    const expected = 'blog.boot.dev/path';

    const actual = normalizeUrl(inputUrl);

    expect(actual).toEqual(expected)
});

test('normalizeUrl strip trailing slash', ()=>{
    const inputUrl = 'https://blog.boot.dev/path/';
    const expected = 'blog.boot.dev/path';

    const actual = normalizeUrl(inputUrl);

    expect(actual).toEqual(expected)
});

test('normalizeUrl case insensitive host', ()=>{
    const inputUrl = 'https://BLOG.boot.dev/path/';
    const expected = 'blog.boot.dev/path';

    const actual = normalizeUrl(inputUrl);

    expect(actual).toEqual(expected)
});

test('normalizeUrl case insensitive path', ()=>{
    const inputUrl = 'https://BLOG.boot.dev/PATH/';
    const expected = 'blog.boot.dev/path';

    const actual = normalizeUrl(inputUrl);

    expect(actual).toEqual(expected)
});