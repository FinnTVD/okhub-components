"use client";

import { useState } from "react";
import exampleGeoJsonData from "@/components/InteractiveMap/custom.geo.json";
import InteractiveMap, {
  CityData,
  MapConfig,
  MapStyle,
} from "@/components/InteractiveMap/InteractiveMap";
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

export default function IndexInteractiveMap() {
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
}

export const MapExampleString = `
'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import {useEffect, useState} from 'react'
import type {GeoJsonObject, Feature, GeoJsonProperties, Geometry} from 'geojson'
import {useMap} from 'react-leaflet'

// Dynamic imports for SSR compatibility
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  {ssr: false},
)

const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  {ssr: false},
)



// Types
export interface CityData {
  value: string
  city: string
  label: string
  lat?: number
  lng?: number
}

export interface MapConfig {
  center: [number, number]
  zoom: number
  minZoom?: number
  maxZoom?: number
  zoomControl?: boolean
  attributionControl?: boolean
}

export interface MapStyle {
  fillColor: string
  fillOpacity: number
  color: string
  weight: number
  opacity: number
  selectedFillOpacity?: number
}

export interface InteractiveMapProps {
  // Map configuration
  config: MapConfig
  style?: MapStyle
  
  // Data
  geoJsonData: GeoJsonObject
  cityList: CityData[]
  
  // State
  selectedCity: CityData | null
  onCitySelect: (city: CityData) => void
  
  // Controls
  zoomIn?: number
  zoomOut?: number
  reCenter?: number
  
  // Customization
  className?: string
  customMarkerComponent?: React.ComponentType<{
    value: string
    position: [number, number]
    label: string
    city: string
    handleCitySelect: (city: CityData) => void
    selectedCity: CityData | null
    onHover?: () => void
    onLeave?: () => void
  }>
  markerProps?: Record<string, unknown>
  
  // Callbacks
  onMapReady?: (map: L.Map) => void
  onCityHover?: (city: CityData | null) => void
}

// Map Controller Component
const MapController = ({
  zoomIn,
  zoomOut,
  reCenter,
  selectedCity,
  config,
  onMapReady,
}: {
  zoomIn?: number
  zoomOut?: number
  reCenter?: number
  selectedCity: CityData | null
  config: MapConfig
  onMapReady?: (map: L.Map) => void
}) => {
  const map = useMap()

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map)
    }
  }, [map, onMapReady])

  useEffect(() => {
    if (zoomIn) {
      map.zoomIn()
    }
  }, [zoomIn, map])

  useEffect(() => {
    if (zoomOut) {
      map.zoomOut()
    }
  }, [zoomOut, map])

  useEffect(() => {
    if (reCenter) {
      map.setView(config.center, config.zoom)
    }
  }, [reCenter, map, config])

  // Fly to selected city
  useEffect(() => {
    if (selectedCity && selectedCity.lat && selectedCity.lng) {
      map.flyTo([selectedCity.lat, selectedCity.lng], config.zoom + 0.2, {
        duration: 1.5,
        easeLinearity: 0.25
      })
    }
  }, [selectedCity, map, config.zoom])

  return null
}

// Default Marker Component
const DefaultMarker = dynamic(() => import('./DefaultMarker').then(mod => mod.default), {ssr: false})

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  config,
  style,
  geoJsonData,
  cityList,
  selectedCity,
  onCitySelect,
  zoomIn,
  zoomOut,
  reCenter,
  className = '',
  customMarkerComponent: CustomMarker = DefaultMarker,
  markerProps = {},
  onMapReady,
  onCityHover,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={\`w-full h-full bg-gray-100 flex items-center justify-center \${className}\`}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }

  // Default style
  const defaultStyle: MapStyle = {
    fillColor: '#1C599E',
    fillOpacity: 0.24,
    color: '#ffffff',
    weight: 2,
    opacity: 1,
    selectedFillOpacity: 1,
  }

  const mapStyle = style || defaultStyle

  // Get style for GeoJSON features
  const getStyle = (
    feature: Feature<Geometry, GeoJsonProperties> | undefined,
  ) => {
    const cityName = feature?.properties?.VARNAME_1
    if (
      selectedCity &&
      cityName &&
      cityName.toLowerCase() === selectedCity.city.toLowerCase()
    ) {
      return {
        ...mapStyle,
        fillOpacity: mapStyle.selectedFillOpacity || mapStyle.fillOpacity,
      }
    }
    return mapStyle
  }

  return (
    <MapContainer
      center={config.center}
      zoom={config.zoom}
      minZoom={config.minZoom || 6}
      maxZoom={config.maxZoom || 9}
      className={\`w-full h-full absolute top-0 left-0 !bg-transparent !z-10 \${className}\`}
      zoomControl={config.zoomControl ?? false}
      attributionControl={config.attributionControl ?? false}
    >
      <MapController
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        reCenter={reCenter}
        selectedCity={selectedCity}
        config={config}
        onMapReady={onMapReady}
      />
      
      <GeoJSON
        data={geoJsonData}
        style={getStyle}
      />
      
      {cityList.map((city) => (
        <CustomMarker
          key={city.value}
          value={city.value}
          position={[city.lat ?? 0, city.lng ?? 0]}
          label={city.label}
          city={city.city}
          handleCitySelect={onCitySelect}
          selectedCity={selectedCity}
          onHover={onCityHover ? () => onCityHover(city) : undefined}
          onLeave={onCityHover ? () => onCityHover(null) : undefined}
          {...markerProps}
        />
      ))}
    </MapContainer>
  )
}

export default InteractiveMap 
`;
