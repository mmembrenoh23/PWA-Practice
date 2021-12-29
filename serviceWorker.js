const CACHE_ELEMENTS = [
    "./",
   "https://unpkg.com/react@17/umd/react.production.min.js",
   "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
   "https://unpkg.com/@babel/standalone/babel.min.js",
   "./style/style.css",
   "./componentes/Contador.js",
   "./favicon.png"
];

const CACHE_NAME = "cache_counter_react_v11";
 
self.addEventListener("install", (e) => {
    console.log(e);
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting();
            }).catch(console.log);
        })
    );
});


self.addEventListener("activate", (e) => {
    const cacheWhiteList= [CACHE_NAME];
    e.waitUntil(
        caches.keys().then((cacheNames) =>{
            console.log(cacheNames);
            return Promise.all(cacheNames.map(cacheName => {
                return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(() => self.clients.claim()) 
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                return res;
            }

            return fetch(e.request);
        })
    );
   /* return e.respondWith(fetch(e.request)
            .then(res => { return res; })
            .catch(() => { 
            //If there is an error, simply return offline page
              if(caches.match('offline.html')) {
                console.log('match found in cache for offline.html');
                return caches.match('offline.html');
              }
        }));*/
    /*e.respondWith(async function() {
        const cacheResponse = await caches.match(e.request);

        if (cacheResponse) {
            return cacheResponse;
        }

        return fetch(e.request);
    });*/
});