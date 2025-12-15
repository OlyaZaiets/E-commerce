import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.scss';
import './styles/index.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.scss';
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { WishlistProvider } from './context/wishlistContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
