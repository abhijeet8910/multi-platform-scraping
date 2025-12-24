

const sendBtn = document.getElementById("sendBtn");
const message = document.getElementById("message");

sendBtn.addEventListener("click", async () => {
  message.textContent = "Processing...";

  //  Get current active tab
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  

  if (!tab || !tab.url) {
    message.textContent = "No active tab found";
    message.style.color = "red";
    return;
  }

  //check supported urls
  const isLinkedIn =
  tab.url.includes("linkedin.com/") &&
  tab.url.includes("/in/");

  const isInstagram =
    tab.url.includes("instagram.com/") &&
    !tab.url.includes("/p/");




  if (!isLinkedIn && !isInstagram) {
    message.textContent = "Unsupported page";
    message.style.color = "red";
    return;
  }




  // Inject script to capture HTML
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      return document.documentElement.outerHTML;
    }
  });

  // Send to backend
    
  
try {
  const response = await fetch("http://localhost:4000/scrape-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: tab.url,
      html: result
    })
  });

  

  const data = await response.json();

  // Console log backend response
  console.log("Backend response:", data);

  if (!response.ok) {
    throw new Error(data.error || "Failed to save data");
  }

  // Simple success message
  message.textContent = "✅ Data saved successfully";
  message.style.color = "green";

  setTimeout(() => {
    message.textContent = '';
  }, 2000);

} catch (error) {
  console.error("Error:", error);

  message.textContent = "❌ Failed to save data";
  message.style.color = "red";
}

});
