import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { UserProvider } from './providers/UserProvider';
import AppRoutes from './routes/Routes';
import './index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<ThemeProvider>
			<UserProvider>
				<AppRoutes />
			</UserProvider>
		</ThemeProvider>
	</BrowserRouter>
);
