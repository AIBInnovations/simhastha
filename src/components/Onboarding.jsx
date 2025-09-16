import { useState } from 'react'

const Onboarding = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSkipDialog, setShowSkipDialog] = useState(false)

  const onboardingSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Sārathī',
      subtitle: 'Your Spiritual Guide for Simhastha 2028',
      description: 'Experience a safe, enriching, and spiritually fulfilling pilgrimage with millions of devotees.',
      illustration: '🙏',
      features: [
        'Smart navigation with crowd awareness',
        'Family safety and group coordination',
        'Real-time event updates and scheduling',
        'Eco-friendly points and rewards system'
      ]
    },
    {
      id: 'safety',
      title: 'Your Safety, Our Priority',
      subtitle: 'Advanced Safety Features',
      description: 'Stay connected with your family and get help when you need it most.',
      illustration: '🛡️',
      features: [
        'Emergency SOS with instant alerts',
        'Real-time family location sharing',
        'Medical information storage',
        'Emergency contact notifications',
        '24/7 support helpline access'
      ]
    },
    {
      id: 'navigation',
      title: 'Smart Navigation',
      subtitle: 'Never Get Lost Again',
      description: 'Find the best routes considering crowd density, events, and your preferences.',
      illustration: '🗺️',
      features: [
        'AI-powered route optimization',
        'Real-time crowd updates',
        'Shuttle service integration',
        'Landmark-based directions',
        'Offline map support'
      ]
    },
    {
      id: 'facilities',
      title: 'Clean & Accessible Facilities',
      subtitle: 'Find What You Need',
      description: 'Locate clean washrooms, water points, and other essential facilities with real-time availability.',
      illustration: '🚿',
      features: [
        'Live cleanliness ratings',
        'Availability status updates',
        'Accessibility information',
        'User reviews and photos',
        'Queue time predictions'
      ]
    },
    {
      id: 'events',
      title: 'Spiritual Events & Culture',
      subtitle: 'Immerse in Divine Experiences',
      description: 'Discover, attend, and participate in sacred rituals and cultural celebrations.',
      illustration: '🎭',
      features: [
        'Live event streaming',
        'Personal event calendar',
        'Reminder notifications',
        'Cultural information',
        'Community participation'
      ]
    },
    {
      id: 'ecopoints',
      title: 'Earn Eco-Points',
      subtitle: 'Make a Positive Impact',
      description: 'Contribute to a sustainable pilgrimage and earn rewards for eco-friendly actions.',
      illustration: '🌱',
      features: [
        'Sustainability challenges',
        'Cultural achievement badges',
        'Community leaderboards',
        'Reward redemption system',
        'Environmental impact tracking'
      ]
    },
    {
      id: 'ready',
      title: 'You\'re All Set!',
      subtitle: 'Begin Your Sacred Journey',
      description: 'Welcome to the Simhastha 2028 community. May your pilgrimage be blessed and memorable.',
      illustration: '✨',
      features: [
        'Complete profile setup',
        'Family group coordination',
        'Personalized recommendations',
        'Community connection',
        'Spiritual guidance access'
      ]
    }
  ]

  const currentStepData = onboardingSteps[currentStep]
  const isLastStep = currentStep === onboardingSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onNavigate('dashboard')
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setShowSkipDialog(true)
  }

  const confirmSkip = () => {
    setShowSkipDialog(false)
    onNavigate('dashboard')
  }

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🙏</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">सारथी</h1>
              <p className="text-xs text-gray-600">Setup Guide</p>
            </div>
          </div>
          {!isLastStep && (
            <button
              onClick={handleSkip}
              className="text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
            >
              Skip Tutorial
            </button>
          )}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {onboardingSteps.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-orange-500 scale-125'
                  : index < currentStep
                  ? 'bg-orange-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
          {/* Illustration */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">{currentStepData.illustration}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentStepData.title}</h2>
            <h3 className="text-lg font-medium text-orange-600 mb-4">{currentStepData.subtitle}</h3>
            <p className="text-gray-600 leading-relaxed">{currentStepData.description}</p>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-8">
            {currentStepData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Special content for specific steps */}
          {currentStepData.id === 'welcome' && (
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white text-center mb-6">
              <h4 className="font-bold text-lg mb-2">Join 10 Million+ Pilgrims</h4>
              <p className="text-orange-100">Experience the largest spiritual gathering with modern technology and ancient wisdom</p>
            </div>
          )}

          {currentStepData.id === 'safety' && (
            <div className="bg-red-50 rounded-2xl p-6 text-center mb-6">
              <h4 className="font-bold text-lg text-red-800 mb-2">Emergency? We're Here</h4>
              <p className="text-red-700 text-sm">Our 24/7 support system ensures you're never alone in your journey</p>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="text-center">
                  <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-1">
                    <span className="text-xl">🆘</span>
                  </div>
                  <span className="text-xs text-red-600">SOS Button</span>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-1">
                    <span className="text-xl">📞</span>
                  </div>
                  <span className="text-xs text-blue-600">Helpline</span>
                </div>
              </div>
            </div>
          )}

          {currentStepData.id === 'ready' && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center mb-6">
              <h4 className="font-bold text-lg mb-2">🎉 Congratulations!</h4>
              <p className="text-green-100">You're now ready to begin your spiritual journey. May Lord bless your pilgrimage.</p>
              <div className="mt-4 text-sm text-green-100">
                <p>✨ हर हर गंगे ✨</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 mb-8">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all"
          >
            {isLastStep ? 'Start My Journey' : 'Continue'}
          </button>
        </div>

        {/* Quick Access Hints */}
        {!isLastStep && (
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <h4 className="font-medium text-blue-800 mb-2">💡 Quick Tip</h4>
            <p className="text-sm text-blue-700">
              {currentStepData.id === 'welcome' && "You can always access this tutorial later from Settings → Help Center"}
              {currentStepData.id === 'safety' && "Set up your emergency contacts in Profile settings for immediate assistance"}
              {currentStepData.id === 'navigation' && "Enable location services for the best navigation experience"}
              {currentStepData.id === 'facilities' && "Rate and review facilities to help other pilgrims"}
              {currentStepData.id === 'events' && "Create your personal event calendar for a customized experience"}
              {currentStepData.id === 'ecopoints' && "Small eco-friendly actions make a big difference for the environment"}
            </p>
          </div>
        )}
      </div>

      {/* Skip Confirmation Dialog */}
      {showSkipDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Skip Tutorial?</h3>
            <p className="text-gray-600 mb-6">
              You can always access this tutorial later from the Help Center. Are you sure you want to skip?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSkipDialog(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
              >
                Continue Tutorial
              </button>
              <button
                onClick={confirmSkip}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium"
              >
                Skip to App
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Onboarding