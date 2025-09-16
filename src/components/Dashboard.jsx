import { useLanguage } from '../contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

const Dashboard = ({ onNavigate }) => {
  const { t, toggleLanguage, language } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{t('appName')}</h1>
            <p className="text-orange-100 text-sm">{t('appSubtitle')}</p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Language Toggle - custom styling for orange background */}
            <div className="flex items-center space-x-2">
              <span className={`font-medium text-sm transition-colors ${language === 'en' ? 'text-white' : 'text-orange-200'}`}>
                EN
              </span>

              <button
                onClick={toggleLanguage}
                className={`relative inline-flex w-14 h-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-white/30 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500 ${
                  language === 'hi'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                    : 'bg-white/20'
                }`}
                role="switch"
                aria-checked={language === 'hi'}
                aria-label="Toggle language"
              >
                <span className="sr-only">Toggle language</span>
                <span
                  className={`pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-200 ease-in-out ${
                    language === 'hi' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                >
                  <span className="flex items-center justify-center w-full h-full text-xs font-bold text-orange-600">
                    {language === 'hi' ? 'हि' : 'EN'}
                  </span>
                </span>
              </button>

              <span className={`font-medium text-sm transition-colors ${language === 'hi' ? 'text-white' : 'text-orange-200'}`}>
                हि
              </span>
            </div>

            {/* Profile Button */}
            <button
              onClick={() => onNavigate('profile')}
              className="bg-orange-400 rounded-full p-2 hover:bg-orange-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Weather & Time Widget */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-4 text-white shadow-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-2.019 1 1 0 01-.285-1.05l1.715-5.349L11 5.477V16a1 1 0 11-2 0V5.477L6.237 6.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-2.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-semibold">Haridwar</span>
              </div>
              <div className="text-2xl font-bold">28°C</div>
              <div className="text-blue-100 text-sm">Partly Cloudy • Feels like 32°C</div>
            </div>
            <div className="text-right">
              <div className="text-5xl">🌤️</div>
              <div className="text-blue-100 text-xs mt-1">
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="px-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Find My Route */}
          <div 
            onClick={() => onNavigate('navigation')}
            className="bg-white rounded-2xl p-4 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l6 3 6-3v13l-6 3-6-3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">{t('findMyRoute')}</h3>
            <p className="text-xs text-gray-600 mt-1">Smart navigation with crowd updates</p>
          </div>

          {/* Washrooms & Water */}
          <div 
            onClick={() => onNavigate('washroom')}
            className="bg-white rounded-2xl p-4 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">{t('facilities')}</h3>
            <p className="text-xs text-gray-600 mt-1">Clean washrooms & water points</p>
          </div>

          {/* Events */}
          <div 
            onClick={() => onNavigate('events')}
            className="bg-white rounded-2xl p-4 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">{t('events')}</h3>
            <p className="text-xs text-gray-600 mt-1">Ritual schedules & timings</p>
          </div>

          {/* Crowd Heat Map */}
          <div 
            onClick={() => onNavigate('heatmap')}
            className="bg-white rounded-2xl p-4 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">{t('crowdMap')}</h3>
            <p className="text-xs text-gray-600 mt-1">Real-time crowd density</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-3">{t('quickActions')}</h3>
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => onNavigate('shuttle-booking')}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-sm">🚗</span>
              </div>
              <span className="text-xs text-gray-700 font-medium">{t('shuttle')}</span>
            </button>

            <button
              onClick={() => onNavigate('family')}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
            >
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-sm">👨‍👩‍👧‍👦</span>
              </div>
              <span className="text-xs text-gray-700 font-medium">{t('family')}</span>
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-sm">⚙️</span>
              </div>
              <span className="text-xs text-gray-700 font-medium">{t('settings')}</span>
            </button>

            <button
              onClick={() => onNavigate('help')}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
            >
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-sm">❓</span>
              </div>
              <span className="text-xs text-gray-700 font-medium">{t('help')}</span>
            </button>
          </div>
        </div>

        {/* Eco Points Card */}
        <div 
          onClick={() => onNavigate('ecopoints')}
          className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-4 text-white shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{t('ecoPoints')}</h3>
              <p className="text-green-100 text-sm">1,250 points earned</p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Live Status Cards */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">{t('liveStatus')}</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <span className="text-sm text-gray-700 font-medium">Har Ki Pauri</span>
                  <p className="text-xs text-gray-500">Updated 2 mins ago</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Low Crowd</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <span className="text-sm text-gray-700 font-medium">Ram Ghat</span>
                  <p className="text-xs text-gray-500">Updated 1 min ago</p>
                </div>
              </div>
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Moderate</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <span className="text-sm text-gray-700 font-medium">Triveni Sangam</span>
                  <p className="text-xs text-gray-500">Updated now</p>
                </div>
              </div>
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">High Crowd</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <span className="text-sm text-gray-700 font-medium">Mansa Devi</span>
                  <p className="text-xs text-gray-500">Updated 5 mins ago</p>
                </div>
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Normal</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <span className="text-sm text-gray-700 font-medium">Chandi Devi</span>
                  <p className="text-xs text-gray-500">Updated 3 mins ago</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Low Crowd</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div>
                  <span className="text-sm text-gray-700 font-medium">Maya Devi</span>
                  <p className="text-xs text-gray-500">Updated 7 mins ago</p>
                </div>
              </div>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Busy</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('heatmap')}
            className="w-full mt-3 text-center py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-sm text-gray-600">View Full Heat Map</span>
          </button>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
          <h3 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
            <span>🚨</span>
            <span>{t('emergencyContacts')}</span>
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🚔</span>
                </div>
                <span className="text-sm text-red-700 font-medium">Police Control Room</span>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
                onClick={() => window.open('tel:100')}
              >
                Call 100
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🚑</span>
                </div>
                <span className="text-sm text-red-700 font-medium">Medical Emergency</span>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
                onClick={() => window.open('tel:108')}
              >
                Call 108
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🔥</span>
                </div>
                <span className="text-sm text-red-700 font-medium">Fire Emergency</span>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
                onClick={() => window.open('tel:101')}
              >
                Call 101
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SOS Floating Button */}
      <div className="fixed bottom-20 right-6 z-50">
        <button 
          onClick={() => onNavigate('sos')}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg active:scale-95 transition-all animate-pulse"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default Dashboard