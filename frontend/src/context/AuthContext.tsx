import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import api, { setAuthToken } from '../lib/api';
import jwtDecode from 'jwt-decode';

interface AuthContextType {
  token: string | null;
  userRole: 'ADMIN' | 'MANAGER' | 'USER' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface JwtPayload {
  id: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<JwtPayload['role'] | null>(null);

  // Load token and role from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setTokenState(savedToken);
      setAuthToken(savedToken);
      const decoded: JwtPayload = jwtDecode(savedToken);
      setUserRole(decoded.role);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    setTokenState(res.data.token);
    setAuthToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    const decoded: JwtPayload = jwtDecode(res.data.token);
    setUserRole(decoded.role);
  };

  const logout = () => {
    setTokenState(null);
    setUserRole(null);
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
