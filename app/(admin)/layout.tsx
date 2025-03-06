"use client"

import React, {useEffect} from "react"
import {Sidebar, Footer} from "@/components";
import {useAuth} from "@/hooks/use-auth";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function DashboardLayout({children}: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="flex h-screen flex-col">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto pt-14 lg:pt-0">
                    <div className="container mx-auto p-4 md:py-6">{children}</div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default DashboardLayout;
