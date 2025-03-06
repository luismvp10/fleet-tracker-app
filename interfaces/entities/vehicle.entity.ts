import {Location} from "@/interfaces/entities/location.entity";

export type VehicleStatus = "ACTIVE" | "IDLE" | "MAINTENANCE"

export interface Vehicle {
    id: string;
    licensePlate: string;
    driver: string;
    status: VehicleStatus;
    location: Location;
    heading?: number;
    lastUpdated: string;
    make?: string;
    model?: string;
    year?: number;
    mileage?: number;
    fuelLevel?: number;
    lastMaintenance?: string;
    nextMaintenance?: string;
}

export interface FleetStatistics {
    totalVehicles: number;
    activeVehicles: number;
    idleVehicles: number;
    maintenanceVehicles: number;
    totalDistance: number;
    avgFuelLevel: number;
    alerts: number;
}

export interface VehicleMileageData {
    id: string;
    name: string;
    color: string;
    mileage: number[];
}

