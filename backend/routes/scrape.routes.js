const express = require("express");
const router = express.Router();

const detectPlatform = require("../utils/platformDetector");
const scrapeLinkedIn = require("../scrapers/linkedin.scraper");
const scrapeInstagram = require("../scrapers/instagram.scraper");
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  const { url, html } = req.body;

  if (!url || !html) {
    return res.status(400).json({ error: "Missing url or html" });
  }

  const platform = detectPlatform(url);

  if (!platform) {
    return res.status(400).json({ error: "Unsupported URL" });
  }

  let scrapedData;

  try {
    if (platform === "linkedin") {
      scrapedData = scrapeLinkedIn(html);
    }

    if (platform === "instagram") {
      scrapedData = scrapeInstagram(html);
    }

    // ✅ Save to DB
    const record = await Profile.create({
      platform,
      url,
      data: scrapedData
    });

    res.json({
      success: true,
      id: record.id,
      platform,
      data: record.data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
});

module.exports = router;
