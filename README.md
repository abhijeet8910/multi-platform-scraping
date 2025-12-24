Multi-Platform Profile Scraping via HTML Handoff

LinkedIn + Instagram

📌 Project Summary

This project implements a production-grade scraping system using a Chrome Extension (Manifest V3) and a Node.js backend, following strict separation of concerns.

The Chrome extension acts only as a data courier, capturing the full authenticated HTML of a profile page and sending it to the backend.
The backend is solely responsible for platform detection, HTML parsing, scraping logic, and database storage.

This architecture mirrors how real-world browser-based data capture systems are designed in professional environments.

🎯 Core Objectives

Capture full HTML of authenticated profile pages

Support LinkedIn and Instagram profiles

Do no scraping or parsing inside the extension

Route scraping logic based on URL patterns

Extract structured profile data

Persist scraped data using SQLite + Sequelize

Provide clear success/error feedback to the user

🧠 Architectural Philosophy
Key Design Rule

Extension = dumb
Backend = smart

This rule is strictly enforced throughout the project.

Chrome Extension Responsibilities

The extension is responsible only for:

Detecting the active browser tab

Reading the current page URL

Capturing document.documentElement.outerHTML

Sending { url, html } to the backend API

Displaying a simple success or error message

The extension does NOT:

Scrape data

Parse HTML

Detect platforms

Handle business logic

Backend Responsibilities

The backend is responsible for:

Detecting the platform using URL patterns

Routing HTML to the correct scraper

Parsing HTML using Cheerio

Extracting structured profile data

Handling missing or partial data safely

Persisting results in a database

Returning a clean JSON response

🔀 URL-Based Platform Detection

Platform detection happens only on the backend, based on URL patterns.

LinkedIn

Detected when the URL contains:

linkedin.com/in/

Instagram

Detected when the URL matches:

instagram.com/{username}


Instagram posts, reels, and explore pages are intentionally ignored.

This approach allows easy addition of new platforms without touching the extension code.

📊 Data Extracted
LinkedIn Profile Data

Name

Headline

Location

About section

Follower count

Connection count

Instagram Profile Data

Username

Display name

Bio

Post count

Follower count

Following count

All fields are optional-safe.
If a field is missing, scraping continues without crashing.

💾 Database Design
Why SQLite + Sequelize?

Zero setup (single file database)

Perfect for demos, assignments, and interviews

Sequelize teaches real ORM concepts used in production

Easy migration to PostgreSQL or MySQL later

Storage Strategy

A single Profile entity stores:

Platform (linkedin or instagram)

Profile URL

Extracted data (stored as JSON)

Creation timestamps

This flexible schema avoids frequent schema changes when platforms update their UI.

🔁 Request Flow (End-to-End)

User manually logs into LinkedIn or Instagram

User opens a profile page

User clicks “Send Page to Backend”

Extension captures:

Current page URL

Full HTML of the page

Extension sends data to backend via POST request

Backend:

Detects platform

Applies correct scraper

Extracts profile data

Saves data to SQLite database

Backend returns a success response

Popup shows “✅ Data saved successfully”

Backend response is logged in popup DevTools console

🚀 How to Run the Project
Backend

Install dependencies

Start the Node.js server

Ensure the backend is running on:

http://localhost:4000


On startup:

SQLite database is created automatically

Tables are synced using Sequelize

Chrome Extension

Open chrome://extensions

Enable Developer Mode

Load the extension as an unpacked extension

Open a LinkedIn or Instagram profile (must be logged in)

Click “Send Page to Backend”

✅ Expected Behavior
Supported Pages

Popup shows:
✅ Data saved successfully

Data is persisted in SQLite

Backend response is logged in popup console

Unsupported Pages

Popup shows an error message

No backend request is made

🧪 Debugging & Logs
Extension Logs

Available in Popup DevTools

Access via:

chrome://extensions

Inspect views → popup → Console

Backend Logs

Visible in terminal

Includes database connection and error logs

🔐 Constraints & Rules Followed

✅ Manifest V3 only

✅ Manual user login required

✅ No scraping logic in extension

✅ No headless browsers

✅ No Puppeteer or Playwright

✅ No credential automation

✅ No captcha bypass

✅ No third-party scraping APIs

✅ Backend-only HTML parsing

✅ Clean separation of concerns

📈 Scalability & Future Enhancements

This architecture can be easily extended to:

Prevent duplicate profile saves

Track profile history over time

Add more platforms (Twitter, GitHub, Facebook)

Export scraped data (CSV / JSON)

Build a frontend dashboard

Replace SQLite with PostgreSQL or MySQL

Add authentication & rate limiting
