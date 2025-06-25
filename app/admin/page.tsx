"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isAdmin = session?.user?.roles?.includes('admin') || false;

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }
    
    if (!isAdmin) {
      router.push('/');
      return;
    }
  }, [session, status, isAdmin, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Access Denied</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>
            <Link 
              href="/" 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
          
          {/* Admin panel content */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Admin Information</h3>
            <div className="space-y-2">
              <p className="text-gray-800"><strong>Name:</strong> {session.user?.name}</p>
              <p className="text-gray-800"><strong>Email:</strong> {session.user?.email}</p>
              <p className="text-gray-800"><strong>Role:</strong> Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

