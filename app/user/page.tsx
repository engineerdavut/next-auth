"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function UserPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isUser = session?.user?.roles?.includes('user') || false;

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }
    
    if (!isUser) {
      router.push('/');
      return;
    }
  }, [session, status, isUser, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || !isUser) {
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
            <h1 className="text-3xl font-bold text-blue-600">User Dashboard</h1>
            <Link 
              href="/" 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">My Profile</h2>
              <p className="text-gray-600 mb-4">View and edit your profile information</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">My Tasks</h2>
              <p className="text-gray-600 mb-4">View your assigned tasks and projects</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                View Tasks
              </button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Documents</h2>
              <p className="text-gray-600 mb-4">Access your documents and files</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                View Documents
              </button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Support</h2>
              <p className="text-gray-600 mb-4">Get help and support</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">User Information</h3>
            <div className="space-y-2">
              <p className="text-gray-800"><strong>Name:</strong> {session.user?.name}</p>
              <p className="text-gray-800"><strong>Email:</strong> {session.user?.email}</p>
              <p className="text-gray-800"><strong>Role:</strong> User</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

