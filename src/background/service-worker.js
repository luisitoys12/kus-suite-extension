// KUS Suite — Service Worker (Background)
import { validateToken } from '../license/validator.js';

chrome.runtime.onInstalled.addListener(() => {
  console.log('[KUS Suite] Installed v0.1.0');
  chrome.storage.local.get(['kus_token'], (result) => {
    if (!result.kus_token) {
      chrome.storage.local.set({ kus_plan: 'free', kus_activated: false });
    }
  });
});

// Listen for messages from popup/content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'VALIDATE_TOKEN') {
    const result = validateToken(message.token);
    chrome.storage.local.set({
      kus_token: message.token,
      kus_plan: result.plan || 'free',
      kus_activated: result.valid
    });
    sendResponse(result);
  }

  if (message.type === 'GET_PLAN') {
    chrome.storage.local.get(['kus_plan', 'kus_activated'], sendResponse);
  }

  if (message.type === 'OPEN_PANEL') {
    chrome.sidePanel.open({ windowId: sender.tab.windowId });
  }

  return true; // keep channel open for async
});
