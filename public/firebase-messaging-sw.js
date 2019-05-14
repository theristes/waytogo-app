importScripts('/__/firebase/5.5.6/firebase-app.js');
importScripts('/__/firebase/5.5.6/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler( payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = { body: 'Background Message body.', icon: '/firebase-logo.png' };
  return self.registration.showNotification(notificationTitle, notificationOptions);

})