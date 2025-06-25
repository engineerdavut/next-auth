import Image from "next/image";
import AuthButtons from "./components/AuthButtons";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Next.js & Auth0 Integration</h1>
        <p className="mb-6 text-gray-600">
          This is the home page. Anyone can see it.
        </p>
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
