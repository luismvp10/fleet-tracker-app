"use client";

import { create } from "zustand";
import { VehicleStore } from "@/interfaces/stores/vehicle-store.type";
import { vehiclesApi } from "@/services/vehicle.service";

export const useVehicleStore = create<VehicleStore>((set, get) => ({
    vehicles: [],
    selectedVehicle: null,
    loading: false,
    error: null,
    statistics: null,
    statisticsLoading: false,
    lastUpdated: null,

    // Fetch the list of vehicles from the API
    fetchVehicles: async () => {
        set({ loading: true, error: null });
        try {
            const vehicles = await vehiclesApi.getVehicles();
            set({ vehicles, loading: false });

            // Auto-select the first vehicle if none is selected
            if (!get().selectedVehicle && vehicles.length > 0) {
                set({ selectedVehicle: vehicles[0] });
            }
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : "Failed to fetch vehicles",
            });
        }
    },

    // Fetch fleet statistics from the API
    fetchStatistics: async () => {
        set({ statisticsLoading: true });
        try {
            const statistics = await vehiclesApi.getFleetStatistics();
            set({ statistics, statisticsLoading: false });
        } catch (error) {
            set({ statisticsLoading: false });
            console.error("Failed to fetch statistics:", error);
        }
    },

    // Set the selected vehicle
    setSelectedVehicle: (vehicle) => {
        set({ selectedVehicle: vehicle });
    },

    // Update the location of a specific vehicle
    updateVehicleLocation: async (id) => {
        try {
            const updatedVehicle = await vehiclesApi.updateVehicleLocation(id);
            if (!updatedVehicle) return;

            set((state) => ({
                vehicles: state.vehicles.map((vehicle) =>
                    vehicle.id === id ? updatedVehicle : vehicle
                ),
                selectedVehicle: state.selectedVehicle?.id === id ? updatedVehicle : state.selectedVehicle,
            }));
        } catch (error) {
            console.error("Failed to update vehicle location:", error);
        }
    },

    // Refresh both vehicles and statistics data
    refreshData: async () => {
        try {
            const { vehicles, statistics } = await vehiclesApi.refreshData();

            // Update the state with the new data
            set({
                vehicles,
                statistics,
                lastUpdated: new Date().toISOString(),
            });

            // Trigger a custom event to notify components to update
            window.dispatchEvent(new CustomEvent("store-data-refreshed"));

            return { success: true };
        } catch (error) {
            console.error("Failed to refresh data:", error);
            return { success: false, error };
        }
    },
}));
