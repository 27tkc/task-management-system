import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, userRole, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="font-bold text-lg">Task Management</div>
      <div className="flex gap-4 items-center">
        {token && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/tasks">Tasks</Link>
            <span className="text-sm text-gray-200">Role: {userRole}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
        {/* {!token && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )} */}
      </div>
    </nav>
  );
}
