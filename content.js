{
  "manifest_version": 3,
  "name": "Lead ID Quick Opener",
  "version": "1.3",
  "description": "Open force.com lead IDs in CLM (adjacent tab)",
  "permissions": ["contextMenus"],
  "host_permissions": ["*://*.force.com/*"],
  "background": {
    "service_worker": "background.js"
  }
}