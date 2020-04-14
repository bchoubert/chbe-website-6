const filesToCache = [
  '/',
  'index.html',

  'resources/css/style.min.css',

  'resources/js/script.js',
  'resources/js/params.inc.js',
  'resources/js/data.js',

  'resources/img/favicon.png',

  'resources/js/custom-font/dist/chbe-font.css',
  'resources/js/custom-font/dist/chbe-font.ttf',
  'resources/js/custom-font/dist/chbe-font.woff',

  'resources/node_modules/parallax-js/dist/parallax.min.js',
  'resources/node_modules/aos/dist/aos.js',
  
  'manifest.json'
];
const cacheName = 'CHBE-2';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
