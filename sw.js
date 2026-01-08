const CACHE_NAME = 'chinese-stories-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

// ইনস্টল ইভেন্ট
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// ফেচ ইভেন্ট (অফলাইনে চালানোর জন্য)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // যদি ক্যাশে পাওয়া যায়, তবে তা রিটার্ন কর, নাহলে নেটওয়ার্ক থেকে নাও
                return response || fetch(event.request);
            })
    );
});
