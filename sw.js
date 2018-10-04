let cacheName = 'v1';
let cacheList = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/mediaQindex.css',
    '/css/mediaQrestaurant.css',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/js/main.js',
    '/js/dbhelper.js'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(cacheList);
        })
    );
    console.log("ServiceWorker has been installed!");
});

self.addEventListener('fetch', function(f) {
    f.respondWith(
        caches.match(f.request)
        .then(function(response) {
            if (response) {
                //console.log('Found cached response.');
                return response;
            }

            let fetchRequest = f.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    if (!response) {
                        return response;
                    }

                    let responseToCache = response.clone();

                    caches.open(cacheName)
                        .then(function(cache) {
                            cache.put(f.request, responseToCache);
                            //console.log('Cached fetched response.');
                        });

                    return response;
                }
            );
        })
    );

});

self.addEventListener('activate', function(a) {
    console.log("ServiceWorker activated!");
});