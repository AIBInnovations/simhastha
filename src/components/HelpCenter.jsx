import { useState } from 'react'

const HelpCenter = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      description: 'New to Sārathī? Start here',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'safety',
      title: 'Safety & Emergency',
      icon: '🛡️',
      description: 'Safety features and emergency help',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'navigation',
      title: 'Navigation & Maps',
      icon: '🗺️',
      description: 'Finding your way around',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'family',
      title: 'Family & Groups',
      icon: '👨‍👩‍👧‍👦',
      description: 'Managing family groups',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'events',
      title: 'Events & Activities',
      icon: '🎭',
      description: 'Events, schedules, and participation',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'facilities',
      title: 'Facilities & Services',
      icon: '🏢',
      description: 'Finding washrooms, water, food',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      id: 'ecopoints',
      title: 'Eco-Points & Rewards',
      icon: '🌱',
      description: 'Earning points and rewards',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: '⚙️',
      description: 'App issues and troubleshooting',
      color: 'bg-gray-100 text-gray-600'
    }
  ]

  const faqData = {
    'getting-started': [
      {
        question: 'How do I create an account on Sārathī?',
        answer: 'You can create an account by tapping "Create Account" on the login screen. You\'ll need to provide your phone number or email, complete the 5-step registration process including personal information, address, pilgrimage details, emergency contacts, and preferences.'
      },
      {
        question: 'Can I use the app without creating an account?',
        answer: 'Yes! You can tap "Continue as Guest" to explore most features. However, creating an account enables family safety features, personalized recommendations, and eco-points rewards.'
      },
      {
        question: 'What languages does the app support?',
        answer: 'Sārathī supports multiple languages including English, Hindi (हिंदी), Marathi (मराठी), Gujarati (ગુજરાતી), and Bengali (বাংলা). You can change the language in Settings → Appearance → Language.'
      },
      {
        question: 'How do I complete the tutorial again?',
        answer: 'Go to Help Center → Tutorial & Guides → "App Tutorial" to replay the onboarding experience anytime.'
      }
    ],
    'safety': [
      {
        question: 'How does the SOS emergency system work?',
        answer: 'Press the red SOS button on any screen or the floating SOS button on the dashboard. Choose your emergency type (Medical, Lost, Safety, Crowd), confirm the alert, and your location will be shared with emergency services, volunteers, and your emergency contacts.'
      },
      {
        question: 'How do I add emergency contacts?',
        answer: 'Go to Profile → Edit Profile → Emergency Contacts or Family & Groups → Safety → Emergency Contacts. Add at least one contact with their name, relationship, and phone number.'
      },
      {
        question: 'What if I get separated from my family?',
        answer: 'Use the "I\'m Lost" emergency option or go to Family & Groups to see your family members\' last known locations. You can also send emergency alerts to specific family members.'
      },
      {
        question: 'How does family location sharing work?',
        answer: 'When enabled in Family & Groups → Safety Settings, family members can see each other\'s real-time locations on the map and receive safety check-in notifications.'
      }
    ],
    'navigation': [
      {
        question: 'How do I get directions to a location?',
        answer: 'Tap the "Find My Route" card on the dashboard or go to Navigation. Enter your destination or select from popular destinations. The app will show multiple route options considering crowd density and real-time conditions.'
      },
      {
        question: 'What do the different route options mean?',
        answer: 'Fastest Route: Quickest path based on current conditions. Least Crowded: Avoids high-density areas. Shuttle Route: Uses available shuttle services for easier travel.'
      },
      {
        question: 'Can I use navigation offline?',
        answer: 'Yes! Enable offline mode in Settings → Data & Storage → Offline Mode. Essential maps and route information will be downloaded for offline access.'
      },
      {
        question: 'How accurate is the crowd information?',
        answer: 'Crowd data is updated in real-time using anonymous location data from app users, IoT sensors, and volunteer reports. It\'s refreshed every few minutes for accuracy.'
      }
    ],
    'family': [
      {
        question: 'How do I create a family group?',
        answer: 'Go to Family & Groups → Add Member → Create New Group. Set up your group name, add family members with their contact information, and share the group code with them.'
      },
      {
        question: 'How do I join an existing family group?',
        answer: 'Go to Family & Groups → Join Group, enter the group code provided by your family leader, and your request will be sent for approval.'
      },
      {
        question: 'What information should I add for family members?',
        answer: 'Add their name, relationship, phone number, age, and any medical notes (medications, allergies, special needs). This helps in emergencies and ensures proper care.'
      },
      {
        question: 'How do safety check-ins work?',
        answer: 'Set check-in intervals in Safety Settings. Family members will receive automatic reminders to confirm they\'re safe. If someone doesn\'t respond, alerts are sent to the group.'
      }
    ],
    'events': [
      {
        question: 'How do I find events happening today?',
        answer: 'Go to Events → Today\'s Events to see all ongoing and upcoming events. You can filter by category, location, or time to find events that interest you.'
      },
      {
        question: 'Can I set reminders for events?',
        answer: 'Yes! Tap on any event → "Set Reminder" to receive notifications before the event starts. You can customize reminder timing in Settings → Notifications.'
      },
      {
        question: 'How do I join live event streams?',
        answer: 'When an event is live, you\'ll see a "Join Live Stream" button on the event page. Tap it to watch the live broadcast with other participants.'
      },
      {
        question: 'Can I add personal events to my calendar?',
        answer: 'Yes! Go to Events → My Events → Add Personal Event. You can create private events for your family or group activities.'
      }
    ],
    'facilities': [
      {
        question: 'How do I find clean washrooms nearby?',
        answer: 'Tap "Facilities" on the dashboard or go to Facilities Locator → Washrooms. You\'ll see nearby washrooms with cleanliness ratings, availability status, and amenities.'
      },
      {
        question: 'What do the cleanliness ratings mean?',
        answer: '5 stars = Excellent, 4 stars = Good, 3 stars = Average, 2 stars = Needs attention, 1 star = Poor. Ratings are based on recent user reports and maintenance updates.'
      },
      {
        question: 'How do I report a facility issue?',
        answer: 'Go to the facility details page and tap "Report Issue". Select the problem type (cleanliness, maintenance, accessibility) and provide details. Your report helps maintain facility quality.'
      },
      {
        question: 'Can I check water quality at water points?',
        answer: 'Yes! Water points show quality indicators: RO-filtered (highest quality), Filtered (good quality), Basic (standard tap water). Temperature and queue information is also available.'
      }
    ],
    'ecopoints': [
      {
        question: 'How do I earn eco-points?',
        answer: 'Earn points through eco-friendly actions: using water responsibly, proper waste disposal, helping other pilgrims, using shuttle services, reporting cleanliness issues, and completing daily challenges.'
      },
      {
        question: 'What can I do with eco-points?',
        answer: 'Redeem points for rewards like blessed items, meals, photo prints, priority access, spiritual books, and VIP experiences. Check the Rewards tab for available items.'
      },
      {
        question: 'How do I scan QR codes for points?',
        answer: 'Tap the QR scanner icon in Eco-Points or use the camera button in challenges. Scan QR codes at eco-stations, waste bins, water points, and event check-ins to earn points.'
      },
      {
        question: 'What are the different badge levels?',
        answer: 'Badges represent spiritual achievements: Shubha (Good Deeds), Sattva (Cleanliness), Dhrti (Patience), Seva (Service), Ahimsa (Non-violence), and Moksha (Ultimate Liberation).'
      }
    ],
    'technical': [
      {
        question: 'The app is running slowly. What should I do?',
        answer: 'Try these steps: Close other apps, restart the app, check your internet connection, clear app cache in Settings → Data & Storage, or enable Data Saver mode to reduce data usage.'
      },
      {
        question: 'I\'m not receiving notifications. How do I fix this?',
        answer: 'Check Settings → Notifications and ensure relevant notifications are enabled. Also check your device\'s notification settings for Sārathī and ensure the app has permission to send notifications.'
      },
      {
        question: 'How do I save data while using the app?',
        answer: 'Enable Data Saver mode in Settings → Data & Storage. This reduces image quality, limits automatic downloads, and optimizes data usage while maintaining essential features.'
      },
      {
        question: 'My location is not accurate. How do I fix it?',
        answer: 'Ensure location services are enabled for Sārathī in your device settings. Try moving to an open area with clear sky view, restart the app, or toggle location services off and on again.'
      }
    ]
  }

  const quickActions = [
    { title: 'Watch App Tutorial', icon: '📺', action: () => onNavigate('tutorial') },
    { title: 'Contact Support', icon: '💬', action: () => alert('Support chat would open here') },
    { title: 'Report a Bug', icon: '🐛', action: () => alert('Bug report form would open here') },
    { title: 'Accessibility Options', icon: '♿', action: () => onNavigate('accessibility') }
  ]

  const filteredFAQs = searchQuery
    ? Object.values(faqData).flat().filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData[activeCategory] || []

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Help Center</h1>
            <p className="text-gray-600 text-sm">Get help and find answers</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help topics..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {!searchQuery && (
        <>
          {/* Quick Actions */}
          <div className="px-4 mb-6">
            <h2 className="font-semibold text-gray-800 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="font-medium text-gray-800 text-sm">{action.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Help Categories */}
          <div className="px-4 mb-6">
            <h2 className="font-semibold text-gray-800 mb-3">Help Categories</h2>
            <div className="grid grid-cols-1 gap-3">
              {helpCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-left ${
                    activeCategory === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* FAQ Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">
            {searchQuery ? `Search Results (${filteredFAQs.length})` :
             `${helpCategories.find(cat => cat.id === activeCategory)?.title} - FAQ`}
          </h2>
          {!searchQuery && (
            <button
              onClick={() => setActiveCategory('getting-started')}
              className="text-blue-600 text-sm font-medium"
            >
              View All
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800 pr-4">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedFAQ === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              Try different keywords or browse our help categories above.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Contact Support Floating Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <button
          onClick={() => alert('Support chat would open here')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default HelpCenter