import {Vehicle, VehicleStatus} from "@/interfaces/entities/vehicle.entity";
import {Location} from "@/interfaces/entities/location.entity";

// Generate random coordinates near a base location
function generateRandomLocation(baseLat: number, baseLng: number, radiusKm = 5) {
    // 1 degree of latitude is approximately 111 km
    const latOffset: number = (Math.random() - 0.5) * (radiusKm / 111) * 2;
    // 1 degree of longitude varies based on latitude, but roughly 111 * cos(lat) km
    const lngFactor: number = Math.cos((baseLat * Math.PI) / 180);
    const lngOffset: number = (Math.random() - 0.5) * (radiusKm / (111 * lngFactor)) * 2;

    return {
        latitude: baseLat + latOffset,
        longitude: baseLng + lngOffset,
    };
}

// Generate a random date within the last n days
function randomDate(daysAgo = 30):string {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date.toISOString();
}

// Vehicle makes and models
const vehicleMakes: string[] = ["Ford", "Toyota", "Volvo", "Mercedes", "Scania"];

const vehicleModels = {
    Ford: ["F-150", "Transit", "Ranger"],
    Toyota: ["Hilux", "Land Cruiser", "Hiace"],
    Volvo: ["FH16", "FM", "FMX"],
    Mercedes: ["Actros", "Atego", "Sprinter"],
    Scania: ["R Series", "G Series", "P Series"],
} as const;

// Driver names
const driverFirstNames: string[]  = ["John", "Maria", "Carlos", "Sarah", "Miguel", "Emma", "David", "Sofia", "James", "Ana"];
const driverLastNames : string[] = [
    "Smith",
    "Garcia",
    "Rodriguez",
    "Johnson",
    "Martinez",
    "Brown",
    "Davis",
    "Lopez",
    "Wilson",
    "Gonzalez",
];

// License plate formats
function generateLicensePlate(): string {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numbers = "0123456789";

    let plate: string = "";

    // Format: AAA-1234
    for (let i = 0; i < 3; i++) {
        plate += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    plate += "-";

    for (let i = 0; i < 4; i++) {
        plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return plate
}

// Generate a full vehicle object
function generateVehicle(id: number): Vehicle {
    const make = vehicleMakes[Math.floor(Math.random() * vehicleMakes.length)] as keyof typeof vehicleModels;
    const model = vehicleModels[make][Math.floor(Math.random() * vehicleModels[make].length)];
    const firstName: string = driverFirstNames[Math.floor(Math.random() * driverFirstNames.length)];
    const lastName: string = driverLastNames[Math.floor(Math.random() * driverLastNames.length)];

    // Base location: Mexico City
    const baseLocation: Location = { latitude: 19.4326, longitude: -99.1332 };
    const location = generateRandomLocation(baseLocation.latitude, baseLocation.longitude, 10);

    // Random status with weighted distribution (more active vehicles)
    const statuses: VehicleStatus[] = ["ACTIVE", "IDLE", "MAINTENANCE"];
    const statusWeights: number[] = [0.7, 0.2, 0.1]; // 70% active, 20% idle, 10% maintenance
    const randomValue: number = Math.random();
    let statusIndex: number = 0;
    let cumulativeWeight: number = 0;

    for (let i = 0; i < statusWeights.length; i++) {
        cumulativeWeight += statusWeights[i];
        if (randomValue <= cumulativeWeight) {
            statusIndex = i;
            break;
        }
    }

    const status: VehicleStatus = statuses[statusIndex];

    // Generate random mileage between 10,000 and 100,000
    const mileage: number = Math.floor(10000 + Math.random() * 90000);

    // Generate random fuel level between 10% and 100%
    const fuelLevel: number = Math.floor(10 + Math.random() * 90);

    return {
        id: id.toString(),
        licensePlate: generateLicensePlate(),
        driver: `${firstName} ${lastName}`,
        status,
        location,
        heading: Math.floor(Math.random() * 360),
        lastUpdated: new Date().toISOString(),
        make,
        model,
        year: 2018 + Math.floor(Math.random() * 6), // 2018-2023
        mileage,
        fuelLevel,
        lastMaintenance: randomDate(90),
        nextMaintenance: randomDate(-90),
    }
}

// Generate dates for the last n days
export function generateDateRange(days = 15): string[] {
    const dates: string[] = [];
    const today = new Date();

    for (let i: number = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    }

    return dates;
}

// Update the generateVehicleMileageData function
export function generateVehicleMileageData(vehicleId: string, days = 15): number[] {
    // Start with a base mileage between 50-90 km
    const baseMileage: number = 50 + Math.floor(Math.random() * 40);
    let currentMileage: number = baseMileage;

    return Array.from({ length: days }, (_, i) => {
        // Add a small random increase (0-15 km) each day
        const increase: number = Math.floor(Math.random() * 15);
        currentMileage += increase;
        return currentMileage;
    })
}


// Generate mock vehicles data
export function generateMockVehicles(count = 20): Vehicle[] {
    return Array.from({ length: count }, (_, i) => generateVehicle(i + 1));
}

// Simulate vehicle movement
export function simulateVehicleMovement(vehicle: Vehicle): Vehicle {
    // Random movement between -0.0005 and 0.0005 degrees (roughly 50 meters)
    const latChange = (Math.random() - 0.5) * 0.001;
    const lngChange = (Math.random() - 0.5) * 0.001;

    // Calculate new heading (0-359 degrees)
    const heading = Math.floor(Math.random() * 360);

    // Update fuel level (slight decrease)
    const fuelLevel = Math.max(0, (vehicle.fuelLevel || 50) - Math.random() * 0.5);

    // Update mileage (slight increase)
    const mileageIncrease = Math.random() * 2; // 0-2 km
    const mileage = (vehicle.mileage || 0) + mileageIncrease;

    return {
        ...vehicle,
        location: {
            latitude: vehicle.location.latitude + latChange,
            longitude: vehicle.location.longitude + lngChange,
        },
        heading,
        fuelLevel,
        mileage,
        lastUpdated: new Date().toISOString(),
    };
}

// Generate fleet statistics
export function generateFleetStatistics(vehicles: Vehicle[]) {
    const totalVehicles: number = vehicles.length;
    const activeVehicles: number = vehicles.filter((v) => v.status === "ACTIVE").length;
    const idleVehicles: number = vehicles.filter((v) => v.status === "IDLE").length;
    const maintenanceVehicles: number = vehicles.filter((v) => v.status === "MAINTENANCE").length;

    // Calculate total distance (sum of all vehicle mileages)
    const totalDistance: number = vehicles.reduce((sum, vehicle) => sum + (vehicle.mileage || 0), 0);

    // Calculate average fuel level
    const avgFuelLevel: number = vehicles.reduce((sum, vehicle) => sum + (vehicle.fuelLevel || 0), 0) / totalVehicles;

    // Calculate vehicles needing maintenance (fuel < 20% or random)
    const alerts: number = vehicles.filter((v) => (v.fuelLevel || 0) < 20 || Math.random() < 0.1).length;

    return {
        totalVehicles,
        activeVehicles,
        idleVehicles,
        maintenanceVehicles,
        totalDistance,
        avgFuelLevel,
        alerts,
    };
}


export function generateFleetMileageData() {
    const dates: string[] = generateDateRange();
    const baseTotalMileage: number = 800 + Math.floor(Math.random() * 300);
    const totalMileageIncrement: number = 40 + Math.floor(Math.random() * 20);

    let totalDistance = 0;

    const data = dates.map((date, i) => {
        const randomFactor: number = Math.random() * 200 - 100;
        const totalMileage: number = Math.round(baseTotalMileage + i * totalMileageIncrement + randomFactor);
        totalDistance += totalMileage;

        const dayOfWeek = new Date(date).getDay();
        let avgFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 + Math.random() * 0.4
            : dayOfWeek === 1 || dayOfWeek === 5 ? 0.9 + Math.random() * 0.4
                : 1.0 + Math.random() * 0.5;

        const randomVariation: number = Math.random() * 15 - 7;
        const avgMileage: number = Math.round(60 + i * 2 * avgFactor + randomVariation);

        return {
            date,
            "Total Fleet Mileage (km)": totalMileage,
            "Average Vehicle Mileage (km)": avgMileage,
        };
    });

    return { data, totalDistance };
}
