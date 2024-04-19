import { createContext, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, database } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// This code creates a context in React, which allows passing user data to all child components without props.
// UserProvider is a component that uses state to store user data and a reference to the user in the database.
// When the authentication state changes (i.e., when a user logs in or logs out), 
// 	we get a reference to the user’s data in the database and set a listener on these data.
// When the data updates, we update the data state, which is then available to all child components through UserContext.

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
	const [data, setData] = useState({
		statsDB: null,
		userRef: null,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				const userRef = ref(database, `users/${currentUser.uid}`);
				if (userRef && userRef !== null) {
					onValue(
						userRef,
						(snapshot) => {
							setData({ statsDB: snapshot.val(), userRef });
						},
						(error) => {
							console.error('Fetching current user failed:', error.message);
						}
					);
				}
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		data.statsDB && (
			<UserContext.Provider value={data}>{children}</UserContext.Provider>
		)
	);
};
