import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const ShuttleBooking = ({ onNavigate }) => {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState('pickup') // pickup, service, booking, tracking
  const [selectedService, setSelectedService] = useState(null)
  const [pickupStation, setPickupStation] = useState('')
  const [dropStation, setDropStation] = useState('')
  const [showPickupDropdown, setShowPickupDropdown] = useState(false)
  const [showDropDropdown, setShowDropDropdown] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [availableServices, setAvailableServices] = useState([])
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  const services = [
    {
      id: 'shuttle-mini',
      name: t('shuttleMini'),
      capacity: '4 seats',
      price: '₹45',
      eta: '3 min',
      icon: '🚗',
      description: t('comfortableACRide'),
      features: ['AC', 'Music', 'Safe']
    },
    {
      id: 'shuttle-share',
      name: t('shuttleShare'),
      capacity: '2 seats available',
      price: '₹25',
      eta: '5 min',
      icon: '🚙',
      description: t('shareWithPilgrims'),
      features: ['AC', 'Shared', 'Eco-friendly']
    },
    {
      id: 'shuttle-prime',
      name: t('shuttlePrime'),
      capacity: '4 seats',
      price: '₹65',
      eta: '2 min',
      icon: '🚕',
      description: t('premiumComfortRide'),
      features: ['Premium AC', 'WiFi', 'Refreshments']
    },
    {
      id: 'shuttle-auto',
      name: t('auto'),
      capacity: '3 seats',
      price: '₹35',
      eta: '4 min',
      icon: '🛺',
      description: t('quickLocalTransport'),
      features: ['Open Air', 'Quick', 'Local']
    }
  ]

  const shuttleStations = [
    {
      id: 'station1',
      name: 'Triveni Sangam Station',
      shortName: 'Triveni Sangam',
      location: { lat: 29.9557, lng: 78.1642 },
      icon: '🕉️',
      code: 'TS01',
      facilities: ['Washroom', 'Seating', 'Water']
    },
    {
      id: 'station2',
      name: 'Hanuman Temple Station',
      shortName: 'Hanuman Temple',
      location: { lat: 29.9467, lng: 78.1552 },
      icon: '🐒',
      code: 'HT02',
      facilities: ['Washroom', 'Food', 'Medical']
    },
    {
      id: 'station3',
      name: 'Main Ghat Station',
      shortName: 'Main Ghat',
      location: { lat: 29.9657, lng: 78.1742 },
      icon: '🚢',
      code: 'MG03',
      facilities: ['Washroom', 'Seating', 'Security']
    },
    {
      id: 'station4',
      name: 'Food Court Station',
      shortName: 'Food Court',
      location: { lat: 29.9357, lng: 78.1442 },
      icon: '🍽️',
      code: 'FC04',
      facilities: ['Food', 'Seating', 'Washroom']
    },
    {
      id: 'station5',
      name: 'Medical Center Station',
      shortName: 'Medical Center',
      location: { lat: 29.9757, lng: 78.1842 },
      icon: '🏥',
      code: 'MC05',
      facilities: ['Medical', 'Ambulance', 'Pharmacy']
    },
    {
      id: 'station6',
      name: 'Parking Area P1',
      shortName: 'Parking P1',
      location: { lat: 29.9157, lng: 78.1242 },
      icon: '🅿️',
      code: 'PP06',
      facilities: ['Parking', 'Security', 'Washroom']
    },
    {
      id: 'station7',
      name: 'Ram Ghat Station',
      shortName: 'Ram Ghat',
      location: { lat: 29.9857, lng: 78.1942 },
      icon: '🛕',
      code: 'RG07',
      facilities: ['Washroom', 'Seating', 'Water']
    },
    {
      id: 'station8',
      name: 'Central Bus Stand',
      shortName: 'Bus Stand',
      location: { lat: 29.9057, lng: 78.1142 },
      icon: '🚌',
      code: 'CB08',
      facilities: ['Bus Terminal', 'Food', 'Washroom']
    }
  ]

  const initializeMap = () => {
    if (mapRef.current && window.google && window.google.maps) {
      try {
        const defaultCenter = { lat: 29.9557, lng: 78.1642 }
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          zoom: 13,
          center: defaultCenter,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        // Add all station markers
        shuttleStations.forEach((station) => {
          const stationMarker = new window.google.maps.Marker({
            position: station.location,
            map: mapInstance.current,
            title: station.name,
            icon: {
              path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
              fillColor: '#F97316',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#FFFFFF',
              scale: 2
            }
          })

          // Add station info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; min-width: 200px;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 24px; margin-right: 8px;">${station.icon}</span>
                  <div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${station.name}</h3>
                    <p style="margin: 0; font-size: 12px; color: #666;">Station Code: ${station.code}</p>
                  </div>
                </div>
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                  ${station.facilities.map(facility =>
                    `<span style="background: #FEF3C7; color: #92400E; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${facility}</span>`
                  ).join('')}
                </div>
              </div>
            `
          })

          stationMarker.addListener('click', () => {
            infoWindow.open(mapInstance.current, stationMarker)
          })
        })

        updateMapForSelectedStations()

      } catch (error) {
        console.error('Error initializing Google Maps:', error)
      }
    }
  }

  const updateMapForSelectedStations = () => {
    if (!mapInstance.current || !window.google) return

    // Clear previous route markers
    if (window.pickupMarker) window.pickupMarker.setMap(null)
    if (window.dropMarker) window.dropMarker.setMap(null)
    if (window.routeLine) window.routeLine.setMap(null)

    const pickup = shuttleStations.find(s => s.id === pickupStation)
    const drop = shuttleStations.find(s => s.id === dropStation)

    if (pickup) {
      window.pickupMarker = new window.google.maps.Marker({
        position: pickup.location,
        map: mapInstance.current,
        title: `Pickup: ${pickup.name}`,
        icon: {
          path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
          fillColor: '#10B981',
          fillOpacity: 1,
          strokeWeight: 3,
          strokeColor: '#FFFFFF',
          scale: 2.5
        },
        zIndex: 1000
      })
    }

    if (drop) {
      window.dropMarker = new window.google.maps.Marker({
        position: drop.location,
        map: mapInstance.current,
        title: `Drop: ${drop.name}`,
        icon: {
          path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeWeight: 3,
          strokeColor: '#FFFFFF',
          scale: 2.5
        },
        zIndex: 1000
      })
    }

    // Draw route line if both stations selected
    if (pickup && drop) {
      window.routeLine = new window.google.maps.Polyline({
        path: [pickup.location, drop.location],
        geodesic: true,
        strokeColor: '#F97316',
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: mapInstance.current
      })

      // Fit map to show both stations
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(pickup.location)
      bounds.extend(drop.location)
      mapInstance.current.fitBounds(bounds)
    }
  }

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      if (!window.googleMapsLoading) {
        window.googleMapsLoading = true
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCDZ7DMMqlyhtg9Dqodo926E5ZfU0NuqH4&libraries=visualization`
        script.onload = () => {
          window.googleMapsLoading = false
          initializeMap()
        }
        document.head.appendChild(script)
      }
    }

    loadGoogleMaps()
  }, [])

  useEffect(() => {
    if (mapInstance.current) {
      updateMapForSelectedStations()
    }
  }, [pickupStation, dropStation])

  const handleStationSearch = () => {
    if (!pickupStation || !dropStation) return

    setIsSearching(true)
    setTimeout(() => {
      setAvailableServices(services)
      setIsSearching(false)
      setCurrentStep('service')
    }, 1000)
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentStep('booking')
  }

  const confirmBooking = () => {
    const pickupStationData = shuttleStations.find(s => s.id === pickupStation)
    const dropStationData = shuttleStations.find(s => s.id === dropStation)

    const booking = {
      id: `SB${Date.now()}`,
      service: selectedService,
      pickup: pickupStationData,
      drop: dropStationData,
      driverName: 'राम प्रसाद',
      vehicleNumber: 'UP 70 AB 1234',
      driverPhoto: '👨‍💼',
      rating: 4.8,
      phone: '+91 98765 43210'
    }
    setBookingDetails(booking)
    setCurrentStep('tracking')
  }

  const handleStationSelect = (stationId, type) => {
    if (type === 'pickup') {
      setPickupStation(stationId)
      setShowPickupDropdown(false)
    } else {
      setDropStation(stationId)
      setShowDropDropdown(false)
    }
  }

  if (currentStep === 'tracking' && bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('navigation')}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold">Your Shuttle Ride</h1>
              <p className="text-orange-100 text-sm">Live Tracking</p>
            </div>
            <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="relative h-80">
          <div ref={mapRef} className="w-full h-full"></div>
          <div className="absolute top-4 left-4 right-4 bg-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Driver is arriving</p>
                <p className="text-xs text-gray-600">ETA: 2 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="p-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-3xl border-2 border-orange-200">
                {bookingDetails.driverPhoto}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800">{bookingDetails.driverName}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="text-sm font-semibold text-gray-700 ml-1">{bookingDetails.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">Verified Driver</span>
                </div>
                <p className="text-sm font-mono text-gray-600 bg-gray-50 px-3 py-1 rounded-lg inline-block">{bookingDetails.vehicleNumber}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl w-16 h-16 flex items-center justify-center">{selectedService.icon}</div>
                <p className="text-xs font-semibold text-gray-600">{selectedService.name}</p>
              </div>
            </div>

            <div className="flex space-x-3 mb-4">
              <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Call Driver</span>
              </button>
              <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>Chat</span>
              </button>
            </div>

            {/* Trip Details */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{bookingDetails.pickup?.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Pickup Station</p>
                      <p className="text-xs text-gray-600">{bookingDetails.pickup?.name}</p>
                      <p className="text-xs text-gray-500">Code: {bookingDetails.pickup?.code}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-6 w-0.5 h-6 bg-gray-300"></div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{bookingDetails.drop?.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Drop Station</p>
                      <p className="text-xs text-gray-600">{bookingDetails.drop?.name}</p>
                      <p className="text-xs text-gray-500">Code: {bookingDetails.drop?.code}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking ID */}
            <div className="bg-gray-50 rounded-lg p-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Booking ID</span>
                <span className="text-sm font-mono font-medium">{bookingDetails.id}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-3">
            <button className="w-full bg-red-50 text-red-700 py-3 rounded-xl font-medium border border-red-200 hover:bg-red-100 transition-colors">
              Cancel Ride
            </button>
            <button className="w-full bg-orange-50 text-orange-700 py-3 rounded-xl font-medium border border-orange-200 hover:bg-orange-100 transition-colors">
              Share Trip Details
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('navigation')}
            className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚗</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">{t('shuttleBooking')}</h1>
            <p className="text-orange-100 text-sm">{t('quickSafeTransportation')}</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-64 -mt-4">
        <div ref={mapRef} className="w-full h-full rounded-t-3xl"></div>
        {isSearching && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-t-3xl">
            <div className="bg-white rounded-2xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Finding shuttles...</span>
            </div>
          </div>
        )}
      </div>

      {currentStep === 'pickup' && (
        <div className="px-6 pt-8 pb-6 -mt-6 bg-white rounded-t-3xl min-h-screen shadow-lg">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('selectJourney')}</h2>
            <p className="text-gray-500">{t('choosePickupDestination')}</p>
          </div>

          {/* Station Selection Form */}
          <div className="space-y-8">
            {/* Pickup Station */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-4">{t('from')}</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                <button
                  onClick={() => {
                    setShowPickupDropdown(!showPickupDropdown)
                    setShowDropDropdown(false)
                  }}
                  className="w-full bg-white rounded-xl pl-12 pr-4 py-5 text-left flex items-center justify-between hover:shadow-md transition-all border border-gray-200 hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                >
                  {pickupStation ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{shuttleStations.find(s => s.id === pickupStation)?.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{shuttleStations.find(s => s.id === pickupStation)?.shortName}</p>
                        <p className="text-sm text-gray-500">{shuttleStations.find(s => s.id === pickupStation)?.code}</p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-lg">{t('selectPickupStation')}</span>
                  )}
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showPickupDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-72 overflow-y-auto mt-3">
                    {shuttleStations.filter(s => s.id !== dropStation).map((station) => (
                      <button
                        key={station.id}
                        onClick={() => handleStationSelect(station.id, 'pickup')}
                        className="w-full p-4 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{station.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{station.shortName}</p>
                            <p className="text-sm text-gray-500">{station.code}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Route Connector */}
            <div className="flex justify-center -my-2">
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-px h-6 bg-gray-300"></div>
              </div>
            </div>

            {/* Drop Station */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-4">{t('to')}</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                <button
                  onClick={() => {
                    setShowDropDropdown(!showDropDropdown)
                    setShowPickupDropdown(false)
                  }}
                  className="w-full bg-white rounded-xl pl-12 pr-4 py-5 text-left flex items-center justify-between hover:shadow-md transition-all border border-gray-200 hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                >
                  {dropStation ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{shuttleStations.find(s => s.id === dropStation)?.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{shuttleStations.find(s => s.id === dropStation)?.shortName}</p>
                        <p className="text-sm text-gray-500">{shuttleStations.find(s => s.id === dropStation)?.code}</p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-lg">{t('selectDestination')}</span>
                  )}
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-72 overflow-y-auto mt-3">
                    {shuttleStations.filter(s => s.id !== pickupStation).map((station) => (
                      <button
                        key={station.id}
                        onClick={() => handleStationSelect(station.id, 'drop')}
                        className="w-full p-4 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{station.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{station.shortName}</p>
                            <p className="text-sm text-gray-500">{station.code}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {pickupStation && dropStation && (
            <div className="mt-10">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {shuttleStations.find(s => s.id === pickupStation)?.code} → {shuttleStations.find(s => s.id === dropStation)?.code}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">~15 min</span>
                </div>
              </div>

              <button
                onClick={handleStationSearch}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
{t('findAvailableShuttles')}
              </button>
            </div>
          )}
        </div>
      )}

      {currentStep === 'service' && (
        <div className="px-6 pt-8 pb-6 -mt-6 bg-white rounded-t-3xl min-h-screen shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose Your Ride</h2>
            <p className="text-gray-500">Available shuttles for your route</p>
          </div>
          <div className="space-y-4">
            {availableServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="w-full bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all text-left active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium">{service.capacity}</span>
                        <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium">{service.eta} away</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-gray-900">{service.price}</div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'booking' && selectedService && (
        <div className="px-6 pt-6 pb-6 -mt-6 bg-white rounded-t-3xl min-h-screen shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Booking</h2>
            <p className="text-gray-600">Review your trip details</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6">
            {/* Selected Service */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center text-3xl border border-orange-300">
                {selectedService.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-gray-800">{selectedService.name}</h4>
                <p className="text-gray-600">{selectedService.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {selectedService.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl text-gray-800">{selectedService.price}</div>
                <div className="text-sm text-green-600 font-medium">🕐 {selectedService.eta}</div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-4 mb-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">🗺️ Trip Route</h4>
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                <div className="flex-1 bg-green-50 rounded-2xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{shuttleStations.find(s => s.id === pickupStation)?.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800">Pickup Station</p>
                      <p className="text-gray-600">{shuttleStations.find(s => s.id === pickupStation)?.name}</p>
                      <p className="text-sm text-gray-500">Code: {shuttleStations.find(s => s.id === pickupStation)?.code}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-8 border-l-2 border-dashed border-gray-300 h-8"></div>
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1 bg-red-50 rounded-2xl p-4 border border-red-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{shuttleStations.find(s => s.id === dropStation)?.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800">Drop Station</p>
                      <p className="text-gray-600">{shuttleStations.find(s => s.id === dropStation)?.name}</p>
                      <p className="text-sm text-gray-500">Code: {shuttleStations.find(s => s.id === dropStation)?.code}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h4 className="font-bold text-lg text-gray-800 mb-4">💳 Payment Method</h4>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl border border-green-200">
                    💵
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Cash Payment</span>
                    <p className="text-sm text-gray-600">Pay directly to driver</p>
                  </div>
                </div>
                <button className="text-orange-500 text-sm font-semibold bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
                  Change
                </button>
              </div>
            </div>

            <button
              onClick={confirmBooking}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              🚀 Confirm Booking - {selectedService.price}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShuttleBooking