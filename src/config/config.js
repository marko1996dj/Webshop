import firebase from 'firebase/app';
import 'firebase/auth'


var firebaseConfig = {
	apiKey: 'AIzaSyBRDiKVc0xqKUNQtnGo-DTWOupsNnhH20w',
	authDomain: 'webshop-9a548.firebaseapp.com',
	databaseURL: 'https://webshop-9a548.firebaseio.com',
	projectId: 'webshop-9a548',
	storageBucket: 'webshop-9a548.appspot.com',
	messagingSenderId: '83664322465',
	appId: '1:83664322465:web:6ff640bcc036edd3'
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;