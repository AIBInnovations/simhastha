import { useState } from 'react'

const Settings = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    // Appearance
    theme: 'light', // light, dark, auto
    fontSize: 'medium', // small, medium, large
    language: 'English',

    // Notifications
    pushNotifications: true,
    smsNotifications: true,
    emailNotifications: true,
    eventReminders: true,
    emergencyAlerts: true,
    familyUpdates: true,
    ecoPointsUpdates: true,

    // Privacy
    shareLocation: true,
    profileVisibility: 'group', // public, group, private
    dataSharing: false,
    analytics: true,
    crashReporting: true,

    // Safety
    emergencyContacts: true,
    autoCheckIn: true,
    geofencing: true,
    safetyAlerts: true,

    // Data & Storage
    offlineMode: true,
    dataSaver: false,
    autoDownload: true,
    cacheSize: '500MB',

    // Accessibility
    highContrast: false,
    screenReader: false,
    hapticFeedback: true,
    audioDescriptions: false
  })

  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleReset = () => {
    // Reset to default settings
    setShowResetDialog(false)
    alert('Settings reset to default')
  }

  const handleLogout = () => {
    setShowLogoutDialog(false)
    onNavigate('login')
  }

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false)
    alert('Account deletion initiated. You will receive a confirmation email.')
  }

  const renderToggle = (key, value) => (
    <button
      onClick={() => handleSettingChange(key, !value)}
      className={`w-12 h-6 rounded-full transition-colors ${
        value ? 'bg-orange-500' : 'bg-gray-300'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
        value ? 'translate-x-6' : 'translate-x-0.5'
      }`}></div>
    </button>
  )

  const renderSection = (title, children) => (
    <div className="bg-white rounded-2xl p-6 shadow-md mb-4">
      <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )

  const renderSettingItem = (label, description, control) => (
    <div className="flex items-start justify-between">
      <div className="flex-1 pr-4">
        <p className="font-medium text-gray-800">{label}</p>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <div className="flex-shrink-0">
        {control}
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
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600 text-sm">Customize your app experience</p>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Account Section */}
        {renderSection("Account", (
          <>
            {renderSettingItem(
              "Profile Settings",
              "Edit your personal information and preferences",
              <button
                onClick={() => onNavigate('profile')}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Edit
              </button>
            )}
            {renderSettingItem(
              "Family & Groups",
              "Manage your family members and groups",
              <button
                onClick={() => onNavigate('family')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Manage
              </button>
            )}
          </>
        ))}

        {/* Appearance Section */}
        {renderSection("Appearance", (
          <>
            {renderSettingItem(
              "Theme",
              "Choose your preferred app theme",
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            )}
            {renderSettingItem(
              "Font Size",
              "Adjust text size for better readability",
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            )}
            {renderSettingItem(
              "Language",
              "Select your preferred language",
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="English">English</option>
                <option value="हिंदी">हिंदी</option>
                <option value="मराठी">मराठी</option>
                <option value="ગુજરાતી">ગુજરાતી</option>
                <option value="বাংলা">বাংলা</option>
              </select>
            )}
          </>
        ))}

        {/* Notifications Section */}
        {renderSection("Notifications", (
          <>
            {renderSettingItem(
              "Push Notifications",
              "Receive notifications in the app",
              renderToggle('pushNotifications', settings.pushNotifications)
            )}
            {renderSettingItem(
              "SMS Notifications",
              "Receive text message alerts",
              renderToggle('smsNotifications', settings.smsNotifications)
            )}
            {renderSettingItem(
              "Email Notifications",
              "Receive email updates",
              renderToggle('emailNotifications', settings.emailNotifications)
            )}
            {renderSettingItem(
              "Event Reminders",
              "Get notified about upcoming events",
              renderToggle('eventReminders', settings.eventReminders)
            )}
            {renderSettingItem(
              "Emergency Alerts",
              "Receive critical safety notifications",
              renderToggle('emergencyAlerts', settings.emergencyAlerts)
            )}
            {renderSettingItem(
              "Family Updates",
              "Notifications about family member activities",
              renderToggle('familyUpdates', settings.familyUpdates)
            )}
            {renderSettingItem(
              "Eco-Points Updates",
              "Notifications about points and achievements",
              renderToggle('ecoPointsUpdates', settings.ecoPointsUpdates)
            )}
          </>
        ))}

        {/* Privacy & Security Section */}
        {renderSection("Privacy & Security", (
          <>
            {renderSettingItem(
              "Share Location",
              "Allow location sharing with family and emergency services",
              renderToggle('shareLocation', settings.shareLocation)
            )}
            {renderSettingItem(
              "Profile Visibility",
              "Control who can see your profile information",
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="public">Public</option>
                <option value="group">Group Only</option>
                <option value="private">Private</option>
              </select>
            )}
            {renderSettingItem(
              "Data Sharing",
              "Share anonymized data to improve services",
              renderToggle('dataSharing', settings.dataSharing)
            )}
            {renderSettingItem(
              "Analytics",
              "Help improve the app with usage analytics",
              renderToggle('analytics', settings.analytics)
            )}
            {renderSettingItem(
              "Crash Reporting",
              "Automatically report app crashes",
              renderToggle('crashReporting', settings.crashReporting)
            )}
          </>
        ))}

        {/* Safety Section */}
        {renderSection("Safety & Emergency", (
          <>
            {renderSettingItem(
              "Emergency Contacts",
              "Enable emergency contact notifications",
              renderToggle('emergencyContacts', settings.emergencyContacts)
            )}
            {renderSettingItem(
              "Auto Check-In",
              "Automatically check-in at regular intervals",
              renderToggle('autoCheckIn', settings.autoCheckIn)
            )}
            {renderSettingItem(
              "Geofencing",
              "Receive alerts when leaving safe areas",
              renderToggle('geofencing', settings.geofencing)
            )}
            {renderSettingItem(
              "Safety Alerts",
              "Get notifications about crowd and safety conditions",
              renderToggle('safetyAlerts', settings.safetyAlerts)
            )}
          </>
        ))}

        {/* Data & Storage Section */}
        {renderSection("Data & Storage", (
          <>
            {renderSettingItem(
              "Offline Mode",
              "Download content for offline access",
              renderToggle('offlineMode', settings.offlineMode)
            )}
            {renderSettingItem(
              "Data Saver",
              "Reduce data usage by limiting images and videos",
              renderToggle('dataSaver', settings.dataSaver)
            )}
            {renderSettingItem(
              "Auto Download",
              "Automatically download maps and event data",
              renderToggle('autoDownload', settings.autoDownload)
            )}
            {renderSettingItem(
              "Cache Size",
              "Amount of storage used for offline content",
              <select
                value={settings.cacheSize}
                onChange={(e) => handleSettingChange('cacheSize', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="100MB">100 MB</option>
                <option value="250MB">250 MB</option>
                <option value="500MB">500 MB</option>
                <option value="1GB">1 GB</option>
              </select>
            )}
          </>
        ))}

        {/* Accessibility Section */}
        {renderSection("Accessibility", (
          <>
            {renderSettingItem(
              "High Contrast",
              "Use high contrast colors for better visibility",
              renderToggle('highContrast', settings.highContrast)
            )}
            {renderSettingItem(
              "Screen Reader Support",
              "Enhanced support for screen readers",
              renderToggle('screenReader', settings.screenReader)
            )}
            {renderSettingItem(
              "Haptic Feedback",
              "Vibration feedback for interactions",
              renderToggle('hapticFeedback', settings.hapticFeedback)
            )}
            {renderSettingItem(
              "Audio Descriptions",
              "Audio descriptions for visual content",
              renderToggle('audioDescriptions', settings.audioDescriptions)
            )}
          </>
        ))}

        {/* App Information Section */}
        {renderSection("App Information", (
          <>
            {renderSettingItem(
              "App Version",
              "Sārathī v1.0.0 (Build 2024.01.15)",
              <span className="text-sm text-gray-500">Latest</span>
            )}
            {renderSettingItem(
              "Last Updated",
              "Check for app updates",
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Check Updates
              </button>
            )}
            {renderSettingItem(
              "Storage Used",
              "App data and cache usage",
              <span className="text-sm text-gray-500">125 MB</span>
            )}
          </>
        ))}

        {/* Support Section */}
        {renderSection("Support & Feedback", (
          <>
            {renderSettingItem(
              "Help Center",
              "Get help and find answers",
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Open
              </button>
            )}
            {renderSettingItem(
              "Contact Support",
              "Reach out to our support team",
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Contact
              </button>
            )}
            {renderSettingItem(
              "Send Feedback",
              "Share your thoughts and suggestions",
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Feedback
              </button>
            )}
            {renderSettingItem(
              "Rate App",
              "Rate Sārathī on the app store",
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Rate
              </button>
            )}
          </>
        ))}

        {/* Legal Section */}
        {renderSection("Legal", (
          <>
            {renderSettingItem(
              "Terms of Service",
              "Read our terms and conditions",
              <button className="text-orange-600 text-sm font-medium">
                View
              </button>
            )}
            {renderSettingItem(
              "Privacy Policy",
              "Understand how we protect your data",
              <button className="text-orange-600 text-sm font-medium">
                View
              </button>
            )}
            {renderSettingItem(
              "Open Source Licenses",
              "Third-party software licenses",
              <button className="text-orange-600 text-sm font-medium">
                View
              </button>
            )}
          </>
        ))}

        {/* Account Actions Section */}
        {renderSection("Account Actions", (
          <>
            {renderSettingItem(
              "Reset Settings",
              "Restore all settings to default values",
              <button
                onClick={() => setShowResetDialog(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Reset
              </button>
            )}
            {renderSettingItem(
              "Sign Out",
              "Sign out of your account",
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Sign Out
              </button>
            )}
            {renderSettingItem(
              "Delete Account",
              "Permanently delete your account and data",
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Delete
              </button>
            )}
          </>
        ))}
      </div>

      {/* Reset Settings Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Reset Settings</h3>
            <p className="text-gray-600 mb-6">
              This will restore all settings to their default values. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowResetDialog(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Sign Out</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-red-600 mb-2">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              <strong>Warning:</strong> This will permanently delete your account, all your data, and cannot be undone.
              You will lose all your eco-points, achievements, and group memberships.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium"
              >
                Delete Account
              </button>
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

export default Settings