import { useEffect, useMemo } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../firebase';

// The custom hook useFetchUserProp is used to fetch a user property from a database. It takes three parameters:
// - user: The user object, obtained from the React context.
// - properties: The name of the property to fetch from the database.
// - callbacks: The function that will be called with the fetched property.

// The hook works as follows:
// - If the user is authenticated, a reference to the property in the database is created.
// - When the value of the property changes, the reference calls the callback function with the new value.

export const useFetchUserProps = (user, properties, callbacks) => {
	const getUserRef = useMemo(() => {
		if (user) {
			return ref(database, `users/${user.uid}/`);
		}
		return null;
	}, [user]);

	useEffect(() => {
		const userRef = getUserRef;
		if (userRef && userRef !== null && callbacks) {
			onValue(userRef, (snapshot) => {
				const data = snapshot.val();
				if (data) {
					if (Array.isArray(callbacks)) {
						callbacks.forEach((callback, index) => {
							callback(data[properties[index]]);
						});
					} else {
						callbacks(data[properties]);
					}
				}
			});
		}
	}, [callbacks, getUserRef, properties]);

	return getUserRef;
};
