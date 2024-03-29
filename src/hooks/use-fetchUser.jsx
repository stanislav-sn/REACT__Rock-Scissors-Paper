import { useMemo } from 'react';
import { ref } from "firebase/database";
import { database } from '../firebase';

// The custom hook useFetchUser is designed to fetch a user’s data from a database. 
// It uses useMemo to create a reference to the user’s data in the database, 
// which is only recalculated if the user object changes. The hook then returns this reference.

export const useFetchUser = (user) => {
	const userRef = useMemo(() => {
		if (user) {
			return ref(database, `users/${user.uid}`);
		}
	}, [user]);
  return userRef;
};