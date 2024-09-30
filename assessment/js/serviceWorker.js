/**
 * All of this JS code is to make sure that the pages are available even if there is no network connection
 * We can specify pages now - at the 'Add any critical files you want cached immediately' point
 * But we have added JS that will do this automatically for use as people open pages
 * This is a better approach so that only the pages that the user is interested in will be pre-loaded.
 */

// Name of the cache
const CACHE_NAME = 'my-hidden-gems-cache-v1';

// List of files to pre-cache (optional, only the essential ones)
const urlsToPreCache = [
  '../', // Cache the home page
  '../index.html', // Main page
  '../destinations.html', // Destinations
  '../itineraries.html', // Itineraries
  '../community.html', // Community
];

// Install event - pre-cache only essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToPreCache);
    })
  );
});

// Activate event - clean up old caches if necessary
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

// Fetch event - serve cached content and dynamically cache new content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve the cached response if found
      if (response) {
        return response;
      }

      // Clone the request to fetch and cache the new file
      const fetchRequest = event.request.clone();

      // Only cache valid HTTP/HTTPS requests
      if (event.request.url.startsWith('http')) {
        return fetch(fetchRequest).then((response) => {
          // If the response is valid, cache it dynamically
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      } else {
        // For unsupported schemes like 'chrome-extension://', just fetch without caching
        return fetch(event.request);
      }
    })
  );
});
