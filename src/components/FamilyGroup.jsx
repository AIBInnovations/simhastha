import { useState } from 'react'

const FamilyGroup = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('members')
  const [showAddMember, setShowAddMember] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    phone: '',
    age: '',
    medicalNotes: ''
  })
  const [groupCode, setGroupCode] = useState('')

  const [groupInfo, setGroupInfo] = useState({
    groupName: 'Sharma Family Pilgrimage',
    groupCode: 'SIM2028-SF-7842',
    groupLeader: 'Ramesh Kumar Sharma',
    createdDate: '2024-01-10',
    totalMembers: 4,
    isGroupLeader: true
  })

  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'Ramesh Kumar Sharma',
      relationship: 'Self',
      phone: '+91 9876543210',
      age: 39,
      status: 'safe',
      lastSeen: 'Just now',
      location: 'Har Ki Pauri',
      isLeader: true,
      medicalNotes: 'Diabetes - carries insulin'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      relationship: 'Spouse',
      phone: '+91 9876543211',
      age: 35,
      status: 'safe',
      lastSeen: '5 mins ago',
      location: 'Har Ki Pauri',
      isLeader: false,
      medicalNotes: 'High BP medication'
    },
    {
      id: 3,
      name: 'Aarav Sharma',
      relationship: 'Son',
      phone: '+91 9876543212',
      age: 12,
      status: 'safe',
      lastSeen: '5 mins ago',
      location: 'Har Ki Pauri',
      isLeader: false,
      medicalNotes: 'Asthma inhaler required'
    },
    {
      id: 4,
      name: 'Dadi Maa',
      relationship: 'Grandmother',
      phone: '+91 9876543213',
      age: 75,
      status: 'needs-help',
      lastSeen: '15 mins ago',
      location: 'Ram Ghat',
      isLeader: false,
      medicalNotes: 'Wheelchair required, heart medication'
    }
  ])

  const [safetySettings, setSafetySettings] = useState({
    checkInInterval: '30', // minutes
    geofenceRadius: '500', // meters
    autoAlerts: true,
    shareLocation: true,
    emergencyContact: true,
    lowBatteryAlerts: true
  })

  const [groupActivities] = useState([
    { id: 1, activity: 'Group checked in at Har Ki Pauri', time: '10 mins ago', icon: '📍' },
    { id: 2, activity: 'Dadi Maa requested assistance', time: '15 mins ago', icon: '🆘' },
    { id: 3, activity: 'Aarav completed safety check-in', time: '30 mins ago', icon: '✅' },
    { id: 4, activity: 'Group attended Ganga Aarti together', time: '2 hours ago', icon: '🙏' },
    { id: 5, activity: 'Priya reported clean facility', time: '3 hours ago', icon: '🧹' }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-600'
      case 'needs-help':
        return 'bg-red-100 text-red-600'
      case 'offline':
        return 'bg-gray-100 text-gray-600'
      default:
        return 'bg-yellow-100 text-yellow-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe':
        return '✅'
      case 'needs-help':
        return '🆘'
      case 'offline':
        return '📴'
      default:
        return '⚠️'
    }
  }

  const handleAddMember = () => {
    if (newMember.name && newMember.relationship && newMember.phone) {
      const member = {
        id: Date.now(),
        ...newMember,
        status: 'offline',
        lastSeen: 'Not connected',
        location: 'Unknown',
        isLeader: false
      }
      setFamilyMembers([...familyMembers, member])
      setNewMember({ name: '', relationship: '', phone: '', age: '', medicalNotes: '' })
      setShowAddMember(false)
    }
  }

  const handleEmergencyAlert = (memberId) => {
    // Simulate emergency alert for specific member
    alert(`Emergency alert sent for ${familyMembers.find(m => m.id === memberId)?.name}`)
  }

  const handleSafetyCheckIn = () => {
    // Simulate group safety check-in
    alert('Safety check-in request sent to all family members')
  }

  const renderMembersTab = () => (
    <div className="space-y-4">
      {/* Group Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">{groupInfo.groupName}</h2>
            <p className="text-blue-100">Group Code: {groupInfo.groupCode}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{familyMembers.length}</div>
            <div className="text-blue-100 text-sm">Members</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Group Leader: {groupInfo.groupLeader}</span>
          <span className="text-sm">Created: {new Date(groupInfo.createdDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleSafetyCheckIn}
          className="bg-green-500 text-white p-4 rounded-xl font-medium hover:bg-green-600 transition-colors"
        >
          <div className="text-2xl mb-2">✅</div>
          <div>Safety Check-In</div>
        </button>
        <button
          onClick={() => setShowAddMember(true)}
          className="bg-blue-500 text-white p-4 rounded-xl font-medium hover:bg-blue-600 transition-colors"
        >
          <div className="text-2xl mb-2">➕</div>
          <div>Add Member</div>
        </button>
      </div>

      {/* Family Members List */}
      <div className="space-y-3">
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {member.isLeader ? (
                    <span className="text-xl">👑</span>
                  ) : (
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    {member.isLeader && (
                      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">Leader</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{member.relationship} • Age {member.age}</p>
                  <p className="text-sm text-gray-600">{member.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(member.status)}`}>
                  {getStatusIcon(member.status)} {member.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-gray-600">Last Seen:</span>
                <p className="font-medium text-gray-800">{member.lastSeen}</p>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <p className="font-medium text-gray-800">{member.location}</p>
              </div>
            </div>

            {member.medicalNotes && (
              <div className="bg-red-50 rounded-lg p-3 mb-3">
                <h4 className="text-sm font-medium text-red-800 mb-1">Medical Notes:</h4>
                <p className="text-sm text-red-700">{member.medicalNotes}</p>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => handleEmergencyAlert(member.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Emergency Alert
              </button>
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Locate
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSafetyTab = () => (
    <div className="space-y-6">
      {/* Safety Status Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Group Safety Status</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Safe</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Needs Help</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">0</div>
            <div className="text-sm text-gray-600">Offline</div>
          </div>
        </div>
      </div>

      {/* Safety Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Safety Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Interval (minutes)
            </label>
            <select
              value={safetySettings.checkInInterval}
              onChange={(e) => setSafetySettings({...safetySettings, checkInInterval: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geofence Radius (meters)
            </label>
            <select
              value={safetySettings.geofenceRadius}
              onChange={(e) => setSafetySettings({...safetySettings, geofenceRadius: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="100">100 meters</option>
              <option value="250">250 meters</option>
              <option value="500">500 meters</option>
              <option value="1000">1 kilometer</option>
            </select>
          </div>

          <div className="space-y-3">
            {[
              { key: 'autoAlerts', label: 'Automatic Emergency Alerts' },
              { key: 'shareLocation', label: 'Share Location with Group' },
              { key: 'emergencyContact', label: 'Emergency Contact Notifications' },
              { key: 'lowBatteryAlerts', label: 'Low Battery Alerts' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between">
                <span className="text-gray-700">{setting.label}</span>
                <button
                  onClick={() => setSafetySettings({
                    ...safetySettings,
                    [setting.key]: !safetySettings[setting.key]
                  })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    safetySettings[setting.key] ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    safetySettings[setting.key] ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 rounded-full p-2">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Emergency Helpline</p>
                <p className="text-sm text-gray-600">24/7 Support</p>
              </div>
            </div>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
              Call
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-1v2a5 5 0 01-5 5H9a5 5 0 01-5-5V8H3a1 1 0 01-1-1V4zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Medical Emergency</p>
                <p className="text-sm text-gray-600">Ambulance Service</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderActivityTab = () => (
    <div className="space-y-4">
      {/* Group Activity Feed */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Group Activity</h3>
        <div className="space-y-4">
          {groupActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.activity}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Statistics */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">Group Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Total Check-ins</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">8.5</div>
            <div className="text-sm text-gray-600">Hours Together</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-gray-600">Places Visited</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-sm text-gray-600">Incidents</div>
          </div>
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
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Family & Group</h1>
            <p className="text-gray-600 text-sm">Keep your loved ones safe together</p>
          </div>
          <button
            onClick={() => setShowJoinGroup(true)}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            Join Group
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'members'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            👥 Members
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'safety'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🛡️ Safety
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'activity'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 Activity
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {activeTab === 'members' && renderMembersTab()}
        {activeTab === 'safety' && renderSafetyTab()}
        {activeTab === 'activity' && renderActivityTab()}
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add Family Member</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                <select
                  value={newMember.relationship}
                  onChange={(e) => setNewMember({...newMember, relationship: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Grandfather">Grandfather</option>
                  <option value="Grandmother">Grandmother</option>
                  <option value="Uncle">Uncle</option>
                  <option value="Aunt">Aunt</option>
                  <option value="Friend">Friend</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={newMember.age}
                    onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Notes</label>
                <textarea
                  value={newMember.medicalNotes}
                  onChange={(e) => setNewMember({...newMember, medicalNotes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows="3"
                  placeholder="Any medical conditions, medications, or special needs"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {showJoinGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Join Existing Group</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Code</label>
                <input
                  type="text"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter group code (e.g., SIM2028-XX-1234)"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowJoinGroup(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Join group functionality would connect to existing group')
                    setShowJoinGroup(false)
                  }}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium"
                >
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default FamilyGroup