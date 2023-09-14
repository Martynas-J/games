"use client";
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
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    return (
      <div>
        <div>{session.data.user.name}</div>
        <div>{session.data.user.email}</div>
        <div>{session.data.expires}</div>
      </div>
    );
  }
};

export default Dashboard;
