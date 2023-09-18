const { crawlUrl } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("Crawl URL missing");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many arguments");
    process.exit(1);
  }

  const currentUrl = process.argv[2];
  console.log(`Start crawling URL ${currentUrl}`);
  const pages = await crawlUrl(currentUrl, currentUrl, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }

  console.log("Done!");
}

main();
