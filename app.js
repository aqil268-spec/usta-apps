'use strict';
// ============================================================= Əsas
const API = window.APP_CONFIG && window.APP_CONFIG.API_URL;
const S = { token: localStorage.getItem('token') || '', user: null, settings: {}, products: [], dict: {}, cars: null, view: 'home', params: {}, history: [] };
const $app = document.getElementById('app');

const I = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  car: '<path d="M3 13l2-5a2 2 0 0 1 2-1.3h10A2 2 0 0 1 19 8l2 5v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M3 13h18M7 15.5h.01M17 15.5h.01"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  chart: '<path d="M4 20V10M12 20V4M20 20v-7"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 13h2M3 10h18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M20 21v-1a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v1"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  share: '<path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v14"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  truck: '<path d="M1 4h13v12H1zM14 9h4l3 3v4h-7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/>',
  box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  coins: '<circle cx="9" cy="9" r="6"/><path d="M15.5 9.5a6 6 0 1 1-6 6"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.3z"/>'
};
const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const logoMark = (s = 44) => `<svg width="${s}" height="${s}" viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="12" fill="#F2994A"/><path d="M24 9c0 0 9.5 10.3 9.5 17.6a9.5 9.5 0 0 1-19 0C14.5 19.3 24 9 24 9z" fill="#141413"/><path d="M27.6 24.2a3.6 3.6 0 0 1-4.6 4.6l-3.7 3.7a1.3 1.3 0 0 1-1.8-1.8l3.7-3.7a3.6 3.6 0 0 1 4.6-4.6l-2 2 .4 1.4 1.4.4z" fill="#F2994A"/></svg>`;
const logoFull = (name, light) => { const p = String(name || 'AQQA Servis').split(' '); return `<div style="display:flex;align-items:center;gap:10px;justify-content:center">${logoMark(40)}<div style="display:flex;flex-direction:column;line-height:1;text-align:left"><span style="font-size:20px;font-weight:700;letter-spacing:.04em;color:${light ? '#141413' : 'var(--text)'}">${esc(p[0].toUpperCase())}</span><span style="font-size:10px;letter-spacing:.32em;color:${light ? '#5E5A50' : 'var(--muted)'};margin-top:4px">${esc((p.slice(1).join(' ') || 'SERVİS').toLocaleUpperCase('az'))}</span></div></div>`; };

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const grp = (v, dec) => { const n = Math.round((Number(v) || 0) * 100) / 100; const [i, f] = Math.abs(n).toFixed(dec).split('.'); const s = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return (n < 0 ? '−' : '') + s + (f && +f ? ',' + f : ''); };
const money = v => grp(v, 2) + ' ₼';
const kmf = v => grp(v, 0) + ' km';
const num = v => { const n = parseFloat(String(v ?? '').replace(',', '.')); return isNaN(n) ? 0 : n; };
const r2 = v => Math.round((v + 1e-9) * 100) / 100;
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => ymd(new Date());
const fmtDate = s => s ? `${s.slice(8, 10)}.${s.slice(5, 7)}.${s.slice(0, 4)}` : '';
const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
const DAYS = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
const longToday = () => { const d = new Date(); return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`; };
const isAdmin = () => S.user && S.user.rol === 'admin';
const NOV = { xerc: 'Xərc', usta_odenisi: 'Ustaya ödəniş', tehvil: 'Təhvil', duzelis: 'Düzəliş', techizatci: 'Təchizatçıya ödəniş' };
const plateFmt = v => { const s = String(v || '').toUpperCase().replace(/[^0-9A-Z]/g, ''); let o = s.slice(0, 2); if (s.length > 2) o += '-' + s.slice(2, 4); if (s.length > 4) o += '-' + s.slice(4, 7); return o; };
const dictNames = nov => (S.dict[nov] || []).map(x => typeof x === 'string' ? x : x.ad);
const dictChildren = (nov, parent) => (S.dict[nov] || []).filter(x => typeof x !== 'string' && (!parent || String(x.valideyn).toLowerCase() === String(parent).toLowerCase())).map(x => x.ad);
const opts = list => [...new Set(list)].sort((a, b) => a.localeCompare(b, 'az')).map(v => `<option value="${esc(v)}"></option>`).join('');

function periods() {
  const d = new Date(), t = ymd(d), wd = (d.getDay() + 6) % 7, ws = new Date(d); ws.setDate(d.getDate() - wd);
  return { gun: [t, t], hefte: [ymd(ws), t], ay: [ymd(new Date(d.getFullYear(), d.getMonth(), 1)), t] };
}

// ------------------------------------------------------------- API + keş
const WRITES = ['changePin', 'saveCar', 'saveJob', 'payJob', 'cancelJob', 'requestClose', 'stockRequest', 'addCashMove', 'closeDay', 'editCashDay', 'editCashMove',
  'saveProduct', 'savePurchase', 'saveSupplier', 'paySupplier', 'saveUser', 'resetPin', 'saveSettings'];
let MEM = {}; try { MEM = JSON.parse(localStorage.getItem('swr') || '{}'); } catch (e) { MEM = {}; }
const persist = () => { try { localStorage.setItem('swr', JSON.stringify(MEM)); } catch (e) { MEM = {}; localStorage.removeItem('swr'); } };
const swrKey = (a, b) => a + '|' + JSON.stringify(b);
async function cget(action, body = {}) {
  const k = swrKey(action, body);
  if (k in MEM) {
    const view = S.view, params = S.params;
    api(action, body, true).then(d => { if (JSON.stringify(d) !== JSON.stringify(MEM[k])) { MEM[k] = d; persist(); if (S.view === view && S.params === params && !S.editing) render(); } }).catch(() => {});
    return MEM[k];
  }
  const d = await api(action, body); MEM[k] = d; persist(); return d;
}
function prefetch(action, body = {}) { const k = swrKey(action, body); if (!(k in MEM)) api(action, body, true).then(d => { MEM[k] = d; persist(); }).catch(() => {}); }

async function api(action, body = {}, quiet) {
  if (!API || API.indexOf('http') !== 0) throw new Error('config.js-də API_URL yazılmayıb');
  if (!quiet) loading(true);
  const payload = { action, token: S.token, ...body };
  if (WRITES.includes(action)) payload.rid = (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random());
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  try {
    let lastErr = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt) await sleep(700 * attempt);
      let txt;
      try { const res = await fetch(API, { method: 'POST', body: JSON.stringify(payload) }); txt = await res.text(); }
      catch (e) { lastErr = new Error('İnternet bağlantısını yoxlayın'); continue; }
      let j;
      try { j = JSON.parse(txt); } catch (e) {
        const title = (txt.match(/<title>([^<]*)<\/title>/i) || [])[1];
        lastErr = new Error('Server müvəqqəti cavab vermədi' + (title ? ' (' + title.trim() + ')' : '') + '. Bir az sonra yenidən cəhd edin.');
        continue;
      }
      if (!j.ok) {
        if (j.auth) logout();
        else if (j.mustChange && S.view !== 'changePin') { S.history = []; go('changePin', {}, false); }
        throw new Error(j.error || 'Xəta');
      }
      if (WRITES.includes(action)) { MEM = {}; persist(); }
      return j.data;
    }
    throw lastErr;
  } finally { if (!quiet) loading(false); }
}

function loading(on) {
  let el = document.querySelector('.loading');
  if (on && !el) { el = document.createElement('div'); el.className = 'loading'; el.innerHTML = '<div class="spinner"></div>'; document.body.appendChild(el); }
  if (!on && el) el.remove();
}
function toast(msg, ok) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast' + (ok ? ' ok' : ''); t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 3800);
}
async function run(fn) { try { await fn(); } catch (e) { toast(e.message); } }

async function loadBoot(force) {
  const b = force ? await api('bootstrap', {}, true) : await cget('bootstrap');
  if (force) { MEM[swrKey('bootstrap', {})] = b; persist(); }
  S.boot = b; S.user = b.user; S.settings = b.settings; S.products = b.products; S.dict = b.dict || {}; S.cars = b.cars;
  S.oldServer = !(b.v >= 3);
  return b;
}

// ------------------------------------------------------------- Naviqasiya
const NO_RETURN = ['login', 'changePin', 'pinShow'];
const ROOTS = ['home', 'cars', 'kassa', 'me', 'products', 'more'];
function go(view, params = {}, push = true) {
  if (push && !NO_RETURN.includes(S.view)) { S.history.push({ view: S.view, params: S.params }); if (S.history.length > 40) S.history.shift(); history.pushState({ app: 1 }, ''); }
  S.view = view; S.params = params; S.editing = false; render(); window.scrollTo(0, 0);
}
function back() { const h = S.history.pop(); S.editing = false; if (h) { S.view = h.view; S.params = h.params; render(); window.scrollTo(0, 0); } else go('home', {}, false); }
function tab(view) {
  if (view !== S.view && !NO_RETURN.includes(S.view)) { S.history.push({ view: S.view, params: S.params }); if (S.history.length > 40) S.history.shift(); history.pushState({ app: 1 }, ''); }
  S.view = view; S.params = {}; S.editing = false; render(); window.scrollTo(0, 0);
}
const showBack = () => S.user && !NO_RETURN.includes(S.view) && (S.history.length > 0 || !ROOTS.includes(S.view));
function goBack() {
  if (S.view === 'job' && S.draft && (S.draft.items.length || S.draft.km) && !confirm('İş yadda saxlanmayıb. Çıxaq?')) return false;
  if (S.view === 'job') S.draft = null;
  back(); return true;
}
window.addEventListener('popstate', () => {
  if (!S.user) return;
  if (!S.history.length && ROOTS.includes(S.view)) return;
  if (!goBack()) history.pushState({ app: 1 }, '');
});
function logout(server) {
  if (server && S.token) fetch(API, { method: 'POST', body: JSON.stringify({ action: 'logout', token: S.token }) }).catch(() => {});
  MEM = {}; localStorage.removeItem('swr'); localStorage.removeItem('token');
  S.token = ''; S.user = null; S.boot = null; S.cars = null; S.products = []; S.draft = null; S.history = []; S.view = 'login'; render();
}

// ------------------------------------------------------------- Render
const VIEWS = {};
async function render() {
  if (!S.token) S.view = 'login';
  const v = VIEWS[S.view] || VIEWS.home;
  try {
    const html = await v(S.params);
    if (html === null) return;
    const top = showBack() ? `<div class="topbar"><button class="icon-btn" data-act="back" aria-label="Geri">${ic('back', 20)}</button></div>` : '';
    const warnOld = S.user && S.oldServer ? `<div class="banner bad"><b>Server köhnə versiyadadır</b><span>Apps Script-də yeni Code.gs-i yapışdırın, installTriggers funksiyasını bir dəfə işə salın və Deploy → Manage deployments → Edit → New version → Deploy edin.</span></div>` : '';
    $app.innerHTML = `<main>${top}${warnOld}${html}</main>${S.user && !NO_RETURN.includes(S.view) ? nav() : ''}`;
    const f = $app.querySelector('[autofocus]'); if (f) f.focus();
    if (v.after) v.after(S.params);
  } catch (e) {
    $app.innerHTML = `<main><div class="card"><b>Xəta</b><span class="muted">${esc(e.message)}</span><button class="btn" data-act="retry">Yenidən cəhd et</button></div></main>${S.user ? nav() : ''}`;
  }
}

function nav() {
  const b = S.boot || {}, pend = b.pending ? b.pending.close + b.pending.stock : 0;
  const items = isAdmin()
    ? [['home', 'chart', 'Hesabat'], ['kassa', 'wallet', 'Kassa'], ['products', 'drop', 'Mallar'], ['more', 'more', 'Daha' + (pend ? `<span class="badge">${pend}</span>` : '')]]
    : [['home', 'home', 'Əsas'], ['cars', 'car', 'Maşınlar'], ...(S.user.kassa ? [['kassa', 'wallet', 'Kassa']] : []), ['me', 'user', 'Mən']];
  const map = { carHistory: 'cars', carForm: 'cars', report: 'home', income: 'more', stock: 'more', suppliers: 'more', supplierForm: 'more', supplierDetail: 'more', supplierPay: 'more', cheque: 'more',
    requests: 'more', ustaDebts: 'more', debtList: isAdmin() ? 'more' : 'me', payForm: isAdmin() ? 'more' : 'me', users: 'more', userForm: 'more', settings: 'more', kassaHistory: 'kassa',
    productForm: 'products', purchaseForm: 'products', purchaseList: 'products' };
  const cur = map[S.view] || S.view;
  return `<nav class="bottom" aria-label="Menyu"><div class="in">${items.map(([v, i, t]) => `<button data-tab="${v}" class="${cur === v ? 'on' : ''}">${ic(i)}<span>${t}</span></button>`).join('')}</div></nav>`;
}

const presetSeg = (key, view) => `<div class="seg" role="group" aria-label="Dövr">${[['gun', 'Bu gün'], ['hefte', 'Bu həftə'], ['ay', 'Bu ay']].map(([k, l]) => `<button data-preset="${k}" data-view="${view}" class="${key === k ? 'on' : ''}">${l}</button>`).join('')}</div>`;
const rangeForm = (from, to, view) => `<form class="grid2" data-form="range" data-view="${view}"><label class="field">Başlanğıc<input type="date" name="from" value="${from}" data-autosubmit></label><label class="field">Son<input type="date" name="to" value="${to}" data-autosubmit></label></form>`;
const pickRange = (p, def = 'gun') => { const key = p.preset || def; return { key, range: p.from ? [p.from, p.to] : periods()[key] }; };

function blockBanner(b) {
  if (!b || !b.blocked) return '';
  const days = b.openDays.map(fmtDate).join(', ');
  return isAdmin()
    ? `<div class="banner bad"><b>Kassa bağlanmayıb: ${days}</b><span>Ustalar yeni iş yaza bilmir. Kassanı bağlayın.</span><button class="btn small primary" data-tab="kassa">Kassaya keç</button></div>`
    : `<div class="banner bad"><b>Kassa bağlanmayıb: ${days}</b><span>Admin kassanı bağlayana qədər yeni iş yazmaq olmur.</span></div>`;
}

// ------------------------------------------------------------- Giriş
VIEWS.login = () => `
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px">
    <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">${logoFull(S.settings.servis_adi)}<div class="muted">Xoş gəlmisiniz, daxil olun</div></div>
    <form class="card" data-form="login">
      <label class="field">Telefon<input name="phone" type="tel" inputmode="tel" placeholder="050 000 00 00" autocomplete="username" required autofocus></label>
      <label class="field">PIN<input name="pin" type="password" inputmode="numeric" pattern="[0-9]*" placeholder="••••••" autocomplete="current-password" required></label>
      <button class="btn primary big" type="submit">Daxil ol</button>
    </form>
  </div>`;

VIEWS.changePin = () => `
  <h1>PIN-i dəyişin</h1>
  <p class="muted" style="margin:0">Verilmiş PIN-i öz PIN-inizlə əvəz edin (${isAdmin() ? '6 rəqəm' : '4–6 rəqəm'}). 1234, 1111 kimi asan PIN olmaz.</p>
  <form class="card" data-form="changePin">
    <label class="field">Hazırkı PIN<input name="oldPin" type="password" inputmode="numeric" required autofocus></label>
    <label class="field">Yeni PIN<input name="newPin" type="password" inputmode="numeric" pattern="${isAdmin() ? '[0-9]{6}' : '[0-9]{4,6}'}" maxlength="6" required></label>
    <label class="field">Yeni PIN təkrar<input name="newPin2" type="password" inputmode="numeric" required></label>
    <button class="btn primary big" type="submit">Yadda saxla</button>
  </form>`;

// ------------------------------------------------------------- Usta: Əsas
VIEWS.home = async (p) => {
  if (isAdmin()) return VIEWS.report(p && p.preset ? p : { preset: 'gun' });
  const b = await loadBoot();
  const t = b.today;
  return `
  <div class="between"><div><div class="muted">${longToday()}</div><h1>Bugünkü iş</h1></div></div>
  ${blockBanner(b)}
  <div class="card">
    <div class="between" style="align-items:flex-end"><div><div class="muted">Mənim qazancım</div><div class="big">${money(t.qazanc)}</div></div><span class="muted">${t.is_sayi} maşın</span></div>
    <div class="grid3">
      <div class="stat"><span>Usta haqqı</span><b>${money(t.usta_haqqi)}</b></div>
      <div class="stat"><span>Təmir</span><b>${money(t.temir)}</b></div>
      <div class="stat"><span>Ödənilməyən</span><b style="color:${t.borc ? 'var(--danger)' : 'inherit'}">${money(t.borc)}</b></div>
    </div>
    ${t.borc ? `<button class="btn small" data-act="myDebts">Ödənilməyən işlər</button>` : ''}
  </div>
  <button class="btn primary big" data-act="newJob" ${b.blocked ? 'disabled' : ''}>${ic('plus')}Yeni iş</button>
  <form class="search" data-form="carSearch" role="search">${ic('search', 18)}<input name="q" placeholder="Nömrə, marka və ya müştəri" aria-label="Maşın axtar"></form>
  <div class="between"><h2>Son maşınlar</h2><button class="btn ghost small" data-tab="cars">Hamısı</button></div>
  <div class="list">${b.recent.length ? b.recent.map(r => carRow(r.car, `${fmtDate(r.tarix)} · ${esc(r.xulase)}`, money(r.umumi))).join('') : '<div class="empty">Hələ iş yoxdur. "Yeni iş" ilə başlayın.</div>'}</div>
  <button class="btn" data-act="requestClose" ${b.myRequestSent ? 'disabled' : ''}>${ic('bell', 18)}${b.myRequestSent ? 'Kassa bağlama sorğusu göndərilib' : 'Gün sonu: kassanı bağlamaq üçün sorğu göndər'}</button>`;
};

const dueSub = c => c.due === 'red' ? `<span style="color:var(--danger)">Yağ dəyişmə vaxtı çatıb (${fmtDate(c.novbeti_tarix)})</span>` : c.due === 'orange' ? `<span style="color:var(--accent)">Yağ dəyişməyə az qalıb (${fmtDate(c.novbeti_tarix)})</span>` : '';
const carRow = (c, sub, right = '', act = 'openCar') => `
  <button class="item ${c.due ? 'due-' + c.due : ''}" data-act="${act}" data-id="${esc(c.car_id)}">
    <span class="plate" style="${c.due === 'red' ? 'border-color:var(--danger);color:var(--danger)' : ''}">${esc(c.nomre)}</span>
    <span class="grow"><span>${esc([c.marka, c.model].filter(Boolean).join(' '))}${c.musteri ? ' · ' + esc(c.musteri) : ''}</span><span class="muted">${dueSub(c) || sub}</span></span>
    ${right ? `<b style="font-size:14px">${right}</b>` : ''}
  </button>`;

// ------------------------------------------------------------- Maşınlar
async function allCars() { if (!S.cars) await loadBoot(); return S.cars; }
function filterCars(cars, q) {
  const n = s => String(s || '').toLowerCase().replace(/[\s-]/g, '');
  const k = n(q);
  const dueFirst = (a, b) => ({ red: 0, orange: 1 }[a.due] ?? 2) - ({ red: 0, orange: 1 }[b.due] ?? 2);
  if (!k) return cars.slice(-40).reverse().sort(dueFirst);
  return cars.filter(c => n(c.nomre + c.marka + c.model + c.musteri + c.telefon).includes(k)).slice(0, 50);
}
const carSub = c => c.son_km ? `Son: ${kmf(c.son_km)}${c.novbeti_km ? ' · növbəti ' + kmf(c.novbeti_km) : ''}` : 'Hələ iş yoxdur';
VIEWS.cars = async (p) => {
  const list = filterCars(await allCars(), p.q || '');
  const pick = p.pick;
  const due = (S.cars || []).filter(c => c.due === 'red').length;
  return `
  <div class="between"><h1>${pick ? 'Maşın seçin' : 'Maşınlar'}</h1><button class="btn small primary" data-act="newCar" data-pick="${pick ? 1 : ''}">${ic('plus', 18)}Yeni</button></div>
  ${!pick && due ? `<div class="banner bad"><b>${due} maşının yağ dəyişmə vaxtı çatıb</b><span>Maşına basın və müştəriyə xatırlatma göndərin.</span></div>` : ''}
  <form class="search" data-form="carSearch" data-pick="${pick ? 1 : ''}" role="search">${ic('search', 18)}<input name="q" value="${esc(p.q || '')}" placeholder="Nömrə, marka və ya müştəri" aria-label="Maşın axtar" ${pick ? 'autofocus' : ''}></form>
  <div class="list">${list.length ? list.map(c => carRow(c, carSub(c), '', pick ? 'pickCar' : 'openCar')).join('') : '<div class="empty">Tapılmadı. "Yeni" ilə əlavə edin.</div>'}</div>`;
};

VIEWS.carForm = (p) => {
  const c = p.car || { nomre: plateFmt(p.q || '') };
  const brand = c.marka || '';
  return `
  <h1>${c.car_id ? 'Maşını düzəlt' : 'Yeni maşın'}</h1>
  <form class="card" data-form="car" data-pick="${p.pick ? 1 : ''}">
    <input type="hidden" name="car_id" value="${esc(c.car_id || '')}">
    <label class="field">Dövlət nömrəsi<input name="nomre" data-plate="${c.ferqli_nomre === '1' ? '' : '1'}" value="${esc(c.nomre || '')}" placeholder="99-OP-304" required autofocus style="text-transform:uppercase" autocomplete="off"></label>
    <label class="row" style="font-size:14px"><input type="checkbox" name="ferqli_nomre" data-ferqli ${c.ferqli_nomre === '1' ? 'checked' : ''} style="width:22px;min-height:22px">Fərqli nömrə (xarici, köhnə format)</label>
    <div class="grid2">
      <label class="field">Marka<input name="marka" list="dl-marka" data-brand value="${esc(brand)}" placeholder="Axtar və ya yaz" autocomplete="off"></label>
      <label class="field">Model<input name="model" list="dl-model" value="${esc(c.model || '')}" placeholder="Axtar və ya yaz" autocomplete="off"></label>
    </div>
    <datalist id="dl-marka">${opts(dictNames('masin_marka'))}</datalist>
    <datalist id="dl-model">${opts(dictChildren('masin_model', brand))}</datalist>
    <label class="field">Buraxılış ili<input name="il" value="${esc(c.il || '')}" inputmode="numeric"></label>
    <label class="field">Müştəri adı<input name="musteri" value="${esc(c.musteri || '')}"></label>
    <label class="field">Müştəri telefonu (WhatsApp üçün)<input name="telefon" type="tel" inputmode="tel" value="${esc(c.telefon || '')}" placeholder="050 000 00 00"></label>
    <span class="muted">Siyahıda olmayan marka və ya model yazsanız, bazaya əlavə olunur.</span>
    <button class="btn primary big" type="submit">Yadda saxla</button>
  </form>`;
};

VIEWS.carHistory = async (p) => {
  const h = await cget('carHistory', { car_id: p.car_id });
  const c = h.car;
  S.params.car = c; S.params.hist = h;
  const blocked = S.boot && S.boot.blocked;
  return `
  <div class="card ${c.due ? 'due-' + c.due : ''}">
    <div class="between"><span class="plate" style="font-size:14px">${esc(c.nomre)}</span><button class="btn small" data-act="editCar">Düzəlt</button></div>
    <div><h1 style="font-size:20px">${esc([c.marka, c.model, c.il].filter(Boolean).join(' ') || 'Maşın')}</h1><div class="muted">${esc(c.musteri || '')}${c.telefon ? ' · ' + esc(c.telefon) : ''}</div></div>
    <div class="grid2">
      <div class="stat"><span>Son km</span><b>${c.son_km ? kmf(c.son_km) : '—'}</b></div>
      <div class="stat"><span>Növbəti yağ dəyişməsi</span><b>${c.novbeti_km ? kmf(c.novbeti_km) : '—'}${c.novbeti_tarix ? '<br><span style="font-size:13px;color:' + (c.due === 'red' ? 'var(--danger)' : 'inherit') + '">' + fmtDate(c.novbeti_tarix) + '</span>' : ''}</b></div>
    </div>
    ${c.due ? `<div class="banner ${c.due === 'red' ? 'bad' : 'warn'}">${dueSub(c)}</div>` : ''}
    ${h.jobs.length ? `<button class="btn ${c.due === 'red' ? 'primary' : ''}" data-act="remind">${ic('bell', 18)}Müştəriyə xatırlatma göndər</button>` : ''}
  </div>
  ${isAdmin() ? '' : `<button class="btn primary big" data-act="jobForCar" ${blocked ? 'disabled' : ''}>${ic('plus')}Bu maşına yeni iş</button>`}
  <h2>Tarixçə · ${h.jobs.length} iş</h2>
  <div class="list">${h.jobs.length ? h.jobs.map(j => `
    <button class="item" data-act="openReceipt" data-id="${esc(j.job_id)}" style="align-items:flex-start">
      <span class="grow">
        <span>${fmtDate(j.tarix)} · ${kmf(j.km)}</span>
        <span class="muted">${j.items.map(i => esc(i.ad) + (i.nov === 'mal' && i.miqdar !== 1 ? ' × ' + i.miqdar : '')).join(', ') || 'Usta xidməti'}</span>
        <span class="muted">Usta: ${esc(j.usta)} · Qəbz №${esc(j.qebz)}</span>
      </span>
      <span style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><b style="font-size:14px">${money(j.umumi)}</b>${j.borc ? `<span class="pill bad">borc ${money(j.borc)}</span>` : ''}</span>
    </button>`).join('') : '<div class="empty">Bu maşına hələ iş qeyd olunmayıb.</div>'}</div>`;
};

// ------------------------------------------------------------- Yeni iş
function jobDraft() { return S.draft || (S.draft = { car: null, km: '', items: [], nagd: '', kart: '', novbeti_km: '', novbeti_ay: '', kmTouched: false, qeyd: '' }); }
function jobCalc(d) {
  const mallar = d.items.filter(i => i.nov === 'mal').reduce((s, i) => s + num(i.miqdar) * num(i.qiymet), 0);
  const temir = d.items.filter(i => i.nov === 'temir').reduce((s, i) => s + num(i.qiymet), 0);
  const hasOil = d.items.some(i => i.nov === 'mal' && (S.products.find(p => p.product_id === i.product_id) || {}).nov === 'yag');
  const usta = hasOil ? num(S.user.usta_haqqi) : 0;
  const umumi = r2(mallar + temir + usta);
  const paid = r2(num(d.nagd) + num(d.kart));
  return { mallar: r2(mallar), temir: r2(temir), usta, hasOil, umumi, paid, borc: r2(umumi - paid), over: paid - umumi > 0.009 };
}
const stockLimit = p => num(p.min_qaliq) || num(S.settings.min_qaliq_standart || 2);

VIEWS.job = async () => {
  const d = jobDraft();
  if (!S.products.length) await loadBoot();
  const c = d.car, t = jobCalc(d);
  const interval = num(S.settings.interval_km) || 10000;
  if (!d.kmTouched) d.novbeti_km = d.km && t.hasOil ? String(num(d.km) + interval) : '';
  return `
  <h1>Yeni iş</h1>
  ${c ? `
  <div class="card">
    <div class="between"><span class="plate" style="font-size:14px">${esc(c.nomre)}</span><button class="btn small" data-act="changeCar">Dəyiş</button></div>
    <div class="muted">${esc([c.marka, c.model].filter(Boolean).join(' '))}${c.musteri ? ' · ' + esc(c.musteri) : ''}${c.son_km ? ' · son ' + kmf(c.son_km) : ''}</div>
    <label class="field">Hazırkı km<input data-bind="km" inputmode="numeric" value="${esc(d.km)}" placeholder="${c.son_km ? 'son: ' + c.son_km : 'məs. 142350'}"></label>
    <span class="err" data-err="km">${d.km && c.son_km && num(d.km) < num(c.son_km) ? `Km əvvəlkindən (${kmf(c.son_km)}) azdır — yoxlayın` : ''}</span>
  </div>` : `<button class="btn big" data-act="changeCar">${ic('car')}Maşın seçin</button>`}

  <div class="card">
    <h2>Yağ və mallar</h2>
    ${d.items.map((it, ix) => it.nov === 'mal' ? matRow(it, ix) : '').join('')}
    <label class="field">Mal axtar<input data-prodsearch list="dl-prod" placeholder="Marka, model, özlülük..." autocomplete="off"></label>
    <datalist id="dl-prod">${S.products.filter(p => p.aktiv).map(p => `<option value="${esc(p.label)}">${p.qaliq} ${esc(p.vahid)}</option>`).join('')}</datalist>
  </div>

  <div class="card">
    <h2>Təmir işləri</h2>
    ${d.items.map((it, ix) => it.nov === 'temir' ? `
      <div class="row">
        <input aria-label="İşin adı" data-item="${ix}" data-f="ad" list="dl-temir" value="${esc(it.ad)}" placeholder="İşin adı" style="flex:2" autocomplete="off">
        <input aria-label="Qiymət" data-item="${ix}" data-f="qiymet" value="${esc(it.qiymet)}" inputmode="decimal" placeholder="₼" style="flex:1">
        <button class="icon-btn" data-act="delItem" data-ix="${ix}" aria-label="Sil">${ic('x', 18)}</button>
      </div>` : '').join('')}
    <datalist id="dl-temir">${opts(dictNames('temir'))}</datalist>
    <button class="btn" data-act="addRepair">${ic('wrench', 18)}Təmir işi əlavə et</button>
  </div>

  <div class="card">
    <div class="between"><span>Usta haqqı</span><b>${money(t.usta)}</b></div>
    <span class="muted">${t.hasOil ? 'Yağ dəyişmə üçün Admin-in təyin etdiyi məbləğ.' : 'İşdə yağ yoxdur — usta haqqı yazılmır.'}</span>
    <div class="grid3">
      <div class="stat"><span>Mallar</span><b data-sum="mallar">${money(t.mallar)}</b></div>
      <div class="stat"><span>Təmir</span><b data-sum="temir">${money(t.temir)}</b></div>
      <div class="stat"><span>Cəmi</span><b data-sum="umumi" style="color:var(--accent)">${money(t.umumi)}</b></div>
    </div>
    <h2 style="margin-top:4px">Ödəniş</h2>
    <div class="row"><button type="button" class="btn small" data-fill="nagd">Hamısı nağd</button><button type="button" class="btn small" data-fill="kart">Hamısı kart</button><button type="button" class="btn small" data-fill="borc">Borc</button></div>
    <div class="grid2">
      <label class="field">Nağd (₼)<input data-bind="nagd" inputmode="decimal" value="${esc(d.nagd)}" placeholder="0"></label>
      <label class="field">Kart (₼)<input data-bind="kart" inputmode="decimal" value="${esc(d.kart)}" placeholder="0"></label>
    </div>
    <span class="err" data-err="pay">${t.over ? `Nağd + kart cəmdən (${money(t.umumi)}) çox ola bilməz` : ''}</span>
    <span class="muted" data-sum="borcline">${t.borc > 0 && !t.over ? `Ödənilməyən hissə borc kimi qalacaq: <b style="color:var(--danger)">${money(t.borc)}</b>` : ''}</span>
  </div>

  <div class="card">
    <h2>Növbəti yağ dəyişməsi</h2>
    <div class="grid2">
      <label class="field">Km<input data-bind="novbeti_km" inputmode="numeric" value="${esc(d.novbeti_km)}" placeholder="${t.hasOil ? 'avtomatik' : 'yağ yoxdur'}"></label>
      <label class="field">Neçə aydan sonra<input data-bind="novbeti_ay" inputmode="numeric" value="${esc(d.novbeti_ay)}" placeholder="${esc(S.settings.interval_ay || 6)}"></label>
    </div>
    <label class="field">Qeyd<input data-bind="qeyd" value="${esc(d.qeyd)}" placeholder="istəyə bağlı"></label>
  </div>
  <button class="btn primary big" data-act="saveJob" ${c && !t.over ? '' : 'disabled'}>Yadda saxla · <span data-sum="umumi2">${money(t.umumi)}</span></button>`;
};

function matRow(it, ix) {
  const p = S.products.find(x => x.product_id === it.product_id) || {};
  const low = num(it.qiymet) < num(p.min_qiymet);
  const left = r2(num(p.qaliq) - num(it.miqdar));
  const lowStock = left <= stockLimit(p);
  return `
  <div class="pl">
    <div class="between"><span style="font-weight:500">${esc(p.label || it.ad)}</span><button class="icon-btn" data-act="delItem" data-ix="${ix}" aria-label="Sil">${ic('x', 18)}</button></div>
    <div class="grid2">
      <label class="field">${p.vahid === 'litr' ? 'Litr' : 'Say'}<input data-item="${ix}" data-f="miqdar" inputmode="decimal" value="${esc(it.miqdar)}"></label>
      <label class="field">Qiymət (₼ / ${p.vahid === 'litr' ? 'L' : 'ədəd'})<input data-item="${ix}" data-f="qiymet" inputmode="decimal" value="${esc(it.qiymet)}"></label>
    </div>
    <span class="muted" data-hint="${ix}">Tövsiyə ${money(p.tovsiye_qiymet)} · minimum ${money(p.min_qiymet)}${low ? ' — <b style="color:var(--danger)">minimumdan aşağı satmaq olmaz</b>' : ''}</span>
    ${lowStock ? `<div class="banner warn"><span>Bu maldan satışdan sonra <b>${grp(Math.max(left, 0), 2)} ${esc(p.vahid)}</b> qalacaq.</span><button class="btn small" data-act="stockReq" data-id="${esc(p.product_id)}">Admin-ə alış sorğusu göndər</button></div>` : ''}
  </div>`;
}

function refreshJob() {
  const d = jobDraft(), t = jobCalc(d);
  const set = (k, v) => { const el = $app.querySelector(`[data-sum="${k}"]`); if (el) el.textContent = money(v); };
  set('mallar', t.mallar); set('temir', t.temir); set('umumi', t.umumi); set('umumi2', t.umumi);
  const e = $app.querySelector('[data-err="pay"]'); if (e) e.textContent = t.over ? `Nağd + kart cəmdən (${money(t.umumi)}) çox ola bilməz` : '';
  const bl = $app.querySelector('[data-sum="borcline"]'); if (bl) bl.innerHTML = t.borc > 0 && !t.over ? `Ödənilməyən hissə borc kimi qalacaq: <b style="color:var(--danger)">${money(t.borc)}</b>` : '';
  const sb = $app.querySelector('[data-act="saveJob"]'); if (sb) sb.disabled = !d.car || t.over;
}

// ------------------------------------------------------------- Qəbz
// PDF kitabxanaları saytın özündədir (CDN yoxdur): daha sürətli, oflayn işləyir, kənar kod yüklənmir.
const PDF_LIBS = ['html2canvas.min.js', 'jspdf.umd.min.js'];
const loadPdfLibs = () => Promise.all(PDF_LIBS.map(loadScript));
function loadScript(src) {
  return new Promise((ok, bad) => {
    const ex = document.querySelector(`script[src="${src}"]`);
    if (ex) { if (ex.dataset.ok) return ok(); ex.addEventListener('load', ok); ex.addEventListener('error', () => bad(new Error('PDF hazırlanmadı'))); return; }
    const s = document.createElement('script'); s.src = src; s.onload = () => { s.dataset.ok = '1'; ok(); }; s.onerror = () => { s.remove(); bad(new Error('PDF hazırlanmadı: internet bağlantısını yoxlayın')); }; document.head.appendChild(s);
  });
}
async function pdfFrom(el, fileName, title) {
  await loadPdfLibs();
  const canvas = await window.html2canvas(el, { scale: 2, backgroundColor: '#FAF9F5', useCORS: true });
  const { jsPDF } = window.jspdf;
  const w = 80, h = canvas.height * w / canvas.width;
  const pdf = new jsPDF({ unit: 'mm', format: [w + 8, h + 8] });
  pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 4, 4, w, h);
  pdf.setProperties({ title });
  return new File([pdf.output('blob')], fileName, { type: 'application/pdf' });
}
async function shareFile(file, text, phone) {
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], text }); } catch (e) { if (e.name !== 'AbortError') throw new Error('Paylaşmaq alınmadı, yenidən basın'); }
    return;
  }
  const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = file.name; a.click();
  if (phone !== undefined) window.open(`https://wa.me/${waPhone(phone)}?text=${encodeURIComponent(text)}`, '_blank');
  toast('PDF yükləndi. WhatsApp-da fayl kimi əlavə edin.', true);
}
function waPhone(p) { let d = String(p || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('994')) return d; if (d.startsWith('0')) d = d.slice(1); return '994' + d; }
const payText = j => j.borc > 0 ? `Ödənilib ${money(j.odenilib)}, borc ${money(j.borc)}` : (j.kart && j.nagd ? `Nağd ${money(j.nagd)}, kart ${money(j.kart)}` : j.kart ? 'Kart' : 'Nağd');

function receiptHtml(r, stamp) {
  const j = r.job, c = r.car, s = r.settings;
  const mal = r.items.filter(i => i.nov === 'mal'), tem = r.items.filter(i => i.nov === 'temir');
  return `<div class="receipt" id="rcpt">
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px">${logoFull(s.servis_adi, true)}<div class="muted" style="text-align:center">${esc([s.unvan, s.telefon].filter(Boolean).join(' · '))}</div></div>
    <div class="line muted"><span>Qəbz №${esc(j.qebz)}</span><span>${fmtDate(j.tarix_saat.slice(0, 10))} ${esc(j.tarix_saat.slice(11))}</span></div>
    ${j.status === 'legv' ? '<b style="color:#B42318;text-align:center">LƏĞV EDİLİB</b>' : ''}
    <hr>
    <div class="line"><span>Maşın</span><b>${esc(c.nomre)} · ${esc([c.marka, c.model, c.il].filter(Boolean).join(' '))}</b></div>
    ${c.musteri ? `<div class="line"><span>Müştəri</span><span>${esc(c.musteri)}</span></div>` : ''}
    <div class="line"><span>Km</span><span>${kmf(j.km)}</span></div>
    <div class="line"><span>Usta</span><span>${esc(r.usta)}</span></div>
    <hr>
    ${mal.length ? `<b>Mallar</b>${mal.map(i => `<div class="line"><span>${esc(i.ad)}<br><span class="muted">${i.miqdar} × ${money(i.qiymet)}</span></span><span>${money(i.cemi)}</span></div>`).join('')}` : ''}
    ${tem.length ? `<b>Təmir</b>${tem.map(i => `<div class="line"><span>${esc(i.ad)}</span><span>${money(i.cemi)}</span></div>`).join('')}` : ''}
    ${j.usta_haqqi ? `<div class="line"><span>Usta haqqı</span><span>${money(j.usta_haqqi)}</span></div>` : ''}
    <hr>
    <div class="line" style="font-size:18px"><b>CƏMİ</b><b>${money(j.umumi)}</b></div>
    <div class="line muted"><span>Ödəniş</span><span>${payText(j)}</span></div>
    ${j.novbeti_km || j.novbeti_tarix ? `<hr><div class="line"><span>Növbəti yağ dəyişməsi</span><b style="text-align:right">${j.novbeti_km ? kmf(j.novbeti_km) : ''}${j.novbeti_km && j.novbeti_tarix ? '<br>' : ''}${j.novbeti_tarix ? 'və ya ' + fmtDate(j.novbeti_tarix) : ''}</b></div>` : ''}
    ${r.tarixce.length ? `<hr><b>Son xidmətlər</b>${r.tarixce.map(x => `<div class="line muted"><span>${fmtDate(x.tarix)} · ${kmf(x.km)}</span><span style="text-align:right">${esc(x.xulase)}</span></div>`).join('')}` : ''}
    ${s.alt_qeyd ? `<div style="text-align:center;margin-top:6px">${esc(s.alt_qeyd)}</div>` : ''}
    ${stamp ? '<div class="stamp"><span>ÖDƏNİLDİ</span></div>' : ''}
  </div>`;
}

VIEWS.receipt = async (p) => {
  const r = p.data || await cget('receipt', { job_id: p.job_id });
  S.params.data = r;
  const j = r.job;
  const canCancel = j.status !== 'legv' && (isAdmin() || (j.user_id === S.user.id && j.tarix === today()));
  const canPay = j.status !== 'legv' && j.borc > 0 && (isAdmin() || j.user_id === S.user.id);
  const paid = j.borc <= 0 && j.status !== 'legv';
  const stamp = paid && S.params.stamp;
  return `
  ${p.fresh ? `<div class="between"><span class="pill ok">Yadda saxlanıldı</span><button class="btn small" data-act="home">Əsasa qayıt</button></div>` : ''}
  ${(r.warnings || []).map(w => `<div class="banner warn"><span><b>${esc(w.ad)}</b>: anbarda ${grp(w.qaliq, 2)} ${esc(w.vahid)} qalıb.</span><button class="btn small" data-act="stockReq" data-id="${esc(w.product_id)}">Admin-ə alış sorğusu göndər</button></div>`).join('')}
  ${j.borc > 0 && j.status !== 'legv' ? `<div class="banner bad"><b>Ödənilməyib: ${money(j.borc)} borc</b>${canPay ? `<button class="btn small primary" data-act="payDebt" data-id="${esc(j.job_id)}">Ödənişi qəbul et</button>` : ''}</div>` : ''}
  ${receiptHtml(r, stamp)}
  ${paid ? `<label class="check"><input type="checkbox" data-stamp ${S.params.stamp ? 'checked' : ''}>Ödənildi — qəbzə möhür vur</label>` : ''}
  <button class="btn primary big" data-act="sharePdf">${ic('share')}Qəbzi PDF kimi göndər</button>
  <button class="btn" data-act="whatsapp">WhatsApp-a mətn kimi göndər</button>
  ${canCancel ? `<button class="btn danger" data-act="cancelJob">İşi ləğv et</button>` : ''}`;
};

function receiptText(r) {
  const j = r.job, c = r.car, s = r.settings, L = [];
  L.push(`*${s.servis_adi}*${s.telefon ? ' · ' + s.telefon : ''}`, `Qəbz №${j.qebz} · ${fmtDate(j.tarix_saat.slice(0, 10))} ${j.tarix_saat.slice(11)}`, '');
  L.push(`Maşın: ${c.nomre} · ${[c.marka, c.model, c.il].filter(Boolean).join(' ')}`);
  if (c.musteri) L.push(`Müştəri: ${c.musteri}`);
  L.push(`Km: ${kmf(j.km)} · Usta: ${r.usta}`, '');
  r.items.filter(i => i.nov === 'mal').forEach((i, n) => { if (!n) L.push('*Mallar*'); L.push(`  ${i.ad}: ${i.miqdar} × ${money(i.qiymet)} = ${money(i.cemi)}`); });
  r.items.filter(i => i.nov === 'temir').forEach((i, n) => { if (!n) L.push('*Təmir*'); L.push(`  ${i.ad}: ${money(i.cemi)}`); });
  if (j.usta_haqqi) L.push(`Usta haqqı: ${money(j.usta_haqqi)}`);
  L.push('', `*CƏMİ: ${money(j.umumi)}* (${payText(j)})`);
  if (j.novbeti_km || j.novbeti_tarix) L.push('', `Növbəti yağ dəyişməsi: ${[j.novbeti_km ? kmf(j.novbeti_km) : '', j.novbeti_tarix ? fmtDate(j.novbeti_tarix) : ''].filter(Boolean).join(' və ya ')}`);
  if (s.alt_qeyd) L.push('', s.alt_qeyd);
  return L.join('\n');
}

// ------------------------------------------------------------- Xatırlatma (son 5 xidmət PDF)
function remindText(c) {
  const s = S.settings;
  return String(s.xatirlatma_metni || 'Salam! {masin} ({nomre}) üçün yağ dəyişmə vaxtı çatıb. {servis}, {telefon}')
    .replace(/\{musteri\}/g, c.musteri || '').replace(/\{masin\}/g, [c.marka, c.model].filter(Boolean).join(' ')).replace(/\{nomre\}/g, c.nomre || '')
    .replace(/\{servis\}/g, s.servis_adi || '').replace(/\{telefon\}/g, s.telefon || '').replace(/Salam, !/, 'Salam!');
}
function historyDoc(h) {
  const c = h.car, s = h.settings || S.settings;
  return `<div class="doc">
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px">${logoFull(s.servis_adi, true)}<div class="muted">${esc([s.unvan, s.telefon].filter(Boolean).join(' · '))}</div></div>
    <b style="text-align:center">Xidmət tarixçəsi</b>
    <div class="line"><span>Maşın</span><b>${esc(c.nomre)} · ${esc([c.marka, c.model, c.il].filter(Boolean).join(' '))}</b></div>
    ${c.musteri ? `<div class="line"><span>Müştəri</span><span>${esc(c.musteri)}</span></div>` : ''}
    <div class="line"><span>Növbəti yağ dəyişməsi</span><b style="text-align:right">${c.novbeti_km ? kmf(c.novbeti_km) : ''}${c.novbeti_tarix ? '<br>' + fmtDate(c.novbeti_tarix) : ''}</b></div>
    <hr>
    ${h.jobs.slice(0, 5).map(j => `<div class="line"><span><b>${fmtDate(j.tarix)}</b> · ${kmf(j.km)}<br><span class="muted">${j.items.map(i => esc(i.ad)).join(', ') || 'Usta xidməti'}</span></span><span>${money(j.umumi)}</span></div>`).join('<hr>')}
    ${s.alt_qeyd ? `<hr><div style="text-align:center">${esc(s.alt_qeyd)}</div>` : ''}
  </div>`;
}
async function sendReminder() {
  const h = S.params.hist, c = h.car;
  const box = document.createElement('div'); box.className = 'offscreen'; box.innerHTML = historyDoc(h); document.body.appendChild(box);
  try {
    loading(true);
    const file = await pdfFrom(box.firstElementChild, `Xidmet-tarixcesi-${String(c.nomre).replace(/[^A-Za-z0-9]/g, '')}.pdf`, 'Xidmət tarixçəsi');
    loading(false);
    await shareFile(file, remindText(c), c.telefon || '');
  } finally { loading(false); box.remove(); }
}

// ------------------------------------------------------------- Usta: Mən, borclar
VIEWS.me = async (p) => {
  const { key, range } = pickRange(p);
  const s = await cget('myStats', { from: range[0], to: range[1] });
  return `
  <div><div class="muted">${esc(S.user.telefon)}</div><h1>${esc(S.user.ad)}</h1></div>
  ${presetSeg(key, 'me')}
  <div class="card">
    <div><div class="muted">Qazancım (usta haqqı + təmir)</div><div class="big">${money(s.qazanc)}</div></div>
    <div class="grid3">
      <div class="stat"><span>İş sayı</span><b>${s.is_sayi}</b></div>
      <div class="stat"><span>Nağd hissə</span><b>${money(s.nagd)}</b></div>
      <div class="stat"><span>Kart hissə</span><b>${money(s.kart)}</b></div>
      <div class="stat"><span>Usta haqqı</span><b>${money(s.usta_haqqi)}</b></div>
      <div class="stat"><span>Təmir</span><b>${money(s.temir)}</b></div>
      <div class="stat"><span>Gözləyən usta haqqı</span><b>${money(s.gozleyen)}</b></div>
    </div>
    <span class="muted">Gözləyən usta haqqı müştəri borcu ödəyəndə hesablanır.</span>
  </div>
  <button class="item" data-act="myDebts"><span class="grow"><span>Ödənilməyən işlər</span><span class="muted">Müştəri borcları</span></span><b style="color:${s.borc ? 'var(--danger)' : 'inherit'}">${money(s.borc)}</b></button>
  <button class="btn" data-act="toChangePin">PIN-i dəyiş</button>
  <button class="btn danger" data-act="logout">Çıxış</button>`;
};

VIEWS.debtList = async (p) => {
  const list = await cget('myDebts', p.user_id ? { user_id: p.user_id } : {});
  const total = list.reduce((s, x) => s + x.borc, 0);
  return `<h1>${p.ad ? esc(p.ad) + ' — borclar' : 'Ödənilməyən işlər'}</h1>
  <div class="card"><div class="muted">Cəmi borc</div><div class="big" style="color:${total ? 'var(--danger)' : 'inherit'}">${money(total)}</div></div>
  <div class="list">${list.length ? list.map(x => `
    <button class="item" data-act="openReceipt" data-id="${esc(x.job_id)}">
      <span class="plate">${esc(x.nomre)}</span>
      <span class="grow"><span>${esc(x.musteri || '')} ${x.telefon ? '· ' + esc(x.telefon) : ''}</span><span class="muted">${fmtDate(x.tarix)} · Qəbz №${esc(x.qebz)} · cəmi ${money(x.umumi)}</span></span>
      <b style="color:var(--danger)">${money(x.borc)}</b>
    </button>`).join('') : '<div class="empty">Borc yoxdur.</div>'}</div>`;
};

VIEWS.payForm = (p) => `
  <h1>Ödənişi qəbul et</h1>
  <div class="card"><div class="muted">Qalan borc</div><div class="big" style="color:var(--danger)">${money(p.borc)}</div></div>
  <form class="card" data-form="payJob">
    <div class="row"><button type="button" class="btn small" data-payfill="nagd">Hamısı nağd</button><button type="button" class="btn small" data-payfill="kart">Hamısı kart</button></div>
    <div class="grid2"><label class="field">Nağd (₼)<input name="nagd" inputmode="decimal" placeholder="0"></label><label class="field">Kart (₼)<input name="kart" inputmode="decimal" placeholder="0"></label></div>
    <span class="err" data-err="pay"></span>
    <span class="muted">Pul bu günün kassasına düşür.</span>
    <button class="btn primary big" type="submit">Qəbul et</button>
  </form>`;

// ------------------------------------------------------------- Kassa
VIEWS.kassa = async () => {
  const k = await cget('kassaToday');
  const f = k.axin || {}, admin = isAdmin(); k.ustalar = k.ustalar || [];
  const isOld = k.tarix !== today();
  return `
  <div class="between"><div><div class="muted">${isOld ? 'Bağlanmamış gün' : longToday()}</div><h1>Kassa${isOld ? ' · ' + fmtDate(k.tarix) : ''}</h1></div>${admin ? `<button class="btn small" data-act="kassaHistory">Tarixçə</button>` : ''}</div>
  ${(k.openDays || []).length ? `<div class="banner bad"><b>Bağlanmamış gün: ${(k.openDays || []).map(fmtDate).join(', ')}</b><span>${admin ? 'Bu günü bağlayana qədər ustalar yeni iş yaza bilmir.' : 'Admin bağlayana qədər yeni iş yazmaq olmur.'}</span></div>` : ''}
  ${admin && k.sorgular && k.sorgular.length ? `<div class="banner warn"><b>Kassa bağlama sorğusu</b>${k.sorgular.map(s => `<span>${esc(s.ad)} · ${fmtDate(s.tarix)} ${esc(s.saat)}</span>`).join('')}</div>` : ''}
  ${k.baglanib ? `<span class="pill ok">Gün bağlanıb · fərq ${money(k.ferq)}</span>` : ''}
  <div class="card">
    <div><div class="muted">Kassada olmalı nağd</div><div class="big">${money(k.hesablanan)}</div></div>
    <div class="grid2">
      <div class="stat"><span>Açılış qalığı</span><b>${money(k.acilis)}</b></div>
      <div class="stat"><span>Nağd daxilolma</span><b>${money(f.nagd_daxil)}</b></div>
      <div class="stat"><span>Kart (bankda)</span><b>${money(f.kart_daxil)}</b></div>
      <div class="stat"><span>Xərclər</span><b>${money(f.xerc)}</b></div>
      <div class="stat"><span>Ustalara ödənib</span><b>${money(f.usta_odenisi)}</b></div>
      <div class="stat"><span>Təchizatçılara</span><b>${money(f.techizatci)}</b></div>
      <div class="stat"><span>Təhvil</span><b>${money(f.tehvil)}</b></div>
    </div>
  </div>
  <h2>Ustaların payı</h2>
  <div class="card scroll">${k.ustalar.length ? `<table>
    <tr><th>Usta</th><th class="r">Təmir</th><th class="r">Usta h.</th><th class="r">Kart</th><th class="r">Nağd qalır</th>${admin && !k.baglanib ? '<th></th>' : ''}</tr>
    ${k.ustalar.map(u => `<tr><td>${esc(u.ad)}</td><td class="r">${money(u.temir)}</td><td class="r">${money(u.usta_haqqi)}</td><td class="r">${money(u.kart)}</td><td class="r"><b>${money(u.qalir)}</b></td>
      ${admin && !k.baglanib ? `<td class="r">${u.qalir > 0 ? `<button class="btn small primary" data-act="payUsta" data-id="${esc(u.user_id)}" data-amt="${u.qalir}" data-name="${esc(u.ad)}">Ödə</button>` : '✓'}</td>` : ''}</tr>`).join('')}
  </table><span class="muted">Təmir pulu dərhal, usta haqqı müştəri ödədikcə çatır. Kart hissəsi nağd verilmir.</span>` : '<div class="empty">Bu gün iş yoxdur.</div>'}</div>
  ${admin ? `
  ${k.hereketler && k.hereketler.length ? `<h2>Hərəkətlər</h2><div class="list">${k.hereketler.map(m => `
    <div class="item" style="cursor:default"><span class="grow"><span>${NOV[m.nov] || m.nov}${m.kateqoriya ? ' · ' + esc(m.kateqoriya) : ''}${m.alan ? ' · ' + esc(m.alan) : ''}</span><span class="muted">${esc(m.saat)}${m.sebeb ? ' · ' + esc(m.sebeb) : ''}</span></span><b>${money(m.mebleg)}</b>
    ${m.nov !== 'techizatci' ? `<button class="btn small" data-act="editMove" data-id="${esc(m.move_id)}" data-amt="${m.mebleg}">Düzəlt</button>` : ''}</div>`).join('')}</div>` : ''}
  ${k.baglanib ? '' : `
  <form class="card" data-form="cashMove">
    <h2>Xərc və ya təhvil</h2>
    <div class="seg" role="group" aria-label="Növ"><button type="button" data-movetype="xerc" class="on">Xərc</button><button type="button" data-movetype="tehvil">Təhvil</button></div>
    <input type="hidden" name="nov" value="xerc"><input type="hidden" name="date" value="${k.tarix}">
    <div class="grid2"><label class="field">Məbləğ (₼)<input name="mebleg" inputmode="decimal" required></label><label class="field" data-catwrap>Kateqoriya<input name="kateqoriya" list="dl-cat" placeholder="Axtar və ya yaz" autocomplete="off"></label></div>
    <datalist id="dl-cat">${opts(dictNames('xerc_kateqoriya'))}</datalist>
    <label class="field">Qeyd<input name="sebeb" placeholder="istəyə bağlı"></label>
    <button class="btn" type="submit">Əlavə et</button>
  </form>
  <form class="card" data-form="closeDay">
    <h2>Günü bağla · ${fmtDate(k.tarix)}</h2>
    <span class="muted">Kassanı fiziki sayın, xərcləri yazın, sonra faktiki nağd məbləği yazın. Bu məbləğ növbəti günün açılış qalığı olacaq.</span>
    <input type="hidden" name="date" value="${k.tarix}">
    <label class="field">Faktiki nağd (₼)<input name="faktiki" inputmode="decimal" required></label>
    <button class="btn primary big" type="submit">Kassanı bağla</button>
  </form>`}` : ''}`;
};

VIEWS.kassaHistory = async (p) => {
  const { key, range } = pickRange(p, 'ay');
  const days = await cget('kassaHistory', { from: range[0], to: range[1] });
  S.params.range = range;
  return `<h1>Kassa tarixçəsi</h1>
  ${presetSeg(key, 'kassaHistory')}
  <div class="card scroll">${days.length ? `<table>
    <tr><th>Tarix</th><th class="r">Açılış</th><th class="r">Nağd +</th><th class="r">Çıxış</th><th class="r">Olmalı</th><th class="r">Faktiki</th><th class="r">Fərq</th></tr>
    ${days.map(d => `<tr><td>${fmtDate(d.tarix)}${d.baglanib ? '' : '<br><span class="pill bad">açıq</span>'}</td><td class="r">${money(d.acilis)}</td><td class="r">${money(d.axin.nagd_daxil)}</td>
      <td class="r">${money(d.axin.xerc + d.axin.usta_odenisi + d.axin.tehvil + d.axin.techizatci)}</td><td class="r">${money(d.hesablanan)}</td>
      <td class="r">${d.baglanib ? `<button class="btn small" data-act="editDay" data-id="${esc(d.day_id)}" data-amt="${d.faktiki}">${money(d.faktiki)}</button>` : '—'}</td>
      <td class="r" style="color:${d.ferq < 0 ? 'var(--danger)' : 'inherit'}">${d.ferq === null ? '—' : money(d.ferq)}</td></tr>`).join('')}
  </table>` : '<div class="empty">Bu dövrdə hərəkət yoxdur.</div>'}</div>
  <span class="muted">Faktiki məbləğə toxunaraq düzəliş edin. Sonrakı günlər yenidən hesablanır.</span>`;
};

// ------------------------------------------------------------- Admin: Hesabat, Gəlir, Stok
VIEWS.report = async (p) => {
  const { key, range } = pickRange(p);
  const [r, b] = await Promise.all([cget('report', { from: range[0], to: range[1] }), loadBoot()]);
  const t = r.cem, pend = b.pending || { close: 0, stock: 0 };
  return `
  <div class="between"><div><div class="muted">${longToday()}</div><h1>Hesabat</h1></div></div>
  ${blockBanner(b)}
  ${pend.close || pend.stock ? `<div class="banner warn"><b>Yeni sorğular</b><span>${pend.close ? pend.close + ' kassa bağlama' : ''}${pend.close && pend.stock ? ' · ' : ''}${pend.stock ? pend.stock + ' alış' : ''}</span><button class="btn small" data-act="go" data-v="requests">Sorğulara bax</button></div>` : ''}
  ${presetSeg(key, 'home')}
  ${rangeForm(range[0], range[1], 'report')}
  <div class="card">
    <div class="between" style="align-items:flex-end"><div><div class="muted">Ümumi dövriyyə</div><div class="big">${money(t.umumi)}</div></div><span class="muted">${t.is_sayi} iş</span></div>
    <div class="grid3">
      <div class="stat"><span>Mal satışı</span><b>${money(t.mallar)}</b></div>
      <div class="stat"><span>Maya (FIFO)</span><b>${money(t.maya)}</b></div>
      <div class="stat"><span>Mal mənfəəti</span><b>${money(t.menfeet)}</b></div>
      <div class="stat"><span>Usta haqqı</span><b>${money(t.usta_haqqi)}</b></div>
      <div class="stat"><span>Təmir</span><b>${money(t.temir)}</b></div>
      <div class="stat"><span>Xərclər</span><b>${money(t.xerc)}</b></div>
      <div class="stat"><span>Nağd</span><b>${money(t.nagd)}</b></div>
      <div class="stat"><span>Kart</span><b>${money(t.kart)}</b></div>
      <div class="stat"><span>Borc</span><b style="color:${t.borc ? 'var(--danger)' : 'inherit'}">${money(t.borc)}</b></div>
    </div>
    <button class="btn small" data-act="go" data-v="income">Gəlir-xərc hesabatı</button>
  </div>
  <h2>Ustalar</h2>
  <div class="card scroll">${r.ustalar.length ? `<table><tr><th>Usta</th><th class="r">İş</th><th class="r">Usta haqqı</th><th class="r">Təmir</th><th class="r">Qazanc</th></tr>
    ${r.ustalar.map(u => `<tr><td>${esc(u.ad)}</td><td class="r">${u.is_sayi}</td><td class="r">${money(u.usta_haqqi)}</td><td class="r">${money(u.temir)}</td><td class="r"><b>${money(u.qazanc)}</b></td></tr>`).join('')}</table>` : '<div class="empty">Bu dövrdə iş yoxdur.</div>'}</div>
  ${r.mehsullar.length ? `<h2>Ən çox satılan</h2><div class="card scroll"><table><tr><th>Mal</th><th class="r">Miqdar</th><th class="r">Satış</th><th class="r">Mənfəət</th></tr>
    ${r.mehsullar.map(m => `<tr><td>${esc(m.ad)}</td><td class="r">${m.miqdar}</td><td class="r">${money(m.satis)}</td><td class="r">${money(m.menfeet)}</td></tr>`).join('')}</table></div>` : ''}
  ${r.az_qalan.length ? `<h2>Az qalan</h2><div class="list">${r.az_qalan.map(x => `<button class="item" data-act="buyFor" data-id="${esc(x.product_id)}"><span class="grow"><span>${esc(x.ad)}</span><span class="muted">Alış qeyd et</span></span><span class="pill bad">${x.qaliq} ${esc(x.vahid)}</span></button>`).join('')}</div>` : ''}`;
};

VIEWS.income = async (p) => {
  const { key, range } = pickRange(p, 'ay');
  const r = await cget('income', { from: range[0], to: range[1] });
  const rows = list => list.map(x => `<tr><td>${esc(x.ad)}</td><td class="r">${money(x.mebleg)}</td></tr>`).join('');
  return `<h1>Gəlir və xərc</h1>
  ${presetSeg(key, 'income')}
  ${rangeForm(range[0], range[1], 'income')}
  <div class="card"><div class="muted">Xalis gəlir · ${fmtDate(r.from)} – ${fmtDate(r.to)}</div><div class="big" style="color:${r.xalis < 0 ? 'var(--danger)' : 'var(--accent)'}">${money(r.xalis)}</div><span class="muted">${r.is_sayi} iş · ödənilməyən borc ${money(r.borc)}</span></div>
  <div class="card"><table><tr><th>Gəlir</th><th class="r">Məbləğ</th></tr>${rows(r.gelir)}<tr><td><b>Cəmi gəlir</b></td><td class="r"><b>${money(r.gelir_cem)}</b></td></tr></table></div>
  <div class="card"><table><tr><th>Xərc</th><th class="r">Məbləğ</th></tr>${rows(r.xerc)}<tr><td><b>Cəmi xərc</b></td><td class="r"><b>${money(r.xerc_cem)}</b></td></tr></table></div>
  <span class="muted">Təchizatçıya ödəniş xərc sayılmır: malın xərci "satılan malın mayası" sətrindədir.</span>`;
};

VIEWS.stock = async (p) => {
  const { key, range } = pickRange(p, 'ay');
  const r = await cget('stockReport', { from: range[0], to: range[1] });
  return `<h1>Stok hesabatı</h1>
  ${presetSeg(key, 'stock')}
  <div class="grid2"><div class="stat"><span>Stok mayası</span><b>${money(r.cem.maya)}</b></div><div class="stat"><span>Satış dəyəri</span><b>${money(r.cem.satis)}</b></div></div>
  <div class="list">${r.rows.map(x => `
    <div class="card" style="gap:8px">
      <div class="between"><b>${esc(x.ad)}</b><span class="pill ${x.az ? 'bad' : 'ok'}">${grp(x.qaliq, 2)} ${esc(x.vahid)}</span></div>
      <div class="grid2">
        <div class="stat"><span>Maya</span><b>${money(x.maya)}</b></div><div class="stat"><span>Satış dəyəri</span><b>${money(x.satis_deyeri)}</b></div>
        <div class="stat"><span>Gələn (dövr)</span><b>${grp(x.gelen, 2)}</b></div><div class="stat"><span>Satılan (dövr)</span><b>${grp(x.satilan, 2)}</b></div>
      </div>
      ${x.techizatcilar.length ? `<span class="muted">${x.techizatcilar.map(s => esc(s.ad) + ': ' + grp(s.qaliq, 2)).join(' · ')}</span>` : ''}
    </div>`).join('') || '<div class="empty">Mal yoxdur.</div>'}</div>`;
};

// ------------------------------------------------------------- Admin: Mallar və alış
VIEWS.products = async () => {
  const list = await cget('products');
  S.products = list;
  return `
  <div class="between"><h1>Mallar</h1><button class="btn small primary" data-act="newProduct">${ic('plus', 18)}Yeni</button></div>
  <button class="btn" data-act="newPurchase">${ic('plus', 18)}Alış qeyd et</button>
  <form class="search" role="search">${ic('search', 18)}<input data-prodfilter placeholder="Mal axtar" aria-label="Mal axtar"></form>
  <div class="list" data-prodlist>${prodItems(list)}</div>
  <div class="grid2"><button class="btn" data-act="go" data-v="stock">Stok hesabatı</button><button class="btn" data-act="purchaseList">Son alışlar</button></div>`;
};
const prodItems = list => list.length ? list.map(p => `
    <button class="item" data-act="editProduct" data-id="${esc(p.product_id)}">
      <span class="grow"><span>${esc(p.label)}${p.aktiv ? '' : ' (deaktiv)'}</span>
      <span class="muted">Tövsiyə ${money(p.tovsiye_qiymet)} · min ${money(p.min_qiymet)} · maya ${money(p.maya)}</span></span>
      <span class="pill ${p.qaliq <= stockLimit(p) ? 'bad' : ''}">${grp(p.qaliq, 2)} ${esc(p.vahid)}</span>
    </button>`).join('') : '<div class="empty">Mal yoxdur.</div>';

VIEWS.productForm = (p) => {
  const x = p.product || { nov: 'yag', vahid: 'qab', aktiv: true };
  const tara = ['1 L', '2 L', '4 L', '5 L', 'Boçka', 'Ədəd'];
  return `<h1>${x.product_id ? 'Malı düzəlt' : 'Yeni mal'}</h1>
  <form class="card" data-form="product">
    <input type="hidden" name="product_id" value="${esc(x.product_id || '')}">
    <label class="field">Növ<select name="nov">${[['yag', 'Yağ'], ['filtr', 'Filtr'], ['diger', 'Digər']].map(([k, l]) => `<option value="${k}" ${x.nov === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
    <div class="grid2">
      <label class="field">Marka<input name="marka" list="dl-ymarka" data-ybrand value="${esc(x.marka || '')}" placeholder="Axtar və ya yaz" required autocomplete="off"></label>
      <label class="field">Model<input name="model" list="dl-ymodel" value="${esc(x.model || '')}" placeholder="Axtar və ya yaz" autocomplete="off"></label>
    </div>
    <datalist id="dl-ymarka">${opts(dictNames('yag_marka'))}</datalist>
    <datalist id="dl-ymodel">${opts(dictChildren('yag_model', x.marka))}</datalist>
    <div class="grid2">
      <label class="field">Özlülük<input name="ozluluk" list="dl-oz" value="${esc(x.ozluluk || '')}" placeholder="5W-30" autocomplete="off"></label>
      <label class="field">Tara<select name="tara">${tara.map(t => `<option ${x.tara === t ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
    </div>
    <datalist id="dl-oz">${opts(dictNames('ozluluk'))}</datalist>
    <label class="field">Satış vahidi<select name="vahid">${[['qab', 'Qab / ədəd'], ['litr', 'Litr (boçka)']].map(([k, l]) => `<option value="${k}" ${x.vahid === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
    <div class="grid2">
      <label class="field">Tövsiyə qiymət (₼)<input name="tovsiye_qiymet" inputmode="decimal" value="${esc(x.tovsiye_qiymet ?? '')}" required></label>
      <label class="field">Minimum qiymət (₼)<input name="min_qiymet" inputmode="decimal" value="${esc(x.min_qiymet ?? '')}" required></label>
    </div>
    <label class="field">Az qalma həddi (boşdursa ${esc(S.settings.min_qaliq_standart || 2)})<input name="min_qaliq" inputmode="decimal" value="${esc(x.min_qaliq || '')}"></label>
    <label class="row" style="font-size:14px"><input type="checkbox" name="aktiv" ${x.aktiv ? 'checked' : ''} style="width:22px;min-height:22px">Aktiv (ustalar görür)</label>
    <span class="muted">Siyahıda olmayan marka, model və ya özlülük yazsanız, bazaya əlavə olunur.</span>
    <button class="btn primary big" type="submit">Yadda saxla</button>
  </form>
  ${x.product_id ? `<button class="btn" data-act="buyFor" data-id="${esc(x.product_id)}">Bu mal üçün alış qeyd et</button>` : ''}`;
};

VIEWS.purchaseForm = async (p) => {
  if (!S.products.length) S.products = await cget('products');
  const sups = await cget('suppliers');
  const cur = S.products.find(x => x.product_id === p.product_id);
  return `<h1>Alış qeyd et</h1>
  ${p.request_id ? `<div class="banner warn">Ustanın sorğusu üzrə alış</div>` : ''}
  <form class="card" data-form="purchase">
    <input type="hidden" name="request_id" value="${esc(p.request_id || '')}">
    <label class="field">Mal<input name="product" list="dl-pp" value="${esc(cur ? cur.label : '')}" placeholder="Axtar" required autocomplete="off"></label>
    <datalist id="dl-pp">${S.products.map(x => `<option value="${esc(x.label)}"></option>`).join('')}</datalist>
    <label class="field">Təchizatçı<input name="supplier_ad" list="dl-sup" placeholder="Axtar və ya yeni ad yaz" required autocomplete="off"></label>
    <datalist id="dl-sup">${opts(sups.filter(s => s.aktiv).map(s => s.ad))}</datalist>
    <div class="grid2">
      <label class="field">Miqdar (qab və ya litr)<input name="miqdar" inputmode="decimal" required></label>
      <label class="field">Vahid alış qiyməti (₼)<input name="vahid_alis_qiymeti" inputmode="decimal" required></label>
    </div>
    <label class="field">Tarix<input type="date" name="tarix" value="${today()}"></label>
    <label class="field">Qeyd<input name="qeyd"></label>
    <span class="muted">Yeni təchizatçı adı yazsanız, təchizatçı avtomatik yaranır.</span>
    <button class="btn primary big" type="submit">Yadda saxla</button>
  </form>`;
};

VIEWS.purchaseList = async () => {
  const list = await cget('purchases');
  return `<h1>Son alışlar</h1>
  <div class="card scroll">${list.length ? `<table><tr><th>Tarix</th><th>Mal</th><th class="r">Miqdar</th><th class="r">Qiymət</th><th class="r">Cəmi</th></tr>
  ${list.map(b => `<tr><td>${fmtDate(b.tarix)}</td><td>${esc(b.mehsul)}<br><span class="muted">${esc(b.techizatci)}</span></td><td class="r">${b.miqdar}</td><td class="r">${money(b.qiymet)}</td><td class="r">${money(b.cemi)}</td></tr>`).join('')}</table>` : '<div class="empty">Alış yoxdur.</div>'}</div>`;
};

// ------------------------------------------------------------- Admin: Təchizatçılar
VIEWS.suppliers = async () => {
  const list = await cget('suppliers');
  const total = list.reduce((s, x) => s + Math.max(x.borc, 0), 0);
  return `<div class="between"><h1>Təchizatçılar</h1><button class="btn small primary" data-act="newSupplier">${ic('plus', 18)}Yeni</button></div>
  <div class="card"><div class="muted">Ümumi borcum</div><div class="big">${money(total)}</div></div>
  <div class="list">${list.length ? list.map(s => `
    <button class="item" data-act="openSupplier" data-id="${esc(s.supplier_id)}">
      <span class="grow"><span>${esc(s.ad)}${s.aktiv ? '' : ' (deaktiv)'}</span><span class="muted">Satılıb ${money(s.satilan)} · ödənib ${money(s.odenilib)}</span></span>
      <b style="color:${s.borc > 0 ? 'var(--danger)' : 'var(--ok)'}">${s.borc >= 0 ? money(s.borc) : 'avans ' + money(-s.borc)}</b>
    </button>`).join('') : '<div class="empty">Təchizatçı yoxdur. Alış qeyd edəndə avtomatik yaranır.</div>'}</div>`;
};

VIEWS.supplierForm = (p) => {
  const s = p.supplier || { aktiv: true };
  return `<h1>${s.supplier_id ? 'Təchizatçını düzəlt' : 'Yeni təchizatçı'}</h1>
  <form class="card" data-form="supplier">
    <input type="hidden" name="supplier_id" value="${esc(s.supplier_id || '')}">
    <label class="field">Ad<input name="ad" value="${esc(s.ad || '')}" required autofocus></label>
    <label class="field">Telefon (WhatsApp üçün)<input name="telefon" type="tel" inputmode="tel" value="${esc(s.telefon || '')}"></label>
    <label class="field">Ünvan<input name="unvan" value="${esc(s.unvan || '')}"></label>
    <label class="field">Qeyd<input name="qeyd" value="${esc(s.qeyd || '')}"></label>
    <label class="row" style="font-size:14px"><input type="checkbox" name="aktiv" ${s.aktiv !== false ? 'checked' : ''} style="width:22px;min-height:22px">Aktiv</label>
    <button class="btn primary big" type="submit">Yadda saxla</button>
  </form>`;
};

VIEWS.supplierDetail = async (p) => {
  const d = await cget('supplierDetail', { supplier_id: p.supplier_id });
  S.params.detail = d;
  const b = d.balans, s = d.supplier;
  return `<div class="card">
    <div class="between"><h1 style="font-size:20px">${esc(s.ad)}</h1><button class="btn small" data-act="editSupplier">Düzəlt</button></div>
    <span class="muted">${esc([s.telefon, s.unvan].filter(Boolean).join(' · '))}</span>
    <div class="grid3">
      <div class="stat"><span>Satılıb (alış qiyməti)</span><b>${money(b.satilan)}</b></div>
      <div class="stat"><span>Ödənib</span><b>${money(b.odenilib)}</b></div>
      <div class="stat"><span>${b.borc >= 0 ? 'Borcum' : 'Avans'}</span><b style="color:${b.borc > 0 ? 'var(--danger)' : 'var(--ok)'}">${money(Math.abs(b.borc))}</b></div>
    </div>
    <button class="btn primary big" data-act="paySupplierForm">Ödə</button>
  </div>
  <h2>Mallar üzrə</h2>
  <div class="card scroll">${d.mallar.length ? `<table><tr><th>Mal</th><th class="r">Alınıb</th><th class="r">Satılıb</th><th class="r">Məbləğ</th><th class="r">Stok</th></tr>
    ${d.mallar.map(m => `<tr><td>${esc(m.ad)}</td><td class="r">${grp(m.alinan, 2)}</td><td class="r">${grp(m.satilan, 2)}</td><td class="r">${money(m.mebleg)}</td><td class="r">${grp(m.stok, 2)}</td></tr>`).join('')}</table>` : '<div class="empty">Bu təchizatçıdan alış yoxdur.</div>'}</div>
  <h2>Ödənişlər</h2>
  <div class="list">${d.odenisler.length ? d.odenisler.map(o => `
    <button class="item" data-act="openCheque" data-id="${esc(o.payment_id)}"><span class="grow"><span>Çek №${esc(o.cek)} · ${o.nov === 'bank' ? 'Bank' : 'Nağd'}</span><span class="muted">${fmtDate(o.tarix.slice(0, 10))} ${esc(o.tarix.slice(11))}${o.qeyd ? ' · ' + esc(o.qeyd) : ''}</span></span><b>${money(o.mebleg)}</b></button>`).join('') : '<div class="empty">Ödəniş yoxdur.</div>'}</div>
  ${d.satislar.length ? `<h2>Son satışlar</h2><div class="card scroll"><table><tr><th>Tarix</th><th>Mal</th><th class="r">Miqdar</th><th class="r">Məbləğ</th></tr>
    ${d.satislar.map(x => `<tr><td>${fmtDate(x.tarix)}</td><td>${esc(x.ad)}</td><td class="r">${grp(x.miqdar, 2)}</td><td class="r">${money(x.mebleg)}</td></tr>`).join('')}</table></div>` : ''}`;
};

VIEWS.supplierPay = (p) => `<h1>Təchizatçıya ödəniş</h1>
  <div class="card"><div class="muted">${esc(p.ad)} · ${p.borc >= 0 ? 'borcum' : 'avans'}</div><div class="big">${money(Math.abs(p.borc))}</div></div>
  <form class="card" data-form="supplierPay">
    <input type="hidden" name="supplier_id" value="${esc(p.supplier_id)}">
    <label class="field">Məbləğ (₼)<input name="mebleg" inputmode="decimal" value="${p.borc > 0 ? p.borc : ''}" required autofocus></label>
    <div class="seg" role="group" aria-label="Ödəniş növü"><button type="button" data-paynov="nagd" class="on">Nağd (kassadan)</button><button type="button" data-paynov="bank">Bank</button></div>
    <input type="hidden" name="nov" value="nagd">
    <label class="field">Qeyd<input name="qeyd"></label>
    <span class="muted">Nağd ödəniş kassadan azalır. Bank köçürməsi kassaya təsir etmir. Borcdan çox ödəniş avans kimi qalır.</span>
    <button class="btn primary big" type="submit">Ödə və çek yarat</button>
  </form>`;

function chequeHtml(c) {
  const s = c.settings, o = c.odenis, b = c.balans;
  return `<div class="doc" id="cheque">
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px">${logoFull(s.servis_adi, true)}<div class="muted">${esc([s.unvan, s.telefon].filter(Boolean).join(' · '))}</div></div>
    <b style="text-align:center">Ödəniş çeki №${esc(o.cek)}</b>
    <div class="line muted"><span>${fmtDate(o.tarix.slice(0, 10))} ${esc(o.tarix.slice(11))}</span><span>${o.nov === 'bank' ? 'Bank köçürməsi' : 'Nağd'}</span></div>
    <div class="line"><span>Təchizatçı</span><b>${esc(c.supplier.ad)}</b></div>
    ${c.supplier.telefon ? `<div class="line"><span>Telefon</span><span>${esc(c.supplier.telefon)}</span></div>` : ''}
    <div class="line" style="font-size:18px"><b>Bu ödəniş</b><b>${money(o.mebleg)}</b></div>
    <hr>
    <b>Mallar üzrə</b>
    <table><tr><th>Mal</th><th class="r">Satılıb</th><th class="r">Məbləğ</th><th class="r">Stok</th></tr>
    ${c.mallar.map(m => `<tr><td>${esc(m.ad)}</td><td class="r">${grp(m.satilan, 2)}</td><td class="r">${money(m.mebleg)}</td><td class="r">${grp(m.stok, 2)}</td></tr>`).join('')}</table>
    <hr>
    <div class="line"><span>Satılıb (alış qiyməti ilə)</span><span>${money(b.satilan)}</span></div>
    <div class="line"><span>Cəmi ödənilib</span><span>${money(b.odenilib)}</span></div>
    <div class="line" style="font-size:16px"><b>${b.borc >= 0 ? 'Qalan borc' : 'Avans'}</b><b>${money(Math.abs(b.borc))}</b></div>
    ${c.evvelki ? `<div class="line muted"><span>Əvvəlki ödəniş</span><span>${fmtDate(c.evvelki.tarix.slice(0, 10))} · ${money(c.evvelki.mebleg)}</span></div>` : ''}
  </div>`;
}
VIEWS.cheque = async (p) => {
  const c = p.data || await cget('supplierCheque', { payment_id: p.payment_id });
  S.params.data = c;
  return `${p.fresh ? '<span class="pill ok">Ödəniş qeyd olundu</span>' : ''}${chequeHtml(c)}
  <button class="btn primary big" data-act="shareCheque">${ic('share')}Çeki PDF kimi göndər</button>`;
};

// ------------------------------------------------------------- Admin: Sorğular, borclar, Daha
VIEWS.requests = async () => {
  const r = await cget('requests');
  return `<h1>Sorğular</h1>
  <h2>Alış sorğuları</h2>
  <div class="list">${r.stock.length ? r.stock.map(x => `
    <button class="item" data-act="buyFromReq" data-id="${esc(x.product_id)}" data-req="${esc(x.request_id)}"><span class="grow"><span>${esc(x.ad)}</span><span class="muted">${esc(x.usta)} · ${esc(x.saat)} · Alış qeyd et</span></span><span class="pill bad">${grp(x.qaliq, 2)} ${esc(x.vahid)}</span></button>`).join('') : '<div class="empty">Yeni alış sorğusu yoxdur.</div>'}</div>
  <h2>Kassa bağlama sorğuları</h2>
  <div class="list">${r.close.length ? r.close.map(x => `<button class="item" data-tab="kassa"><span class="grow"><span>${esc(x.usta)}</span><span class="muted">${fmtDate(x.tarix)} · ${esc(x.saat)}</span></span><span class="pill">Kassaya keç</span></button>`).join('') : '<div class="empty">Yeni sorğu yoxdur.</div>'}</div>`;
};

VIEWS.ustaDebts = async () => {
  const list = await cget('ustaDebts');
  return `<h1>Ustaların ödənilməyən borcları</h1>
  <div class="list">${list.length ? list.map(u => `<button class="item" data-act="ustaDebtList" data-id="${esc(u.user_id)}" data-name="${esc(u.ad)}"><span class="grow"><span>${esc(u.ad)}</span><span class="muted">${u.is_sayi} iş</span></span><b style="color:var(--danger)">${money(u.borc)}</b></button>`).join('') : '<div class="empty">Ödənilməyən borc yoxdur.</div>'}</div>`;
};

VIEWS.more = async () => {
  const b = S.boot || await loadBoot();
  const pend = b.pending || { close: 0, stock: 0 };
  const item = (v, i, t, sub, badge) => `<button class="item" data-act="go" data-v="${v}">${ic(i)}<span class="grow"><span>${t}${badge ? `<span class="badge">${badge}</span>` : ''}</span><span class="muted">${sub}</span></span></button>`;
  return `<div><div class="muted">${esc(S.user.telefon)}</div><h1>${esc(S.user.ad)}</h1></div>
  <div class="list">
    ${item('requests', 'inbox', 'Sorğular', 'Alış və kassa bağlama', pend.close + pend.stock)}
    ${item('income', 'coins', 'Gəlir və xərc', 'Gəlir-xərc hesabatı')}
    ${item('stock', 'box', 'Stok', 'Qalıq, maya, satış dəyəri')}
    ${item('suppliers', 'truck', 'Təchizatçılar', 'Borc, ödəniş, çek')}
    ${item('ustaDebts', 'wallet', 'Usta borcları', 'Ödənilməyən işlər')}
    ${item('users', 'user', 'İstifadəçilər', 'Usta, usta haqqı, kassa icazəsi')}
    ${item('cars', 'car', 'Maşınlar', 'Axtarış və tarixçə')}
    ${item('settings', 'gear', 'Parametrlər', 'Servis, qəbz, interval, xatırlatma')}
  </div>
  <button class="btn" data-act="toChangePin">PIN-i dəyiş</button>
  <button class="btn danger" data-act="logout">Çıxış</button>`;
};

VIEWS.users = async () => {
  const list = await cget('users');
  return `<div class="between"><h1>İstifadəçilər</h1><button class="btn small primary" data-act="newUser">${ic('plus', 18)}Yeni</button></div>
  <div class="list">${list.map(u => `
    <button class="item" data-act="editUser" data-json="${esc(JSON.stringify(u))}">
      <span class="grow"><span>${esc(u.ad)}${u.aktiv ? '' : ' (deaktiv)'}</span><span class="muted">${esc(u.telefon)} · ${u.rol === 'admin' ? 'Admin' : 'Usta · usta haqqı ' + money(u.usta_haqqi)}${u.rol !== 'admin' && u.kassa ? ' · kassa' : ''}</span></span>
    </button>`).join('')}</div>`;
};

VIEWS.userForm = (p) => {
  const u = p.user || { rol: 'usta', aktiv: true, kassa: false };
  return `<h1>${u.id ? 'İstifadəçini düzəlt' : 'Yeni istifadəçi'}</h1>
  <form class="card" data-form="user">
    <input type="hidden" name="id" value="${esc(u.id || '')}">
    <label class="field">Ad, soyad<input name="ad" value="${esc(u.ad || '')}" required autofocus></label>
    <label class="field">Telefon (giriş üçün)<input name="telefon" type="tel" inputmode="tel" value="${esc(u.telefon || '')}" required></label>
    <label class="field">Rol<select name="rol"><option value="usta" ${u.rol !== 'admin' ? 'selected' : ''}>Usta</option><option value="admin" ${u.rol === 'admin' ? 'selected' : ''}>Admin</option></select></label>
    <label class="field">Yağ dəyişmənin usta haqqı (₼)<input name="usta_haqqi" inputmode="decimal" value="${esc(u.usta_haqqi || '')}" placeholder="məs. 15"></label>
    <label class="row" style="font-size:14px"><input type="checkbox" name="kassa" ${u.kassa ? 'checked' : ''} style="width:22px;min-height:22px">Kassanı görə bilər (yalnız bu gün)</label>
    <label class="row" style="font-size:14px"><input type="checkbox" name="aktiv" ${u.aktiv ? 'checked' : ''} style="width:22px;min-height:22px">Aktiv</label>
    <button class="btn primary big" type="submit">Yadda saxla</button>
  </form>
  ${u.id ? `<button class="btn" data-act="resetPin" data-id="${esc(u.id)}">Yeni PIN ver</button>` : '<span class="muted">Yadda saxladıqdan sonra ilk PIN ekranda göstəriləcək.</span>'}`;
};

VIEWS.settings = () => {
  const s = S.settings;
  return `<h1>Parametrlər</h1>
  <form class="card" data-form="settings">
    <label class="field">Servis adı<input name="servis_adi" value="${esc(s.servis_adi || '')}"></label>
    <label class="field">Ünvan<input name="unvan" value="${esc(s.unvan || '')}"></label>
    <label class="field">Telefon<input name="telefon" value="${esc(s.telefon || '')}"></label>
    <label class="field">Qəbzin alt qeydi<input name="alt_qeyd" value="${esc(s.alt_qeyd || '')}"></label>
    <div class="grid2">
      <label class="field">Yağ dəyişmə intervalı (km)<input name="interval_km" inputmode="numeric" value="${esc(s.interval_km || '10000')}"></label>
      <label class="field">İnterval (ay)<input name="interval_ay" inputmode="numeric" value="${esc(s.interval_ay || '6')}"></label>
    </div>
    <label class="field">Standart az qalma həddi<input name="min_qaliq_standart" inputmode="decimal" value="${esc(s.min_qaliq_standart || '2')}"></label>
    <label class="field">Xatırlatma mətni<textarea name="xatirlatma_metni">${esc(s.xatirlatma_metni || '')}</textarea></label>
    <span class="muted">Mətndə istifadə edin: {musteri}, {masin}, {nomre}, {servis}, {telefon}</span>
    <button class="btn primary big" type="submit">Yadda saxla</button>
  </form>`;
};

VIEWS.pinShow = (p) => `
  <h1>PIN</h1>
  <div class="card"><span class="muted">${esc(p.ad)} üçün PIN:</span><div class="big" style="letter-spacing:6px">${esc(p.pin)}</div>
  <span class="muted">Bu PIN yalnız indi görünür. İstifadəçiyə verin — ilk girişdə öz PIN-ini təyin edəcək.</span></div>
  <button class="btn primary big" data-act="pinDone">Hazırdır</button>`;

// ------------------------------------------------------------- Hadisələr: formalar
const formData = f => Object.fromEntries(new FormData(f).entries());
$app.addEventListener('submit', e => {
  const f = e.target, type = f.dataset.form;
  e.preventDefault();
  if (!type) return;
  const d = formData(f);
  run(async () => {
    switch (type) {
      case 'login': {
        const r = await api('login', { phone: d.phone, pin: d.pin });
        S.token = r.token; S.user = r.user; localStorage.setItem('token', r.token);
        if (r.mustChange) return go('changePin', {}, false);
        await loadBoot(true); setTimeout(warm, 1500); S.history = []; return go('home', {}, false);
      }
      case 'changePin': {
        if (d.newPin !== d.newPin2) throw new Error('Yeni PIN-lər eyni deyil');
        await api('changePin', { oldPin: d.oldPin, newPin: d.newPin });
        toast('PIN dəyişdirildi', true); await loadBoot(true); S.history = []; return go('home', {}, false);
      }
      case 'carSearch': return go('cars', { q: d.q, pick: f.dataset.pick === '1' }, S.view !== 'cars');
      case 'car': {
        d.ferqli_nomre = !!f.ferqli_nomre.checked;
        const car = await api('saveCar', { car: d });
        S.cars = (S.cars || []).filter(c => c.car_id !== car.car_id).concat([car]);
        loadBoot(true).catch(() => {});
        if (f.dataset.pick === '1') return pickCarObj(car);
        S.history.pop(); return go('carHistory', { car_id: car.car_id }, false);
      }
      case 'payJob': {
        const r = await api('payJob', { job_id: S.params.job_id, nagd: d.nagd, kart: d.kart });
        toast('Ödəniş qəbul edildi', true); S.history.pop(); return go('receipt', { data: r }, false);
      }
      case 'cashMove': {
        await api('addCashMove', { nov: d.nov, mebleg: d.mebleg, sebeb: d.sebeb, kateqoriya: d.nov === 'xerc' ? d.kateqoriya : '', date: d.date });
        toast('Əlavə olundu', true); return render();
      }
      case 'closeDay': {
        if (!confirm(`${fmtDate(d.date)} · faktiki nağd: ${money(d.faktiki)}. Kassanı bağlayaq?`)) return;
        const k = await api('closeDay', { faktiki: d.faktiki, date: d.date });
        toast('Gün bağlandı', true); await loadBoot(true); MEM[swrKey('kassaToday', {})] = k; persist(); return render();
      }
      case 'range': return go(f.dataset.view, { from: d.from, to: d.to, preset: 'x' }, false);
      case 'product': {
        d.aktiv = !!f.aktiv.checked;
        await api('saveProduct', { product: d }); toast('Yadda saxlanıldı', true); loadBoot(true).catch(() => {}); return back();
      }
      case 'purchase': {
        const prod = S.products.find(x => x.label === d.product);
        if (!prod) throw new Error('Malı siyahıdan seçin');
        await api('savePurchase', { purchase: { ...d, product_id: prod.product_id } }); toast('Alış qeyd olundu', true); loadBoot(true).catch(() => {}); return back();
      }
      case 'supplier': {
        d.aktiv = !!f.aktiv.checked;
        await api('saveSupplier', { supplier: d }); toast('Yadda saxlanıldı', true); return back();
      }
      case 'supplierPay': {
        if (!confirm(`${money(d.mebleg)} ${d.nov === 'bank' ? 'bank ilə' : 'kassadan nağd'} ödənilsin?`)) return;
        const c = await api('paySupplier', d);
        S.history.pop(); return go('cheque', { data: c, fresh: true }, false);
      }
      case 'user': {
        const u = { ...d, kassa: !!f.kassa.checked, aktiv: !!f.aktiv.checked };
        const r = await api('saveUser', { user: u });
        if (r.pin) return go('pinShow', { pin: r.pin, ad: u.ad }, false);
        toast('Yadda saxlanıldı', true); return back();
      }
      case 'settings': S.settings = await api('saveSettings', { settings: d }); toast('Yadda saxlanıldı', true); return back();
    }
  });
});

function pickCarObj(car) {
  const d = jobDraft(); d.car = car; d.kmTouched = false;
  S.history = S.history.filter(h => h.view !== 'cars' && h.view !== 'carForm');
  const last = S.history[S.history.length - 1];
  if (last && last.view === 'job') S.history.pop();
  go('job', {}, false);
}

// ------------------------------------------------------------- Hadisələr: kliklər
$app.addEventListener('click', e => {
  const t = e.target.closest('[data-act],[data-tab],[data-fill],[data-preset],[data-movetype],[data-paynov],[data-payfill]');
  if (!t) return;
  if (t.dataset.tab) return tab(t.dataset.tab);
  if (t.dataset.fill) {
    const d = jobDraft(), c = jobCalc(d);
    if (t.dataset.fill === 'nagd') { d.nagd = String(c.umumi); d.kart = ''; }
    else if (t.dataset.fill === 'kart') { d.kart = String(c.umumi); d.nagd = ''; }
    else { d.nagd = ''; d.kart = ''; }
    S.editing = false; return render();
  }
  if (t.dataset.payfill) { const f = t.form || t.closest('form'); f.nagd.value = t.dataset.payfill === 'nagd' ? S.params.borc : ''; f.kart.value = t.dataset.payfill === 'kart' ? S.params.borc : ''; return; }
  if (t.dataset.preset) return go(t.dataset.view === 'home' && isAdmin() ? 'report' : t.dataset.view, { preset: t.dataset.preset }, false);
  if (t.dataset.movetype || t.dataset.paynov) {
    t.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === t));
    const f = t.closest('form'); f.nov.value = t.dataset.movetype || t.dataset.paynov;
    const cw = f.querySelector('[data-catwrap]'); if (cw) cw.style.display = f.nov.value === 'xerc' ? '' : 'none';
    return;
  }
  const a = t.dataset.act, id = t.dataset.id;
  run(async () => {
    switch (a) {
      case 'retry': return render();
      case 'back': if (S.history.length) history.back(); else goBack(); return;
      case 'home': S.draft = null; S.history = []; return go('home', {}, false);
      case 'go': return go(t.dataset.v);
      case 'logout': if (!confirm('Çıxış edilsin? Növbəti dəfə PIN soruşulacaq.')) return; return logout(true);
      case 'toChangePin': return go('changePin');
      case 'pinDone': S.history = S.history.filter(h => h.view !== 'userForm'); return go('users', {}, false);
      case 'newJob': S.draft = null; jobDraft(); return go('cars', { pick: true });
      case 'jobForCar': S.draft = null; jobDraft().car = S.params.car; return go('job');
      case 'changeCar': return go('cars', { pick: true });
      case 'openCar': return go('carHistory', { car_id: id });
      case 'pickCar': { let car = (S.cars || []).find(c => c.car_id === id); if (!car) car = (await api('carHistory', { car_id: id })).car; return pickCarObj(car); }
      case 'newCar': { const q = $app.querySelector('[data-form="carSearch"] input'); return go('carForm', { pick: t.dataset.pick === '1', q: q ? q.value : '' }); }
      case 'editCar': return go('carForm', { car: S.params.car });
      case 'remind': return sendReminder();
      case 'addRepair': jobDraft().items.push({ nov: 'temir', ad: '', qiymet: '' }); S.editing = false; return render();
      case 'delItem': jobDraft().items.splice(+t.dataset.ix, 1); S.editing = false; return render();
      case 'saveJob': return saveJob();
      case 'stockReq': { const r = await api('stockRequest', { product_id: id }); toast(r.already ? 'Bu mal üçün sorğu artıq göndərilib' : 'Alış sorğusu Admin-ə göndərildi', true); t.disabled = true; return; }
      case 'requestClose': await api('requestClose'); toast('Sorğu Admin-ə göndərildi', true); await loadBoot(true); return render();
      case 'myDebts': return go('debtList', {});
      case 'ustaDebtList': return go('debtList', { user_id: id, ad: t.dataset.name });
      case 'payDebt': return go('payForm', { job_id: id, borc: S.params.data.job.borc });
      case 'openReceipt': return go('receipt', { job_id: id });
      case 'sharePdf': {
        const r = S.params.data, el = $app.querySelector('#rcpt');
        const file = await pdfFrom(el, `Qebz-${r.job.qebz}-${String(r.car.nomre || '').replace(/[^A-Za-z0-9]/g, '')}.pdf`, `Qəbz №${r.job.qebz}`);
        return shareFile(file, `${r.settings.servis_adi} · Qəbz №${r.job.qebz} · ${money(r.job.umumi)}`);
      }
      case 'whatsapp': { const r = S.params.data; window.open(`https://wa.me/${waPhone(r.car.telefon)}?text=${encodeURIComponent(receiptText(r))}`, '_blank'); return; }
      case 'cancelJob': {
        const why = prompt('İşi ləğv etmək səbəbi:'); if (why === null) return;
        await api('cancelJob', { job_id: S.params.data.job.job_id, sebeb: why }); toast('İş ləğv edildi', true); S.history = []; return go('home', {}, false);
      }
      case 'kassaHistory': return go('kassaHistory');
      case 'payUsta': {
        const v = prompt(`${t.dataset.name} ustaya ödənən nağd məbləğ (₼):`, t.dataset.amt); if (v === null) return;
        const k = MEM[swrKey('kassaToday', {})];
        await api('addCashMove', { nov: 'usta_odenisi', mebleg: v, alan_user_id: id, sebeb: 'Usta haqqı + təmir', date: k ? k.tarix : undefined }); toast('Ödəniş qeyd olundu', true); return render();
      }
      case 'editMove': {
        const v = prompt('Yeni məbləğ (₼):', t.dataset.amt); if (v === null) return;
        const why = prompt('Düzəlişin səbəbi:'); if (!why) return;
        await api('editCashMove', { move_id: id, mebleg: v, sebeb: why }); toast('Düzəldildi', true); return render();
      }
      case 'editDay': {
        const v = prompt('Faktiki nağd məbləğ (₼):', t.dataset.amt); if (v === null) return;
        const why = prompt('Düzəlişin səbəbi:'); if (!why) return;
        const [from, to] = S.params.range;
        await api('editCashDay', { day_id: id, faktiki: v, sebeb: why, from, to }); toast('Düzəldildi, sonrakı günlər yenidən hesablandı', true); return render();
      }
      case 'newProduct': return go('productForm', {});
      case 'editProduct': return go('productForm', { product: S.products.find(p => p.product_id === id) });
      case 'newPurchase': return go('purchaseForm', {});
      case 'buyFor': return go('purchaseForm', { product_id: id });
      case 'buyFromReq': return go('purchaseForm', { product_id: id, request_id: t.dataset.req });
      case 'purchaseList': return go('purchaseList');
      case 'newSupplier': return go('supplierForm', {});
      case 'openSupplier': return go('supplierDetail', { supplier_id: id });
      case 'editSupplier': return go('supplierForm', { supplier: S.params.detail.supplier });
      case 'paySupplierForm': { const d = S.params.detail; return go('supplierPay', { supplier_id: d.supplier.supplier_id, ad: d.supplier.ad, borc: d.balans.borc }); }
      case 'openCheque': return go('cheque', { payment_id: id });
      case 'shareCheque': {
        const c = S.params.data;
        const file = await pdfFrom($app.querySelector('#cheque'), `Cek-${c.odenis.cek}.pdf`, `Çek №${c.odenis.cek}`);
        return shareFile(file, `${c.settings.servis_adi} · Ödəniş çeki №${c.odenis.cek} · ${money(c.odenis.mebleg)}`, c.supplier.telefon || '');
      }
      case 'newUser': return go('userForm', {});
      case 'editUser': return go('userForm', { user: JSON.parse(t.dataset.json) });
      case 'resetPin': { if (!confirm('Yeni PIN verilsin? Köhnə PIN və bütün girişlər bağlanacaq.')) return; const r = await api('resetPin', { id }); return go('pinShow', { pin: r.pin, ad: '' }, false); }
    }
  });
});

// ------------------------------------------------------------- Hadisələr: yazma
$app.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.plate === '1') { const pos = el.value.length; el.value = plateFmt(el.value); return; }
  if (el.dataset.prodsearch !== undefined) {
    // Siyahıdan seçiləndə mal dərhal əlavə olunur
    const p = S.products.find(x => x.label === el.value.trim());
    if (!p) return;
    if (p.qaliq <= 0) { el.value = ''; return toast(`${p.label}: anbarda qalmayıb`); }
    const d = jobDraft();
    const ex = d.items.find(i => i.nov === 'mal' && i.product_id === p.product_id);
    if (ex) ex.miqdar = String(num(ex.miqdar) + 1);
    else d.items.push({ nov: 'mal', product_id: p.product_id, ad: p.label, miqdar: p.vahid === 'litr' ? '4' : '1', qiymet: String(p.tovsiye_qiymet) });
    S.editing = false; return render();
  }
  if (el.dataset.prodfilter !== undefined) { const q = el.value.toLowerCase(); const box = $app.querySelector('[data-prodlist]'); if (box) box.innerHTML = prodItems(S.products.filter(p => p.label.toLowerCase().includes(q))); return; }
  if (S.view === 'cars' && el.closest('[data-form="carSearch"]')) {
    const pick = S.params.pick, list = filterCars(S.cars || [], el.value);
    const box = $app.querySelector('.list');
    if (box) box.innerHTML = list.length ? list.map(c => carRow(c, carSub(c), '', pick ? 'pickCar' : 'openCar')).join('') : '<div class="empty">Tapılmadı. "Yeni" ilə əlavə edin.</div>';
    S.params.q = el.value; return;
  }
  if (S.view === 'payForm') {
    const f = el.form, sum = num(f.nagd.value) + num(f.kart.value);
    const er = $app.querySelector('[data-err="pay"]'); if (er) er.textContent = sum - num(S.params.borc) > 0.009 ? `Məbləğ borcdan (${money(S.params.borc)}) çox ola bilməz` : '';
    f.querySelector('[type=submit]').disabled = sum - num(S.params.borc) > 0.009;
    return;
  }
  if (S.view !== 'job') return;
  S.editing = true;
  const d = jobDraft();
  if (el.dataset.bind) {
    d[el.dataset.bind] = el.value;
    if (el.dataset.bind === 'novbeti_km') d.kmTouched = true;
    if (el.dataset.bind === 'km' && !d.kmTouched) {
      const t = jobCalc(d), nk = $app.querySelector('[data-bind="novbeti_km"]');
      d.novbeti_km = d.km && t.hasOil ? String(num(d.km) + (num(S.settings.interval_km) || 10000)) : '';
      if (nk) nk.value = d.novbeti_km;
      const er = $app.querySelector('[data-err="km"]'); if (er) er.textContent = d.km && d.car && d.car.son_km && num(d.km) < num(d.car.son_km) ? `Km əvvəlkindən (${kmf(d.car.son_km)}) azdır — yoxlayın` : '';
    }
    refreshJob();
  }
  if (el.dataset.item !== undefined) {
    const it = d.items[+el.dataset.item]; it[el.dataset.f] = el.value;
    if (it.nov === 'temir' && el.dataset.f === 'ad') {
      const known = (S.dict.temir || []).find(x => typeof x !== 'string' && x.ad.toLowerCase() === el.value.trim().toLowerCase());
      if (known && !it.qiymet) { it.qiymet = String(known.qiymet || ''); const pi = $app.querySelector(`[data-item="${el.dataset.item}"][data-f="qiymet"]`); if (pi) pi.value = it.qiymet; }
    }
    if (it.nov === 'mal') {
      const p = S.products.find(x => x.product_id === it.product_id) || {};
      const h = $app.querySelector(`[data-hint="${el.dataset.item}"]`);
      if (h) h.innerHTML = `Tövsiyə ${money(p.tovsiye_qiymet)} · minimum ${money(p.min_qiymet)}${num(it.qiymet) < num(p.min_qiymet) ? ' — <b style="color:var(--danger)">minimumdan aşağı satmaq olmaz</b>' : ''}`;
    }
    refreshJob();
  }
});

$app.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.autosubmit !== undefined && el.form) { el.form.requestSubmit(); return; }
  if (el.dataset.stamp !== undefined) { S.params.stamp = el.checked; return render(); }
  if (el.dataset.ferqli !== undefined) { const pl = el.form.nomre; pl.dataset.plate = el.checked ? '' : '1'; if (!el.checked) pl.value = plateFmt(pl.value); return; }
  if (el.dataset.brand !== undefined) { const dl = document.getElementById('dl-model'); if (dl) dl.innerHTML = opts(dictChildren('masin_model', el.value)); return; }
  if (el.dataset.ybrand !== undefined) { const dl = document.getElementById('dl-ymodel'); if (dl) dl.innerHTML = opts(dictChildren('yag_model', el.value)); return; }
  if (el.dataset.prodsearch !== undefined) { if (el.value.trim() && !S.products.find(x => x.label === el.value.trim())) toast('Malı siyahıdan seçin'); return; }
  if (S.view === 'job' && (el.dataset.f === 'miqdar' || el.dataset.bind === 'km')) { S.editing = false; render(); }
});

async function saveJob() {
  const d = jobDraft();
  if (!d.car) throw new Error('Maşın seçin');
  if (!num(d.km)) throw new Error('Km yazın');
  const t = jobCalc(d);
  if (t.over) throw new Error(`Nağd + kart cəmdən (${money(t.umumi)}) çox ola bilməz`);
  for (const it of d.items) {
    if (it.nov === 'mal') {
      const p = S.products.find(x => x.product_id === it.product_id) || {};
      if (num(it.qiymet) < num(p.min_qiymet)) throw new Error(`${p.label}: qiymət minimumdan (${money(p.min_qiymet)}) aşağı ola bilməz`);
      if (num(it.miqdar) > num(p.qaliq)) throw new Error(`${p.label}: anbarda yalnız ${p.qaliq} ${p.vahid} var`);
    }
    if (it.nov === 'temir' && !String(it.ad).trim()) throw new Error('Təmir işinin adını yazın');
  }
  if (t.borc > 0 && !confirm(`${money(t.borc)} ödənilmir və borc kimi qalacaq. Davam edək?`)) return;
  const job = { car_id: d.car.car_id, km: d.km, nagd: d.nagd, kart: d.kart, novbeti_km: d.novbeti_km, novbeti_ay: d.novbeti_ay, qeyd: d.qeyd,
    items: d.items.map(i => ({ nov: i.nov, product_id: i.product_id, ad: i.ad, miqdar: i.miqdar, qiymet: i.qiymet })) };
  const r = await api('saveJob', { job });
  S.draft = null; S.history = [];
  loadBoot(true).catch(() => {});
  go('receipt', { data: r, fresh: true }, false);
}

// ------------------------------------------------------------- Start
function warm() {
  if (!S.user) return;
  if (S.user.kassa || isAdmin()) prefetch('kassaToday');
  const [f, t] = periods().gun;
  if (isAdmin()) { prefetch('products'); prefetch('report', { from: f, to: t }); prefetch('suppliers'); }
  else prefetch('myStats', { from: f, to: t });
  // PDF kitabxanalarını boş vaxtda əvvəlcədən yüklə (ilk qəbz tez çıxsın)
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 3000));
  idle(() => loadPdfLibs().catch(() => {}));
}
(async function start() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (!S.token) { S.view = 'login'; return render(); }
  try { await loadBoot(); S.view = 'home'; render(); warm(); }
  catch (e) { render(); }
})();
