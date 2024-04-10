import { useEffect, useMemo } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../firebase';

// The custom hook useFetchUserProp is used to fetch a user property from a database. It takes two parameters:
// - user: The user object, obtained from the React context.
// - setData: The function that will be called with the fetched property.

// The hook works as follows:
// - If the user is authenticated, a reference to the property in the database is created.
// - When the value of the property changes, the reference calls the callback function with the new value.

export const useFetchUserProps = (user, setData) => {
	const getUserRef = useMemo(() => {
		if (user) {
			return ref(database, `users/${user.uid}/`);
		}
		return null;
	}, [user]);

	useEffect(() => {
		const userRef = getUserRef;
		if (userRef && userRef !== null) {
			onValue(userRef, (snapshot) => {
				const data = snapshot.val();
				if (data) {
					setData((prevState) => ({
						...prevState,
						userName: data.userName,
						userScore: data.userScore,
						computerScore: data.compScore,
					}));
				}
			});
		}
	}, [getUserRef, setData]);

	return getUserRef;
};
