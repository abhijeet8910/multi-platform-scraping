const express = require("express");
const cors = require("cors");

const sequelize = require("./database");
const scrapeRoute = require("./routes/scrape.routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/scrape-profile", scrapeRoute);

// ✅ DB INIT
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // creates tables
    console.log("Database connected");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
