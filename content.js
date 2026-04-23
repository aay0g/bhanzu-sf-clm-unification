// Run only on force.com
if (!window.location.hostname.endsWith(".force.com")) {
  return;
}

const regex = /\b[0-9a-fA-F-]{36}-[a-zA-Z0-9]+\b/;

// --------------------
// 1. AUTO HIGHLIGHT
// --------------------
function highlightIDs(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let node;
  while ((node = walker.nextNode())) {
    if (!node.nodeValue.trim()) continue;

    if (regex.test(node.nodeValue)) {
      const span = document.createElement("span");

      span.innerHTML = node.nodeValue.replace(regex, (m) => {
        return `<mark style="background: yellow; padding:2px;">${m}</mark>`;
      });

      node.replaceWith(span);
    }
  }
}

// Run once on load
highlightIDs();

// --------------------
// 2. HANDLE DYNAMIC CONTENT (Salesforce loads dynamically)
// --------------------
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        highlightIDs(node);
      }
    });
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// --------------------
// 3. BUTTON ON SELECTION
// --------------------
let button = null;

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (!regex.test(selectedText)) return;

  if (button) button.remove();

  button = document.createElement("button");
  button.innerText = "Open in CLM";

  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.padding = "10px 14px";
  button.style.background = "#0078d4";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "6px";
  button.style.cursor = "pointer";
  button.style.zIndex = 9999;

  button.onclick = () => {
    window.open(
      `https://clm.bhanzu.com/students/all/${selectedText}`,
      "_blank"
    );
  };

  document.body.appendChild(button);

  setTimeout(() => {
    if (button) button.remove();
  }, 5000);
});