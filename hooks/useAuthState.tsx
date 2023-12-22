'use client'
import { Auth, User, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export const useAuthState = (auth: Auth): [User | null, Error | null] => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<Error | null>(null)
    useEffect(() => {
        const listener = onAuthStateChanged(auth, setUser, setError)
        return () => {
            listener()
        }
    },[auth])
    return [user, error]
}