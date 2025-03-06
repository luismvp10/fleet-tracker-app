"use client";

import { useEffect } from "react";
import { Activity, AlertTriangle, MapPin, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useVehicleStore } from "@/stores/vehicle-store";
import {Skeleton} from "@/components/ui/skeleton";


export function DashboardCards() {
    const { statistics, statisticsLoading, fetchStatistics } = useVehicleStore();

    useEffect((): void => {
        fetchStatistics();

    }, [fetchStatistics])

    if (statisticsLoading || !statistics) {
        return (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-4 sm:p-6">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2 mt-4">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        )
    }

    const metrics = [
        {
            title: "Total Vehicles",
            value: statistics.totalVehicles,
            icon: Truck,
            color: "bg-blue-500",
        },
        {
            title: "Active Vehicles",
            value: statistics.activeVehicles,
            icon: MapPin,
            color: "bg-green-500",
        },
        // {
        //     title: "Total Distance",
        //     value: `${Math.round(statistics.totalDistance).toLocaleString()} km`,
        //     icon: Activity,
        //     color: "bg-purple-500",
        // },
        {
            title: "Alerts",
            value: statistics.alerts,
            icon: AlertTriangle,
            color: "bg-red-500",
        },
    ]

    return (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
                <Card key={metric.title}>
                    <CardContent className="flex items-center gap-4 p-4 sm:p-6">
                        <div className={`rounded-full ${metric.color} p-2 sm:p-3 text-white`}>
                            <metric.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">{metric.title}</p>
                            <h3 className="text-xl sm:text-2xl font-bold">{metric.value}</h3>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

