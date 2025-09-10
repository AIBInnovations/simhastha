import { useState } from 'react'

const Navigation = ({ onNavigate }) => {
  const [destination, setDestination] = useState('')
  const [showRoutes, setShowRoutes] = useState(false)

  const popularDestinations = [
    { name: 'Har Ki Pauri', distance: '2.3 km', crowd: 'moderate' },
    { name: 'Triveni Sangam', distance: '1.8 km', crowd: 'high' },
    { name: 'Ram Ghat', distance: '3.1 km', crowd: 'low' },
    { name: 'Dashashwamedh Ghat', distance: '2.7 km', crowd: 'moderate' }
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
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'Least Crowded',
      time: '22 mins',
      distance: '2.4 km',
      crowd: 'low',
      icon: '👥',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      name: 'Shuttle Route',
      time: '12 mins',
      distance: '1.5 km',
      crowd: 'low',
      icon: '🚌',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const handleSearch = () => {
    if (destination.trim()) {
      setShowRoutes(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-500 text-white p-4">
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
            <h1 className="text-xl font-bold">Route Finder</h1>
            <p className="text-teal-100 text-sm">Find the best path to your destination</p>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
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
                  value="Kumbh Mela Ground, Gate 3"
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
              Find Routes
            </button>
          </div>
        </div>

        {/* Popular Destinations */}
        {!showRoutes && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Popular Destinations</h3>
            <div className="space-y-2">
              {popularDestinations.map((place, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setDestination(place.name)
                    setShowRoutes(true)
                  }}
                  className="bg-white rounded-xl p-3 shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">{place.name}</h4>
                    <p className="text-sm text-gray-600">{place.distance}</p>
                  </div>
                  <div className="flex items-center space-x-2">
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
                      <div className={`${route.bgColor} rounded-full p-2`}>
                        <span className="text-lg">{route.icon}</span>
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

                  {/* Route Preview */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Kumbh Ground</span>
                      <div className="flex-1 border-t border-dashed border-gray-300"></div>
                      <span>Main Road</span>
                      <div className="flex-1 border-t border-dashed border-gray-300"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{destination}</span>
                    </div>
                  </div>

                  <button className="w-full bg-teal-500 text-white rounded-lg p-3 font-medium hover:bg-teal-600 transition-colors">
                    Start Navigation
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Updates */}
        <div className="bg-blue-50 rounded-2xl p-4 mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h4 className="font-medium text-blue-800">Live Updates</h4>
          </div>
          <p className="text-sm text-blue-700">
            ⚠️ Heavy crowd reported at Triveni Sangam. Consider alternate routes.
          </p>
          <p className="text-sm text-blue-700 mt-1">
            🚌 New shuttle service available from Gate 2 to Ram Ghat.
          </p>
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
          <button className="flex flex-col items-center py-2 px-4 text-teal-500">
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

export default Navigation