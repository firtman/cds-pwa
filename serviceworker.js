// version 2

self.addEventListener("install", async event => {
    let cache = await caches.open("pwa");
    await cache.addAll(["./", "styles.css", "js/app.js", "js/handlers.js",  "data/activities.json", "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"]);
    console.log("Assets installed");
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open("pwa")
            .then(cache => cache.match(event.request)) // search
            .then(response => {  // if request is not found, is undefined
                // console.log(event.request.url);
                return response || fetch(event.request);
                // If the cached response is available, we respond
                // with that cached response; if not, we do a fetch to the
                // network
            })
    )
});

// self.addEventListener('fetch', event => {    event.respondWith(        caches.match(event.request)            
//     .then(function(response) {                // Even if the response is in the cache, we fetch it                // and update the cache for future usage               
//      var fetchPromise = fetch(event.request).then(                      
//          function(networkResponse) {                        
//             caches.open("pwa").then(function(cache) {   
//                   cache.put(event.request, networkResponse.clone());                    return networkResponse;                        });                    
//                 });                // We use the currently cached version if it's there                
//                 return response || fetchPromise;            
//         })        
//     );   
// }); 