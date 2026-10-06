// Sadə service worker: ekran fayllarını keşləyir, API sorğularına toxunmur.
const CACHE = 'aqqa-v18';
const FILES = ['./', './index.html', './i18n.js', './app.js', './config.js', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
const EXTRA = ['./lib/html2canvas.min.js', './lib/jspdf.umd.min.js']; // olmasa da quraşdırma dayanmır

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).then(() => Promise.all(EXTRA.map(f => c.add(f).catch(() => {}))))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Şəbəkə birinci: yeni versiya dərhal gəlir, internet yoxdursa keşdən açılır.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(res => {
      // Yalnız uğurlu cavabı keşə yaz (404 və xəta səhifəsi keşə düşməsin)
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
