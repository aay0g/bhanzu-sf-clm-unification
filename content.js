chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.action !== "getSelectedLeadId") return;

  const selection = window.getSelection().toString().trim();
  sendResponse({ selection });
});