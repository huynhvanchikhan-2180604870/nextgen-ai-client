// Clear cache script for development
console.log("🧹 Clearing browser cache...");

// Clear localStorage
localStorage.clear();
console.log("✅ localStorage cleared");

// Clear sessionStorage
sessionStorage.clear();
console.log("✅ sessionStorage cleared");

// Clear IndexedDB
if ('indexedDB' in window) {
  indexedDB.databases().then(databases => {
    databases.forEach(db => {
      indexedDB.deleteDatabase(db.name);
    });
    console.log("✅ IndexedDB cleared");
  });
}

// Unregister service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister();
      console.log("✅ Service worker unregistered");
    });
  });
}

// Clear cache storage
if ('caches' in window) {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName);
      console.log(`✅ Cache ${cacheName} cleared`);
    });
  });
}

console.log("🎉 All caches cleared! Please refresh the page.");
