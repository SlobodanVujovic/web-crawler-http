const { test, expect } = require("@jest/globals");
const {normalizeUrl, getUrlsFromHtml} = require("./crawl.js");

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

test('getUrlsFromHtml absolute', ()=>{
    const htmlPage = `
    <html>
        <body>
            <a href='https://blog.boot.dev/'>Boot.dev Blog</a>
        </body>
    </html>
    `;
    const baseUrl = "https://blog.boot.dev";
    const expected = ["https://blog.boot.dev/"];

    const actual = getUrlsFromHtml(htmlPage, baseUrl);

    expect(actual).toEqual(expected);
});

test('getUrlsFromHtml relative', ()=>{
    const htmlPage = `
    <html>
        <body>
            <a href='/path/'>Boot.dev Blog</a>
        </body>
    </html>
    `;
    const baseUrl = "https://blog.boot.dev";
    const expected = ["https://blog.boot.dev/path/"];

    const actual = getUrlsFromHtml(htmlPage, baseUrl);

    expect(actual).toEqual(expected);
});

test('getUrlsFromHtml absolute and relative', ()=>{
    const htmlPage = `
    <html>
        <body>
            <a href='https://blog.boot.dev/path1/'>Boot.dev Blog path 1</a>
            <a href='/path2/'>Boot.dev Blog path 2</a>
        </body>
    </html>
    `;
    const baseUrl = "https://blog.boot.dev";
    const expected = ['https://blog.boot.dev/path1/',"https://blog.boot.dev/path2/"];

    const actual = getUrlsFromHtml(htmlPage, baseUrl);

    expect(actual).toEqual(expected);
});

test('getUrlsFromHtml invalid', ()=>{
    const htmlPage = `
    <html>
        <body>
            <a href='invalid'>Invalid link</a>
        </body>
    </html>
    `;
    const baseUrl = "https://blog.boot.dev";
    const expected = [];

    const actual = getUrlsFromHtml(htmlPage, baseUrl);

    expect(actual).toEqual(expected);
});