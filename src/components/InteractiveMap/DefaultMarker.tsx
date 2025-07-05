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

// Create custom icon with inline SVG
const createIcon = (isSelected: boolean) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM12.5 17C10.6 17 9 15.4 9 13.5C9 11.6 10.6 10 12.5 10C14.4 10 16 11.6 16 13.5C16 15.4 14.4 17 12.5 17Z" 
              fill="${isSelected ? '#3B82F6' : '#EF4444'}"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
}

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
  const icon = createIcon(isSelected)

  return (
    <Marker
      position={position}
      icon={icon}
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