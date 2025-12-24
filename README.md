# 🕸️ Multi-Platform Profile Scraping via HTML Handoff

> **A production-grade scraping architecture using Chrome Extension (Manifest V3) + Node.js.**

## 📌 Project Overview

This project implements a scraping system that enforces a strict **separation of concerns**. It uses a "dumb" Chrome Extension to capture authenticated HTML and a "smart" Node.js backend to handle parsing, logic, and storage.

This architecture mimics professional browser-based data capture systems, ensuring that scraping logic is decoupled from the browser context, making the system more resilient to DOM changes and easier to maintain.

---

## 🧠 Architectural Philosophy

**The Golden Rule:**
> **Extension = Courier (Dumb)**
> **Backend = Processor (Smart)**

### Responsibilities

| Component | 🟢 DOs (Responsibilities) | 🔴 DON'Ts (Strictly Prohibited) |
| :--- | :--- | :--- |
| **Chrome Extension** | • Detect active tab<br>• Read current URL<br>• Capture `document.documentElement.outerHTML`<br>• Send `{url, html}` to API | • No scraping/parsing logic<br>• No platform detection<br>• No business logic<br>• No DOM manipulation |
| **Node.js Backend** | • Detect platform via URL pattern<br>• Route to correct scraper<br>• Parse HTML (Cheerio)<br>• Handle errors & missing data<br>• Persist to SQLite | • N/A |

### Request Flow
1. **User** manually logs into LinkedIn/Instagram and navigates to a profile.
2. **User** clicks "Send Page to Backend".
3. **Extension** captures HTML & URL ➡️ POST request to Backend.
4. **Backend** detects platform ➡️ Parses Data ➡️ Saves to SQLite.
5. **Extension** receives success signal ➡️ Displays "✅ Data saved successfully".

---

## 🛠️ Tech Stack

* **Frontend (Extension):** HTML, CSS, Vanilla JS, Chrome Manifest V3
* **Backend (API):** Node.js, Express
* **Parsing Engine:** Cheerio
* **Database:** SQLite3
* **ORM:** Sequelize

---

## 📊 Data Extraction & Support

The backend automatically routes logic based on the URL structure.

### 1. LinkedIn (`linkedin.com/in/*`)
* **Name**
* **Headline**
* **Location**
* **About Section**
* **Follower Count**
* **Connection Count**

### 2. Instagram (`instagram.com/{username}`)
* *Note: Posts/Reels/Explore pages are ignored.*
* **Username**
* **Display Name**
* **Bio**
* **Post Count**
* **Follower Count**
* **Following Count**

---

## 💾 Database Design

We use **SQLite + Sequelize** for a zero-setup, portable database solution.

**Schema Strategy:**
To handle UI changes without constant schema migrations, specific profile details are stored in a JSON column.

* **Platform:** String (`linkedin` | `instagram`)
* **Profile URL:** String (Unique)
* **Extracted Data:** JSON (Stores the parsed fields)
* **Timestamps:** CreatedAt / UpdatedAt

---

## 🚀 Getting Started

### Prerequisites
* Node.js installed
* Google Chrome browser

### Part 1: Setting up the Backend

1.  Navigate to the server directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
    * Server runs on: `http://localhost:4000`
    * Database is created automatically on startup.

### Part 2: Installing the Extension

1.  Open Chrome and navigate to: `chrome://extensions`
2.  Toggle **Developer Mode** (top right corner).
3.  Click **Load unpacked**.
4.  Select the `extension` folder from this project.

---

## 🧪 Usage Guide

1.  Ensure the **Backend** is running (`http://localhost:4000`).
2.  Open Chrome and log in to **LinkedIn** or **Instagram**.
3.  Navigate to a specific user profile (e.g., `https://www.linkedin.com/in/williamhgates/`).
4.  Click the Extension icon in your toolbar.
5.  Click the **"Send Page to Backend"** button.
6.  **Success:** You will see a "✅ Data saved successfully" message.
7.  **Error:** Check the popup console (`Right-click popup` -> `Inspect` -> `Console`) or backend terminal logs.

---

## 🔐 Constraints & Compliance

This project is built with specific ethical and technical constraints:
* ✅ **Manifest V3:** Fully compliant with modern Chrome standards.
* ✅ **Manual Login:** Relies on the user's existing authentication session.
* ✅ **No Headless Browsers:** No Puppeteer/Playwright used.
* ✅ **No Automation:** No credential injection or CAPTCHA bypassing.
* ✅ **Safe Parsing:** If a field is missing, the scraper proceeds without crashing.

---

## 📈 Future Roadmap

* [ ] Add duplicate prevention (Upsert logic).
* [ ] Add Profile History tracking (track changes over time).
* [ ] Support for Twitter/X and GitHub profiles.
* [ ] Export data to CSV/JSON.
* [ ] Frontend Dashboard to view scraped profiles.

---

## 📝 License

This project is for educational purposes to demonstrate separation of concerns in web extension architecture.
