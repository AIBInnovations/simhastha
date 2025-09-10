import { useState } from 'react'

const EcoPoints = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showQRScanner, setShowQRScanner] = useState(false)

  const userStats = {
    totalPoints: 1250,
    rank: 42,
    level: 'Dharma Keeper',
    nextLevel: 'Seva Champion',
    pointsToNext: 250,
    todayPoints: 50
  }

  const badges = [
    { id: 1, name: 'Shubha', description: 'Good Deeds', icon: '🙏', earned: true, points: 100 },
    { id: 2, name: 'Sattva', description: 'Cleanliness', icon: '✨', earned: true, points: 150 },
    { id: 3, name: 'Dhrti', description: 'Patience in Crowd', icon: '🧘', earned: true, points: 200 },
    { id: 4, name: 'Seva', description: 'Service to Others', icon: '🤝', earned: false, points: 250 },
    { id: 5, name: 'Ahimsa', description: 'Non-violence', icon: '🌱', earned: false, points: 300 },
    { id: 6, name: 'Moksha', description: 'Ultimate Liberation', icon: '🏆', earned: false, points: 500 }
  ]

  const activities = [
    { id: 1, action: 'Used water responsibly', points: 20, time: '2 mins ago', icon: '💧' },
    { id: 2, action: 'Disposed waste properly', points: 15, time: '1 hour ago', icon: '🗑️' },
    { id: 3, action: 'Helped elderly pilgrim', points: 50, time: '3 hours ago', icon: '👴' },
    { id: 4, action: 'Used shuttle service', points: 10, time: '5 hours ago', icon: '🚌' },
    { id: 5, action: 'Reported cleanliness issue', points: 25, time: 'Yesterday', icon: '🧹' }
  ]

  const challenges = [
    {
      id: 1,
      title: 'Water Conservation',
      description: 'Save 5 liters of water today',
      progress: 3,
      target: 5,
      points: 100,
      timeLeft: '6 hours',
      difficulty: 'easy'
    },
    {
      id: 2,
      title: 'Waste Warrior',
      description: 'Properly dispose 10 items',
      progress: 7,
      target: 10,
      points: 150,
      timeLeft: '12 hours',
      difficulty: 'medium'
    },
    {
      id: 3,
      title: 'Crowd Helper',
      description: 'Guide 3 lost pilgrims',
      progress: 1,
      target: 3,
      points: 200,
      timeLeft: '2 days',
      difficulty: 'hard'
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'Ram Prasad', points: 2850, level: 'Seva Champion' },
    { rank: 2, name: 'Sita Devi', points: 2720, level: 'Seva Champion' },
    { rank: 3, name: 'Krishna Kumar', points: 2650, level: 'Seva Champion' },
    { rank: 42, name: 'You', points: 1250, level: 'Dharma Keeper' },
    { rank: 43, name: 'Ganga Prasad', points: 1240, level: 'Dharma Keeper' }
  ]

  const rewardItems = [
    { id: 1, name: 'Blessed Rudraksha', cost: 500, description: 'Sacred beads for meditation', available: true },
    { id: 2, name: 'Organic Khichdi Meal', cost: 100, description: 'Healthy prasadam meal', available: true },
    { id: 3, name: 'Pilgrimage Photo Print', cost: 200, description: 'Professional photo at ghat', available: true },
    { id: 4, name: 'Priority Queue Access', cost: 300, description: 'Skip lines at popular events', available: true },
    { id: 5, name: 'Spiritual Book Set', cost: 800, description: 'Collection of sacred texts', available: false },
    { id: 6, name: 'VIP Darshan Pass', cost: 1000, description: 'Special access to main temple', available: false }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-600'
      case 'medium':
        return 'bg-yellow-100 text-yellow-600'
      case 'hard':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const renderProgressBar = (progress, target) => {
    const percentage = Math.min((progress / target) * 100, 100)
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    )
  }

  if (showQRScanner) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full mx-4">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.292a2 2 0 11-2.828 2.828M5 13a2 2 0 012-2v10a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Scan QR Code</h2>
          <p className="text-gray-600 mb-6">
            Point your camera at the QR code on eco-stations, waste bins, or water points to earn points
          </p>
          
          {/* Mock QR Scanner */}
          <div className="bg-gray-100 rounded-2xl p-8 mb-6">
            <div className="border-2 border-dashed border-gray-400 rounded-2xl p-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.292a2 2 0 11-2.828 2.828M5 13a2 2 0 012-2v10a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 mt-2">Camera View</p>
            </div>
          </div>

          <button 
            onClick={() => setShowQRScanner(false)}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium mb-3"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-1 hover:bg-green-400 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Eco Points</h1>
            <p className="text-green-100 text-sm">Your sustainability journey</p>
          </div>
          <button 
            onClick={() => setShowQRScanner(true)}
            className="p-2 hover:bg-green-400 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.292a2 2 0 11-2.828 2.828M5 13a2 2 0 012-2v10a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {['dashboard', 'challenges', 'leaderboard', 'rewards'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-2 text-xs font-medium text-center border-b-2 ${
                activeTab === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Points Overview */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{userStats.totalPoints.toLocaleString()}</div>
                <div className="text-green-100 mb-4">Total Eco Points</div>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">#{userStats.rank}</div>
                    <div className="text-green-100">Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">+{userStats.todayPoints}</div>
                    <div className="text-green-100">Today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{userStats.level}</h3>
                  <p className="text-sm text-gray-600">Next: {userStats.nextLevel}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">{userStats.pointsToNext} points to go</div>
                </div>
              </div>
              {renderProgressBar(userStats.totalPoints % 500, 500)}
            </div>

            {/* Earned Badges */}
            <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
              <h3 className="font-semibold text-gray-800 mb-3">Your Badges</h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className={`text-center p-3 rounded-xl border-2 ${
                      badge.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-medium text-gray-800">{badge.name}</div>
                    <div className="text-xs text-gray-600">{badge.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                    <div className="text-green-600 font-semibold">+{activity.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    
                    <div className="mb-2">
                      {renderProgressBar(challenge.progress, challenge.target)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{challenge.progress}/{challenge.target} completed</span>
                      <span>{challenge.timeLeft} left</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-green-600">{challenge.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="bg-green-50 rounded-2xl p-4">
              <h3 className="font-semibold text-green-800 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowQRScanner(true)}
                  className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-sm font-medium text-gray-800">Scan QR</div>
                </button>
                <button className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">📸</div>
                  <div className="text-sm font-medium text-gray-800">Report Issue</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div 
                key={user.rank}
                className={`rounded-2xl p-4 shadow-md ${
                  user.name === 'You' 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300' 
                    : 'bg-white'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg ${
                    user.rank === 1 ? 'bg-yellow-500 text-white' :
                    user.rank === 2 ? 'bg-gray-400 text-white' :
                    user.rank === 3 ? 'bg-amber-600 text-white' :
                    user.name === 'You' ? 'bg-green-500 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {user.rank === 1 ? '👑' : `#${user.rank}`}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.level}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{user.points.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-4">
            <div className="bg-green-100 rounded-2xl p-4 text-center mb-4">
              <h3 className="font-bold text-green-800 mb-2">Available Points: {userStats.totalPoints}</h3>
              <p className="text-sm text-green-700">Redeem your points for amazing rewards!</p>
            </div>

            {rewardItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">{item.cost}</span>
                      <span className="text-sm text-gray-500">points</span>
                    </div>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium ${
                      item.available && userStats.totalPoints >= item.cost
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!item.available || userStats.totalPoints < item.cost}
                  >
                    {!item.available ? 'Locked' : userStats.totalPoints >= item.cost ? 'Redeem' : 'Need More Points'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
          <button className="flex flex-col items-center py-2 px-4 text-green-500">
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

export default EcoPoints