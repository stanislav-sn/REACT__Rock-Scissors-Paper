import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Loading } from './components/shared/loading/Loading';
import Game from './components/pages/game-page/Game';
import { Auth } from './components/pages/auth-page/authMain/AuthMain';
import { ForgotPassword } from './components/pages/forgotPassword-page/ForgotPassword';
import { ThemeProvider } from './providers/ThemeProvider';
import { Header } from './components/shared/header/Header';
// import { ErrorPage } from './components/pages/ErrorPage/ErrorPage';
import './index.css';

const Main = () => {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	const routes = [
		{
			path: '/game',
			element: <Game />,
		},
		{
			path: '/auth',
			element: <Auth />,
		},
		{
			path: '/forgot-password',
			element: <ForgotPassword />,
		},
		// {
		// 	path: '*',
		// 	element: <ErrorPage />,
		// },
	];

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate('/game');
			} else if (location.pathname !== '/forgot-password') {
				navigate('/auth');
			}
		});
		const timerLoading = setTimeout(() => setIsLoading(false), 1000);
		return () => {
			clearTimeout(timerLoading);
			listen();
		};
	}, [location.pathname, navigate]);

	return (
		<>
			{isLoading && <Loading />}
			<div className="container ">
				<Header auth={auth} />
				<Routes>
					{routes.map((route, i) => (
						<Route key={i} {...route} />
					))}
				</Routes>
			</div>
		</>
	);
};

const root = createRoot(document.getElementById('root'));

root.render(
	<HashRouter>
		<ThemeProvider>
			<Main />
		</ThemeProvider>
	</HashRouter>
);
