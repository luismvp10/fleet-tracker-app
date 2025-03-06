import {FleetStatistics, Vehicle} from "@/interfaces/entities/vehicle.entity";

export interface VehicleStore {
    vehicles: Vehicle[];
    selectedVehicle: Vehicle | null;
    loading: boolean;
    error: string | null;
    statistics: FleetStatistics | null;
    statisticsLoading: boolean;
    lastUpdated: string | null;
    fetchVehicles: () => Promise<void>;
    fetchStatistics: () => Promise<void>;
    setSelectedVehicle: (vehicle: Vehicle) => void;
    updateVehicleLocation: (id: string) => Promise<void>;
    refreshData: () => Promise<{ success: boolean; error?: any }>;
}
