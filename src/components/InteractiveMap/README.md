# InteractiveMap Component

Component map tương tác có thể tái sử dụng cho nhiều dự án, được xây dựng trên Leaflet và React.
Link download geo-json : https://gadm.org/download_country.html
## 📁 Cấu trúc

```
src/shared/components/InteractiveMap/
├── InteractiveMap.tsx     # Component chính
├── DefaultMarker.tsx      # Marker mặc định
├── MapExample.tsx         # Ví dụ sử dụng
├── index.ts              # Export file
└── README.md             # Hướng dẫn sử dụng
```

## 🚀 Tính năng

- ✅ Hiển thị map với GeoJSON data
- ✅ Tương tác với markers (click, hover)
- ✅ Zoom in/out controls
- ✅ Re-center map
- ✅ Custom styling cho regions
- ✅ Custom marker components
- ✅ SSR compatible
- ✅ TypeScript support

## 📦 Cài đặt

```bash
npm install leaflet react-leaflet
npm install --save-dev @types/leaflet
```

## 💻 Sử dụng cơ bản

```tsx
import { InteractiveMap, CityData, MapConfig } from '@/shared/components/InteractiveMap'

const cityList: CityData[] = [
  {
    value: 'hanoi',
    city: 'hanoi',
    label: 'Hà Nội',
    lat: 21.0285,
    lng: 105.8542,
  },
  // ... more cities
]

const mapConfig: MapConfig = {
  center: [21.6199771, 105.1985886],
  zoom: 7,
  minZoom: 6,
  maxZoom: 9,
}

function MyComponent() {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null)

  return (
    <div className="w-full h-screen relative">
      <InteractiveMap
        config={mapConfig}
        geoJsonData={yourGeoJsonData}
        cityList={cityList}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
      />
    </div>
  )
}
```

## 📋 Props

### InteractiveMapProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `MapConfig` | ✅ | Cấu hình map (center, zoom, etc.) |
| `geoJsonData` | `GeoJsonObject` | ✅ | Dữ liệu GeoJSON cho regions |
| `cityList` | `CityData[]` | ✅ | Danh sách cities với coordinates |
| `selectedCity` | `CityData \| null` | ✅ | City đang được chọn |
| `onCitySelect` | `(city: CityData) => void` | ✅ | Callback khi chọn city |
| `style` | `MapStyle` | ❌ | Custom style cho regions |
| `zoomIn` | `number` | ❌ | Trigger zoom in |
| `zoomOut` | `number` | ❌ | Trigger zoom out |
| `reCenter` | `number` | ❌ | Trigger re-center |
| `className` | `string` | ❌ | Custom CSS classes |
| `customMarkerComponent` | `React.ComponentType` | ❌ | Custom marker component |
| `markerProps` | `Record<string, unknown>` | ❌ | Props cho marker component |
| `onMapReady` | `(map: L.Map) => void` | ❌ | Callback khi map ready |
| `onCityHover` | `(city: CityData \| null) => void` | ❌ | Callback khi hover city |

### MapConfig

```tsx
interface MapConfig {
  center: [number, number]  // [lat, lng]
  zoom: number
  minZoom?: number
  maxZoom?: number
  zoomControl?: boolean
  attributionControl?: boolean
}
```

### CityData

```tsx
interface CityData {
  value: string
  city: string
  label: string
  lat?: number
  lng?: number
}
```

### MapStyle

```tsx
interface MapStyle {
  fillColor: string
  fillOpacity: number
  color: string
  weight: number
  opacity: number
  selectedFillOpacity?: number
}
```

## 🎨 Custom Marker Component

Bạn có thể tạo custom marker component:

```tsx
import { Marker, Popup } from 'react-leaflet'
import { CityData } from '@/shared/components/InteractiveMap'

interface CustomMarkerProps {
  value: string
  position: [number, number]
  label: string
  city: string
  handleCitySelect: (city: CityData) => void
  selectedCity: CityData | null
  onHover?: () => void
  onLeave?: () => void
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  value,
  position,
  label,
  city,
  handleCitySelect,
  selectedCity,
  onHover,
  onLeave,
}) => {
  return (
    <Marker
      position={position}
      eventHandlers={{
        click: () => handleCitySelect({value, city, label}),
        mouseover: onHover,
        mouseout: onLeave,
      }}
    >
      <Popup>
        <div>{label}</div>
      </Popup>
    </Marker>
  )
}

// Sử dụng
<InteractiveMap
  // ... other props
  customMarkerComponent={CustomMarker}
/>
```

## 🎮 Controls

Để sử dụng zoom controls:

```tsx
const [zoomIn, setZoomIn] = useState(0)
const [zoomOut, setZoomOut] = useState(0)
const [reCenter, setReCenter] = useState(0)

const handleZoomIn = () => setZoomIn(prev => prev + 1)
const handleZoomOut = () => setZoomOut(prev => prev + 1)
const handleReCenter = () => setReCenter(prev => prev + 1)

<InteractiveMap
  // ... other props
  zoomIn={zoomIn}
  zoomOut={zoomOut}
  reCenter={reCenter}
/>
```

## 🎨 Styling

Custom style cho regions:

```tsx
const customStyle: MapStyle = {
  fillColor: '#1C599E',
  fillOpacity: 0.24,
  color: '#ffffff',
  weight: 2,
  opacity: 1,
  selectedFillOpacity: 1, // Opacity khi region được chọn
}

<InteractiveMap
  // ... other props
  style={customStyle}
/>
```

## 🔄 Callbacks

```tsx
<InteractiveMap
  // ... other props
  onMapReady={(map) => {
    console.log('Map is ready:', map)
    // Có thể thêm custom controls, layers, etc.
  }}
  onCityHover={(city) => {
    console.log('Hovering city:', city)
    // Hiển thị tooltip, highlight, etc.
  }}
/>
```

## 📝 Ví dụ hoàn chỉnh

Xem file `MapExample.tsx` để có ví dụ hoàn chỉnh về cách sử dụng component.

## ⚠️ Lưu ý

1. **SSR**: Component sử dụng dynamic imports để tương thích với SSR
2. **Leaflet CSS**: Đảm bảo import `leaflet/dist/leaflet.css`
3. **GeoJSON**: Dữ liệu GeoJSON phải có property `VARNAME_1` để highlight regions
4. **Coordinates**: Sử dụng format `[lat, lng]` cho tất cả coordinates
5. **Icon**: Cần có file `/icons/map-marker.svg` hoặc thay đổi icon trong DefaultMarker

## 🔧 Migration từ Leaflet cũ

Nếu bạn đang sử dụng component Leaflet cũ, có thể migrate dễ dàng:

```tsx
// Cũ
import Leaflet from '@/app/[locale]/(main)/_components/section_map/Leaflet'

// Mới
import { InteractiveMap } from '@/shared/components/InteractiveMap'

// Chuyển đổi props
const mapConfig = {
  center: [21.6199771, 105.1985886],
  zoom: 7,
  minZoom: 6,
  maxZoom: 9,
  zoomControl: false,
  attributionControl: false,
}

<InteractiveMap
  config={mapConfig}
  geoJsonData={geojsonData}
  cityList={cityList}
  selectedCity={selectedCity}
  onCitySelect={handleCitySelect}
  zoomIn={zoomIn}
  zoomOut={zoomOut}
  reCenter={reCenter}
/>
``` 