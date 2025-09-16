import { useState } from 'react'

const Register = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',

    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',

    // Pilgrimage Information
    pilgrimageReason: '',
    visitDuration: '',
    groupSize: '1',
    specialNeeds: '',

    // Emergency Contacts
    emergencyContacts: [
      { name: '', relationship: '', phone: '' },
      { name: '', relationship: '', phone: '' }
    ],

    // Preferences
    language: 'English',
    notifications: {
      sms: true,
      email: true,
      push: true
    },
    newsletter: true,
    agreedToTerms: false
  })

  const [loading, setLoading] = useState(false)

  const totalSteps = 5

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEmergencyContactChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      )
    }))
  }

  const handleNotificationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    // Simulate registration process
    setTimeout(() => {
      setLoading(false)
      onNavigate('onboarding')
    }, 3000)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.dateOfBirth && formData.gender && formData.phoneNumber
      case 2:
        return formData.address && formData.city && formData.state && formData.pincode
      case 3:
        return formData.pilgrimageReason && formData.visitDuration
      case 4:
        return formData.emergencyContacts[0].name && formData.emergencyContacts[0].phone
      case 5:
        return formData.agreedToTerms
      default:
        return false
    }
  }

  const renderProgressBar = () => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <div className="grid grid-cols-3 gap-3">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => handleInputChange('gender', gender)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      formData.gender === gender
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <div className="relative">
                <div className="absolute left-3 top-3 flex items-center space-x-2">
                  <span className="text-gray-500">🇮🇳</span>
                  <span className="text-gray-700">+91</span>
                </div>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  maxLength="10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Address Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Pincode"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  maxLength="6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="">Select State</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Bihar">Bihar</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                readOnly
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pilgrimage Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Visit *</label>
              <select
                value={formData.pilgrimageReason}
                onChange={(e) => handleInputChange('pilgrimageReason', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="">Select purpose</option>
                <option value="Religious Pilgrimage">Religious Pilgrimage</option>
                <option value="Cultural Experience">Cultural Experience</option>
                <option value="Spiritual Journey">Spiritual Journey</option>
                <option value="Family Tradition">Family Tradition</option>
                <option value="Research/Study">Research/Study</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Duration of Stay *</label>
              <div className="grid grid-cols-2 gap-3">
                {['1-2 days', '3-5 days', '1 week', '2 weeks', '1 month', 'Entire event'].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleInputChange('visitDuration', duration)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                      formData.visitDuration === duration
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleInputChange('groupSize', Math.max(1, parseInt(formData.groupSize) - 1).toString())}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
                >
                  −
                </button>
                <span className="text-xl font-semibold text-gray-800 w-8 text-center">{formData.groupSize}</span>
                <button
                  onClick={() => handleInputChange('groupSize', (parseInt(formData.groupSize) + 1).toString())}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
                >
                  +
                </button>
                <span className="text-gray-600 ml-2">People in your group</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs or Requirements</label>
              <textarea
                value={formData.specialNeeds}
                onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                placeholder="Any accessibility needs, medical requirements, or special assistance needed"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
            <p className="text-gray-600 mb-6">Add trusted contacts who can be reached in case of emergency</p>

            {formData.emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <h3 className="font-medium text-gray-800">
                  Contact {index + 1} {index === 0 && <span className="text-red-500">*</span>}
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                    placeholder="Contact name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <select
                    value={contact.relationship}
                    onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    <option value="">Select relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Relative">Relative</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 flex items-center space-x-2">
                      <span className="text-gray-500">🇮🇳</span>
                      <span className="text-gray-700">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                      placeholder="Phone number"
                      className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      maxLength="10"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Preferences & Privacy</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
              <div className="grid grid-cols-3 gap-3">
                {['English', 'हिंदी', 'मराठी'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleInputChange('language', lang)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      formData.language === lang
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-3">Notification Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">SMS Notifications</span>
                  <button
                    onClick={() => handleNotificationChange('sms', !formData.notifications.sms)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      formData.notifications.sms ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      formData.notifications.sms ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <button
                    onClick={() => handleNotificationChange('email', !formData.notifications.email)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      formData.notifications.email ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      formData.notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Push Notifications</span>
                  <button
                    onClick={() => handleNotificationChange('push', !formData.notifications.push)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      formData.notifications.push ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      formData.notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-600 leading-5">
                Subscribe to Simhastha 2028 newsletter for updates, spiritual content, and event announcements
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms-register"
                checked={formData.agreedToTerms}
                onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="terms-register" className="text-sm text-gray-600 leading-5">
                I agree to the{' '}
                <span className="text-orange-600 font-medium">Terms & Conditions</span>,{' '}
                <span className="text-orange-600 font-medium">Privacy Policy</span>, and{' '}
                <span className="text-orange-600 font-medium">Data Processing Agreement</span>.
                I understand that my information will be used for pilgrimage management and safety purposes. *
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('login')}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold">Join Simhastha 2028</h1>
            <p className="text-orange-100 text-sm">Create your pilgrimage account</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Form Content */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          )}
        </div>

        {/* Alternative Login */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register