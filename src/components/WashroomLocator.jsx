import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const WashroomLocator = ({ onNavigate }) => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('washrooms')
  const [viewMode, setViewMode] = useState('map') // 'list' or 'map' - default to map
  const [showDrawer, setShowDrawer] = useState(false) // for bottom drawer
  const [filterBy, setFilterBy] = useState('nearest') // 'nearest', 'cleanest', 'available', 'premium'
  const [currentLocation, setCurrentLocation] = useState(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedFacility, setSelectedFacility] = useState(null)
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  const API_KEY = 'AIzaSyCDZ7DMMqlyhtg9Dqodo926E5ZfU0NuqH4'

  const washrooms = [
    {
      id: 1,
      name: 'Sector A - Block 3',
      distance: '150m',
      cleanliness: 4,
      availability: 'available',
      lastCleaned: '10 mins ago',
      type: 'premium',
      amenities: ['wheelchair', 'baby-care', 'water', 'hand-sanitizer'],
      coordinates: { lat: 29.9557, lng: 78.1642 },
      queueTime: '2 mins',
      reviews: 28,
      features: ['24/7 attendant', 'Baby changing station', 'Hand dryer']
    },
    {
      id: 2,
      name: 'Main Gate Facilities',
      distance: '320m',
      cleanliness: 5,
      availability: 'available',
      lastCleaned: '5 mins ago',
      type: 'standard',
      amenities: ['wheelchair', 'water', 'hand-sanitizer'],
      coordinates: { lat: 29.9580, lng: 78.1625 },
      queueTime: '5 mins',
      reviews: 42,
      features: ['Well-lit', 'Security guard nearby']
    },
    {
      id: 3,
      name: 'Ghat Road Complex',
      distance: '450m',
      cleanliness: 3,
      availability: 'occupied',
      lastCleaned: '25 mins ago',
      type: 'standard',
      amenities: ['water'],
      coordinates: { lat: 29.9540, lng: 78.1660 },
      queueTime: '8 mins',
      reviews: 15,
      features: ['Basic facilities']
    },
    {
      id: 4,
      name: 'Parking Zone B',
      distance: '680m',
      cleanliness: 2,
      availability: 'maintenance',
      lastCleaned: '2 hours ago',
      type: 'basic',
      amenities: [],
      coordinates: { lat: 29.9520, lng: 78.1680 },
      queueTime: 'N/A',
      reviews: 8,
      features: ['Under renovation']
    }
  ]

  const waterPoints = [
    {
      id: 1,
      name: 'Hydration Station 1',
      distance: '80m',
      status: 'working',
      type: 'filtered-chilled',
      temperature: 'cool',
      queue: 'no-queue',
      coordinates: { lat: 29.9565, lng: 78.1635 },
      capacity: 'high',
      lastMaintained: '1 hour ago',
      features: ['UV filtered', 'Temperature controlled', 'Touch-free']
    },
    {
      id: 2,
      name: 'Central Water Point',
      distance: '220m',
      status: 'working',
      type: 'RO-filtered',
      temperature: 'normal',
      queue: 'short-queue',
      coordinates: { lat: 29.9575, lng: 78.1620 },
      capacity: 'medium',
      lastMaintained: '3 hours ago',
      features: ['RO purified', 'Multiple taps', '24/7 available']
    },
    {
      id: 3,
      name: 'Ghat Side Tap',
      distance: '380m',
      status: 'working',
      type: 'filtered',
      temperature: 'cool',
      queue: 'long-queue',
      coordinates: { lat: 29.9530, lng: 78.1650 },
      capacity: 'low',
      lastMaintained: '6 hours ago',
      features: ['Basic filtration', 'Near ghat']
    },
    {
      id: 4,
      name: 'Emergency Supply',
      distance: '1.2km',
      status: 'low-pressure',
      type: 'basic',
      temperature: 'normal',
      queue: 'no-queue',
      coordinates: { lat: 29.9500, lng: 78.1700 },
      capacity: 'high',
      lastMaintained: '12 hours ago',
      features: ['Backup supply', 'Large capacity tank']
    }
  ]

  const medicalCenters = [
    {
      id: 1,
      name: 'Primary Health Center',
      distance: '200m',
      status: 'open',
      type: 'medical-center',
      availability: '24/7',
      coordinates: { lat: 29.9550, lng: 78.1640 },
      services: ['Emergency care', 'First aid', 'Ambulance'],
      staff: 'Doctor available',
      contact: '+91-9876543210'
    },
    {
      id: 2,
      name: 'Mobile Medical Unit',
      distance: '450m',
      status: 'open',
      type: 'mobile-unit',
      availability: '6 AM - 10 PM',
      coordinates: { lat: 29.9585, lng: 78.1610 },
      services: ['Basic treatment', 'Medicines', 'Health checkup'],
      staff: 'Nurse on duty',
      contact: '+91-9876543211'
    },
    {
      id: 3,
      name: 'Ayurveda Center',
      distance: '680m',
      status: 'open',
      type: 'ayurveda',
      availability: '8 AM - 8 PM',
      coordinates: { lat: 29.9520, lng: 78.1665 },
      services: ['Herbal medicine', 'Traditional therapy', 'Consultation'],
      staff: 'Ayurvedic doctor',
      contact: '+91-9876543212'
    }
  ]

  const foodCourts = [
    {
      id: 1,
      name: 'Langar Hall - Main',
      distance: '120m',
      status: 'open',
      type: 'langar',
      cuisine: 'Free community food',
      timing: '24/7',
      coordinates: { lat: 29.9570, lng: 78.1625 },
      capacity: '1000+ people',
      features: ['Free meals', 'Vegetarian', 'Clean kitchen'],
      currentQueue: 'Short wait'
    },
    {
      id: 2,
      name: 'Prasad Counter',
      distance: '180m',
      status: 'open',
      type: 'prasad',
      cuisine: 'Holy offerings',
      timing: '5 AM - 11 PM',
      coordinates: { lat: 29.9545, lng: 78.1655 },
      capacity: 'Medium',
      features: ['Blessed food', 'Multiple varieties', 'Hygienic'],
      currentQueue: 'No wait'
    },
    {
      id: 3,
      name: 'Food Court Zone A',
      distance: '350m',
      status: 'open',
      type: 'food-court',
      cuisine: 'North Indian',
      timing: '6 AM - 11 PM',
      coordinates: { lat: 29.9590, lng: 78.1605 },
      capacity: '200 people',
      features: ['Multiple vendors', 'Affordable prices', 'Seating area'],
      currentQueue: 'Moderate wait'
    },
    {
      id: 4,
      name: 'Tea Stalls Junction',
      distance: '95m',
      status: 'open',
      type: 'tea-stalls',
      cuisine: 'Beverages & Snacks',
      timing: '4 AM - 12 AM',
      coordinates: { lat: 29.9555, lng: 78.1630 },
      capacity: 'Small',
      features: ['Fresh tea', 'Local snacks', 'Quick service'],
      currentQueue: 'No wait'
    }
  ]

  const otherFacilities = [
    {
      id: 1,
      name: 'Lost & Found Center',
      distance: '280m',
      status: 'open',
      type: 'lost-found',
      timing: '24/7',
      coordinates: { lat: 29.9560, lng: 78.1615 },
      contact: '+91-9876543220',
      services: ['Lost items', 'Missing persons', 'Help desk']
    },
    {
      id: 2,
      name: 'Information Kiosk',
      distance: '150m',
      status: 'open',
      type: 'information',
      timing: '6 AM - 10 PM',
      coordinates: { lat: 29.9575, lng: 78.1645 },
      services: ['Event schedules', 'Maps', 'General guidance'],
      languages: ['Hindi', 'English', 'Local dialects']
    },
    {
      id: 3,
      name: 'ATM & Banking',
      distance: '320m',
      status: 'working',
      type: 'atm',
      timing: '24/7',
      coordinates: { lat: 29.9535, lng: 78.1670 },
      services: ['Cash withdrawal', 'Money exchange', 'Banking'],
      banks: ['SBI', 'HDFC', 'ICICI']
    },
    {
      id: 4,
      name: 'Phone Charging Point',
      distance: '90m',
      status: 'working',
      type: 'charging',
      timing: '24/7',
      coordinates: { lat: 29.9565, lng: 78.1638 },
      services: ['Mobile charging', 'Power bank rental', 'Wi-Fi'],
      cost: 'Free for 30 mins'
    },
    {
      id: 5,
      name: 'Security Post',
      distance: '110m',
      status: 'active',
      type: 'security',
      timing: '24/7',
      coordinates: { lat: 29.9548, lng: 78.1648 },
      services: ['Emergency help', 'Crowd control', 'Safety assistance'],
      contact: '100 (Police)'
    }
  ]

  // Initialize Google Maps
  useEffect(() => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    } else {
      initializeMap()
    }
  }, []) // Initialize immediately

  // Update markers when tab changes
  useEffect(() => {
    if (mapInstance.current) {
      initializeMap()
    }
  }, [activeTab])

  const initializeMap = () => {
    if (mapRef.current && window.google) {
      const defaultCenter = { lat: 29.9557, lng: 78.1642 }

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: defaultCenter,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'simplified' }]
          }
        ]
      })

      // Add markers for all facility types
      const addMarkersForFacilities = (facilities, facilityType) => {
        facilities.forEach(facility => {
          let icon, color

          switch (facilityType) {
            case 'washrooms':
              icon = '🚽'
              color = facility.availability === 'available' ? '#3b82f6' : '#ef4444'
              break
            case 'water':
              icon = '💧'
              color = facility.status === 'working' ? '#10b981' : '#f59e0b'
              break
            case 'medical':
              icon = facility.type === 'ayurveda' ? '🌿' : '🏥'
              color = facility.status === 'open' ? '#ef4444' : '#9ca3af'
              break
            case 'food':
              icon = facility.type === 'langar' ? '🍛' : facility.type === 'prasad' ? '🙏' :
                     facility.type === 'tea-stalls' ? '☕' : '🍽️'
              color = facility.status === 'open' ? '#f97316' : '#9ca3af'
              break
            case 'other':
              const iconMap = {
                'lost-found': '🔍',
                'information': 'ℹ️',
                'atm': '🏧',
                'charging': '🔌',
                'security': '👮‍♂️'
              }
              icon = iconMap[facility.type] || '📍'
              color = ['open', 'working', 'active'].includes(facility.status) ? '#8b5cf6' : '#9ca3af'
              break
            default:
              icon = '📍'
              color = '#6b7280'
          }

          const marker = new window.google.maps.Marker({
            position: facility.coordinates,
            map: mapInstance.current,
            title: facility.name,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="15" fill="${color}" stroke="white" stroke-width="2"/>
                  <circle cx="20" cy="20" r="10" fill="white"/>
                  <text x="20" y="25" text-anchor="middle" font-size="14" fill="${color}">
                    ${icon}
                  </text>
                </svg>
              `)}`,
              scaledSize: new window.google.maps.Size(40, 40)
            }
          })

          // Create info window for each marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: createInfoWindowContent(facility, facilityType)
          })

          marker.addListener('click', () => {
            infoWindow.open(mapInstance.current, marker)
          })
        })
      }

      // Add markers based on active tab or show all if viewing full map
      if (activeTab === 'washrooms') {
        addMarkersForFacilities(washrooms, 'washrooms')
      } else if (activeTab === 'water') {
        addMarkersForFacilities(waterPoints, 'water')
      } else if (activeTab === 'medical') {
        addMarkersForFacilities(medicalCenters, 'medical')
      } else if (activeTab === 'food') {
        addMarkersForFacilities(foodCourts, 'food')
      } else if (activeTab === 'other') {
        addMarkersForFacilities(otherFacilities, 'other')
      } else if (activeTab === 'all') {
        // Show all facilities when 'all' tab is selected
        addMarkersForFacilities(washrooms, 'washrooms')
        addMarkersForFacilities(waterPoints, 'water')
        addMarkersForFacilities(medicalCenters, 'medical')
        addMarkersForFacilities(foodCourts, 'food')
        addMarkersForFacilities(otherFacilities, 'other')
      }

      // Add user location if available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setCurrentLocation(userLocation)

          new window.google.maps.Marker({
            position: userLocation,
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
        })
      }
    }
  }

  const createInfoWindowContent = (facility, facilityType) => {
    const getStatusBadge = (status) => {
      const statusColors = {
        available: 'bg-green-100 text-green-600',
        occupied: 'bg-yellow-100 text-yellow-600',
        maintenance: 'bg-red-100 text-red-600',
        working: 'bg-green-100 text-green-600',
        'low-pressure': 'bg-yellow-100 text-yellow-600',
        open: 'bg-green-100 text-green-600',
        active: 'bg-green-100 text-green-600',
        closed: 'bg-red-100 text-red-600'
      }
      return `<span class="px-2 py-1 rounded-full text-xs ${statusColors[status] || 'bg-gray-100 text-gray-600'}">${status}</span>`
    }

    let content = `
      <div style="min-width: 250px; padding: 12px;">
        <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1f2937;">${facility.name}</h3>
        <div style="margin-bottom: 8px;">
          ${getStatusBadge(facility.status || facility.availability)}
          <span style="margin-left: 8px; font-size: 14px; color: #6b7280;">📍 ${facility.distance}</span>
        </div>
    `

    switch (facilityType) {
      case 'washrooms':
        content += `
          <div style="margin-bottom: 6px;">⭐ Cleanliness: ${facility.cleanliness}/5</div>
          <div style="margin-bottom: 6px;">⏱️ Wait time: ${facility.queueTime}</div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Features: ${facility.features.join(', ')}</div>
        `
        break
      case 'water':
        content += `
          <div style="margin-bottom: 6px;">💧 Type: ${facility.type}</div>
          <div style="margin-bottom: 6px;">🌡️ ${facility.temperature}</div>
          <div style="margin-bottom: 6px;">👥 Queue: ${facility.queue.replace('-', ' ')}</div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Features: ${facility.features.join(', ')}</div>
        `
        break
      case 'medical':
        content += `
          <div style="margin-bottom: 6px;">⏰ ${facility.availability}</div>
          <div style="margin-bottom: 6px;">👨‍⚕️ ${facility.staff}</div>
          <div style="margin-bottom: 6px;">📞 ${facility.contact}</div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Services: ${facility.services.join(', ')}</div>
        `
        break
      case 'food':
        content += `
          <div style="margin-bottom: 6px;">🍽️ ${facility.cuisine}</div>
          <div style="margin-bottom: 6px;">⏰ ${facility.timing}</div>
          <div style="margin-bottom: 6px;">👥 ${facility.currentQueue || 'N/A'}</div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Features: ${facility.features.join(', ')}</div>
        `
        break
      case 'other':
        content += `
          <div style="margin-bottom: 6px;">⏰ ${facility.timing}</div>
          ${facility.contact ? `<div style="margin-bottom: 6px;">📞 ${facility.contact}</div>` : ''}
          ${facility.services ? `<div style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">Services: ${facility.services.join(', ')}</div>` : ''}
        `
        break
    }

    content += `
        <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
          <button
            onclick="window.getDirections('${facility.name}', ${facility.coordinates.lat}, ${facility.coordinates.lng})"
            style="background: #3b82f6; color: white; padding: 6px 12px; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; margin-right: 8px;"
          >
            📍 Get Directions
          </button>
        </div>
      </div>
    `

    return content
  }

  // Global function for directions (can be called from info windows)
  window.getDirections = (name, lat, lng) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${lat},${lng}`
        window.open(url, '_blank')
      }, () => {
        // Fallback if location access denied
        const url = `https://www.google.com/maps/place/${lat},${lng}`
        window.open(url, '_blank')
      })
    } else {
      const url = `https://www.google.com/maps/place/${lat},${lng}`
      window.open(url, '_blank')
    }
  }

  const getFilteredFacilities = () => {
    let facilities
    switch (activeTab) {
      case 'washrooms':
        facilities = washrooms
        break
      case 'water':
        facilities = waterPoints
        break
      case 'medical':
        facilities = medicalCenters
        break
      case 'food':
        facilities = foodCourts
        break
      case 'other':
        facilities = otherFacilities
        break
      case 'all':
        facilities = [...washrooms, ...waterPoints, ...medicalCenters, ...foodCourts, ...otherFacilities]
        break
      default:
        facilities = washrooms
    }

    switch (filterBy) {
      case 'cleanest':
        if (activeTab === 'washrooms') {
          return facilities.sort((a, b) => b.cleanliness - a.cleanliness)
        } else if (activeTab === 'water') {
          return facilities.filter(f => f.type.includes('filtered') || f.type.includes('RO'))
        } else {
          return facilities.filter(f => f.status === 'open' || f.status === 'working' || f.status === 'active')
        }
      case 'available':
        if (activeTab === 'washrooms') {
          return facilities.filter(f => f.availability === 'available')
        } else if (activeTab === 'water') {
          return facilities.filter(f => f.status === 'working')
        } else {
          return facilities.filter(f => f.status === 'open' || f.status === 'working' || f.status === 'active')
        }
      case 'premium':
        if (activeTab === 'washrooms') {
          return facilities.filter(f => f.type === 'premium')
        } else if (activeTab === 'water') {
          return facilities.filter(f => f.type.includes('chilled') || f.type.includes('RO'))
        } else if (activeTab === 'food') {
          return facilities.filter(f => f.type === 'langar' || f.type === 'prasad')
        } else {
          return facilities.filter(f => f.type.includes('24/7') || (f.timing && f.timing.includes('24/7')))
        }
      default:
        return facilities.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    }
  }

  const getCleanlinessStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-600'
      case 'occupied':
        return 'bg-yellow-100 text-yellow-600'
      case 'maintenance':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'working':
        return 'bg-green-100 text-green-600'
      case 'low-pressure':
        return 'bg-yellow-100 text-yellow-600'
      case 'not-working':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getCapacityIcon = (capacity) => {
    switch (capacity) {
      case 'high': return '🔵🔵🔵'
      case 'medium': return '🔵🔵⚪'
      case 'low': return '🔵⚪⚪'
      default: return '⚪⚪⚪'
    }
  }

  const handleGetDirections = (facility) => {
    // Mock navigation to facility
    onNavigate('navigation')
  }

  const handleReportIssue = (facility) => {
    setSelectedFacility(facility)
    setShowReportModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1 hover:bg-blue-400 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{t('facilities')}</h1>
              <p className="text-blue-100 text-sm">Find & navigate to clean facilities</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Profile + Language Toggle grouped together */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onNavigate('profile')}
                className="bg-blue-400 rounded-full p-2 hover:bg-blue-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const newLang = t('currentLang') === 'en' ? 'hi' : 'en'
                  localStorage.setItem('language', newLang)
                  window.location.reload()
                }}
                className="bg-blue-400/30 rounded-full p-2 hover:bg-blue-400/50 transition-colors flex items-center justify-center"
                style={{ width: '36px', height: '36px' }}
              >
                <span className="text-xs">{t('currentLang') === 'en' ? '🇮🇳' : '🇺🇸'}</span>
              </button>
            </div>

            {/* List Toggle */}
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className="p-2 hover:bg-blue-400 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium text-center border-b-2 ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🗺️ All
          </button>
          <button
            onClick={() => setActiveTab('washrooms')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium text-center border-b-2 ${
              activeTab === 'washrooms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🚽 Washrooms
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium text-center border-b-2 ${
              activeTab === 'water'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            💧 Water
          </button>
          <button
            onClick={() => setActiveTab('medical')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium text-center border-b-2 ${
              activeTab === 'medical'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🏥 Medical
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium text-center border-b-2 ${
              activeTab === 'food'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🍽️ Food
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`flex-shrink-0 py-3 px-3 text-xs font-medium text-center border-b-2 ${
              activeTab === 'other'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📍 Other
          </button>
        </div>
      </div>

      {/* Main Map View */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-96"
          style={{ minHeight: '400px' }}
        ></div>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 left-4 right-20 z-10">
          {/* Quick Filters */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-lg">
            <div className="flex space-x-1 overflow-x-auto">
              <button
                onClick={() => setFilterBy('nearest')}
                className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  filterBy === 'nearest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                📍 Nearest
              </button>
              <button
                onClick={() => setFilterBy('cleanest')}
                className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  filterBy === 'cleanest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                ⭐ Best
              </button>
              <button
                onClick={() => setFilterBy('available')}
                className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  filterBy === 'available' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                ✅ Open
              </button>
              <button
                onClick={() => setFilterBy('premium')}
                className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  filterBy === 'premium' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                ⭐ Premium
              </button>
            </div>
          </div>
        </div>


        {/* List Drawer Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="bg-blue-500 text-white rounded-lg p-2 shadow-lg hover:bg-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Below Map */}
      <div className="p-4 space-y-4">
        {/* Map Legend */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-3 font-medium">🗺️ Facility Types on Map</div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>🚽 Washrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>💧 Water Points</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>🏥 Medical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>🍽️ Food Courts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>📍 Services</span>
            </div>
          </div>
        </div>

        {/* Live Updates */}
        <div className="bg-green-50 rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h4 className="font-medium text-green-800">Live Facility Updates</h4>
          </div>
          <div className="space-y-1 text-sm text-green-700">
            <p>🧹 Sector A Block 3 - Just cleaned (2 mins ago)</p>
            <p>💧 New filtered water point active near Main Gate</p>
            <p>🚽 Parking Zone B - Maintenance completed, now available</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{washrooms.filter(w => w.availability === 'available').length}</div>
            <div className="text-sm text-blue-600">Available Washrooms</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{waterPoints.filter(w => w.status === 'working').length}</div>
            <div className="text-sm text-green-600">Working Water Points</div>
          </div>
        </div>

        {/* Eco-Points Incentive */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-white/20 rounded-full p-2">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Help Keep Facilities Clean</h3>
              <p className="text-orange-100 text-sm">
                Report issues, rate cleanliness & earn eco-points
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <div className="font-bold">+10 pts</div>
              <div className="text-orange-100">Report Issue</div>
            </div>
            <div>
              <div className="font-bold">+15 pts</div>
              <div className="text-orange-100">Rate Facility</div>
            </div>
            <div>
              <div className="font-bold">+25 pts</div>
              <div className="text-orange-100">Help Clean</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Drawer for Facilities List */}
      {showDrawer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowDrawer(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[60vh] overflow-hidden animate-slide-up">
            {/* Drawer Handle */}
            <div className="flex justify-center py-3 border-b border-gray-200">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Drawer Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Nearby Facilities</h3>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Facilities List */}
              <div className="space-y-3">
                {getFilteredFacilities().slice(0, 10).map((facility) => {
                  // Determine facility type for dynamic rendering
                  const facilityType =
                    facility.cleanliness !== undefined ? 'washrooms' :
                    facility.queue !== undefined ? 'water' :
                    facility.services !== undefined ? (facility.staff ? 'medical' : 'other') :
                    facility.cuisine !== undefined ? 'food' : 'other'

                  return (
                    <div key={facility.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-800 text-sm">{facility.name}</h4>
                            {facilityType === 'washrooms' && facility.type === 'premium' && (
                              <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">⭐</span>
                            )}
                            {facilityType === 'food' && (facility.type === 'langar' || facility.type === 'prasad') && (
                              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">🙏</span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                            <span>📍 {facility.distance}</span>
                            {facilityType === 'washrooms' && <span>⏱️ {facility.queueTime}</span>}
                            {facilityType === 'medical' && <span>🕐 {facility.availability}</span>}
                            {facilityType === 'food' && <span>🍽️ {facility.cuisine}</span>}
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleGetDirections(facility)}
                              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition-colors"
                            >
                              📍 Directions
                            </button>
                            <button
                              onClick={() => {
                                handleReportIssue(facility)
                                setShowDrawer(false)
                              }}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs hover:bg-gray-300 transition-colors"
                            >
                              📝 Report
                            </button>
                          </div>
                        </div>

                        <div className="text-right ml-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            facility.availability ? getAvailabilityColor(facility.availability) : getStatusColor(facility.status)
                          }`}>
                            {facility.availability || facility.status?.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* View All Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDrawer(false)
                    // Could navigate to full list view or show more items
                  }}
                  className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                >
                  View All {getFilteredFacilities().length} Facilities
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Report Modal */}
      {showReportModal && selectedFacility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Report Issue</h3>
            <p className="text-gray-600 text-sm mb-4">
              Help improve {selectedFacility.name} for other pilgrims
            </p>

            <div className="space-y-3 mb-6">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                🧹 Needs cleaning
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                🚫 Out of order
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                🧻 Supplies needed
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                🚨 Safety concern
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false)
                  // Mock report submission - would earn eco points
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default WashroomLocator