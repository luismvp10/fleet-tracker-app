"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useVehicleStore } from "@/stores/vehicle-store";
import { generateFleetMileageData} from "@/lib/mock-data.util";

export function DashboardCharts() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { lastUpdated } = useVehicleStore();

    // Cargar datos iniciales
    useEffect(() => {
        loadChartData()
    }, [])

    // Escuchar el evento de actualización de datos
    useEffect(() => {
        const handleDataRefreshed = () => {
            loadChartData()
        }

        window.addEventListener("store-data-refreshed", handleDataRefreshed)

        return (): void => {
            window.removeEventListener("store-data-refreshed", handleDataRefreshed)
        }
    }, [])

    // También actualizar cuando cambie lastUpdated en el store
    useEffect((): void => {
        if (lastUpdated) {
            loadChartData();
        }
    }, [lastUpdated])

    // Función para cargar los datos del gráfico
    const loadChartData: () => void = (): void => {
        setLoading(true);

        setTimeout(() => {
            const { data, totalDistance } = generateFleetMileageData(); // Extraer correctamente los datos
            setChartData(data);
            // Aquí podrías hacer algo con `totalDistance`, si es necesario mostrarlo en el Dashboard
            setLoading(false);
        }, 800);
    };

    // Función para exportar a CSV
    const exportToCSV = () => {
        // Crear contenido CSV
        let csvContent = "data:text/csv;charset=utf-8,Date,Total Fleet Mileage (km),Average Vehicle Mileage (km)\n"

        // Agregar filas de datos
        chartData.forEach((dataPoint) => {
            csvContent += `${dataPoint.date},${dataPoint["Total Fleet Mileage (km)"]},${dataPoint["Average Vehicle Mileage (km)"]}\n`
        })

        // Crear enlace de descarga
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "fleet_mileage_data.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-9 w-32" />
                </div>
                <Skeleton className="h-[300px] sm:h-[400px] w-full" />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="text-lg font-medium">Fleet Mileage History (Last 15 Days)</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" onClick={exportToCSV} className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="h-[300px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 25 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: "#e5e7eb" }}
                            height={40}
                            interval="preserveStartEnd"
                        />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} width={60} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)",
                                borderRadius: "0.5rem",
                                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                            }}
                            formatter={(value) => [`${value.toLocaleString()} km`, undefined]}
                            labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: "10px" }} />
                        <Line
                            type="monotone"
                            dataKey="Total Fleet Mileage (km)"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={{ fill: "#ef4444", r: 1 }}
                            activeDot={{ r: 4, fill: "#ef4444" }}
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                        />
                        <Line
                            type="monotone"
                            dataKey="Average Vehicle Mileage (km)"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ fill: "#10b981", r: 1 }}
                            activeDot={{ r: 4, fill: "#10b981" }}
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}



// function generateDynamicData() {
//
//     // Fechas para los últimos 15 días
//     const dates: string[] = generateDateRange();
//
//
//     // Valores base para el kilometraje total - Usamos un valor aleatorio para que cambie en cada refresh
//     const baseTotalMileage: number = 800 + Math.floor(Math.random() * 300); // Entre 800 y 1100
//     const totalMileageIncrement: number = 40 + Math.floor(Math.random() * 20); // Entre 40 y 60
//
//     // Generar datos con variaciones más dinámicas
//     return dates.map((date, i) => {
//         // Calcular el kilometraje total con una tendencia ascendente general
//         // pero con fluctuaciones aleatorias significativas
//         const randomFactor: number = Math.random() * 200 - 100 // -100 a +100 (mayor variación)
//         const totalMileage: number = Math.round(baseTotalMileage + i * totalMileageIncrement + randomFactor)
//
//         // Calcular el kilometraje promedio con más variación
//         const dayOfWeek = new Date(date).getDay();
//
//         // Más actividad en días laborables, menos en fines de semana
//         let avgFactor = 1.0;
//         if (dayOfWeek === 0 || dayOfWeek === 6) {
//             // Fin de semana
//             avgFactor = 0.7 + Math.random() * 0.4 // 0.7-1.1 (menos actividad)
//         } else if (dayOfWeek === 1 || dayOfWeek === 5) {
//             // Lunes y viernes
//             avgFactor = 0.9 + Math.random() * 0.4; // 0.9-1.3 (actividad media)
//         } else {
//             // Martes a jueves
//             avgFactor = 1.0 + Math.random() * 0.5; // 1.0-1.5 (más actividad)
//         }
//
//         // Añadir variación adicional basada en el día anterior
//         const randomVariation: number = Math.random() * 15 - 7 // -7 a +7 (mayor variación)
//
//         // Calcular el promedio final (entre 60-90 km)
//         const avgMileage: number = Math.round(60 + i * 2 * avgFactor + randomVariation);
//
//         return {
//             date,
//             "Total Fleet Mileage (km)": totalMileage,
//             "Average Vehicle Mileage (km)": avgMileage,
//         }
//     })
// }


