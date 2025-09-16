import { useState, useEffect, useRef } from 'react'

const CrowdHeatMap = ({ onNavigate }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [timeRange, setTimeRange] = useState('now')
  const [viewMode, setViewMode] = useState('heatmap') // 'heatmap' or 'list'
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [alertLocation, setAlertLocation] = useState('')
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  const API_KEY = 'AIzaSyCDZ7DMMqlyhtg9Dqodo926E5ZfU0NuqH4'

  const locations = [
    {
      id: 1,
      name: 'Har Ki Pauri',
      crowd: 'low',
      coordinates: { x: 60, y: 40, lat: 29.9557, lng: 78.1642 },
      capacity: '85%',
      waitTime: '5 mins',
      type: 'ghat',
      facilities: ['washroom', 'water', 'medical'],
      peakHours: ['6:00 AM', '7:00 PM'],
      description: 'Main ghat for Ganga Aarti',
      currentVisitors: 850,
      maxCapacity: 1000,
      trend: 'increasing',
      averageStayTime: '45 mins'
    },
    {
      id: 2,
      name: 'Triveni Sangam',
      crowd: 'high',
      coordinates: { x: 45, y: 60, lat: 25.4358, lng: 81.8463 },
      capacity: '95%',
      waitTime: '25 mins',
      type: 'ghat',
      facilities: ['washroom', 'water'],
      peakHours: ['5:00 AM', '8:00 PM'],
      description: 'Holy confluence of three rivers',
      currentVisitors: 2850,
      maxCapacity: 3000,
      trend: 'stable',
      averageStayTime: '90 mins'
    },
    {
      id: 3,
      name: 'Ram Ghat',
      crowd: 'moderate',
      coordinates: { x: 70, y: 30, lat: 29.9620, lng: 78.1025 },
      capacity: '60%',
      waitTime: '10 mins',
      type: 'ghat',
      facilities: ['washroom', 'water', 'parking'],
      peakHours: ['7:00 AM', '6:00 PM'],
      description: 'Peaceful ghat for prayers',
      currentVisitors: 600,
      maxCapacity: 1000,
      trend: 'decreasing',
      averageStayTime: '35 mins'
    },
    {
      id: 4,
      name: 'Main Entrance',
      crowd: 'high',
      coordinates: { x: 30, y: 20, lat: 29.9600, lng: 78.1500 },
      capacity: '90%',
      waitTime: '20 mins',
      type: 'entrance',
      facilities: ['security', 'information', 'parking'],
      peakHours: ['8:00 AM', '5:00 PM'],
      description: 'Primary entry point',
      currentVisitors: 1800,
      maxCapacity: 2000,
      trend: 'increasing',
      averageStayTime: '15 mins'
    },
    {
      id: 5,
      name: 'Food Court',
      crowd: 'moderate',
      coordinates: { x: 50, y: 75, lat: 29.9540, lng: 78.1620 },
      capacity: '70%',
      waitTime: '12 mins',
      type: 'amenity',
      facilities: ['food', 'washroom', 'seating'],
      peakHours: ['12:00 PM', '7:00 PM'],
      description: 'Dining and refreshment area',
      currentVisitors: 350,
      maxCapacity: 500,
      trend: 'increasing',
      averageStayTime: '25 mins'
    },
    {
      id: 6,
      name: 'Parking Zone A',
      crowd: 'low',
      coordinates: { x: 15, y: 45, lat: 29.9580, lng: 78.1480 },
      capacity: '40%',
      waitTime: '2 mins',
      type: 'parking',
      facilities: ['parking', 'shuttle'],
      peakHours: ['9:00 AM', '4:00 PM'],
      description: 'Vehicle parking area',
      currentVisitors: 200,
      maxCapacity: 500,
      trend: 'stable',
      averageStayTime: '180 mins'
    },
    {
      id: 7,
      name: 'Medical Center',
      crowd: 'low',
      coordinates: { x: 80, y: 65, lat: 29.9530, lng: 78.1650 },
      capacity: '30%',
      waitTime: '0 mins',
      type: 'medical',
      facilities: ['medical', 'pharmacy', 'ambulance'],
      peakHours: ['10:00 AM', '3:00 PM'],
      description: 'Emergency medical services',
      currentVisitors: 15,
      maxCapacity: 50,
      trend: 'stable',
      averageStayTime: '20 mins'
    }
  ]

  // Initialize Google Maps for enhanced crowd visualization
  useEffect(() => {
    if (mapRef.current) {
      if (typeof window.google === 'undefined') {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=visualization,places`
        script.async = true
        script.defer = true
        script.onload = () => {
          setTimeout(initializeMap, 100)
        }
        document.head.appendChild(script)
      } else {
        setTimeout(initializeMap, 100)
      }
    }
  }, [viewMode, filterType])

  const initializeMap = () => {
    if (mapRef.current && window.google && window.google.maps && window.google.maps.visualization) {
      try {
        const defaultCenter = { lat: 29.9557, lng: 78.1642 }

        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          zoom: 13,
          center: defaultCenter,
          mapTypeId: 'roadmap',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

      // Add heatmap layer
      const heatmapData = locations.map(location => ({
        location: new window.google.maps.LatLng(location.coordinates.lat, location.coordinates.lng),
        weight: location.currentVisitors / 100
      }))

      const heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: mapInstance.current,
        radius: 50,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
      })

      // Add custom markers
      locations.forEach(location => {
        const markerColor = getCrowdColorHex(location.crowd)

        const marker = new window.google.maps.Marker({
          position: { lat: location.coordinates.lat, lng: location.coordinates.lng },
          map: mapInstance.current,
          title: location.name,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="${markerColor}" stroke="white" stroke-width="3"/>
                <text x="20" y="26" text-anchor="middle" font-size="16" fill="white">${location.currentVisitors}</text>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(40, 40)
          }
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px;">${location.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 14px;">${location.description}</p>
              <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                <span>Visitors: <strong>${location.currentVisitors}/${location.maxCapacity}</strong></span>
                <span>Wait: <strong>${location.waitTime}</strong></span>
              </div>
              <div style="margin-top: 8px;">
                <span style="background: ${markerColor}; color: white; padding: 2px 6px; border-radius: 12px; font-size: 12px;">
                  ${location.crowd.toUpperCase()} CROWD
                </span>
              </div>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstance.current, marker)
        })
      })

      console.log('Crowd heatmap initialized successfully')
      } catch (error) {
        console.error('Error initializing crowd heatmap:', error)
      }
    } else {
      console.log('Google Maps Visualization API not ready yet')
    }
  }

  const getCrowdColor = (crowd) => {
    switch (crowd) {
      case 'low':
        return 'bg-green-500'
      case 'moderate':
        return 'bg-yellow-500'
      case 'high':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCrowdColorHex = (crowd) => {
    switch (crowd) {
      case 'low':
        return '#10b981'
      case 'moderate':
        return '#f59e0b'
      case 'high':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const getCrowdSize = (crowd) => {
    switch (crowd) {
      case 'low':
        return 'w-3 h-3'
      case 'moderate':
        return 'w-4 h-4'
      case 'high':
        return 'w-5 h-5'
      default:
        return 'w-3 h-3'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return '📈'
      case 'decreasing':
        return '📉'
      case 'stable':
        return '➡️'
      default:
        return '➡️'
    }
  }

  const getFilteredLocations = () => {
    if (filterType === 'all') return locations
    return locations.filter(loc => loc.type === filterType)
  }

  const predictions = [
    { time: '2:00 PM', location: 'Har Ki Pauri', crowd: 'high', action: 'avoid', confidence: 85 },
    { time: '3:30 PM', location: 'Food Court', crowd: 'very-high', action: 'avoid', confidence: 92 },
    { time: '5:00 PM', location: 'Triveni Sangam', crowd: 'moderate', action: 'ok', confidence: 78 },
    { time: '6:00 PM', location: 'Ram Ghat', crowd: 'low', action: 'recommended', confidence: 90 }
  ]

  const liveAlerts = [
    { type: 'critical', message: 'Emergency: Medical incident at Triveni Sangam - avoid area', time: '1 min ago', urgent: true },
    { type: 'warning', message: 'Heavy crowd buildup at Har Ki Pauri - 25+ min delays expected', time: '2 mins ago', urgent: false },
    { type: 'info', message: 'New express shuttle service available from Parking Zone A to Ram Ghat', time: '5 mins ago', urgent: false },
    { type: 'success', message: 'Parking Zone B now has 200+ free spots available', time: '10 mins ago', urgent: false }
  ]

  const handleSetAlert = (locationName) => {
    setAlertLocation(locationName)
    setShowAlertModal(true)
  }

  if (selectedLocation) {
    const location = locations.find(loc => loc.id === selectedLocation)
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`text-white p-4 ${
          location.crowd === 'low' ? 'bg-green-500' :
          location.crowd === 'moderate' ? 'bg-yellow-500' :
          'bg-red-500'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedLocation(null)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold">{location.name}</h1>
                <p className="text-white/80 text-sm">{location.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">{getTrendIcon(location.trend)}</div>
              <div className="text-xs text-white/80 capitalize">{location.trend}</div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Enhanced Crowd Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <div className="text-center mb-6">
              <div className={`w-24 h-24 rounded-full ${getCrowdColor(location.crowd)} mx-auto mb-4 flex items-center justify-center relative`}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{location.currentVisitors}</div>
                  <div className="text-xs text-white/80">visitors</div>
                </div>
                {location.trend === 'increasing' && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📈</span>
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{location.crowd} Crowd</h2>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCrowdColor(location.crowd)}`}
                    style={{ width: location.capacity }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{location.capacity}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{location.waitTime}</div>
                <div className="text-sm text-gray-600">Wait Time</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{location.averageStayTime}</div>
                <div className="text-sm text-gray-600">Avg. Stay</div>
              </div>
            </div>
          </div>

          {/* Real-time Statistics */}
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Real-time Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Max Capacity:</span>
                <span className="font-medium text-gray-800 ml-2">{location.maxCapacity}</span>
              </div>
              <div>
                <span className="text-gray-600">Current:</span>
                <span className="font-medium text-gray-800 ml-2">{location.currentVisitors}</span>
              </div>
              <div>
                <span className="text-gray-600">Occupancy:</span>
                <span className="font-medium text-gray-800 ml-2">{location.capacity}</span>
              </div>
              <div>
                <span className="text-gray-600">Trend:</span>
                <span className="font-medium text-gray-800 ml-2">{getTrendIcon(location.trend)} {location.trend}</span>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Available Facilities</h3>
            <div className="grid grid-cols-2 gap-2">
              {location.facilities.map((facility, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm flex items-center"
                >
                  {facility === 'washroom' && '🚽'}
                  {facility === 'water' && '💧'}
                  {facility === 'medical' && '🏥'}
                  {facility === 'parking' && '🅿️'}
                  {facility === 'food' && '🍽️'}
                  {facility === 'security' && '🛡️'}
                  {facility === 'information' && 'ℹ️'}
                  {facility === 'seating' && '🪑'}
                  {facility === 'shuttle' && '🚌'}
                  {facility === 'pharmacy' && '💊'}
                  {facility === 'ambulance' && '🚑'}
                  <span className="ml-2 capitalize">{facility}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">⏰ Peak Hours</h3>
            <div className="flex space-x-3 mb-2">
              {location.peakHours.map((hour, index) => (
                <div key={index} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium">
                  {hour}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600">Avoid these times for better experience</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('navigation')}
              className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>📍</span>
              <span>Get Smart Route</span>
            </button>
            <button
              onClick={() => handleSetAlert(location.name)}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>🔔</span>
              <span>Set Crowd Alert</span>
            </button>
            <button
              onClick={() => onNavigate('washroom')}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>🚽</span>
              <span>Find Nearby Facilities</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold">Live Crowd Monitor</h1>
              <p className="text-blue-100 text-sm">AI-powered crowd intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'heatmap' ? 'map' : 'heatmap')}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {viewMode === 'heatmap' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l6 3 6-3v13l-6 3-6-3z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
            </button>
            <div className="text-xs text-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex space-x-2 overflow-x-auto mb-3">
          {[
            { key: 'all', label: '🏛️ All Locations', count: locations.length },
            { key: 'ghat', label: '🏞️ Ghats', count: locations.filter(l => l.type === 'ghat').length },
            { key: 'entrance', label: '🚪 Entrances', count: locations.filter(l => l.type === 'entrance').length },
            { key: 'amenity', label: '🍽️ Amenities', count: locations.filter(l => l.type === 'amenity').length },
            { key: 'parking', label: '🅿️ Parking', count: locations.filter(l => l.type === 'parking').length },
            { key: 'medical', label: '🏥 Medical', count: locations.filter(l => l.type === 'medical').length }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterType(filter.key)}
              className={`px-3 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex items-center space-x-1 ${
                filterType === filter.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`text-xs px-1 rounded ${
                filterType === filter.key ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Time Range:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
            >
              <option value="now">📍 Right Now</option>
              <option value="1hour">⏰ Next Hour</option>
              <option value="3hours">🔮 Next 3 Hours</option>
              <option value="today">📅 Today</option>
            </select>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Google Maps Heatmap View */}
        <div className="bg-white rounded-2xl p-3 shadow-md mb-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              {viewMode === 'map' ? '🌡️ Live Crowd Heatmap' : '🗺️ Interactive Heat Map'}
            </h3>
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Moderate</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High</span>
              </div>
            </div>
          </div>
          <div
            ref={mapRef}
            className="w-full h-96 rounded-xl border border-gray-200"
            style={{
              minHeight: '384px',
              backgroundColor: '#f3f4f6'
            }}
          >
            {!window.google && (
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-xl">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading Google Maps...</p>
                  <p className="text-xs text-gray-500 mt-1">Please wait while we load the crowd data</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between p-2 text-sm text-gray-600 mt-2">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time crowd density</span>
            </span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span className="text-2xl">🌡️</span>
                <span className="text-xs">Heat zones</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-lg">📍</span>
                <span className="text-xs">{locations.length} locations</span>
              </span>
            </div>
          </div>
        </div>


        {/* Critical Alerts */}
        <div className="space-y-2 mb-4">
          {liveAlerts.filter(alert => alert.urgent).map((alert, index) => (
            <div key={index} className="bg-red-500 text-white p-4 rounded-2xl animate-pulse">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚨</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{alert.message}</p>
                  <p className="text-red-100 text-xs">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Live Alerts */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">📢 Live Alerts & Updates</h3>
          <div className="space-y-3">
            {liveAlerts.filter(alert => !alert.urgent).map((alert, index) => (
              <div key={index} className={`p-4 rounded-xl border-l-4 ${
                alert.type === 'warning' ? 'bg-orange-50 border-orange-500 text-orange-800' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-500 text-blue-800' :
                'bg-green-50 border-green-500 text-green-800'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`rounded-full p-2 ${
                    alert.type === 'warning' ? 'bg-orange-100' :
                    alert.type === 'info' ? 'bg-blue-100' :
                    'bg-green-100'
                  }`}>
                    {alert.type === 'warning' && '⚠️'}
                    {alert.type === 'info' && 'ℹ️'}
                    {alert.type === 'success' && '✅'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs opacity-80 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">🔮 AI Crowd Predictions</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Powered by ML</span>
          </div>
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {prediction.action === 'recommended' ? '🟢' :
                     prediction.action === 'ok' ? '🟡' : '🔴'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{prediction.location}</p>
                    <p className="text-sm text-gray-600">{prediction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      prediction.action === 'recommended' ? 'bg-green-100 text-green-700' :
                      prediction.action === 'ok' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {prediction.crowd}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-xs text-gray-500">{prediction.confidence}% confidence</span>
                    <div className="w-8 bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Set Crowd Alert</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get notified when crowd levels change at {alertLocation}
            </p>

            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-orange-500" defaultChecked />
                <span className="text-sm">When crowd becomes LOW 🟢</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-orange-500" />
                <span className="text-sm">When crowd becomes HIGH 🔴</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-orange-500" />
                <span className="text-sm">30 minutes before peak hours ⏰</span>
              </label>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowAlertModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAlertModal(false)
                  // Mock alert setup
                }}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium"
              >
                Set Alert
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default CrowdHeatMap