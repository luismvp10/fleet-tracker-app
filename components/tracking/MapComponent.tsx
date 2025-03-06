"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {Vehicle, VehicleStatus} from "@/interfaces/entities/vehicle.entity";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Props {
    selectedVehicle: Vehicle;
}

export default function MapComponent({ selectedVehicle }: Props) {
    // Reference to the marker
    const markerRef = useRef<L.Marker>(null);

    useEffect(() => {
        // Fix Leaflet default icon issue
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })
    }, []);


    return (
        <div className="h-[500px] w-full">
            <MapContainer
                center={[selectedVehicle.location.latitude, selectedVehicle.location.longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[selectedVehicle.location.latitude, selectedVehicle.location.longitude]} ref={markerRef}>
                    <Popup>
                        <div className="p-1">
                            <h3 className="font-bold">{selectedVehicle.licensePlate}</h3>
                            <p>Driver: {selectedVehicle.driver}</p>
                            <p>
                                Status: <span className={getStatusClass(selectedVehicle.status)}>{selectedVehicle.status}</span>
                            </p>
                            <p className="text-xs mt-2">
                                {selectedVehicle.location.latitude.toFixed(6)}, {selectedVehicle.location.longitude.toFixed(6)}
                            </p>
                        </div>
                    </Popup>
                </Marker>
                <MapUpdater
                    position={[selectedVehicle.location.latitude, selectedVehicle.location.longitude]}
                    selectedVehicle={selectedVehicle}
                />
            </MapContainer>
        </div>
    )
}

// Map center updater component
function MapUpdater({ position }: { position: [number, number]; selectedVehicle: Vehicle }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position, 15)
    }, [map, position]);

    return null;
}

// Get status class
const getStatusClass = (status: VehicleStatus) => {
    switch (status) {
        case "ACTIVE":
            return "text-green-500";
        case "IDLE":
            return "text-yellow-500";
        case "MAINTENANCE":
            return "text-red-500";
        default:
            return "text-gray-500";
    }
}


