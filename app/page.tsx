"use client";

import AuthButtons from "./components/AuthButtons";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.roles?.includes('admin') || false;
  const isUser = session?.user?.roles?.includes('user') || false;
  
  console.log(session);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-sky-400">Next.js & Auth0 Integration</h1>
        <p className="mb-6 text-gray-800">
          This is the home page. Anyone can see it.
        </p>
        
        {session && (
          <div className="mb-4 space-y-2">
            {isAdmin && (
              <div>
                <Link 
                  href="/admin" 
                  className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Go to Admin Panel
                </Link>
              </div>
            )}
            {isUser && (
              <div>
                <Link 
                  href="/user" 
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Go to User Panel
                </Link>
              </div>
            )}
          </div>
        )}
        
        <div className="mb-6">
          <AuthButtons />
        </div>
        
        <Link href="/profile" className="text-blue-500 hover:underline">
          Protected Profile Page
        </Link>
      </div>
    </main>
  );
}
