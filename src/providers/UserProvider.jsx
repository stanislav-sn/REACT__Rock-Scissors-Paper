import { createContext, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, database } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const initialUserData = {
	statsDB: null,
	userRef: null,
};

export const UserContext = createContext({
	data: initialUserData,
	setData: () => {},
});

export const UserProvider = ({ children }) => {
	const [data, setData] = useState(initialUserData);

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
