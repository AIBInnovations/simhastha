import { useState } from 'react'

const WashroomLocator = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('washrooms')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'map'

  const washrooms = [
    {
      id: 1,
      name: 'Sector A - Block 3',
      distance: '150m',
      cleanliness: 4,
      availability: 'available',
      lastCleaned: '10 mins ago',
      type: 'premium',
      amenities: ['wheelchair', 'baby-care', 'water']
    },
    {
      id: 2,
      name: 'Main Gate Facilities',
      distance: '320m',
      cleanliness: 5,
      availability: 'available',
      lastCleaned: '5 mins ago',
      type: 'standard',
      amenities: ['wheelchair', 'water']
    },
    {
      id: 3,
      name: 'Ghat Road Complex',
      distance: '450m',
      cleanliness: 3,
      availability: 'occupied',
      lastCleaned: '25 mins ago',
      type: 'standard',
      amenities: ['water']
    },
    {
      id: 4,
      name: 'Parking Zone B',
      distance: '680m',
      cleanliness: 2,
      availability: 'maintenance',
      lastCleaned: '2 hours ago',
      type: 'basic',
      amenities: []
    }
  ]

  const waterPoints = [
    {
      id: 1,
      name: 'Hydration Station 1',
      distance: '80m',
      status: 'working',
      type: 'filtered',
      temperature: 'cool',
      queue: 'no-queue'
    },
    {
      id: 2,
      name: 'Central Water Point',
      distance: '220m',
      status: 'working',
      type: 'RO-filtered',
      temperature: 'normal',
      queue: 'short-queue'
    },
    {
      id: 3,
      name: 'Ghat Side Tap',
      distance: '380m',
      status: 'working',
      type: 'filtered',
      temperature: 'cool',
      queue: 'long-queue'
    },
    {
      id: 4,
      name: 'Emergency Supply',
      distance: '1.2km',
      status: 'low-pressure',
      type: 'basic',
      temperature: 'normal',
      queue: 'no-queue'
    }
  ]

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
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
            <h1 className="text-xl font-bold">Facilities Locator</h1>
            <p className="text-blue-100 text-sm">Find clean washrooms & water points</p>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            className="p-2 hover:bg-blue-400 rounded-full transition-colors"
          >
            {viewMode === 'list' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l6 3 6-3v13l-6 3-6-3z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('washrooms')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'washrooms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🚽 Washrooms
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'water'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            💧 Water Points
          </button>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Quick Filters */}
        <div className="bg-white rounded-2xl p-3 shadow-sm mb-4">
          <div className="flex space-x-2 overflow-x-auto">
            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              Nearest
            </button>
            <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              Cleanest
            </button>
            <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              Available
            </button>
            {activeTab === 'washrooms' && (
              <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                Premium
              </button>
            )}
          </div>
        </div>

        {/* Washrooms List */}
        {activeTab === 'washrooms' && (
          <div className="space-y-3">
            {washrooms.map((washroom) => (
              <div key={washroom.id} className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{washroom.name}</h3>
                      {washroom.type === 'premium' && (
                        <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{washroom.distance} away</p>
                    
                    {/* Cleanliness Rating */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-600">Cleanliness:</span>
                      <div className="flex items-center space-x-1">
                        {getCleanlinessStars(washroom.cleanliness)}
                        <span className="text-sm text-gray-500">({washroom.cleanliness}/5)</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center space-x-2 mb-3">
                      {washroom.amenities.includes('wheelchair') && <span className="text-blue-600">♿</span>}
                      {washroom.amenities.includes('baby-care') && <span className="text-pink-600">👶</span>}
                      {washroom.amenities.includes('water') && <span className="text-blue-600">💧</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(washroom.availability)}`}>
                      {washroom.availability}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Last cleaned: {washroom.lastCleaned}</p>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                      Directions
                    </button>
                    <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Water Points List */}
        {activeTab === 'water' && (
          <div className="space-y-3">
            {waterPoints.map((point) => (
              <div key={point.id} className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{point.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{point.distance} away</p>
                    
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className="text-sm font-medium text-blue-600">{point.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">Temp:</span>
                        <span className="text-sm font-medium text-gray-800">{point.temperature}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Queue:</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        point.queue === 'no-queue' ? 'bg-green-100 text-green-600' :
                        point.queue === 'short-queue' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {point.queue.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(point.status)}`}>
                      {point.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Get Directions
                  </button>
                  <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Report Button */}
        <div className="mt-6 bg-orange-50 rounded-2xl p-4 text-center">
          <h3 className="font-semibold text-orange-800 mb-2">Help Keep Facilities Clean</h3>
          <p className="text-sm text-orange-700 mb-3">
            Report cleanliness issues to earn eco-points and help other pilgrims
          </p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
            Report & Earn Points
          </button>
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
          <button onClick={() => onNavigate('heatmap')} className="flex flex-col items-center py-2 px-4 text-gray-400">
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

export default WashroomLocator