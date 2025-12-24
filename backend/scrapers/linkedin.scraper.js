const cheerio = require("cheerio");

function scrapeLinkedIn(html) {
  const $ = cheerio.load(html);

  const name =
    $("h1").first().text().trim() || null;

  const headline =
    $(".text-body-medium").first().text().trim() || null;

  const location =
    $(".text-body-small.inline.t-black--light")
      .first()
      .text()
      .trim() || null;

  const about =
    $("#about")
      .next()
      .find("span")
      .text()
      .trim() || null;

  const followers =
    $("li")
      .filter((i, el) =>
        $(el).text().includes("followers")
      )
      .first()
      .text()
      .trim() || null;

  const connections =
    $("li")
      .filter((i, el) =>
        $(el).text().includes("connections")
      )
      .first()
      .text()
      .trim() || null;


      // console.log(name, headline, location, about, followers, connections);
     

  return {
    name,
    headline,
    location,
    about,
    followers,
    connections
  };
}

module.exports = scrapeLinkedIn;
