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
const auth =  firebaseApp.auth();
const db =  firebaseApp.firestore();
const storage = firebaseApp.storage();
const imagesRef = id => storage.ref().child(id);

const getCarsColletion = db.collection('cars');
const getNotificationColletion = db.collection('notifications');
const getTokensColletion = db.collection('tokens');
const getUsersColletion = db.collection('users');

async function authUser ({email, password}) {
    let user;
    const auth =  await firebaseApp.auth();
    try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        try {
            const signIn = await auth.signInWithEmailAndPassword(email,password);
            user = {id: signIn.user.uid, message: 'user signed'}
        } catch (error) {
            user = ({id: -1, message: error.message})
        } finally {    
            return user;
        }
    } catch (error) {
        user = ({id: -1, message: error.message})
    } finally {    
        return user;
    }
}

async function createUser ({email, password}) {
    let user;
    try {
        const auth =  await firebaseApp.auth();
        const created = await auth.createUserWithEmailAndPassword(email,password);
        if (created && created.user && created.user.uid) {
            await getUsersColletion.doc(created.user.uid).set({uid:created.user.uid, emai:created.user.email, admin:true})
            user = {id: created.user.uid, token: created.user.refreshToken, message: 'user signed'}
        }
    } catch (error) {
        user = ({id: -1, message: error.message})
    } finally {
        return user;
    }
}

async function forgotPassword (email) {
    let result;
    try {
      let load = await firebaseApp.auth().sendPasswordResetEmail(email);
      console.log(load)
      result = ({id:1, message: `The reset password's link was sent to the email`}); 
    } catch (error) {
      result = ({id: -1, message: error.message})
    } finally {
        return result;
    }
}

async function addCar(car, fn) {
    try {
        const toAdd = await getCarsColletion;
        toAdd.add({photo:NO_PHOTO, ...car});
        fn(MESSAGE_INSERT);
        updateNotifes(process.env,console.log);
    } catch(error) {
        fn(error)
    }
}

async function pushNotifications() {
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

async function updateCar(car, fn) {
    try {
        const toUpdate = await getCarsColletion.doc(car.id);
        toUpdate.set(CLEAN_OBJECT(car),{merge:true});
        fn(MESSAGE_UPDATE);
        updateNotifes(process.env,console.log);
    } catch (error) {
        fn(error);
    }
}

async function deleteCar(car, fn) {
    try {
        const toDelete = await getCarsColletion.doc(car.id);
        toDelete.delete();
        fn(MESSAGE_DELETE);
        updateNotifes(process.env,console.log);
    } catch (error) {
        fn(error);
    }
}

async function updateNotifes(env, fn) {
    const url = `${env.REACT_APP_CRON_JOB}?key=${env.REACT_APP_CRON_KEY}`;
    const response = await fetch(url);
    if (response.success === true) {
        fn(response);
    }
}
pushNotifications();

export {authUser, createUser, forgotPassword, auth, addCar, updateCar, deleteCar, getCarsColletion, getNotificationColletion, imagesRef}