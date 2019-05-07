import  firebase 
  from  'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';

import  { MESSAGE_UPDATE, MESSAGE_DELETE, MESSAGE_INSERT, CLEAN_OBJECT, NO_PHOTO }
  from  './AppUtils';

const config = (env => ({
        apiKey: env.REACT_APP_API_KEY,
        authDomain: env.REACT_APP_AUTH_DOMAIN,
        databaseURL: env.REACT_APP_DATABASE_URL,
        projectId: env.REACT_APP_PROJECT_ID,
        storageBucket: env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID
    }))(process.env)

const firebaseApp = firebase.initializeApp(config);
const {email,password} = (env => 
    ({email:env.REACT_APP_AUTH_EMAIL,
        password:env.REACT_APP_AUTH_PASSWORD}))
    (process.env);

firebase.auth()
        .signInWithEmailAndPassword(email,password)
        .catch(error => console.log(error));

const db =  firebaseApp.firestore();
const storage = firebaseApp.storage();
const imagesRef = id => storage.ref().child(id);

const getCarsColletion = db.collection('cars');
const getNotificationColletion = db.collection('notifications');

const getCars = async(fn) => {
    try {
        const data = await getCarsColletion.get();
        const cars = await data.docChanges().map(v => ({id:v.doc.id, ...v.doc.data()}));
        fn(cars);
    } catch (error) {
        fn(error);
    }
}
const addCar = async(car, fn) => {
    try {
        const toAdd = await getCarsColletion;
        toAdd.add({photo:NO_PHOTO, ...car});
        fn(MESSAGE_INSERT);
    } catch (error) {
        fn(error)
    }
}
const updateCar = async(car, fn) => {
    try {
        const toUpdate = await getCarsColletion.doc(car.id);
        toUpdate.set(CLEAN_OBJECT(car),{merge:true});
        fn(MESSAGE_UPDATE);
    } catch (error) {
        fn(error);
    }
}
const deleteCar = async(car, fn) => {
    try {
        const toDelete = await getCarsColletion.doc(car.id);
        toDelete.delete();
        fn(MESSAGE_DELETE);
    } catch (error) {
        fn(error);
    }
}

const getTokensColletion = db.collection('tokens');
const pushNotifications = async() => {
    try {
        const messaging = firebase.messaging();
        const accepted = await messaging.requestPermission();
        console.log('User accepted',accepted);
        const token = await messaging.getToken();
        console.log(token);
        try {
            const toSaved = await getTokensColletion.doc(token).set({token:token});
            console.log(`Token successfully saved`,toSaved);
        } catch (error) {
            console.log(`Error just happened: ${error}`);
        } finally {
            messaging.onMessage( payload => {
                console.log(payload);
            });
        }
    } catch (error) {
        console.log(`Error just happened: ${error}`);
    }
}
pushNotifications();

export { getCars, addCar, updateCar, deleteCar, storage, imagesRef, getCarsColletion, getNotificationColletion }
