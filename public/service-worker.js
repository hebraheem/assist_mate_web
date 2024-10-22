const CACHE_NAME = 'version-1';
const urlsToCache = [
    'index.html',
    'offline.html',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Listen for messages from the main application
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fetch events
self.addEventListener('fetch', (event) => {
    // skip firebase caches to prevent infinite loading
    // NOTE: Firebase handle caching by default 
    const isFirebaseRequest = event.request.url.includes('firestore.googleapis.com')|| event.request.url.includes('firebasestorage.googleapis.com');
    if(!isFirebaseRequest)
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request).catch(() => {
                    return caches.match('offline.html'); // Fallback to offline page
                });
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// For push notifications
self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/logo192.png',
    });
});
