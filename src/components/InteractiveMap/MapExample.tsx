"use client";

import { useState } from "react";
import exampleGeoJsonData from "./custom.geo.json";
import InteractiveMap, {
  CityData,
  MapConfig,
  MapStyle,
} from "./InteractiveMap";
import type { GeoJsonObject } from "geojson";
// Example city data
const exampleCityList: CityData[] = [
  {
    value: "hanoi",
    city: "hanoi",
    label: "Hà Nội",
    lat: 21.0285,
    lng: 105.8542,
  },
  {
    value: "hochiminh",
    city: "hochiminh",
    label: "TP. Hồ Chí Minh",
    lat: 10.8231,
    lng: 106.6297,
  },
  {
    value: "danang",
    city: "danang",
    label: "Đà Nẵng",
    lat: 16.0544,
    lng: 108.2022,
  },
];

// Example map configuration
const mapConfig: MapConfig = {
  center: [21.6199771, 105.1985886],
  zoom: 7,
  minZoom: 6,
  maxZoom: 9,
  zoomControl: false,
  attributionControl: false,
};

// Example custom style
const customStyle: MapStyle = {
  fillColor: "#1C599E",
  fillOpacity: 0.24,
  color: "#ffffff",
  weight: 2,
  opacity: 1,
  selectedFillOpacity: 1,
};

const MapExample: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [zoomIn, setZoomIn] = useState(0);
  const [zoomOut, setZoomOut] = useState(0);
  const [reCenter, setReCenter] = useState(0);

  const handleCitySelect = (city: CityData) => {
    setSelectedCity(city);
    console.log("Selected city:", city);
  };

  const handleZoomIn = () => {
    setZoomIn((prev) => prev + 1);
  };

  const handleZoomOut = () => {
    setZoomOut((prev) => prev + 1);
  };

  const handleReCenter = () => {
    setReCenter((prev) => prev + 1);
  };

  return (
    <div className="w-full h-screen relative">
      {/* Map Container */}
      <div className="w-full h-full relative">
        <InteractiveMap
          config={mapConfig}
          style={customStyle}
          geoJsonData={exampleGeoJsonData as GeoJsonObject}
          cityList={exampleCityList}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          reCenter={reCenter}
          onMapReady={(map) => {
            console.log("Map is ready:", map);
          }}
          onCityHover={(city) => {
            console.log("City hover:", city);
          }}
        />
      </div>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-20">
        <h3 className="text-lg font-semibold mb-4">Map Controls</h3>

        <div className="space-y-2">
          <button
            onClick={handleZoomIn}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zoom In
          </button>

          <button
            onClick={handleZoomOut}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zoom Out
          </button>

          <button
            onClick={handleReCenter}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Re-center
          </button>
        </div>

        {selectedCity && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm">
              <strong>Selected:</strong> {selectedCity.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapExample;
