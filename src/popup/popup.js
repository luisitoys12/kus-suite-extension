// KUS Suite — Popup
import { validateToken, getPlanFeatures } from '../license/validator.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Load current plan
  chrome.runtime.sendMessage({ type: 'GET_PLAN' }, (res) => {
    const plan = res?.kus_plan || 'free';
    updatePlanUI(plan);
  });

  // Tab navigation
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
    });
  });

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const curr = html.getAttribute('data-theme');
    html.setAttribute('data-theme', curr === 'dark' ? 'light' : 'dark');
  });

  // Open side panel
  document.getElementById('openPanel')?.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'OPEN_PANEL' });
  });

  // Activate license
  document.getElementById('activateBtn')?.addEventListener('click', () => {
    const token = document.getElementById('tokenInput').value.trim();
    const result = validateToken(token);
    const el = document.getElementById('activateResult');
    if (result.valid) {
      chrome.runtime.sendMessage({ type: 'VALIDATE_TOKEN', token });
      el.className = 'result success';
      el.textContent = `✅ Plan ${result.plan} activado. Expira en ${result.daysLeft} días.`;
      updatePlanUI(result.plan);
    } else {
      el.className = 'result error';
      el.textContent = `❌ ${result.reason}`;
    }
  });
});

function updatePlanUI(plan) {
  const badge = document.getElementById('planBadge');
  const statusSub = document.getElementById('statusSub');
  const upgradeBanner = document.getElementById('upgradeBanner');
  const ytLock = document.getElementById('ytLock');
  const planLabels = { free: 'Free', creator: 'Creator', influencer: 'Influencer ⭐' };

  badge.textContent = planLabels[plan] || 'Free';
  statusSub.textContent = `Plan ${planLabels[plan] || 'Free'} activo`;

  const features = getPlanFeatures(plan);
  if (!features.youtubeBasic && ytLock) ytLock.style.display = 'block';
  else if (ytLock) ytLock.style.display = 'none';
  if (plan === 'free' && upgradeBanner) upgradeBanner.style.display = 'block';
}
