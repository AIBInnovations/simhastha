import { useState } from 'react'

const CrowdHeatMap = ({ onNavigate }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [timeRange, setTimeRange] = useState('now')

  const locations = [
    {
      id: 1,
      name: 'Har Ki Pauri',
      crowd: 'low',
      coordinates: { x: 60, y: 40 },
      capacity: '85%',
      waitTime: '5 mins',
      type: 'ghat',
      facilities: ['washroom', 'water', 'medical'],
      peakHours: ['6:00 AM', '7:00 PM'],
      description: 'Main ghat for Ganga Aarti'
    },
    {
      id: 2,
      name: 'Triveni Sangam',
      crowd: 'high',
      coordinates: { x: 45, y: 60 },
      capacity: '95%',
      waitTime: '25 mins',
      type: 'ghat',
      facilities: ['washroom', 'water'],
      peakHours: ['5:00 AM', '8:00 PM'],
      description: 'Holy confluence of three rivers'
    },
    {
      id: 3,
      name: 'Ram Ghat',
      crowd: 'moderate',
      coordinates: { x: 70, y: 30 },
      capacity: '60%',
      waitTime: '10 mins',
      type: 'ghat',
      facilities: ['washroom', 'water', 'parking'],
      peakHours: ['7:00 AM', '6:00 PM'],
      description: 'Peaceful ghat for prayers'
    },
    {
      id: 4,
      name: 'Main Entrance',
      crowd: 'high',
      coordinates: { x: 30, y: 20 },
      capacity: '90%',
      waitTime: '20 mins',
      type: 'entrance',
      facilities: ['security', 'information', 'parking'],
      peakHours: ['8:00 AM', '5:00 PM'],
      description: 'Primary entry point'
    },
    {
      id: 5,
      name: 'Food Court',
      crowd: 'moderate',
      coordinates: { x: 50, y: 75 },
      capacity: '70%',
      waitTime: '12 mins',
      type: 'amenity',
      facilities: ['food', 'washroom', 'seating'],
      peakHours: ['12:00 PM', '7:00 PM'],
      description: 'Dining and refreshment area'
    },
    {
      id: 6,
      name: 'Parking Zone A',
      crowd: 'low',
      coordinates: { x: 15, y: 45 },
      capacity: '40%',
      waitTime: '2 mins',
      type: 'parking',
      facilities: ['parking', 'shuttle'],
      peakHours: ['9:00 AM', '4:00 PM'],
      description: 'Vehicle parking area'
    },
    {
      id: 7,
      name: 'Medical Center',
      crowd: 'low',
      coordinates: { x: 80, y: 65 },
      capacity: '30%',
      waitTime: '0 mins',
      type: 'medical',
      facilities: ['medical', 'pharmacy', 'ambulance'],
      peakHours: ['10:00 AM', '3:00 PM'],
      description: 'Emergency medical services'
    }
  ]

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

  const getFilteredLocations = () => {
    if (filterType === 'all') return locations
    return locations.filter(loc => loc.type === filterType)
  }

  const predictions = [
    { time: '2:00 PM', location: 'Har Ki Pauri', crowd: 'high', action: 'avoid' },
    { time: '3:30 PM', location: 'Food Court', crowd: 'very-high', action: 'avoid' },
    { time: '5:00 PM', location: 'Triveni Sangam', crowd: 'moderate', action: 'ok' },
    { time: '6:00 PM', location: 'Ram Ghat', crowd: 'low', action: 'recommended' }
  ]

  const liveAlerts = [
    { type: 'warning', message: 'Heavy crowd buildup at Triveni Sangam', time: '2 mins ago' },
    { type: 'info', message: 'New shuttle service available from Gate 2', time: '5 mins ago' },
    { type: 'success', message: 'Parking Zone B now has 200+ free spots', time: '10 mins ago' }
  ]

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
        </div>

        <div className="p-4 pb-20">
          {/* Crowd Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <div className="text-center mb-4">
              <div className={`w-20 h-20 rounded-full ${getCrowdColor(location.crowd)} mx-auto mb-4 flex items-center justify-center`}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{location.crowd} Crowd</h2>
              <p className="text-gray-600">Capacity: {location.capacity}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="font-semibold text-gray-800">Wait Time</div>
                <div className="text-lg font-bold text-blue-600">{location.waitTime}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="font-semibold text-gray-800">Capacity</div>
                <div className="text-lg font-bold text-orange-600">{location.capacity}</div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Available Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {location.facilities.map((facility, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
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
                  {' ' + facility}
                </span>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Peak Hours</h3>
            <div className="flex space-x-3">
              {location.peakHours.map((hour, index) => (
                <div key={index} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm">
                  {hour}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">Avoid these times for better experience</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('navigation')}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              Get Directions
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Set Crowd Alert
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
            <h1 className="text-xl font-bold">Crowd Heat Map</h1>
            <p className="text-blue-100 text-sm">Real-time crowd monitoring</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex space-x-2 overflow-x-auto mb-3">
          {[
            { key: 'all', label: 'All Locations' },
            { key: 'ghat', label: 'Ghats' },
            { key: 'entrance', label: 'Entrances' },
            { key: 'amenity', label: 'Amenities' },
            { key: 'parking', label: 'Parking' },
            { key: 'medical', label: 'Medical' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterType(filter.key)}
              className={`px-3 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterType === filter.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-600">Time:</span>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
          >
            <option value="now">Right Now</option>
            <option value="1hour">Next Hour</option>
            <option value="3hours">Next 3 Hours</option>
            <option value="today">Today</option>
          </select>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Heat Map */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Live Heat Map</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Moderate</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Simplified Heat Map Visualization */}
          <div className="relative bg-gray-100 rounded-2xl h-64 overflow-hidden">
            {/* Background river/path lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M10,20 Q50,30 90,25" stroke="#93c5fd" strokeWidth="3" fill="none" />
              <path d="M15,60 Q45,65 85,55" stroke="#93c5fd" strokeWidth="2" fill="none" />
              <path d="M20,40 L80,45" stroke="#d1d5db" strokeWidth="1" fill="none" />
            </svg>

            {/* Location markers */}
            {getFilteredLocations().map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`absolute rounded-full ${getCrowdColor(location.crowd)} ${getCrowdSize(location.crowd)} 
                  animate-pulse hover:scale-150 transition-all duration-200 border-2 border-white shadow-lg`}
                style={{ 
                  left: `${location.coordinates.x}%`, 
                  top: `${location.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={location.name}
              />
            ))}

            {/* Location labels */}
            {getFilteredLocations().map((location) => (
              <div
                key={`label-${location.id}`}
                className="absolute text-xs font-medium text-gray-700 bg-white/80 px-2 py-1 rounded-lg shadow-sm pointer-events-none"
                style={{ 
                  left: `${location.coordinates.x}%`, 
                  top: `${location.coordinates.y + 8}%`,
                  transform: 'translate(-50%, 0)'
                }}
              >
                {location.name}
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Live Alerts</h3>
          <div className="space-y-2">
            {liveAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-red-50 text-red-700' :
                alert.type === 'info' ? 'bg-blue-50 text-blue-700' :
                'bg-green-50 text-green-700'
              }`}>
                <div className="flex items-start space-x-2">
                  <div className={`rounded-full p-1 ${
                    alert.type === 'warning' ? 'bg-red-200' :
                    alert.type === 'info' ? 'bg-blue-200' :
                    'bg-green-200'
                  }`}>
                    {alert.type === 'warning' && '⚠️'}
                    {alert.type === 'info' && 'ℹ️'}
                    {alert.type === 'success' && '✅'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-70">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictions */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-3">Crowd Predictions</h3>
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{prediction.location}</p>
                  <p className="text-sm text-gray-600">{prediction.time}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    prediction.action === 'recommended' ? 'bg-green-100 text-green-600' :
                    prediction.action === 'ok' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {prediction.crowd}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {prediction.action === 'recommended' ? '👍 Good time' :
                     prediction.action === 'ok' ? '⚠️ Moderate' :
                     '❌ Avoid'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center py-2 px-4 text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-blue-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
            </svg>
            <span className="text-xs mt-1">Map</span>
          </button>
          <button onClick={() => onNavigate('events')} className="flex flex-col items-center py-2 px-4 text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs mt-1">Events</span>
          </button>
          <button onClick={() => onNavigate('ecopoints')} className="flex flex-col items-center py-2 px-4 text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs mt-1">Points</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CrowdHeatMap