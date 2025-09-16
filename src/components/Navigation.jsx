import { useState, useEffect, useRef } from 'react'

const Navigation = ({ onNavigate }) => {
  const [destination, setDestination] = useState('')
  const [showRoutes, setShowRoutes] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [isTracking, setIsTracking] = useState(false)
  const [mapMode, setMapMode] = useState('route') // 'route', 'map', 'offline'
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [showShuttleBooking, setShowShuttleBooking] = useState(false)
  const [selectedShuttle, setSelectedShuttle] = useState(null)
  const [shuttleBookingStep, setShuttleBookingStep] = useState(1)
  const [passengerCount, setPassengerCount] = useState(1)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  const API_KEY = 'AIzaSyCDZ7DMMqlyhtg9Dqodo926E5ZfU0NuqH4'

  const popularDestinations = [
    {
      name: 'Har Ki Pauri',
      distance: '2.3 km',
      crowd: 'moderate',
      coordinates: { lat: 29.9557, lng: 78.1642 },
      description: 'Sacred ghat on River Ganga'
    },
    {
      name: 'Triveni Sangam',
      distance: '1.8 km',
      crowd: 'high',
      coordinates: { lat: 25.4358, lng: 81.8463 },
      description: 'Confluence of three rivers'
    },
    {
      name: 'Ram Ghat',
      distance: '3.1 km',
      crowd: 'low',
      coordinates: { lat: 29.9620, lng: 78.1025 },
      description: 'Peaceful bathing ghat'
    },
    {
      name: 'Dashashwamedh Ghat',
      distance: '2.7 km',
      crowd: 'moderate',
      coordinates: { lat: 25.3176, lng: 83.0104 },
      description: 'Famous evening aarti location'
    }
  ]

  const routes = [
    {
      id: 1,
      name: 'Fastest Route',
      time: '15 mins',
      distance: '1.8 km',
      crowd: 'moderate',
      icon: '⚡',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      landmarks: ['Main Road', 'Bus Stand', 'Temple Square'],
      instructions: [
        'Head north on Kumbh Road',
        'Turn right at Main Market',
        'Continue straight for 800m',
        'Arrive at destination'
      ]
    },
    {
      id: 2,
      name: 'Least Crowded',
      time: '22 mins',
      distance: '2.4 km',
      crowd: 'low',
      icon: '👥',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      landmarks: ['Back Road', 'Quiet Lane', 'Service Path'],
      instructions: [
        'Take service road behind camp',
        'Follow signs to riverside path',
        'Walk along quiet lane',
        'Turn left at final junction'
      ]
    },
    {
      id: 3,
      name: 'Shuttle Route',
      time: '12 mins',
      distance: '1.5 km',
      crowd: 'low',
      icon: '🚌',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      landmarks: ['Shuttle Stop A', 'Bridge Crossing', 'Shuttle Stop B'],
      instructions: [
        'Walk to Shuttle Stop A (2 mins)',
        'Take Kumbh Express Bus',
        'Ride for 8 minutes',
        'Get off at destination stop'
      ]
    }
  ]

  const shuttleServices = [
    {
      id: 1,
      name: 'Kumbh Express',
      route: 'Main Gate ↔ Har Ki Pauri',
      frequency: '10 mins',
      capacity: 40,
      currentLoad: 12,
      price: 'Free',
      amenities: ['AC', 'GPS Tracking', 'Wheelchair Access'],
      nextDepartures: ['2:15 PM', '2:25 PM', '2:35 PM', '2:45 PM']
    },
    {
      id: 2,
      name: 'Sacred Circuit',
      route: 'Parking Zone A ↔ Ram Ghat',
      frequency: '15 mins',
      capacity: 30,
      currentLoad: 8,
      price: 'Free',
      amenities: ['Open Air', 'Audio Guide', 'Photo Stops'],
      nextDepartures: ['2:20 PM', '2:35 PM', '2:50 PM', '3:05 PM']
    },
    {
      id: 3,
      name: 'VIP Shuttle',
      route: 'Premium Parking ↔ All Ghats',
      frequency: '20 mins',
      capacity: 12,
      currentLoad: 3,
      price: '₹50',
      amenities: ['AC', 'Refreshments', 'Priority Boarding', 'Tour Guide'],
      nextDepartures: ['2:30 PM', '2:50 PM', '3:10 PM', '3:30 PM']
    }
  ]

  // Initialize Google Maps
  useEffect(() => {
    if (mapMode === 'map' && mapRef.current) {
      if (typeof window.google === 'undefined') {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places,geometry`
        script.async = true
        script.defer = true
        script.onload = () => {
          setTimeout(initializeMap, 100) // Small delay to ensure DOM is ready
        }
        document.head.appendChild(script)
      } else {
        setTimeout(initializeMap, 100)
      }
    }
  }, [mapMode])

  const initializeMap = () => {
    if (mapRef.current && window.google && window.google.maps) {
      try {
        const defaultCenter = { lat: 29.9557, lng: 78.1642 } // Haridwar coordinates

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

        // Add traffic layer
        const trafficLayer = new window.google.maps.TrafficLayer()
        trafficLayer.setMap(mapInstance.current)

        // Add markers for popular destinations
        popularDestinations.forEach(dest => {
          const marker = new window.google.maps.Marker({
            position: dest.coordinates,
            map: mapInstance.current,
            title: dest.name,
            animation: window.google.maps.Animation.DROP,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#f97316" stroke="white" stroke-width="3"/>
                  <circle cx="20" cy="20" r="12" fill="white"/>
                  <text x="20" y="26" text-anchor="middle" font-size="16" fill="#f97316">🕉️</text>
                </svg>
              `)}`,
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 40)
            }
          })

          // Add info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; color: #f97316; font-size: 16px;">${dest.name}</h3>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${dest.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; color: #888;">Distance: ${dest.distance}</span>
                  <span style="background: ${dest.crowd === 'low' ? '#10b981' : dest.crowd === 'moderate' ? '#f59e0b' : '#ef4444'};
                               color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px;">
                    ${dest.crowd.toUpperCase()} CROWD
                  </span>
                </div>
              </div>
            `
          })

          marker.addListener('click', () => {
            infoWindow.open(mapInstance.current, marker)
          })
        })

        console.log('Google Maps initialized successfully')
      } catch (error) {
        console.error('Error initializing Google Maps:', error)
      }
    } else {
      console.log('Google Maps API not ready yet')
    }
  }

  const getCurrentLocation = () => {
    setIsTracking(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setCurrentLocation(location)
          setIsTracking(false)

          if (mapInstance.current) {
            mapInstance.current.setCenter(location)
            new window.google.maps.Marker({
              position: location,
              map: mapInstance.current,
              icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#3b82f6"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                  </svg>
                `)}`,
                scaledSize: new window.google.maps.Size(24, 24)
              },
              title: 'Your Location'
            })
          }
        },
        (error) => {
          setIsTracking(false)
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const handleSearch = () => {
    if (destination.trim()) {
      setShowRoutes(true)
    }
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (!voiceEnabled) {
      // Mock voice activation
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Voice navigation activated. Say your destination.')
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const startNavigation = (route) => {
    if (route.name === 'Shuttle Route') {
      // Navigate to dedicated shuttle booking page
      onNavigate('shuttle-booking')
    } else {
      // Mock navigation start
      if ('speechSynthesis' in window && voiceEnabled) {
        const utterance = new SpeechSynthesisUtterance(`Starting navigation via ${route.name}. ${route.instructions[0]}`)
        window.speechSynthesis.speak(utterance)
      }
      // Add visual feedback for other routes
      alert(`Navigation started via ${route.name}!`)
    }
  }

  const handleShuttleSelect = (shuttle) => {
    setSelectedShuttle(shuttle)
    setShuttleBookingStep(2)
  }

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setShuttleBookingStep(3)
  }

  const confirmShuttleBooking = () => {
    // Mock booking confirmation
    setShuttleBookingStep(4)
    setTimeout(() => {
      setShowShuttleBooking(false)
      setShuttleBookingStep(1)
      setSelectedShuttle(null)
      setSelectedTimeSlot('')
      setPassengerCount(1)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1 hover:bg-teal-400 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold">Smart Navigation</h1>
              <p className="text-teal-100 text-sm">AI-powered route guidance</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-full transition-colors ${
                voiceEnabled ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-400'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={getCurrentLocation}
              disabled={isTracking}
              className="p-2 bg-teal-600 hover:bg-teal-400 rounded-full transition-colors disabled:opacity-50"
            >
              {isTracking ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Mode Toggle */}
        <div className="bg-white rounded-2xl p-3 shadow-md mb-4">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setMapMode('route')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                mapMode === 'route' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              🗺️ Routes
            </button>
            <button
              onClick={() => setMapMode('map')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                mapMode === 'map' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              🌐 Live Map
            </button>
            <button
              onClick={() => setMapMode('offline')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                mapMode === 'offline' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              📱 Offline
            </button>
          </div>
        </div>

        {/* Google Maps Container */}
        {mapMode === 'map' && (
          <div className="bg-white rounded-2xl p-3 shadow-md mb-4">
            <div className="mb-2">
              <h3 className="font-semibold text-gray-800 text-sm">🗺️ Live Navigation Map</h3>
            </div>
            <div
              ref={mapRef}
              className="w-full h-80 rounded-xl border border-gray-200"
              style={{
                minHeight: '320px',
                backgroundColor: '#f3f4f6'
              }}
            >
              {!window.google && (
                <div className="flex items-center justify-center h-full bg-gray-100 rounded-xl">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading Google Maps...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between p-2 text-sm text-gray-600 mt-2">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Google Maps</span>
              </span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <span className="text-orange-500">🕉️</span>
                  <span className="text-xs">Sacred Sites</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-blue-500">📍</span>
                  <span className="text-xs">Your Location</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Offline Map Indicator */}
        {mapMode === 'offline' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-yellow-800">Offline Mode</h4>
                <p className="text-sm text-yellow-700">
                  Using cached maps and landmarks for navigation
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <div className="space-y-3">
            {/* From Location */}
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Current Location"
                  value={currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : "Kumbh Mela Ground, Gate 3"}
                  className="w-full bg-gray-50 rounded-lg p-3 text-sm"
                  readOnly
                />
              </div>
            </div>

            {/* To Location */}
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-gray-50 rounded-lg p-3 text-sm border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-teal-500 text-white rounded-lg p-3 font-medium hover:bg-teal-600 transition-colors"
            >
              🔍 Find Smart Routes
            </button>
          </div>
        </div>

        {/* Popular Destinations */}
        {!showRoutes && mapMode === 'route' && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Popular Sacred Sites</h3>
            <div className="space-y-2">
              {popularDestinations.map((place, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDestination(place.name)
                    setShowRoutes(true)
                  }}
                  className="bg-white rounded-xl p-4 shadow-sm active:scale-95 transition-transform cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        <span className="text-lg">🕉️</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{place.name}</h4>
                        <p className="text-sm text-gray-600">{place.description}</p>
                        <p className="text-xs text-gray-500">{place.distance}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        place.crowd === 'low' ? 'bg-green-100 text-green-600' :
                        place.crowd === 'moderate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {place.crowd}
                      </span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Routes Results */}
        {showRoutes && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Routes to {destination}</h3>
              <button
                onClick={() => setShowRoutes(false)}
                className="text-teal-600 text-sm font-medium"
              >
                Change
              </button>
            </div>

            <div className="space-y-3">
              {routes.map((route) => (
                <div key={route.id} className="bg-white rounded-2xl p-4 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`${route.bgColor} rounded-full p-3`}>
                        <span className="text-xl">{route.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{route.name}</h4>
                        <p className="text-sm text-gray-600">{route.distance} • {route.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        route.crowd === 'low' ? 'bg-green-100 text-green-600' :
                        route.crowd === 'moderate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {route.crowd} crowd
                      </span>
                    </div>
                  </div>

                  {/* Route Preview with Landmarks */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium">Route via:</span>
                      <span className="text-xs text-gray-500">Turn-by-turn available</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Start</span>
                      {route.landmarks.map((landmark, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="flex-1 border-t border-dashed border-gray-300"></div>
                          <span className="text-xs">{landmark}</span>
                        </div>
                      ))}
                      <div className="flex-1 border-t border-dashed border-gray-300"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>End</span>
                    </div>
                  </div>

                  {/* Navigation Instructions Preview */}
                  <div className="mb-3">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-teal-600">
                        View turn-by-turn directions
                      </summary>
                      <div className="mt-2 space-y-1">
                        {route.instructions.map((instruction, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span>{instruction}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => startNavigation(route)}
                      className="flex-1 bg-teal-500 text-white rounded-lg p-3 font-medium hover:bg-teal-600 transition-colors"
                    >
                      Start Navigation
                    </button>
                    <button className="px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      Share Route
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Live Updates */}
        <div className="space-y-3 mt-4">
          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <h4 className="font-medium text-blue-800">Live Traffic Updates</h4>
            </div>
            <div className="space-y-2 text-sm text-blue-700">
              <p>⚠️ Heavy crowd at Triveni Sangam - 15 min delay expected</p>
              <p>🚌 New shuttle service: Gate 2 ↔ Ram Ghat every 10 mins</p>
              <p>🚧 Construction on Main Road - Use alternate route</p>
            </div>
          </div>

          {voiceEnabled && (
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="font-medium text-green-800">Voice Navigation Active</h4>
              </div>
              <p className="text-sm text-green-700">
                Say "Navigate to..." or tap any destination. Voice guidance will help you throughout your journey.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Shuttle Booking Modal */}
      {showShuttleBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Step 1: Select Shuttle Service */}
            {shuttleBookingStep === 1 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">🚌 Book Shuttle</h3>
                  <button
                    onClick={() => setShowShuttleBooking(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4">Choose your preferred shuttle service:</p>

                <div className="space-y-3">
                  {shuttleServices.map((shuttle) => (
                    <div
                      key={shuttle.id}
                      onClick={() => handleShuttleSelect(shuttle)}
                      className="border rounded-2xl p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{shuttle.name}</h4>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          shuttle.price === 'Free' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {shuttle.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{shuttle.route}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Every {shuttle.frequency}</span>
                        <span>{shuttle.currentLoad}/{shuttle.capacity} passengers</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-green-500 h-1 rounded-full"
                            style={{ width: `${((shuttle.capacity - shuttle.currentLoad) / shuttle.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {shuttle.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Select Time Slot */}
            {shuttleBookingStep === 2 && selectedShuttle && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShuttleBookingStep(1)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="text-lg font-bold text-gray-800">Select Time</h3>
                  </div>
                  <button
                    onClick={() => setShowShuttleBooking(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-gray-800">{selectedShuttle.name}</h4>
                  <p className="text-sm text-gray-600">{selectedShuttle.route}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4">Next available departures:</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {selectedShuttle.nextDepartures.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTimeSlotSelect(time)}
                      className="p-3 border rounded-lg text-center hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <div className="font-medium text-gray-800">{time}</div>
                      <div className="text-xs text-gray-500">
                        {idx === 0 ? 'Next' : `+${(idx + 1) * 10} mins`}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Real-time updates • GPS tracked
                </div>
              </>
            )}

            {/* Step 3: Passenger Details */}
            {shuttleBookingStep === 3 && selectedShuttle && selectedTimeSlot && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShuttleBookingStep(2)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
                  </div>
                  <button
                    onClick={() => setShowShuttleBooking(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">Service</div>
                    <div className="font-medium">{selectedShuttle.name}</div>
                    <div className="text-sm text-gray-600">{selectedShuttle.route}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">Departure Time</div>
                    <div className="font-medium">{selectedTimeSlot}</div>
                    <div className="text-sm text-gray-600">Today</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-2">Number of Passengers</div>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold w-8 text-center">{passengerCount}</span>
                      <button
                        onClick={() => setPassengerCount(Math.min(4, passengerCount + 1))}
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-1">Max 4 passengers per booking</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-blue-800 mb-1">Total Cost</div>
                    <div className="text-lg font-bold text-blue-800">
                      {selectedShuttle.price === 'Free' ? 'Free Service' : `${selectedShuttle.price} × ${passengerCount} = ₹${parseInt(selectedShuttle.price.replace('₹', '')) * passengerCount}`}
                    </div>
                  </div>
                </div>

                <button
                  onClick={confirmShuttleBooking}
                  className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                >
                  Confirm Booking
                </button>
              </>
            )}

            {/* Step 4: Booking Confirmation */}
            {shuttleBookingStep === 4 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-4">Your shuttle has been booked successfully.</p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
                  <div className="text-sm text-gray-600 mb-2">Booking Reference</div>
                  <div className="font-mono text-lg font-bold text-purple-600">#SH{Date.now().toString().slice(-6)}</div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  You will receive SMS updates and can track your shuttle in real-time.
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium"
                  >
                    Track My Shuttle
                  </button>
                  <button
                    onClick={() => setShowShuttleBooking(false)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Navigation