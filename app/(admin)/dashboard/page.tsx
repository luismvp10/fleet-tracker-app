

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {DashboardHeader} from "@/dashboard/components/DashboardHeader";
import {DashboardCards} from "@/dashboard/components/DashboardCards";
import {DashboardCharts} from "@/dashboard/components/DashboardChart";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <DashboardHeader title="Dashboard" description="Fleet mileage statistics for the last 15 days" />

            <DashboardCards />

            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl sm:text-2xl">Fleet Mileage Overview</CardTitle>
                    <CardDescription className="text-sm">
                        Total kilometers traveled by your fleet in the last 15 days
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DashboardCharts />
                </CardContent>
            </Card>
        </div>
    )
}
