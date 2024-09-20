if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./js/serviceWorker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope: ',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}
