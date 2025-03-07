import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import { useVehicleStore } from "@/stores/vehicle-store"
import { describe, beforeEach, test, expect } from "@jest/globals"
import {vehiclesApi} from "@/services/vehicle.service";
import {DashboardHeader} from "@/components/dashboard/DashboardHeader";
import {DashboardCards} from "@/components/dashboard/DashboardCards";
import {DashboardChart} from "@/components/dashboard/DashboardChart";
import DashboardPage from "@/app/(admin)/dashboard/page";

// Mock the API service
jest.mock("@/services/vehicle.service", () => ({
    vehiclesApi: {
        getVehicles: jest.fn(),
        getFleetStatistics: jest.fn(),
        getMileageData: jest.fn(),
    },
}))

// Mock the store
jest.mock("@/stores/vehicle-store", () => ({
    useVehicleStore: jest.fn(),
}))

// Mock the components
jest.mock("@/components/dashboard/DashboardHeader", () => ({
    __esModule: true,
    DashboardHeader: ({ title, description }: { title: string; description: string }) => (
        <div data-testid="dashboard-header">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    ),
}));

jest.mock("@/components/dashboard/DashboardCards", () => ({
    __esModule: true,
    DashboardCards: () => <div data-testid="dashboard-cards">Dashboard Cards</div>,
}));

jest.mock("@/components/dashboard/DashboardChart", () => ({
    __esModule: true,
    DashboardChart: () => <div data-testid="dashboard-charts">Dashboard Charts</div>,
}));


describe("Dashboard Page Integration", () => {
    beforeEach(() => {
        jest.clearAllMocks()

        // Mock store implementation
        const mockStore = {
                vehicles: [],
                selectedVehicle: null,
                loading: false,
                error: null,
                statistics: {
                    totalVehicles: 20,
                    activeVehicles: 15,
                    idleVehicles: 3,
                    maintenanceVehicles: 2,
                    totalDistance: 15000,
                    avgFuelLevel: 75,
                    alerts: 2,
                },
                statisticsLoading: false,
                fetchVehicles: jest.fn(),
                fetchStatistics: jest.fn(),
                setSelectedVehicle: jest.fn(),
                updateVehicleLocation: jest.fn(),
                refreshData: jest.fn(),
            }
        ;(useVehicleStore as unknown as jest.Mock).mockImplementation(() => mockStore)
    })

    // test("should render dashboard page with all components", async () => {
    //     render(<DashboardPage />)
    //
    //     // Check if all components are rendered
    //     expect(screen.getByTestId("dashboard-header")).toBeInTheDocument()
    //     expect(screen.getByText("Dashboard")).toBeInTheDocument()
    //     expect(screen.getByText("Fleet mileage statistics for the last 15 days")).toBeInTheDocument()
    //
    //     expect(screen.getByTestId("dashboard-cards")).toBeInTheDocument()
    //     expect(screen.getByTestId("dashboard-charts")).toBeInTheDocument()
    //
    //     // Check if the chart title is rendered
    //     expect(screen.getByText("Fleet Mileage Overview")).toBeInTheDocument()
    // })
})

