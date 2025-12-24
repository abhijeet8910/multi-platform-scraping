const cheerio = require("cheerio");

function scrapeInstagram(html) {
  const $ = cheerio.load(html);

  const username =
    $("header h2").first().text().trim() || null;

  const displayName =
    $("header span")
      .filter((i, el) => $(el).attr("class")?.includes("x1lliihq"))
      .first()
      .text()
      .trim() || null;

  const bio =
    $("header section div span")
      .last()
      .text()
      .trim() || null;

  const stats = $("header section ul li");

  const posts = $(stats[0]).text().trim() || null;
  const followers = $(stats[1]).text().trim() || null;
  const following = $(stats[2]).text().trim() || null;

  return {
    username,
    displayName,
    bio,
    posts,
    followers,
    following
  };
}

module.exports = scrapeInstagram;
