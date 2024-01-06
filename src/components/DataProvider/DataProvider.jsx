"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const DataProvider = ({children}) => {
    const session = useSession()

    const router = useRouter()
    useEffect(() => {
        if (session.status === "unauthenticated") {
            router?.push("/dashboard/login");
        }
    }, [session.status, router]);
  return (
    <div>{children}</div>
  )
}

export default DataProvider