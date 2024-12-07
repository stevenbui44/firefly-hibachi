const STATIC_CACHE_NAME = 'teamz-static-v3';

function log(...data) {
    console.log("TeamZ SWv1.0", ...data);
}

log("SW Script executing - adding event listeners");

self.addEventListener('install', event => {
    log('install', event);

    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(cache => {
            // console.log('about to call cache.addAll')
            log('Attempting to cache offline route');
            return cache.addAll([

                '/',
                '/menu',
                '/food-item',
                // '/food-item?id=1',
                '/preview-order',
                '/order-placed',
                '/login',
                '/signup',
                '/offline',

                '/static/css/hibachi-chicken.css',
                '/static/css/index.css',
                '/static/css/login.css',
                '/static/css/menu.css',
                '/static/css/offline.css',
                '/static/css/order-placed.css',
                '/static/css/preview-order.css',
                '/static/css/signup.css',
                // '/css/hibachi-chicken.css',
                // '/css/index.css',
                // '/css/login.css',
                // '/css/menu.css',
                // '/css/offline.css',
                // '/css/order-placed.css',
                // '/css/preview-order.css',
                // '/css/signup.css',

                '/static/images/hibachi-chicken.png',
                '/static/images/hibachi-salmon.png',
                '/static/images/hibachi-shrimp.png',
                '/static/images/hibachi-steak.png',
                '/static/images/hibachi.jpg',
                '/static/images/login.png',
                '/static/images/logo.jpg',
                // '/images/hibachi-chicken.png',
                // '/images/hibachi-salmon.png',
                // '/images/hibachi-shrimp.png',
                // '/images/hibachi-steak.png',
                // '/images/hibachi.jpg',
                // '/images/login.png',
                // '/images/logo.jpg',

                '/static/js/food-item.js',
                '/static/js/login.js',
                '/static/js/logout.js',
                '/static/js/menu.js',
                '/static/js/order-placed.js',
                '/static/js/preview-order.js',
                '/static/js/signup.js',
                '/static/js/common.js',
                // '/js/food-item.js',
                // '/js/login.js',
                // '/js/logout.js',
                // '/js/menu.js',
                // '/js/order-placed.js',
                // '/js/preview-order.js',
                // '/js/signup.js',
                // '/js/common.js'

                'https://unpkg.com/leaflet@1.9.1/dist/leaflet.css',
                'https://unpkg.com/leaflet@1.9.1/dist/leaflet.js',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
            ]).then(() => {
                log('Successfully cached offline route');
            }).catch(error => {
                log('Failed to cache offline route:', error);
            });

        })
    );
});

self.addEventListener('activate', event => {
    log('activate', event);

    // gets rid of old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => cacheName.startsWith('teamz-') && cacheName != STATIC_CACHE_NAME)
        }).then(oldCaches => {
            return Promise.all(
                oldCaches.map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // event.respondWith(
    //   fetchAndCache(event.request)
    // );
    // log('hey hey')
    // console.log('hey hey hey hey!')

    // event.respondWith(
    //     cacheFirst(event.request)
    // );

    console.log('about to call networkFirst');
    event.respondWith(
        networkFirst(event.request)
    );
});



function fetchAndCache(request) {
    return fetch(request).then(response => {
        if (response.ok && request.method === "GET") {
            caches.open(STATIC_CACHE_NAME).then(cache => {
                cache.put(request, response);
            })
        }
        return response.clone();
    })
}






// NOTE: Going to a food item page before logging in will say 'This site can't be reached', but
// after logging in, it works. Functionality works, and logging out works as well. After logging
// in and turning on offline mode, going to a food item page will show the custom offline page. 
// Going to the menu page in offine mode will not load API things though.
function networkFirst(request) {
    console.log('networkFirst accessed')

    // need to include redirect: 'follow' to handle redirects to the food item pages (going to
    // the custom offline page instead of the default offline page)
    return fetch(request.clone(), {
        credentials: 'include',
        redirect: 'follow'
    })
        .then(response => {
            console.log('case 1: response')

            if (response.ok && request.method === "GET") {
                console.log('1a')
                caches.open(STATIC_CACHE_NAME)
                    .then(cache => {
                        console.log('1b')
                        cache.put(request, response.clone());
                    });
            }
            console.log('1c')
            return response;
        })
        .catch(error => {
            console.log('case 2: error')

            return caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        console.log('2a')
                        console.log('cachedResponse:', cachedResponse)
                        return cachedResponse;
                    }
                    console.log('2b')
                    return caches.match('/offline');
                });
        });
}