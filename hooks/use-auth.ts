"use client"

import { useContext } from "react"
import {AuthContext} from "@/providers/AuthProvider";
import {AuthContextType} from "@/interfaces/providers/auth-context.type";


export function useAuth(): AuthContextType {
    const context: AuthContextType = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}
