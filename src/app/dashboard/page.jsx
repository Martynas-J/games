"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router?.push("/dashboard/login");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-800">Loading...</p>
      </div>
    );
  }
  if (session.status === "authenticated") {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Dashboard</h1>
        <div className="mb-2">
          <span className="font-semibold">Vardas:</span> {session.data.user.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">El. paštas:</span> {session.data.user.email}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Data:</span> {session.data.expires}
        </div>
      </div>
    );
  }
};

export default Dashboard;
