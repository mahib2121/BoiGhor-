import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
    const warehouses = useLoaderData();

    const pos = [23.6850, 90.3563];
    const mapRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();

        const location = e.target.location.value.trim();
        if (!location) return;

        const district = warehouses.find(c =>
            c.district.toLowerCase().includes(location.toLowerCase())
        );

        if (district) {
            const coord = [district.latitude, district.longitude];

            if (mapRef.current) {
                mapRef.current.flyTo(coord, 10);
            }
        } else {
            alert("District not found");
        }
    };

    return (
        <div className="
            w-full mx-auto 
            bg-white shadow-lg 
            rounded-3xl 
            flex flex-col 
            gap-8 md:gap-12 
            p-6 md:p-16
        ">

            {/* Heading */}
            <h2 className="
                text-center
                text-[28px] md:text-[48px] 
                font-extrabold 
                font-['Urbanist']
                text-[#03373D]
                leading-tight
            ">
                We Are Available in All 64 Districts
            </h2>

            {/* Search Input */}
            <form
                onSubmit={handleSearch}
                className="w-full flex justify-center"
            >
                <input
                    type="text"
                    name="location"
                    placeholder="Search district..."
                    className="
                        input input-bordered 
                        w-full max-w-xs 
                        rounded-xl
                        px-4 py-2
                        text-sm md:text-base
                    "
                />
            </form>

            {/* Map Section */}
            <div className="
                w-full 
                h-[350px] md:h-[600px] 
                rounded-2xl 
                overflow-hidden 
                border border-gray-200
            ">
                <MapContainer
                    center={pos}
                    zoom={7}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                    whenCreated={(mapInstance) => {
                        mapRef.current = mapInstance;
                    }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {warehouses.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}
                        >
                            <Popup>
                                <strong>{center.district}</strong> <br />
                                Service Area: {center.covered_area.join(", ")}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

        </div>
    );
};

export default Coverage;
