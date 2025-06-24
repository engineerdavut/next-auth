
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/route";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Profile Page</h1>
        <p className="text-center mb-6">This page is protected. Only logged in users can see it.</p>
        <div className="space-y-2">
            <p><strong>Name:</strong> {session.user?.name}</p>
            <p><strong>Email:</strong> {session.user?.email}</p>
            <img src={session.user?.image ?? ''} alt="Profile Photo" className="rounded-full mx-auto mt-4" />
        </div>
      </div>
    </div>
  );
}