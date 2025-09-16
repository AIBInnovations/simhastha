import { useState } from 'react'

const Accessibility = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    // Visual Accessibility
    highContrast: false,
    fontSize: 'medium', // small, medium, large, extra-large
    boldText: false,
    reducedMotion: false,
    colorBlindMode: 'none', // none, protanopia, deuteranopia, tritanopia

    // Audio Accessibility
    screenReader: false,
    audioDescriptions: false,
    soundEffects: true,
    voiceNavigation: false,
    textToSpeech: false,

    // Motor Accessibility
    hapticFeedback: true,
    buttonDelay: 'none', // none, short, medium, long
    gestures: true,
    oneHandedMode: false,
    touchAssist: false,

    // Cognitive Accessibility
    simplifiedInterface: false,
    reducedComplexity: false,
    autoplayMedia: false,
    focusAssist: false,
    memoryAids: true,

    // Emergency Accessibility
    accessibleSOS: true,
    voiceEmergency: false,
    familyAssist: true,
    emergencyBeacon: false
  })

  const [activeDemo, setActiveDemo] = useState(null)

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const renderToggle = (key, value) => (
    <button
      onClick={() => handleSettingChange(key, !value)}
      className={`w-12 h-6 rounded-full transition-colors ${
        value ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
        value ? 'translate-x-6' : 'translate-x-0.5'
      }`}></div>
    </button>
  )

  const renderSection = (title, description, icon, children) => (
    <div className="bg-white rounded-2xl p-6 shadow-md mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )

  const renderSettingItem = (label, description, control, hasDemo = false) => (
    <div className="flex items-start justify-between">
      <div className="flex-1 pr-4">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-gray-800">{label}</p>
          {hasDemo && (
            <button
              onClick={() => setActiveDemo(label)}
              className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded-full"
            >
              Demo
            </button>
          )}
        </div>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <div className="flex-shrink-0">
        {control}
      </div>
    </div>
  )

  const presetConfigurations = [
    {
      name: 'Vision Impaired',
      description: 'High contrast, large text, screen reader support',
      icon: '👁️',
      settings: {
        highContrast: true,
        fontSize: 'extra-large',
        boldText: true,
        screenReader: true,
        textToSpeech: true,
        audioDescriptions: true,
        simplifiedInterface: true
      }
    },
    {
      name: 'Motor Difficulties',
      description: 'Touch assist, gesture alternatives, longer delays',
      icon: '✋',
      settings: {
        touchAssist: true,
        buttonDelay: 'long',
        gestures: false,
        oneHandedMode: true,
        hapticFeedback: true,
        voiceNavigation: true
      }
    },
    {
      name: 'Hearing Impaired',
      description: 'Visual indicators, haptic feedback, text alternatives',
      icon: '👂',
      settings: {
        hapticFeedback: true,
        soundEffects: false,
        audioDescriptions: false,
        textToSpeech: false,
        memoryAids: true
      }
    },
    {
      name: 'Cognitive Support',
      description: 'Simplified interface, memory aids, reduced complexity',
      icon: '🧠',
      settings: {
        simplifiedInterface: true,
        reducedComplexity: true,
        memoryAids: true,
        focusAssist: true,
        autoplayMedia: false,
        reducedMotion: true
      }
    }
  ]

  const applyPreset = (preset) => {
    setSettings(prev => ({
      ...prev,
      ...preset.settings
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('settings')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Accessibility Settings</h1>
            <p className="text-gray-600 text-sm">Customize for your needs</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Quick Setup Presets */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Quick Setup Presets</h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose a preset that matches your needs, then customize individual settings below.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {presetConfigurations.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{preset.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{preset.name}</h3>
                  <p className="text-sm text-gray-600">{preset.description}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Accessibility */}
        {renderSection(
          "Visual Accessibility",
          "Settings for users with visual impairments",
          "👁️",
          <>
            {renderSettingItem(
              "High Contrast Mode",
              "Increase contrast for better visibility",
              renderToggle('highContrast', settings.highContrast),
              true
            )}
            {renderSettingItem(
              "Font Size",
              "Adjust text size throughout the app",
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            )}
            {renderSettingItem(
              "Bold Text",
              "Make all text bold for better readability",
              renderToggle('boldText', settings.boldText)
            )}
            {renderSettingItem(
              "Reduce Motion",
              "Minimize animations and transitions",
              renderToggle('reducedMotion', settings.reducedMotion)
            )}
            {renderSettingItem(
              "Color Blind Support",
              "Adjust colors for color vision differences",
              <select
                value={settings.colorBlindMode}
                onChange={(e) => handleSettingChange('colorBlindMode', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="none">None</option>
                <option value="protanopia">Protanopia</option>
                <option value="deuteranopia">Deuteranopia</option>
                <option value="tritanopia">Tritanopia</option>
              </select>
            )}
          </>
        )}

        {/* Audio Accessibility */}
        {renderSection(
          "Audio Accessibility",
          "Settings for users with hearing impairments",
          "👂",
          <>
            {renderSettingItem(
              "Screen Reader Support",
              "Enable compatibility with screen readers",
              renderToggle('screenReader', settings.screenReader)
            )}
            {renderSettingItem(
              "Text-to-Speech",
              "Read app content aloud",
              renderToggle('textToSpeech', settings.textToSpeech),
              true
            )}
            {renderSettingItem(
              "Audio Descriptions",
              "Describe visual content with audio",
              renderToggle('audioDescriptions', settings.audioDescriptions)
            )}
            {renderSettingItem(
              "Voice Navigation",
              "Navigate the app using voice commands",
              renderToggle('voiceNavigation', settings.voiceNavigation)
            )}
            {renderSettingItem(
              "Sound Effects",
              "Play audio feedback for interactions",
              renderToggle('soundEffects', settings.soundEffects)
            )}
          </>
        )}

        {/* Motor Accessibility */}
        {renderSection(
          "Motor Accessibility",
          "Settings for users with motor impairments",
          "✋",
          <>
            {renderSettingItem(
              "Touch Assist",
              "Make touch targets larger and easier to tap",
              renderToggle('touchAssist', settings.touchAssist),
              true
            )}
            {renderSettingItem(
              "Button Delay",
              "Add delay before actions to prevent accidental taps",
              <select
                value={settings.buttonDelay}
                onChange={(e) => handleSettingChange('buttonDelay', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="none">None</option>
                <option value="short">Short (0.5s)</option>
                <option value="medium">Medium (1s)</option>
                <option value="long">Long (2s)</option>
              </select>
            )}
            {renderSettingItem(
              "Gesture Navigation",
              "Use swipe gestures for navigation",
              renderToggle('gestures', settings.gestures)
            )}
            {renderSettingItem(
              "One-Handed Mode",
              "Optimize interface for single-hand use",
              renderToggle('oneHandedMode', settings.oneHandedMode)
            )}
            {renderSettingItem(
              "Haptic Feedback",
              "Vibration feedback for interactions",
              renderToggle('hapticFeedback', settings.hapticFeedback)
            )}
          </>
        )}

        {/* Cognitive Accessibility */}
        {renderSection(
          "Cognitive Accessibility",
          "Settings for users with cognitive impairments",
          "🧠",
          <>
            {renderSettingItem(
              "Simplified Interface",
              "Show only essential features and options",
              renderToggle('simplifiedInterface', settings.simplifiedInterface),
              true
            )}
            {renderSettingItem(
              "Reduced Complexity",
              "Simplify language and remove complex features",
              renderToggle('reducedComplexity', settings.reducedComplexity)
            )}
            {renderSettingItem(
              "Memory Aids",
              "Show helpful reminders and context clues",
              renderToggle('memoryAids', settings.memoryAids)
            )}
            {renderSettingItem(
              "Focus Assist",
              "Highlight current focus and reduce distractions",
              renderToggle('focusAssist', settings.focusAssist)
            )}
            {renderSettingItem(
              "Auto-play Media",
              "Automatically play videos and audio content",
              renderToggle('autoplayMedia', settings.autoplayMedia)
            )}
          </>
        )}

        {/* Emergency Accessibility */}
        {renderSection(
          "Emergency Accessibility",
          "Enhanced emergency features for accessibility needs",
          "🚨",
          <>
            {renderSettingItem(
              "Accessible SOS",
              "Large, high-contrast emergency button",
              renderToggle('accessibleSOS', settings.accessibleSOS)
            )}
            {renderSettingItem(
              "Voice Emergency",
              "Activate emergency features with voice commands",
              renderToggle('voiceEmergency', settings.voiceEmergency)
            )}
            {renderSettingItem(
              "Family Assist",
              "Allow family members to provide remote assistance",
              renderToggle('familyAssist', settings.familyAssist)
            )}
            {renderSettingItem(
              "Emergency Beacon",
              "Continuous location sharing during emergencies",
              renderToggle('emergencyBeacon', settings.emergencyBeacon)
            )}
          </>
        )}

        {/* Accessibility Testing */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">Test Your Settings</h3>
          <p className="text-sm text-gray-600 mb-4">
            Try these interactive demos to see how your accessibility settings work.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveDemo('navigation')}
              className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-colors"
            >
              <div className="text-2xl mb-2">🧭</div>
              <div className="font-medium text-blue-800 text-sm">Test Navigation</div>
            </button>
            <button
              onClick={() => setActiveDemo('reading')}
              className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition-colors"
            >
              <div className="text-2xl mb-2">📖</div>
              <div className="font-medium text-green-800 text-sm">Test Reading</div>
            </button>
            <button
              onClick={() => setActiveDemo('interaction')}
              className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition-colors"
            >
              <div className="text-2xl mb-2">👆</div>
              <div className="font-medium text-purple-800 text-sm">Test Touch</div>
            </button>
            <button
              onClick={() => setActiveDemo('emergency')}
              className="p-4 bg-red-50 rounded-xl text-center hover:bg-red-100 transition-colors"
            >
              <div className="text-2xl mb-2">🆘</div>
              <div className="font-medium text-red-800 text-sm">Test Emergency</div>
            </button>
          </div>
        </div>

        {/* Accessibility Resources */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">Accessibility Resources</h3>
          <div className="space-y-3">
            <button
              onClick={() => alert('Accessibility guide would open here')}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">📚</span>
                <span className="font-medium text-gray-800">Accessibility Guide</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => alert('Support contact would open here')}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">💬</span>
                <span className="font-medium text-gray-800">Accessibility Support</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => alert('Feedback form would open here')}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">📝</span>
                <span className="font-medium text-gray-800">Accessibility Feedback</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {activeDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {activeDemo === 'navigation' && 'Navigation Demo'}
              {activeDemo === 'reading' && 'Reading Demo'}
              {activeDemo === 'interaction' && 'Touch Interaction Demo'}
              {activeDemo === 'emergency' && 'Emergency Feature Demo'}
            </h3>
            <div className="mb-6">
              {activeDemo === 'navigation' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Your navigation settings:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Voice Navigation: {settings.voiceNavigation ? 'Enabled' : 'Disabled'}</li>
                    <li>• Gestures: {settings.gestures ? 'Enabled' : 'Disabled'}</li>
                    <li>• One-Handed Mode: {settings.oneHandedMode ? 'Enabled' : 'Disabled'}</li>
                    <li>• Touch Assist: {settings.touchAssist ? 'Enabled' : 'Disabled'}</li>
                  </ul>
                </div>
              )}
              {activeDemo === 'reading' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Your reading settings:</p>
                  <div
                    className={`p-3 rounded-lg ${settings.highContrast ? 'bg-black text-white' : 'bg-gray-100'}`}
                    style={{
                      fontSize: settings.fontSize === 'small' ? '12px' :
                                settings.fontSize === 'medium' ? '14px' :
                                settings.fontSize === 'large' ? '18px' : '24px',
                      fontWeight: settings.boldText ? 'bold' : 'normal'
                    }}
                  >
                    Sample text with your current settings applied.
                  </div>
                </div>
              )}
              {activeDemo === 'interaction' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Try tapping this button:</p>
                  <button
                    className={`bg-blue-500 text-white rounded-lg font-medium transition-colors ${
                      settings.touchAssist ? 'px-8 py-4 text-lg' : 'px-4 py-2'
                    }`}
                    onClick={() => {
                      if (settings.hapticFeedback) {
                        // Simulate haptic feedback
                        console.log('Haptic feedback triggered')
                      }
                      alert('Button pressed!')
                    }}
                  >
                    Test Button
                  </button>
                  <p className="text-xs text-gray-500">
                    Delay: {settings.buttonDelay === 'none' ? 'None' : settings.buttonDelay}
                  </p>
                </div>
              )}
              {activeDemo === 'emergency' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Emergency button with your settings:</p>
                  <button
                    className={`bg-red-500 text-white rounded-full font-bold transition-colors ${
                      settings.accessibleSOS ? 'w-24 h-24 text-xl' : 'w-16 h-16'
                    } ${settings.highContrast ? 'border-4 border-white' : ''}`}
                  >
                    SOS
                  </button>
                  <p className="text-xs text-gray-500">
                    Voice Emergency: {settings.voiceEmergency ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setActiveDemo(null)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium"
            >
              Close Demo
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Accessibility