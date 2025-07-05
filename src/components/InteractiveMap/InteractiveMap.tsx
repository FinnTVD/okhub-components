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

  if (!mounted) return null

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
      className={`w-full h-full absolute top-0 left-0 !bg-transparent !z-10 ${className}`}
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