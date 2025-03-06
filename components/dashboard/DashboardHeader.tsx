"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {useVehicleStore} from "@/stores/vehicle-store";

interface Props {
    title: string
    description?: string
}

export function DashboardHeader({ title, description }: Props) {

    const { refreshData } = useVehicleStore();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh: () => Promise<void> = async (): Promise<void> => {
        setIsRefreshing(true);
        await refreshData();
        setTimeout(() => setIsRefreshing(false), 800);
    }

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
                {description && <p className="text-sm sm:text-base text-muted-foreground">{description}</p>}
            </div>
            <Button
                variant="outline"
                size="sm"
                className="gap-1 w-full sm:w-auto"
                onClick={handleRefresh}
                disabled={isRefreshing}
            >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
        </div>
    )
}

