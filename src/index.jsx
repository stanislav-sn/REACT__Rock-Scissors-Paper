import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
	BrowserRouter,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Game from './components/pages/game-page/Game';
import { Auth } from './components/pages/auth-page/authMain/AuthMain';
import { ForgotPassword } from './components/pages/forgotPassword-page/ForgotPassword';
import { ThemeProvider } from './providers/ThemeProvider';
import { Header } from './components/shared/header/Header';
import { UserProvider } from './providers/UserProvider';
import { Loading } from './components/shared/loading/Loading';
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
	];

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate('/game');
			} else if (location.pathname !== '/forgot-password') {
				navigate('/auth');
			}
		});
		const timerLoading = setTimeout(() => setIsLoading(false), 500);
		return () => {
			clearTimeout(timerLoading);
			listen();
		};
	}, [location.pathname, navigate]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="container ">
			<Header auth={auth} />
			<Routes>
				{routes.map((route) => (
					<Route key={route.path} {...route} />
				))}
			</Routes>
		</div>
	);
};

const root = createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<ThemeProvider>
			<UserProvider>
				<Main />
			</UserProvider>
		</ThemeProvider>
	</BrowserRouter>
);
