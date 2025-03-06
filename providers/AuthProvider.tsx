"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import {User} from "@/interfaces/entities/user.entity";
import { AuthContextType} from "@/interfaces/providers/auth-context.type";


export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => false,
    logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in
        const storedUser: string | null = localStorage.getItem("fleet-user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        // Mock authentication this would call an API in real app
        if (['admin@example.com', 'admin@admin.com'].includes( email)  && password === "password") {
            const user: User = {
                id: "1",
                name: "Admin User",
                email: "admin@example.com",
            }
            setUser(user);
            document.cookie = `fleet-user=${JSON.stringify(user)}; path=/`;
            localStorage.setItem("fleet-user", JSON.stringify(user));
            return true;
        }
        return false;
    }

    const logout:() => void = (): void => {
        setUser(null);
        localStorage.removeItem("fleet-user");
        document.cookie = "fleet-user=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }

    return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

