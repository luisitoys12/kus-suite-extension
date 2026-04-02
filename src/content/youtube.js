// KUS Suite — YouTube Content Script
// Injects KUS panel into YouTube video pages

(function() {
  'use strict';

  let kusPlan = 'free';

  // Get current plan
  chrome.runtime.sendMessage({ type: 'GET_PLAN' }, (res) => {
    kusPlan = res?.kus_plan || 'free';
    if (isVideoPage()) injectKusPanel();
  });

  function isVideoPage() {
    return window.location.pathname === '/watch';
  }

  function injectKusPanel() {
    if (document.getElementById('kus-yt-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'kus-yt-panel';
    panel.innerHTML = `
      <div class="kus-panel-header">
        <span>🌐 KUS Suite</span>
        <span class="kus-plan-tag">${kusPlan.toUpperCase()}</span>
        <button id="kus-close">×</button>
      </div>
      <div class="kus-panel-body">
        ${kusPlan !== 'free' ? youtubeAnalyticsHTML() : lockedHTML('Creator o superior')}
      </div>
    `;
    panel.style.cssText = `
      position:fixed; right:16px; top:80px; width:280px; z-index:9999;
      background:#161513; border:1px solid rgba(255,255,255,0.1); border-radius:12px;
      font-family:-apple-system,sans-serif; font-size:12px; color:#d8d7d4;
      box-shadow:0 8px 32px rgba(0,0,0,0.5);
    `;

    document.body.appendChild(panel);
    document.getElementById('kus-close').onclick = () => panel.remove();
  }

  function youtubeAnalyticsHTML() {
    const videoId = new URLSearchParams(window.location.search).get('v');
    return `
      <div style="padding:12px">
        <div style="margin-bottom:8px;font-weight:700;color:#4f98a3">📈 Analytics del video</div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
          <span style="color:#787773">Video ID</span>
          <span style="font-family:monospace;font-size:10px">${videoId || 'N/A'}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
          <span style="color:#787773">Score SEO</span>
          <span style="color:#6daa45">Calculando...</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:6px 0">
          <span style="color:#787773">Tags sugeridos</span>
          <span style="color:#4f98a3">Analizando...</span>
        </div>
        <a href="https://luisitoys12.github.io/kus-license-panel/#activar" target="_blank"
           style="display:block;margin-top:12px;padding:8px;background:#01696f;color:white;text-align:center;border-radius:6px;text-decoration:none;font-weight:600">
          ⭐ Actualizar a Influencer
        </a>
      </div>
    `;
  }

  function lockedHTML(planReq) {
    return `
      <div style="padding:16px;text-align:center">
        <div style="font-size:24px;margin-bottom:8px">🔒</div>
        <div style="font-weight:600;margin-bottom:4px">Requiere plan ${planReq}</div>
        <div style="color:#787773;font-size:11px;margin-bottom:12px">Activa tu licencia para ver analytics de YouTube</div>
        <a href="https://luisitoys12.github.io/kus-license-panel" target="_blank"
           style="display:block;padding:8px;background:#01696f;color:white;border-radius:6px;text-decoration:none;font-weight:600;font-size:12px">
          Ver planes →
        </a>
      </div>
    `;
  }

  // Re-inject on navigation (YouTube is SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(() => { if (isVideoPage()) injectKusPanel(); }, 1500);
    }
  }).observe(document, { subtree: true, childList: true });

})();
