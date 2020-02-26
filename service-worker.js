const filesToCache = [
  '/',
  'index.html',

  'resources/css/style.min.css',

  'resources/js/script.js',
  'resources/js/params.inc.js',
  'resources/js/data.js',

  'resources/node_modules/fullpage.js/dist/fullpage.min.css',
  'resources/node_modules/fullpage.js/dist/fullpage.min.js',
  'resources/node_modules/fullpage.js/vendors/scrolloverflow.min.js',

  'resources/img/favicon.png',

  'resources/node_modules/bc-font/dist/bc-font.css',
  'resources/node_modules/bc-font/dist/bc-font.ttf',
  'resources/node_modules/bc-font/dist/bc-font.woff',

  'resources/node_modules/@fortawesome/fontawesome-pro/css/solid.min.css',
  'resources/node_modules/@fortawesome/fontawesome-pro/css/fontawesome.min.css',
  
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
