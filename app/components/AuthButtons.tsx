
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>
          Welcome, <span className="font-bold">{session.user?.name || session.user?.email}</span>
        </p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('auth0')}
      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
    >
      Login
    </button>
  );
}