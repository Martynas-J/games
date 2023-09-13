"use client"
import { SessionProvider } from "next-auth/react"
import DataProvider from "../DataProvider/DataProvider"

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </SessionProvider>
  )
}

export default AuthProvider