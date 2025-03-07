import { FleetStatistics, Vehicle, VehicleMileageData } from "@/interfaces/entities/vehicle.entity";
import {
    generateDateRange,
    generateFleetStatistics,
    generateMockVehicles,
    generateVehicleMileageData,
    simulateVehicleMovement
} from "@/lib/mock-data.util";

// Simulate API delay
const simulateDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Cache for mock data to persist between calls
let vehiclesCache: Vehicle[] | null = null;
let statisticsCache: FleetStatistics | null = null;

class MockAPI {
    // Get all vehicles
    async getVehicles(): Promise<Vehicle[]> {
        await simulateDelay();

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        return [...vehiclesCache];
    }

    // Get a single vehicle by ID
    async getVehicle(id: string): Promise<Vehicle | null> {
        await simulateDelay();

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        return vehiclesCache.find((v) => v.id === id) || null;
    }

    // Update vehicle location (simulates real-time updates)
    async updateVehicleLocation(id: string): Promise<Vehicle | null> {
        await simulateDelay(200); // Faster response for location updates

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        const vehicleIndex = vehiclesCache.findIndex((v) => v.id === id);
        if (vehicleIndex === -1) return null;

        const updatedVehicle = simulateVehicleMovement(vehiclesCache[vehicleIndex]);
        vehiclesCache[vehicleIndex] = updatedVehicle;

        return updatedVehicle;
    }

    // Get fleet statistics
    async getFleetStatistics(): Promise<FleetStatistics> {
        await simulateDelay();

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        if (!statisticsCache) {
            statisticsCache = generateFleetStatistics(vehiclesCache);
        }

        return { ...statisticsCache };
    }

    // Get mileage data for charts
    async getMileageData(days = 15): Promise<{ dates: string[]; vehicles: VehicleMileageData[] }> {
        await simulateDelay();

        if (!vehiclesCache) {
            vehiclesCache = generateMockVehicles(20);
        }

        const dates = generateDateRange(days);

        // Generate mileage data for all vehicles
        const vehicles: VehicleMileageData[] = vehiclesCache.slice(0, 20).map((vehicle, index) => {
            // Assign a color based on the index
            const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

            return {
                id: vehicle.id,
                name: `${vehicle.make || ""} ${vehicle.model || ""} (${vehicle.licensePlate})`,
                color: colors[index % colors.length],
                mileage: generateVehicleMileageData(vehicle.id, days),
            };
        });

        return { dates, vehicles };
    }

    // Refresh all data (simulates polling)
    async refreshData(): Promise<{ vehicles: Vehicle[]; statistics: FleetStatistics }> {
        await simulateDelay();

        // Update all vehicle positions
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
        };
    }
}

// Export a singleton instance
export const vehiclesApi = new MockAPI();
