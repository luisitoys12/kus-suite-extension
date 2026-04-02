// KUS Suite — Kick.com Content Script
(function() {
  chrome.runtime.sendMessage({ type: 'GET_PLAN' }, (res) => {
    const plan = res?.kus_plan || 'free';
    if (plan === 'influencer') injectKickPanel();
  });

  function injectKickPanel() {
    if (document.getElementById('kus-kick-panel')) return;
    const panel = document.createElement('div');
    panel.id = 'kus-kick-panel';
    panel.innerHTML = `
      <div style="padding:10px 12px;background:#161513;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
        <span style="font-weight:700;font-size:12px;color:#4f98a3">🌐 KUS Suite — Kick</span>
        <button onclick="this.closest('#kus-kick-panel').remove()" style="background:none;border:none;color:#787773;cursor:pointer;font-size:16px">×</button>
      </div>
      <div style="padding:12px;font-size:11px;color:#d8d7d4">
        <div style="color:#787773;margin-bottom:8px">Analytics del stream</div>
        <div style="display:flex;justify-content:space-between;padding:4px 0"><span>Espectadores est.</span><span style="color:#4f98a3">Cargando...</span></div>
        <div style="display:flex;justify-content:space-between;padding:4px 0"><span>Pico de viewers</span><span style="color:#4f98a3">—</span></div>
      </div>
    `;
    panel.style.cssText = 'position:fixed;right:16px;top:80px;width:240px;z-index:9999;background:#161513;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-family:-apple-system,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.5);';
    document.body.appendChild(panel);
  }
})();
