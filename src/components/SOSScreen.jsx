import { useState } from 'react'

const SOSScreen = ({ onNavigate }) => {
  const [emergencyType, setEmergencyType] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [alertSent, setAlertSent] = useState(false)

  const emergencyTypes = [
    {
      id: 'medical',
      title: 'Medical Emergency',
      icon: '🚑',
      color: 'bg-red-500',
      description: 'Health issues, injuries, or medical help needed'
    },
    {
      id: 'lost',
      title: 'I\'m Lost',
      icon: '📍',
      color: 'bg-orange-500',
      description: 'Can\'t find way back or separated from group'
    },
    {
      id: 'safety',
      title: 'Safety Concern',
      icon: '⚠️',
      color: 'bg-yellow-500',
      description: 'Feeling unsafe or witnessing dangerous situation'
    },
    {
      id: 'crowd',
      title: 'Crowd Emergency',
      icon: '👥',
      color: 'bg-purple-500',
      description: 'Trapped in crowd or stampede situation'
    }
  ]

  const handleEmergency = (type) => {
    setEmergencyType(type)
    setShowConfirmation(true)
  }

  const sendAlert = () => {
    setShowConfirmation(false)
    setAlertSent(true)
    // Simulate sending alert
    setTimeout(() => {
      setAlertSent(false)
    }, 5000)
  }

  if (alertSent) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Alert Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your emergency alert has been sent to nearby volunteers and authorities. Help is on the way.
          </p>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">What happens next:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Nearest volunteers notified</li>
              <li>✓ Your family contacts alerted</li>
              <li>✓ Location shared with help desk</li>
              <li>✓ ETA: 3-5 minutes</li>
            </ul>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
            >
              Return to Dashboard
            </button>
            <button 
              className="w-full bg-red-500 text-white py-3 rounded-xl font-medium"
            >
              Send Another Alert
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showConfirmation) {
    const selectedEmergency = emergencyTypes.find(e => e.id === emergencyType)
    
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
          <div className={`${selectedEmergency?.color} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
            <span className="text-3xl">{selectedEmergency?.icon}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Emergency</h2>
          <h3 className="text-lg font-semibold text-red-600 mb-4">{selectedEmergency?.title}</h3>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to send an emergency alert? This will notify nearby volunteers, 
            authorities, and your emergency contacts.
          </p>

          <div className="bg-yellow-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Your Location:</strong> Kumbh Mela Ground, Sector A, Gate 3
            </p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={sendAlert}
              className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg animate-pulse"
            >
              SEND EMERGENCY ALERT
            </button>
            <button 
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <div className="bg-red-500 text-white p-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-1 hover:bg-red-400 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold">Emergency Help</h1>
            <p className="text-red-100 text-sm">Get immediate assistance</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Quick SOS Button */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Immediate Help?</h2>
          <button 
            onClick={() => handleEmergency('medical')}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-32 h-32 flex items-center justify-center shadow-2xl active:scale-95 transition-all mx-auto animate-pulse"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🆘</div>
              <div className="text-xl font-bold">SOS</div>
            </div>
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Press for instant emergency alert to volunteers and authorities
          </p>
        </div>

        {/* Emergency Types */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Select Your Emergency Type</h3>
          <div className="grid grid-cols-1 gap-3">
            {emergencyTypes.map((emergency) => (
              <button
                key={emergency.id}
                onClick={() => handleEmergency(emergency.id)}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg active:scale-95 transition-all text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${emergency.color} rounded-full w-16 h-16 flex items-center justify-center`}>
                    <span className="text-2xl">{emergency.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg">{emergency.title}</h4>
                    <p className="text-gray-600 text-sm">{emergency.description}</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* I'm Safe Button */}
        <div className="bg-green-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">I'm Safe</h3>
              <p className="text-sm text-green-600">Let your family know you're okay</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Send Update
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Emergency Contacts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Control Room</p>
                  <p className="text-sm text-gray-600">24/7 Emergency Helpline</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                Call
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-1v2a5 5 0 01-5 5H9a5 5 0 01-5-5V8H3a1 1 0 01-1-1V4zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Medical Emergency</p>
                  <p className="text-sm text-gray-600">Ambulance & First Aid</p>
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                Call
              </button>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <h3 className="font-semibold text-blue-800 mb-3">Safety Tips</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Stay hydrated and take regular breaks</li>
            <li>• Keep emergency contacts saved in your phone</li>
            <li>• Stay with your group and avoid isolated areas</li>
            <li>• Follow crowd management instructions</li>
            <li>• Report any suspicious activities immediately</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SOSScreen