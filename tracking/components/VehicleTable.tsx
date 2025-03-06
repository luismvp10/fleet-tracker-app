"use client"

import { useState, useEffect } from "react";
import { useVehicleStore } from "@/stores/vehicle-store";

import { Input } from "@/components/ui/input";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {VehicleStatus} from "@/interfaces/entities/vehicle.entity";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";


export function VehicleTable() {
    const { vehicles, loading, fetchVehicles, selectedVehicle, setSelectedVehicle } = useVehicleStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState(vehicles);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [paginatedVehicles, setPaginatedVehicles] = useState<typeof vehicles>([]);

    // Load vehicles on component mount
    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    // Filter vehicles when search query or vehicles change
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredVehicles(vehicles);
        } else {
            const query = searchQuery.toLowerCase()
            const filtered = vehicles.filter(
                (vehicle) =>
                    vehicle.licensePlate.toLowerCase().includes(query) ||
                    vehicle.driver.toLowerCase().includes(query) ||
                    vehicle.status.toLowerCase().includes(query) ||
                    (vehicle.make && vehicle.make.toLowerCase().includes(query)) ||
                    (vehicle.model && vehicle.model.toLowerCase().includes(query)),
            );
            setFilteredVehicles(filtered);
        }

        // Reset to first page when filters change
        setCurrentPage(1);
    }, [searchQuery, vehicles]);

    // Update pagination when filtered vehicles or page settings change
    useEffect(() => {
        const total: number = Math.ceil(filteredVehicles.length / pageSize);
        setTotalPages(total || 1);

        const start: number = (currentPage - 1) * pageSize;
        const end: number = start + pageSize;
        setPaginatedVehicles(filteredVehicles.slice(start, end));
    }, [filteredVehicles, currentPage, pageSize]);

    const getStatusColor = (status: VehicleStatus) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-500"
            case "IDLE":
                return "bg-yellow-500"
            case "MAINTENANCE":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="rounded-md border">
                    <div className="p-4">
                        <div className="space-y-3">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search vehicles..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Tabla con altura fija */}
            <div className="rounded-md border">
                <div className="h-[400px] overflow-hidden flex flex-col">
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>License Plate</TableHead>
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Location</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedVehicles.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No vehicles found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedVehicles.map((vehicle) => (
                                        <TableRow
                                            key={vehicle.id}
                                            className={`cursor-pointer hover:bg-muted/50 ${selectedVehicle?.id === vehicle.id ? "bg-muted" : ""}`}
                                            onClick={() => setSelectedVehicle(vehicle)}
                                        >
                                            <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                                            <TableCell>{vehicle.driver}</TableCell>
                                            <TableCell>
                                                {vehicle.make} {vehicle.model}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="flex w-fit items-center gap-1 font-normal">
                                                    <span className={`h-2 w-2 rounded-full ${getStatusColor(vehicle.status)}`} />
                                                    {vehicle.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {vehicle.location.latitude.toFixed(6)}, {vehicle.location.longitude.toFixed(6)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Pagination controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">{paginatedVehicles.length}</span> of{" "}
                        <span className="font-medium">{filteredVehicles.length}</span> vehicles
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">Rows per page</p>
                        <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={pageSize.toString()} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center justify-center sm:justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

