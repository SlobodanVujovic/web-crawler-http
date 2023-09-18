const { crawlUrl } = require("./crawl.js");

function main() {
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
  crawlUrl(process.argv[2]);
}

main();
