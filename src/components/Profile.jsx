import { useState } from 'react'

const Profile = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  const [profileData, setProfileData] = useState({
    fullName: 'Ramesh Kumar Sharma',
    phoneNumber: '+91 9876543210',
    email: 'ramesh.sharma@email.com',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    address: '123, Main Street, Sector 15',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    pilgrimageReason: 'Religious Pilgrimage',
    visitDuration: '1 week',
    groupSize: '4',
    specialNeeds: 'Wheelchair accessibility required',
    language: 'English',
    profileImage: null
  })

  const [stats, setStats] = useState({
    ecoPoints: 1250,
    eventsAttended: 8,
    pilgrimageDay: 3,
    badgesEarned: 5,
    distanceWalked: '12.5 km',
    checkInsToday: 4
  })

  const [recentActivity] = useState([
    { id: 1, action: 'Checked in at Har Ki Pauri', time: '2 hours ago', icon: '📍' },
    { id: 2, action: 'Earned Sattva Badge', time: '4 hours ago', icon: '✨' },
    { id: 3, action: 'Attended Ganga Aarti', time: '1 day ago', icon: '🙏' },
    { id: 4, action: 'Helped elderly pilgrim', time: '1 day ago', icon: '🤝' },
    { id: 5, action: 'Reported clean facility', time: '2 days ago', icon: '🧹' }
  ])

  const [achievements] = useState([
    { id: 1, name: 'Shubha', description: 'Good Deeds', icon: '🙏', earned: true, date: '2 days ago' },
    { id: 2, name: 'Sattva', description: 'Cleanliness', icon: '✨', earned: true, date: '4 hours ago' },
    { id: 3, name: 'Dhrti', description: 'Patience', icon: '🧘', earned: true, date: '1 day ago' },
    { id: 4, name: 'Seva', description: 'Service', icon: '🤝', earned: false, progress: 60 },
    { id: 5, name: 'Ahimsa', description: 'Non-violence', icon: '🌱', earned: false, progress: 30 }
  ])

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Simulate save action
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }))
      }
      reader.readAsDataURL(file)
      setShowImageUpload(false)
    }
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              {profileData.profileImage ? (
                <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <button
              onClick={() => setShowImageUpload(true)}
              className="absolute -bottom-1 -right-1 bg-white text-orange-500 rounded-full p-2 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
            <p className="text-orange-100">{profileData.phoneNumber}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <span>Day {stats.pilgrimageDay} of pilgrimage</span>
              <span>•</span>
              <span>{stats.ecoPoints} Eco Points</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-green-600">{stats.badgesEarned}</div>
          <div className="text-sm text-gray-600">Badges</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-blue-600">{stats.eventsAttended}</div>
          <div className="text-sm text-gray-600">Events</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-purple-600">{stats.distanceWalked}</div>
          <div className="text-sm text-gray-600">Walked</div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none disabled:bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={profileData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none disabled:bg-gray-50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={`${profileData.address}, ${profileData.city}, ${profileData.state} - ${profileData.pincode}`}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none disabled:bg-gray-50 resize-none"
            />
          </div>

          {isEditing && (
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pilgrimage Information */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Pilgrimage Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Purpose of Visit</span>
            <span className="font-medium text-gray-800">{profileData.pilgrimageReason}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration of Stay</span>
            <span className="font-medium text-gray-800">{profileData.visitDuration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Group Size</span>
            <span className="font-medium text-gray-800">{profileData.groupSize} people</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Special Needs</span>
            <span className="font-medium text-gray-800">{profileData.specialNeeds || 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderActivityTab = () => (
    <div className="space-y-6">
      {/* Today's Summary */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Today's Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">{stats.checkInsToday}</div>
            <div className="text-green-100 text-sm">Check-ins</div>
          </div>
          <div>
            <div className="text-2xl font-bold">+{stats.ecoPoints > 1000 ? '50' : '25'}</div>
            <div className="text-green-100 text-sm">Points Earned</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
              achievement.earned
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-800">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                {achievement.earned ? (
                  <div className="text-right">
                    <div className="text-green-600 font-medium">Earned</div>
                    <div className="text-xs text-gray-500">{achievement.date}</div>
                  </div>
                ) : (
                  <div className="text-right">
                    <div className="text-gray-600 font-medium">{achievement.progress}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

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
            <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600 text-sm">Manage your account and pilgrimage details</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'profile'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            👤 Profile
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'activity'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 Activity
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'activity' && renderActivityTab()}
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Update Profile Photo</h3>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('settings')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-800 font-medium">App Settings</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => onNavigate('help')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-800 font-medium">Help Center</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="w-full flex items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-red-600 font-medium">Logout</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Profile