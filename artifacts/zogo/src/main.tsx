import { createRoot } from 'react-dom/client';
import { setAuthTokenGetter } from '@workspace/api-client-react';

import App from './App';

import './index.css';

// CRITICAL: Attach JWT token from localStorage to all API requests.
// Without this, every authenticated endpoint (cart, wishlist, orders, admin)
// returns 401 Unauthorized because the Authorization header is never sent.
setAuthTokenGetter(() => localStorage.getItem('zogo_token'));

createRoot(document.getElementById('root')!).render(<App />);
