import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const { token, userRole, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return null; // prevents flash before redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Task Management</div>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center p-6 mt-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Hello there, <br />
            Welcome @task-management-system/frontend 👋
          </h1>
          <p className="text-lg text-gray-700">
            Token: {token ? 'Available' : 'Not logged in'} <br />
            Role: {userRole ?? 'N/A'}
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            You&apos;re up and running
          </h2>
          <p className="text-gray-600">
            Your frontend is connected to the Auth context successfully.
          </p>
        </section>
      </main>
    </div>
  );
}
