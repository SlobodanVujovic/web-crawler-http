const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
        urls.push(fullUrl);
      } catch (error) {
        console.log(`Invalid relative URL: ${linkHref}`);
      }
    } else {
      try {
        const linkObj = new URL(linkHref);
        urls.push(linkHref);
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
};
