
import Link from "next/link"

export function Footer() {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="border-t bg-card">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
                <div className="text-center text-xs sm:text-sm text-muted-foreground md:text-left">
                    <p>&copy; {currentYear} Fleet Tracker System. All rights reserved.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >

                    </Link>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                            Privacy Policy
                        </Link>
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

