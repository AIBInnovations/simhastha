import { useState } from 'react'

const Tutorial = ({ onNavigate }) => {
  const [selectedTutorial, setSelectedTutorial] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialCategories = [
    {
      id: 'app-basics',
      title: 'App Basics',
      description: 'Learn the fundamentals',
      icon: '📱',
      duration: '5 min',
      difficulty: 'Beginner',
      color: 'bg-blue-500'
    },
    {
      id: 'safety-features',
      title: 'Safety Features',
      description: 'Master emergency tools',
      icon: '🛡️',
      duration: '8 min',
      difficulty: 'Important',
      color: 'bg-red-500'
    },
    {
      id: 'navigation',
      title: 'Smart Navigation',
      description: 'Find your way efficiently',
      icon: '🗺️',
      duration: '6 min',
      difficulty: 'Beginner',
      color: 'bg-green-500'
    },
    {
      id: 'family-groups',
      title: 'Family Coordination',
      description: 'Keep family safe together',
      icon: '👨‍👩‍👧‍👦',
      duration: '7 min',
      difficulty: 'Intermediate',
      color: 'bg-purple-500'
    },
    {
      id: 'events',
      title: 'Events & Activities',
      description: 'Participate in sacred events',
      icon: '🎭',
      duration: '5 min',
      difficulty: 'Beginner',
      color: 'bg-orange-500'
    },
    {
      id: 'ecopoints',
      title: 'Eco-Points System',
      description: 'Earn rewards sustainably',
      icon: '🌱',
      duration: '6 min',
      difficulty: 'Beginner',
      color: 'bg-emerald-500'
    }
  ]

  const tutorialSteps = {
    'app-basics': [
      {
        title: 'Welcome to the Dashboard',
        description: 'Your dashboard is the central hub with quick access to all features.',
        illustration: '🏠',
        content: 'The dashboard shows your current status, quick action cards, live updates, and the emergency SOS button. Everything you need is just one tap away.',
        tips: ['Tap any card to access that feature', 'The SOS button is always visible for emergencies', 'Live status shows real-time crowd information']
      },
      {
        title: 'Bottom Navigation',
        description: 'Navigate between main sections using the bottom menu.',
        illustration: '🧭',
        content: 'The bottom navigation provides quick access to Home, Map, Events, and Points. It stays visible across most screens for easy navigation.',
        tips: ['Home returns to dashboard', 'Map shows crowd heat maps', 'Events lists all activities', 'Points tracks your eco-rewards']
      },
      {
        title: 'Profile & Settings',
        description: 'Manage your account and customize your experience.',
        illustration: '⚙️',
        content: 'Access your profile from the dashboard header. Customize notifications, language, privacy settings, and manage your family group.',
        tips: ['Update emergency contacts regularly', 'Enable location sharing for safety', 'Customize notification preferences']
      }
    ],
    'safety-features': [
      {
        title: 'Emergency SOS System',
        description: 'Get immediate help when you need it most.',
        illustration: '🆘',
        content: 'The red SOS button is available on every screen. Press it to send your location to emergency services, volunteers, and family members.',
        tips: ['Choose the right emergency type', 'Confirm before sending alerts', 'Your location is automatically shared']
      },
      {
        title: 'Family Safety Monitoring',
        description: 'Keep track of your family members in real-time.',
        illustration: '👨‍👩‍👧‍👦',
        content: 'Set up your family group to see everyone\'s location and safety status. Get notified if someone needs help or goes missing.',
        tips: ['Add all family members with contact info', 'Enable location sharing', 'Set up regular check-in intervals']
      },
      {
        title: 'Emergency Contacts',
        description: 'Ensure your emergency contacts are always up to date.',
        illustration: '📞',
        content: 'Add trusted contacts who will be notified in emergencies. Include local contacts, family, and friends who can provide immediate assistance.',
        tips: ['Add at least 2 emergency contacts', 'Include relationship information', 'Keep contact information current']
      }
    ],
    'navigation': [
      {
        title: 'Smart Route Planning',
        description: 'Find the best path considering crowds and events.',
        illustration: '🛣️',
        content: 'Enter your destination to see multiple route options: fastest, least crowded, and shuttle routes. Real-time updates help you avoid congestion.',
        tips: ['Check crowd levels before traveling', 'Use shuttle routes for easier access', 'Save frequently visited locations']
      },
      {
        title: 'Real-Time Updates',
        description: 'Stay informed about changing conditions.',
        illustration: '📡',
        content: 'Receive live updates about crowd levels, road closures, new shuttle services, and safety alerts along your route.',
        tips: ['Enable location services for accuracy', 'Check updates before departing', 'Follow volunteer guidance']
      },
      {
        title: 'Offline Maps',
        description: 'Navigate even without internet connection.',
        illustration: '📍',
        content: 'Download maps for offline use in Settings. Essential navigation data is stored locally for areas with poor connectivity.',
        tips: ['Download maps before arriving', 'Check storage space regularly', 'Update offline maps periodically']
      }
    ],
    'family-groups': [
      {
        title: 'Creating Your Group',
        description: 'Set up a family group for coordinated safety.',
        illustration: '👨‍👩‍👧‍👦',
        content: 'Create a group with a unique code, add family members, and assign roles. Everyone can see the group\'s safety status and location.',
        tips: ['Choose a memorable group name', 'Share the group code securely', 'Assign a group leader']
      },
      {
        title: 'Safety Check-ins',
        description: 'Regular automated safety confirmations.',
        illustration: '✅',
        content: 'Set automatic check-in intervals. Family members receive reminders to confirm they\'re safe. Missed check-ins trigger alerts.',
        tips: ['Set appropriate check-in intervals', 'Respond to check-in prompts quickly', 'Contact family if someone misses check-ins']
      },
      {
        title: 'Emergency Coordination',
        description: 'Coordinate help when family members need assistance.',
        illustration: '🚨',
        content: 'Send targeted emergency alerts to specific family members or the entire group. Share your location and get real-time assistance.',
        tips: ['Use targeted alerts appropriately', 'Provide clear information in emergencies', 'Follow up after incidents']
      }
    ],
    'events': [
      {
        title: 'Discovering Events',
        description: 'Find spiritual and cultural events happening around you.',
        illustration: '🔍',
        content: 'Browse today\'s events, upcoming activities, and ongoing programs. Filter by location, time, or category to find what interests you.',
        tips: ['Check event crowd levels', 'Arrive early for popular events', 'Read event descriptions carefully']
      },
      {
        title: 'Event Reminders',
        description: 'Never miss important spiritual moments.',
        illustration: '🔔',
        content: 'Set reminders for events you want to attend. Get notifications with enough time to reach the location and find good spots.',
        tips: ['Set reminders 30-60 minutes early', 'Consider travel time to events', 'Check for any event changes']
      },
      {
        title: 'Personal Calendar',
        description: 'Create your own spiritual schedule.',
        illustration: '📅',
        content: 'Add personal events, private family gatherings, and custom reminders to your calendar. Sync with your family group for coordination.',
        tips: ['Plan rest periods between events', 'Share important events with family', 'Include meal and rest times']
      }
    ],
    'ecopoints': [
      {
        title: 'Earning Points',
        description: 'Contribute to sustainability and earn rewards.',
        illustration: '⭐',
        content: 'Earn eco-points through responsible actions: proper waste disposal, water conservation, helping others, and using eco-friendly transport.',
        tips: ['Look for QR codes at eco-stations', 'Report environmental issues', 'Use shuttle services when available']
      },
      {
        title: 'Challenges & Badges',
        description: 'Complete daily challenges and earn spiritual badges.',
        illustration: '🏆',
        content: 'Participate in daily sustainability challenges and work toward earning spiritual achievement badges representing different virtues.',
        tips: ['Check daily challenges each morning', 'Focus on one badge at a time', 'Help others to earn service points']
      },
      {
        title: 'Rewards & Redemption',
        description: 'Use your points for meaningful rewards.',
        illustration: '🎁',
        content: 'Redeem points for blessed items, priority access, meals, and spiritual experiences. Higher point totals unlock exclusive rewards.',
        tips: ['Save points for meaningful rewards', 'Check reward availability regularly', 'Share rewards with family when appropriate']
      }
    ]
  }

  const selectedTutorialData = selectedTutorial ? tutorialCategories.find(t => t.id === selectedTutorial) : null
  const steps = selectedTutorial ? tutorialSteps[selectedTutorial] : []
  const currentStepData = steps[currentStep]

  const handleStartTutorial = (tutorialId) => {
    setSelectedTutorial(tutorialId)
    setCurrentStep(0)
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Tutorial completed
      setSelectedTutorial(null)
      setCurrentStep(0)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBackToList = () => {
    setSelectedTutorial(null)
    setCurrentStep(0)
  }

  if (selectedTutorial && currentStepData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
        {/* Tutorial Header */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackToList}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-800">{selectedTutorialData?.title}</h1>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <button
              onClick={handleBackToList}
              className="text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Tutorial Content */}
        <div className="px-6 pb-24">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            {/* Illustration */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">{currentStepData.illustration}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentStepData.title}</h2>
              <p className="text-gray-600 leading-relaxed">{currentStepData.description}</p>
            </div>

            {/* Main Content */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>
              </div>

              {/* Tips */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <span className="text-yellow-500 mr-2">💡</span>
                  Pro Tips
                </h3>
                {currentStepData.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex space-x-4">
              {currentStep > 0 && (
                <button
                  onClick={handlePreviousStep}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNextStep}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
              >
                {currentStep === steps.length - 1 ? 'Complete Tutorial' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('help')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Tutorial & Guides</h1>
            <p className="text-gray-600 text-sm">Interactive feature walkthroughs</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">Master Sārathī Features</h2>
          <p className="text-blue-100">
            Learn how to use all app features effectively with step-by-step interactive guides.
            Each tutorial includes practical tips and real scenarios.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{tutorialCategories.length}</div>
            <div className="text-sm text-gray-600">Tutorials</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">~40</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">All</div>
            <div className="text-sm text-gray-600">Levels</div>
          </div>
        </div>

        {/* Tutorial Categories */}
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-gray-800">Available Tutorials</h2>
          {tutorialCategories.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 ${tutorial.color} rounded-2xl flex items-center justify-center text-white`}>
                  <span className="text-2xl">{tutorial.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{tutorial.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {tutorial.duration}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {tutorialSteps[tutorial.id]?.length || 0} steps
                      </span>
                    </div>
                    <button
                      onClick={() => handleStartTutorial(tutorial.id)}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Start Tutorial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Additional Resources</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('onboarding')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <h4 className="font-medium text-gray-800">App Onboarding</h4>
                  <p className="text-sm text-gray-600">Complete app introduction tutorial</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => onNavigate('help')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">❓</span>
                <div className="text-left">
                  <h4 className="font-medium text-gray-800">FAQ & Help Center</h4>
                  <p className="text-sm text-gray-600">Find answers to common questions</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => alert('Video tutorials would open here')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📹</span>
                <div className="text-left">
                  <h4 className="font-medium text-gray-800">Video Tutorials</h4>
                  <p className="text-sm text-gray-600">Watch feature demonstrations</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Tutorial