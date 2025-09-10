import { useState } from 'react'

const EventTracker = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('today')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const todayEvents = [
    {
      id: 1,
      title: 'Ganga Aarti',
      time: '06:00 AM',
      location: 'Har Ki Pauri',
      crowd: 'high',
      status: 'ongoing',
      description: 'Traditional prayer ceremony at the main ghat',
      duration: '45 mins',
      category: 'ritual'
    },
    {
      id: 2,
      title: 'Bhajan Sandhya',
      time: '07:30 PM',
      location: 'Central Stage',
      crowd: 'moderate',
      status: 'upcoming',
      description: 'Evening devotional songs and chanting',
      duration: '2 hours',
      category: 'cultural'
    },
    {
      id: 3,
      title: 'Pravachan by Sant Maharaj',
      time: '09:00 AM',
      location: 'Discourse Hall',
      crowd: 'low',
      status: 'completed',
      description: 'Spiritual discourse on Dharma',
      duration: '1.5 hours',
      category: 'spiritual'
    },
    {
      id: 4,
      title: 'Cultural Dance Performance',
      time: '08:00 PM',
      location: 'Main Amphitheater',
      crowd: 'high',
      status: 'upcoming',
      description: 'Traditional folk dances from different states',
      duration: '1 hour',
      category: 'cultural'
    }
  ]

  const upcomingEvents = [
    {
      id: 5,
      title: 'Makar Sankranti Celebration',
      time: '05:00 AM',
      date: 'Tomorrow',
      location: 'All Ghats',
      crowd: 'very-high',
      status: 'upcoming',
      description: 'Major religious festival celebration',
      duration: '6 hours',
      category: 'festival'
    },
    {
      id: 6,
      title: 'Yoga and Meditation Session',
      time: '06:30 AM',
      date: 'Jan 16',
      location: 'Meditation Ground',
      crowd: 'low',
      status: 'upcoming',
      description: 'Group yoga and meditation practice',
      duration: '2 hours',
      category: 'wellness'
    }
  ]

  const myEvents = [
    {
      id: 7,
      title: 'Ganga Aarti',
      time: '06:00 AM',
      location: 'Har Ki Pauri',
      reminder: true,
      status: 'upcoming'
    },
    {
      id: 8,
      title: 'Bhajan Sandhya',
      time: '07:30 PM',
      location: 'Central Stage',
      reminder: true,
      status: 'upcoming'
    }
  ]

  const getCrowdColor = (crowd) => {
    switch (crowd) {
      case 'low':
        return 'bg-green-100 text-green-600'
      case 'moderate':
        return 'bg-yellow-100 text-yellow-600'
      case 'high':
        return 'bg-orange-100 text-orange-600'
      case 'very-high':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-600'
      case 'upcoming':
        return 'bg-purple-100 text-purple-600'
      case 'completed':
        return 'bg-gray-100 text-gray-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'ritual':
        return '🙏'
      case 'cultural':
        return '🎭'
      case 'spiritual':
        return '📿'
      case 'festival':
        return '🎉'
      case 'wellness':
        return '🧘'
      default:
        return '📅'
    }
  }

  const renderEventList = (events, showDate = false) => {
    return events.map((event) => (
      <div key={event.id} className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <div className="bg-purple-100 rounded-full p-2">
              <span className="text-lg">{getCategoryIcon(event.category)}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg">{event.title}</h3>
              <div className="flex items-center space-x-4 mt-1 mb-2">
                <span className="text-sm text-gray-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{event.time}</span>
                </span>
                {showDate && event.date && (
                  <span className="text-sm text-gray-600">{event.date}</span>
                )}
                <span className="text-sm text-gray-600 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{event.description}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
            {event.crowd && (
              <span className={`text-xs px-2 py-1 rounded-full ${getCrowdColor(event.crowd)}`}>
                {event.crowd.replace('-', ' ')} crowd
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Duration: {event.duration}</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedEvent(event)}
              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg text-sm hover:bg-purple-200 transition-colors"
            >
              Details
            </button>
            <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-600 transition-colors">
              Set Reminder
            </button>
          </div>
        </div>
      </div>
    ))
  }

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-purple-50">
        {/* Header */}
        <div className="bg-purple-500 text-white p-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="p-1 hover:bg-purple-400 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Event Details</h1>
          </div>
        </div>

        <div className="p-4 pb-20">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{getCategoryIcon(selectedEvent.category)}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-600">{selectedEvent.description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Time</p>
                  <p className="text-sm text-gray-600">{selectedEvent.time} • {selectedEvent.duration}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Location</p>
                  <p className="text-sm text-gray-600">{selectedEvent.location}</p>
                </div>
              </div>

              {selectedEvent.crowd && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.292a2 2 0 11-2.828 2.828M5 13a2 2 0 012-2v10a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-800">Expected Crowd</p>
                    <span className={`text-sm px-2 py-1 rounded-full ${getCrowdColor(selectedEvent.crowd)}`}>
                      {selectedEvent.crowd.replace('-', ' ')} crowd expected
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-600 transition-colors">
                Set Reminder
              </button>
              <button 
                onClick={() => onNavigate('navigation')}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
              >
                Get Directions
              </button>
            </div>
          </div>

          {/* Related Events */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Related Events</h3>
            <div className="space-y-3">
              {todayEvents.filter(e => e.id !== selectedEvent.id).slice(0, 2).map((event) => (
                <div key={event.id} className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.time} • {event.location}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="text-purple-600 text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-500 text-white p-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-1 hover:bg-purple-400 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold">Event Tracker</h1>
            <p className="text-purple-100 text-sm">Discover spiritual & cultural events</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'today'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Today's Events
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'upcoming'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('my-events')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'my-events'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Events
          </button>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Current Live Event Banner */}
        {activeTab === 'today' && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE NOW</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Ganga Aarti</h3>
            <p className="text-blue-100 text-sm">Har Ki Pauri • Started 15 mins ago</p>
            <button className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium mt-3">
              Join Live Stream
            </button>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-4">
          {activeTab === 'today' && renderEventList(todayEvents)}
          {activeTab === 'upcoming' && renderEventList(upcomingEvents, true)}
          {activeTab === 'my-events' && (
            <>
              {myEvents.length > 0 ? (
                renderEventList(myEvents)
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">No Events Added</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Add events to your personal schedule to get reminders
                  </p>
                  <button 
                    onClick={() => setActiveTab('today')}
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Browse Events
                  </button>
                </div>
              )}
            </>
          )}
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
          <button className="flex flex-col items-center py-2 px-4 text-purple-500">
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

export default EventTracker