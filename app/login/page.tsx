import {LoginForm} from "@/auth/components/LoginForm";
import Image from "next/image";


export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">

                    <div className="flex items-center justify-center">
                        <Image className="mr-4" src={'./images/fleet.png'} alt={'Fleet monitoring icon'} width={50} height={50} />
                        <h1 className="text-3xl font-bold">Fleet Tracker System</h1>
                    </div>

                    <p className="text-muted-foreground mt-2">Sign in to access your fleet dashboard</p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}
