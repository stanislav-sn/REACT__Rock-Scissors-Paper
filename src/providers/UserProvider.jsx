import { createContext, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, database } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
