'use client'

import {FC} from 'react'
import {Marker, Popup} from 'react-leaflet'
import {Icon} from 'leaflet'
import {CityData} from './InteractiveMap'

// Types
export interface DefaultMarkerProps {
  value: string
  position: [number, number]
  label: string
  city: string
  handleCitySelect: (city: CityData) => void
  selectedCity: CityData | null
  onHover?: () => void
  onLeave?: () => void
}

// Default marker icon
const defaultIcon = new Icon({
  iconUrl: '/icons/map-marker.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const DefaultMarker: FC<DefaultMarkerProps> = ({
  value,
  position,
  label,
  city,
  handleCitySelect,
  selectedCity,
  onHover,
  onLeave,
}) => {
  const isSelected = selectedCity?.value === value

  return (
    <Marker
      position={position}
      icon={defaultIcon}
      eventHandlers={{
        click: () => handleCitySelect({value, city, label}),
        mouseover: onHover,
        mouseout: onLeave,
      }}
    >
      <Popup>
        <div className={`text-center ${isSelected ? 'bg-blue-50' : ''}`}>
          <h3 className={`font-semibold ${isSelected ? 'text-blue-600' : ''}`}>
            {label}
          </h3>
          <p className="text-sm text-gray-600">{city}</p>
          {isSelected && (
            <p className="text-xs text-blue-500 mt-1">✓ Selected</p>
          )}
        </div>
      </Popup>
    </Marker>
  )
}

export default DefaultMarker 