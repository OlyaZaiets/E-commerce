import { createContext, useEffect, useState } from 'react';
import { getProfile } from '../api/user';

interface AuthContextType {
  token: string | null;
  role: string | null;
  isLoggedInUser: boolean;
  isAdmin: boolean;
  user: any | null;
  login: (token: string, role: string) => Promise<void>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ( {children } : {children: React.ReactNode}) => {
  const [token, setToken] = useState<string | null >(localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [user, setUser] = useState<any | null>(null);

  const isAdmin = role === 'admin';

  const isLoggedInUser = Boolean(token);

  const login = async (newToken: string, newRole: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);

    setToken(newToken);
    setRole(newRole);

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (e) {
      console.error('Profile load failed:', e);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    setToken(null);
    setRole(null);
    setUser(null);
  }

    useEffect(() => {
    if (!token) return;

    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (e) {
        console.error('Profile load failed:', e);
        setUser(null);
      }
    };

    loadProfile();
  }, [token]);

  return (
    <AuthContext.Provider value={{token, role, isLoggedInUser, user, isAdmin, login, logout}}>
      { children }
    </AuthContext.Provider>
  )
}

