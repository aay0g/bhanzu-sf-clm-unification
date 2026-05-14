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

function openLeadInCLM(leadId, tabIndex = undefined) {
  if (!REGEX.test(leadId)) return;

  const url = `https://clm.bhanzu.com/students/all/${leadId}`;
  const createOptions = { url, active: true };
  if (typeof tabIndex === "number") {
    createOptions.index = tabIndex + 1;
  }

  chrome.tabs.create(createOptions);
}

// Handle clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "openCLM") return;

  const text = (info.selectionText || "").trim();
  if (!REGEX.test(text)) return;

  openLeadInCLM(text, tab?.index);
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "open-clm-selected-lead") return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  try {
    const response = await chrome.tabs.sendMessage(tab.id, { action: "getSelectedLeadId" });
    const selection = (response?.selection || "").trim();
    if (!REGEX.test(selection)) return;

    openLeadInCLM(selection, tab.index);
  } catch (error) {
    console.warn("Lead ID Quick Opener: no content script response", error);
  }
});