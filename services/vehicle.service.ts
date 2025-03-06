import {FleetStatistics, Vehicle, VehicleMileageData} from "@/interfaces/entities/vehicle.entity";
import {
    generateDateRange,
    generateFleetStatistics,
    generateMockVehicles, generateVehicleMileageData,
    simulateVehicleMovement
} from "@/lib/mock-data.util";

// Simular retraso de API
const simulateDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Caché para datos mock para persistir entre llamadas
let vehiclesCache: Vehicle[] | null = null
let statisticsCache: FleetStatistics | null = null

class MockAPI {
    // Obtener todos los vehículos
    async getVehicles(): Promise<Vehicle[]> {
        await simulateDelay();

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        return [...vehiclesCache];
    }

    // Obtener un solo vehículo por ID
    async getVehicle(id: string): Promise<Vehicle | null> {
        await simulateDelay()

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20)
        }

        return vehiclesCache.find((v) => v.id === id) || null
    }

    // Actualizar la ubicación del vehículo (simula actualizaciones en tiempo real)
    async updateVehicleLocation(id: string): Promise<Vehicle | null> {
        await simulateDelay(200) // Respuesta más rápida para actualizaciones de ubicación

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20)
        }

        const vehicleIndex = vehiclesCache.findIndex((v) => v.id === id)
        if (vehicleIndex === -1) return null

        const updatedVehicle = simulateVehicleMovement(vehiclesCache[vehicleIndex])
        vehiclesCache[vehicleIndex] = updatedVehicle

        return updatedVehicle
    }

    // Obtener estadísticas de la flota
    async getFleetStatistics(): Promise<FleetStatistics> {
        await simulateDelay();

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        if (!statisticsCache) {
            statisticsCache = generateFleetStatistics(vehiclesCache);
        }

        return { ...statisticsCache }
    }

    // Obtener datos de kilometraje para gráficos
    async getMileageData(days = 15): Promise<{ dates: string[]; vehicles: VehicleMileageData[] }> {
        await simulateDelay();

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        const dates = generateDateRange(days);

        // Generar datos de kilometraje para todos los vehículos
        const vehicles: VehicleMileageData[] = vehiclesCache.slice(0, 20).map((vehicle, index) => {
            // Asignar un color basado en el índice
            const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

            return {
                id: vehicle.id,
                name: `${vehicle.make || ""} ${vehicle.model || ""} (${vehicle.licensePlate})`,
                color: colors[index % colors.length],
                mileage: generateVehicleMileageData(vehicle.id, days),
            }
        })

        return { dates, vehicles };
    }

    // Actualizar todos los datos (simula polling)
    async refreshData(): Promise<{ vehicles: Vehicle[]; statistics: FleetStatistics }> {
        await simulateDelay();

        // Actualizar todas las posiciones de los vehículos
        if (vehiclesCache) {
            vehiclesCache = vehiclesCache.map((vehicle) => simulateVehicleMovement(vehicle));
            statisticsCache = generateFleetStatistics(vehiclesCache);
        } else {
            vehiclesCache = generateMockVehicles(20);
            statisticsCache = generateFleetStatistics(vehiclesCache);
        }

        return {
            vehicles: [...vehiclesCache],
            statistics: { ...statisticsCache },
        }
    }
}

// Exportar una instancia singleton
export const vehiclesApi = new MockAPI();
