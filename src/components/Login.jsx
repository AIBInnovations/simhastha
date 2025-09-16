import { useState } from 'react'

const Login = ({ onNavigate }) => {
  const [loginMethod, setLoginMethod] = useState('phone') // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSendOTP = () => {
    if (!agreedToTerms) {
      alert('Please accept the terms and conditions')
      return
    }

    setLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false)
      setShowOTP(true)
    }, 2000)
  }

  const handleVerifyOTP = () => {
    setLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false)
      onNavigate('dashboard')
    }, 1500)
  }

  const handleGuestAccess = () => {
    onNavigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 pb-12">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🙏</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">सारथी</h1>
            <p className="text-orange-100">Your Spiritual Guide</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8">
        {/* Main Login Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          {!showOTP ? (
            <>
              {/* Welcome Text */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Simhastha 2028</h2>
                <p className="text-gray-600">Join millions of pilgrims on this sacred journey</p>
              </div>

              {/* Login Method Toggle */}
              <div className="bg-gray-100 rounded-2xl p-1 mb-6">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setLoginMethod('phone')}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      loginMethod === 'phone'
                        ? 'bg-white text-orange-600 shadow-md'
                        : 'text-gray-600'
                    }`}
                  >
                    📱 Phone
                  </button>
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      loginMethod === 'email'
                        ? 'bg-white text-orange-600 shadow-md'
                        : 'text-gray-600'
                    }`}
                  >
                    ✉️ Email
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4 mb-6">
                {loginMethod === 'phone' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 flex items-center space-x-2">
                        <span className="text-gray-500">🇮🇳</span>
                        <span className="text-gray-700">+91</span>
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                        maxLength="10"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
                  I agree to the{' '}
                  <span className="text-orange-600 font-medium">Terms & Conditions</span> and{' '}
                  <span className="text-orange-600 font-medium">Privacy Policy</span>. I consent to receive updates about Simhastha 2028.
                </label>
              </div>

              {/* Send OTP Button */}
              <button
                onClick={handleSendOTP}
                disabled={loading || !agreedToTerms || (!phoneNumber && !email)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-amber-600 transition-all"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  `Send OTP to ${loginMethod === 'phone' ? 'Phone' : 'Email'}`
                )}
              </button>
            </>
          ) : (
            <>
              {/* OTP Verification */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Verification Code</h2>
                <p className="text-gray-600">
                  We've sent a 6-digit code to{' '}
                  <span className="font-medium">
                    {loginMethod === 'phone' ? `+91 ${phoneNumber}` : email}
                  </span>
                </p>
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-4 text-center text-xl font-semibold tracking-widest border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  maxLength="6"
                />
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-amber-600 transition-all mb-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
                <button
                  onClick={() => setShowOTP(false)}
                  className="text-orange-600 font-medium text-sm hover:text-orange-700 transition-colors"
                >
                  Resend OTP
                </button>
              </div>
            </>
          )}
        </div>

        {/* Alternative Options */}
        <div className="mt-6 space-y-4">
          {/* Guest Access */}
          <button
            onClick={handleGuestAccess}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Continue as Guest
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              New to Simhastha?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Language Options */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="font-medium text-gray-800 mb-3 text-center">Select Language</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="py-2 px-3 text-sm border border-orange-200 rounded-lg text-orange-600 bg-orange-50">
                English
              </button>
              <button className="py-2 px-3 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                हिंदी
              </button>
              <button className="py-2 px-3 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                मराठी
              </button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="mt-8 text-center pb-8">
          <p className="text-gray-500 text-sm mb-2">Need help with login?</p>
          <button className="text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login