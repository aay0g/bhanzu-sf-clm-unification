// Match: 36-char UUID + '-' + alphanumeric suffix (case-insensitive)
const REGEX = /\b[0-9a-fA-F-]{36}-[a-zA-Z0-9]+\b/;

// Create the right-click menu (shows only when text is selected)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openCLM",
    title: "Open in CLM",
    contexts: ["selection"]
  });
});

// Handle clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "openCLM") return;

  const text = (info.selectionText || "").trim();
  if (!REGEX.test(text)) return;

  const url = `https://clm.bhanzu.com/students/all/${text}`;

  // Open right next to current tab
  chrome.tabs.create({
    url,
    index: tab.index + 1,
    active: true   // set false if you don’t want to switch focus
  });
});