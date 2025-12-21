import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { motion } from "framer-motion";
import { MapPin, Search, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

// --- LEAFLET MARKER FIX (Required for React/Vite) ---
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
// ----------------------------------------------------

const Coverage = () => {
    const warehouses = useLoaderData();
    const [map, setMap] = useState(null); // State to store map instance
    const [searchVal, setSearchVal] = useState("");

    // Bangladesh Center Coordinates
    const defaultPos = [23.6850, 90.3563];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchVal.trim()) return;

        const foundDistrict = warehouses.find(c =>
            c.district.toLowerCase().includes(searchVal.toLowerCase())
        );

        if (foundDistrict && map) {
            // Fly to the new coordinates with a smooth animation
            map.flyTo([foundDistrict.latitude, foundDistrict.longitude], 10, {
                duration: 2
            });
        } else {
            // You could use a toast here instead of alert
            alert("District not found in our coverage area.");
        }
    };

    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Header Section --- */}
                <div className="flex flex-col items-center text-center mb-10 space-y-2">
                    <div className="flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
                        <MapPin size={16} />
                        <span>Nationwide Delivery</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content">
                        We Are Available in All 64 Districts
                    </h2>
                    <p className="text-base-content/60 max-w-lg">
                        Find our nearest delivery hub or warehouse in your area. We deliver fast, everywhere.
                    </p>
                </div>

                {/* --- Main Content Card --- */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-base-200">

                    {/* Search Bar Wrapper */}
                    <div className="bg-base-200/50 p-6 border-b border-base-200">
                        <form onSubmit={handleSearch} className="max-w-md mx-auto">
                            <div className="join w-full shadow-sm">
                                <input
                                    type="text"
                                    placeholder="Search your district (e.g. Dhaka)..."
                                    className="input input-bordered join-item w-full focus:outline-none focus:border-primary"
                                    value={searchVal}
                                    onChange={(e) => setSearchVal(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary join-item text-white">
                                    <Search size={18} />
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-[400px] md:h-[600px] z-0"
                    >
                        <MapContainer
                            center={defaultPos}
                            zoom={7}
                            scrollWheelZoom={false}
                            className="w-full h-full"
                            // In newer React-Leaflet, we use ref callback to get map instance
                            ref={setMap}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {warehouses.map((center, index) => (
                                <Marker
                                    key={index}
                                    position={[center.latitude, center.longitude]}
                                >
                                    <Popup className="custom-popup">
                                        <div className="p-1 min-w-[150px]">
                                            <div className="flex items-center gap-2 mb-2 text-primary">
                                                <Navigation size={16} />
                                                <h3 className="font-bold text-base">{center.district} Hub</h3>
                                            </div>
                                            <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-lg">
                                                <span className="font-semibold block mb-1">Service Areas:</span>
                                                {center.covered_area.join(", ")}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Coverage;