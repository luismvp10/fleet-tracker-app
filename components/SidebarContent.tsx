import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {navItems} from "@/constants/menu.constant";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";

interface Props {
    setMobileMenuOpen: (open: boolean) => void;
    handleLogout: () => void;
}

export function SidebarContent  ({ setMobileMenuOpen, handleLogout}: Props): JSX.Element {
    const pathname: string = usePathname();

    return (
        <>
        <div className="flex h-20 items-center border-b px-4 py-4 ">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Image className="mr-2" src={'./images/fleet.png'} alt={'Fleet monitoring icon'} width={50} height={50} />
                <span>Fleet Tracker</span>
            </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
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
                <span className="text-sm text-muted-foreground">Theme</span>
                {/*<ThemeToggle />*/}
            </div>
            <Button variant="outline" className="w-full justify-start"
                    onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
            </Button>
        </div>
    </>
    );

}

