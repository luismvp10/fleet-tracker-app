"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {DashboardHeader} from "@/components/dashboard/DashboardHeader";
import {TrackingMap} from "@/components/tracking/TrackingMap";
import {VehicleTable} from "@/components/tracking/VehicleTable";

export default function TrackingPage() {
    return (
        <div className="space-y-6">
            <DashboardHeader title="Monitor" description="Real-time vehicle tracking and status" />

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Vehicle Location</CardTitle>
                        <CardDescription>Real-time position of the selected vehicle</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 overflow-hidden">
                       <TrackingMap/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Vehicle List</CardTitle>
                        <CardDescription>Select a vehicle to view its location on the map</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <VehicleTable />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

