const CACHE='little-steps-v1.0.0';
const ROOT=new URL('./',self.location).href;
const CORE=['./','./index.html','./style.css','./bank.js','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png',...['office','cafe','warehouse','park','meeting','bicycle'].map(n=>`./images/${n}.jpg`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('little-steps-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(ROOT))return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match(new URL('./index.html',ROOT))));return;}event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
