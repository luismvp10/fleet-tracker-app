import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import { useVehicleStore } from "@/stores/vehicle-store"
import { describe, beforeEach, test, expect } from "@jest/globals"
import TrackingPage from "@/app/(admin)/tracking/page";

// Mock the components
jest.mock("@/components/dashboard/DashboardHeader", () => ({
    DashboardHeader: ({ title, description }: { title: string; description: string }) => (
        <div data-testid="dashboard-header">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    ),
}))

jest.mock("@/components/tracking/TrackingMap", () => ({
    TrackingMap: () => <div data-testid="monitor-map">Monitor Map Component</div>,
}))

jest.mock("@/components/tracking/VehicleTable", () => ({
    VehicleTable: () => <div data-testid="vehicle-table">Vehicle Table Component</div>,
}))

// Mock the store
jest.mock("@/stores/vehicle-store", () => ({
    useVehicleStore: jest.fn(),
}))

describe("Monitor Page Integration", () => {
    beforeEach(() => {
        jest.clearAllMocks()

        // Mock store implementation
        const mockStore = {
                vehicles: [
                    {
                        id: "1",
                        licensePlate: "ABC-1234",
                        driver: "John Doe",
                        status: "Active",
                        location: { latitude: 19.4326, longitude: -99.1332 },
                        lastUpdated: new Date().toISOString(),
                    },
                ],
                selectedVehicle: null,
                loading: false,
                error: null,
                fetchVehicles: jest.fn(),
                setSelectedVehicle: jest.fn(),
            }
        ;(useVehicleStore as unknown as jest.Mock).mockImplementation(() => mockStore)
    })

    test("should render monitor page with all components", async () => {
        render(<TrackingPage />)

        // Check if all components are rendered
        expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
        expect(screen.getByText("Monitor")).toBeInTheDocument();
        expect(screen.getByText("Real-time vehicle tracking and status")).toBeInTheDocument();

        expect(screen.getByTestId("monitor-map")).toBeInTheDocument();
        expect(screen.getByTestId("vehicle-table")).toBeInTheDocument();

        // Check if the card titles are rendered
        expect(screen.getByText("Vehicle Location")).toBeInTheDocument();
        expect(screen.getByText("Vehicle List")).toBeInTheDocument();
    })
})

