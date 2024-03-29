import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'rock-scissors-paper-712a1.firebaseapp.com',
	databaseURL:
		'https://rock-scissors-paper-712a1-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'rock-scissors-paper-712a1',
	storageBucket: 'rock-scissors-paper-712a1.appspot.com',
	messagingSenderId: '614477011959',
	appId: '1:614477011959:web:c94a70e1b65359969d6cf2',
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const database = getDatabase(app);
export const api =
	'https://rock-scissors-paper-712a1-default-rtdb.europe-west1.firebasedatabase.app/users.json';
