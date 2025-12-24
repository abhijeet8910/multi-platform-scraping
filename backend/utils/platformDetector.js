function detectPlatform(url) {
    if (url.includes("linkedin.com/in/")) {
      return "linkedin";
    }
  
    if (
      url.includes("instagram.com/") &&
      !url.includes("/p/")
    ) {
      return "instagram";
    }
  
    return null;
  }
  
  module.exports = detectPlatform;
  