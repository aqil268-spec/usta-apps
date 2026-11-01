// Sadə service worker: ekran fayllarını keşləyir, API sorğularına toxunmur.
const CACHE = 'aqqa-v28';
const FILES = ['./', './index.html', './i18n.js', './app.js', './config.js', './manifest.json', './icons/icon-192.png', './icons/icon-512.png', './icons/badge-72.png'];
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

// Bildiriş (Firebase Cloud Messaging, "data" mesajı). Bildirişi özümüz göstəririk: AQQA ikonu ilə.
// Tətbiq açıqdırsa, ona da xəbər veririk (siyahılar yenilənsin).
self.addEventListener('push', e => {
  let d = {};
  try { const j = e.data ? e.data.json() : {}; d = j.data || j.notification || j || {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  const title = String(d.title || 'AQQA Servis').slice(0, 80);
  const opts = { body: String(d.body || '').slice(0, 240), icon: './icons/icon-192.png', badge: './icons/badge-72.png', data: { link: String(d.link || '') }, lang: 'az' };
  if (d.tag) { opts.tag = String(d.tag); opts.renotify = true; }
  e.waitUntil(self.registration.showNotification(title, opts).then(() =>
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.forEach(c => c.postMessage({ type: 'push', link: opts.data.link })))));
});

// Bildirişə basanda: tətbiq açıqdırsa ona keçir, yoxdursa açır və uyğun səhifəyə gedir
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const link = (e.notification.data && e.notification.data.link) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    const c = cs.find(x => new URL(x.url).origin === self.location.origin);
    if (c) { c.postMessage({ type: 'go', link }); return c.focus(); }
    return self.clients.openWindow('./' + (link ? '?go=' + encodeURIComponent(link) : ''));
  }));
});
