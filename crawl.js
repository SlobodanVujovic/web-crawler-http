const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlUrl(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeUrl(currentUrl);
  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;

  try {
    const resp = await fetch(currentUrl);

    if (resp.status > 399) {
      console.log(
        `Error in fetch with status code: ${resp.status}, on page: ${currentUrl}`
      );
      return;
    }

    const contentTypeHeader = resp.headers.get("content-type");
    if (!contentTypeHeader.includes("text/html")) {
      console.log(
        `Not HTML response, content type: ${contentTypeHeader}, on page: ${currentUrl}`
      );
      return;
    }

    console.log(`activly crawling of: ${currentUrl}`);
    const pageBody = await resp.text();

    const urls = getUrlsFromHtml(pageBody, baseUrl);

    for (const pageUrl of urls) {
      await crawlUrl(baseUrl, pageUrl, pages);
    }

    return pages;
  } catch (error) {
    console.log(`Error: ${error.message}, while crawling URL: ${currentUrl}`);
  }
}

function getUrlsFromHtml(htmlPage, baseUrl) {
  const urls = [];
  const page = new JSDOM(htmlPage);

  const links = page.window.document.querySelectorAll("a");
  for (const link of links) {
    const linkHref = link.href;

    if (linkHref.startsWith("/")) {
      try {
        const fullUrl = `${baseUrl}${linkHref}`;
        const linkObj = new URL(fullUrl);
        urls.push(linkObj.href);
      } catch (error) {
        console.log(`Invalid relative URL: ${linkHref}`);
      }
    } else {
      try {
        const linkObj = new URL(linkHref);
        urls.push(linkObj.href);
      } catch (error) {
        console.log(`Invalid absolute URL: ${linkHref}`);
      }
    }
  }

  return urls;
}

function normalizeUrl(inputUrl) {
  const urlObject = new URL(inputUrl);
  let hostAndPath = `${urlObject.host}${urlObject.pathname}`;
  hostAndPath = hostAndPath.toLowerCase();

  if (hostAndPath.length > 0 && hostAndPath.slice(-1) == "/") {
    return hostAndPath.slice(0, -1);
  }

  return hostAndPath;
}

module.exports = {
  normalizeUrl,
  getUrlsFromHtml,
  crawlUrl,
};
