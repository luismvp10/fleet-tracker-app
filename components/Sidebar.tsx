"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
// import { useAuth } from "@/hooks/use-auth"

// import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart3, LogOut, Map, Menu, Truck, X } from "lucide-react"
import Image from "next/image";
import {SidebarContent} from "@/components/SidebarContent";
import {navItems} from "@/constants/menu.constant";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/use-auth";
import {ThemeToggle} from "@/components/ThemeToggle";

export function Sidebar() {
    const pathname: string = usePathname();
    const router: AppRouterInstance = useRouter();
    const { logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout:() => void = (): void => {
        logout();
        router.push("/")
    }


    return (
        <>
            {/* Mobile sidebar */}
            <div className="lg:hidden fixed top-0 left-0 z-40 w-full h-14 border-b bg-background flex items-center px-4">
                <Button variant="outline" size="icon" className="mr-2" onClick={() => setMobileMenuOpen(true)}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                <Link href="/components/dashboard" className="flex items-center gap-2 font-semibold">
                    <Image className="" src={'./images/fleet.png'} alt={'Fleet monitoring icon'} width={50} height={50} />
                    <span>Fleet Tracker</span>
                </Link>
            </div>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex h-14 items-center justify-between border-b px-4">
                            <Link href="/components/dashboard" className="flex items-center gap-2 font-semibold">
                                <Image className="" src={'./images/fleet.png'} alt={'Fleet monitoring icon'} width={50} height={50} />
                                <span>Fleet Monitor</span>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex h-[calc(100%-3.5rem)] flex-col">
                            <div className="flex-1 overflow-auto py-2">
                                <nav className="grid gap-1 px-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                                                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                            }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    {/*<span className="text-sm text-muted-foreground">Theme</span>*/}
                                    <ThemeToggle />
                                </div>
                                <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:flex h-full w-64 flex-col border-r bg-card">
                <SidebarContent setMobileMenuOpen={setMobileMenuOpen} handleLogout={handleLogout} />
            </div>
        </>
    )
}


