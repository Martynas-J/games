"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const session = useSession();

  return (
    <header className="bg-gray-900 py-4">
      <nav className="container mx-auto text-white">
        <ul className="flex justify-center space-x-4">
          <li>
              <Link href="/">
                <div className="group relative">
                  <span className="text-lg group-hover:text-blue-500">
                    Home
                  </span>
                  <div className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform"></div>
                </div>
              </Link>
          </li>
          <li>
            <Link href="/games">
              <div className="group relative">
                <span className="text-lg group-hover:text-blue-500">Games</span>
                <div className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform"></div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="group relative">
                <span className="text-lg group-hover:text-blue-500">
                  Dashboard
                </span>
                <div className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform"></div>
              </div>
            </Link>
          </li>
          <li className="text-lg group-hover:text-blue-500">
            {session.status === "authenticated" && (
              <button onClick={signOut} className="hover:text-red-500">
                Log out
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
