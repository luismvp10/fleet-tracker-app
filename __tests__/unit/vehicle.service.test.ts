import { vehiclesApi } from "@/services/vehicle.service";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import {Vehicle, VehicleStatus} from "@/interfaces/entities/vehicle.entity";
import {Location} from "@/interfaces/entities/location.entity";

describe("Vehicle Service", () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("should fetch all vehicles", async () => {

        const mockVehicles: Vehicle[] = [
            {
                id: "1",
                licensePlate: "ABC123",
                driver: "John Doe",
                status: "ACTIVE",
                location: { latitude: 19.4326, longitude: -99.1332 } as Location, // Mocked location
                heading: 90, // Example heading
                lastUpdated: new Date().toISOString(),
                make: "Toyota",
                model: "Corolla",
                year: 2022,
                mileage: 25000,
                fuelLevel: 80,
                lastMaintenance: new Date().toISOString(),
                nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
            },
            {
                id: "2",
                licensePlate: "XYZ789",
                driver: "Jane Smith",
                status: "IDLE",
                location: { latitude: 34.0522, longitude: -118.2437 } as Location,
                heading: 180,
                lastUpdated: new Date().toISOString(),
                make: "Honda",
                model: "Civic",
                year: 2021,
                mileage: 18000,
                fuelLevel: 65,
                lastMaintenance: new Date().toISOString(),
                nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
            },
        ];



        jest.spyOn(vehiclesApi, "getVehicles").mockResolvedValue(mockVehicles);

        const result = await vehiclesApi.getVehicles();

        expect(result).toEqual(mockVehicles);
        expect(vehiclesApi.getVehicles).toHaveBeenCalledTimes(1);
    });

    it("should fetch a single vehicle by ID", async () => {
        const mockVehicle = {
                id: "2",
                licensePlate: "XYZ789",
                driver: "Jane Smith",
                status: "IDLE" as VehicleStatus,
                location: { latitude: 34.0522, longitude: -118.2437 } as Location,
                heading: 180,
                lastUpdated: new Date().toISOString(),
                make: "Honda",
                model: "Civic",
                year: 2021,
                mileage: 18000,
                fuelLevel: 65,
                lastMaintenance: new Date().toISOString(),
                nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
        };

        jest.spyOn(vehiclesApi, "getVehicle").mockResolvedValue(mockVehicle);

        const result = await vehiclesApi.getVehicle("1");

        expect(result).toEqual(mockVehicle);
        expect(vehiclesApi.getVehicle).toHaveBeenCalledWith("1");
    });

    it("should update vehicle location", async () => {
        const updatedVehicle: Vehicle = {
            id: "2",
            licensePlate: "XYZ789",
            driver: "Jane Smith",
            status: "IDLE",
            location: { latitude: 34.0522, longitude: -118.2437 } as Location,
            heading: 180,
            lastUpdated: new Date().toISOString(),
            make: "Honda",
            model: "Civic",
            year: 2021,
            mileage: 18000,
            fuelLevel: 65,
            lastMaintenance: new Date().toISOString(),
            nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
        };

        jest.spyOn(vehiclesApi, "updateVehicleLocation").mockResolvedValue(updatedVehicle);

        const result = await vehiclesApi.updateVehicleLocation("1");

        expect(result).toEqual(updatedVehicle);
        expect(vehiclesApi.updateVehicleLocation).toHaveBeenCalledWith("1");
    });

    it("should fetch fleet statistics", async () => {
        const mockStatistics = {
            totalVehicles: 20,
            activeVehicles: 20,
            idleVehicles: 2,
            maintenanceVehicles: 3,
            totalDistance: 15000,
            avgFuelLevel: 30,
            alerts:4
        };
        jest.spyOn(vehiclesApi, "getFleetStatistics").mockResolvedValue(mockStatistics);

        const result = await vehiclesApi.getFleetStatistics();

        expect(result).toEqual(mockStatistics);
        expect(vehiclesApi.getFleetStatistics).toHaveBeenCalledTimes(1);
    });

    it("should fetch mileage data", async () => {
        const mockMileageData = {
            dates: ["2023-03-01", "2023-03-02"],
            vehicles: [{ id: "1", name: "Toyota Corolla (ABC123)", color: "#3b82f6", mileage: [10, 20] }],
        };

        jest.spyOn(vehiclesApi, "getMileageData").mockResolvedValue(mockMileageData);

        const result = await vehiclesApi.getMileageData(15);

        expect(result).toEqual(mockMileageData);
        expect(vehiclesApi.getMileageData).toHaveBeenCalledWith(15);
    });

    it("should refresh data", async () => {
        const mockVehicles: Vehicle[] = [{
            id: "2",
            licensePlate: "XYZ789",
            driver: "Jane Smith",
            status: "IDLE",
            location: { latitude: 34.0522, longitude: -118.2437 } as Location,
            heading: 180,
            lastUpdated: new Date().toISOString(),
            make: "Honda",
            model: "Civic",
            year: 2021,
            mileage: 18000,
            fuelLevel: 65,
            lastMaintenance: new Date().toISOString(),
            nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
        }];
        const mockStatistics = {
            totalVehicles: 20,
            activeVehicles: 20,
            idleVehicles: 2,
            maintenanceVehicles: 3,
            totalDistance: 15000,
            avgFuelLevel: 30,
            alerts:4
        };

        jest.spyOn(vehiclesApi, "refreshData").mockResolvedValue({ vehicles: mockVehicles, statistics: mockStatistics });

        const result = await vehiclesApi.refreshData();

        expect(result).toEqual({ vehicles: mockVehicles, statistics: mockStatistics });
        expect(vehiclesApi.refreshData).toHaveBeenCalledTimes(1);
    });
});
