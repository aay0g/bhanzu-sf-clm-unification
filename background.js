chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openCLM",
    title: "Open in CLM",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openCLM") {
    const leadId = info.selectionText.trim();

    const regex = /\b[a-f0-9\-]{36}-[a-z0-9]+\b/;

    if (!regex.test(leadId)) {
      return; // ignore invalid selection
    }

    const clmUrl = `https://clm.bhanzu.com/students/all/${leadId}`;
    chrome.tabs.create({ url: clmUrl });
  }
});