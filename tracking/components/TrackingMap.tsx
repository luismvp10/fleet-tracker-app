"use client";

import { useEffect, useState } from "react";
import { useVehicleStore } from "@/stores/vehicle-store";
import { Truck } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the Map component with no SSR
const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[500px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
    ),
})

export function TrackingMap() {
    const { selectedVehicle } = useVehicleStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect((): void => {
        setIsMounted(true);
    }, []);

    if (!selectedVehicle) {
        return (
            <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                    <Truck className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No vehicle selected</h3>
                    <p className="text-sm text-muted-foreground">Select a vehicle from the table below to view its location</p>
                </div>
            </div>
        )
    }

    if (!isMounted) {
        return null;
    }

    return <MapWithNoSSR selectedVehicle={selectedVehicle} />;
}

