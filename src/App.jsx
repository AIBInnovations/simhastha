import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import WashroomLocator from './components/WashroomLocator'
import SOSScreen from './components/SOSScreen'
import EventTracker from './components/EventTracker'
import EcoPoints from './components/EcoPoints'
import CrowdHeatMap from './components/CrowdHeatMap'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import FamilyGroup from './components/FamilyGroup'
import Settings from './components/Settings'
import Onboarding from './components/Onboarding'
import HelpCenter from './components/HelpCenter'
import Tutorial from './components/Tutorial'
import Accessibility from './components/Accessibility'
import ShuttleBooking from './components/ShuttleBooking'
import BottomNavigation from './components/BottomNavigation'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  const [activeScreen, setActiveScreen] = useState('login')

  const renderScreen = () => {
    switch (activeScreen) {
      // Authentication & Onboarding Screens
      case 'login':
        return <Login onNavigate={setActiveScreen} />
      case 'register':
        return <Register onNavigate={setActiveScreen} />
      case 'onboarding':
        return <Onboarding onNavigate={setActiveScreen} />

      // Main App Screens
      case 'dashboard':
        return <Dashboard onNavigate={setActiveScreen} />
      case 'navigation':
        return <Navigation onNavigate={setActiveScreen} />
      case 'washroom':
        return <WashroomLocator onNavigate={setActiveScreen} />
      case 'sos':
        return <SOSScreen onNavigate={setActiveScreen} />
      case 'events':
        return <EventTracker onNavigate={setActiveScreen} />
      case 'ecopoints':
        return <EcoPoints onNavigate={setActiveScreen} />
      case 'heatmap':
        return <CrowdHeatMap onNavigate={setActiveScreen} />
      case 'shuttle-booking':
        return <ShuttleBooking onNavigate={setActiveScreen} />

      // Account Management Screens
      case 'profile':
        return <Profile onNavigate={setActiveScreen} />
      case 'family':
        return <FamilyGroup onNavigate={setActiveScreen} />
      case 'settings':
        return <Settings onNavigate={setActiveScreen} />

      // Help & Support Screens
      case 'help':
        return <HelpCenter onNavigate={setActiveScreen} />
      case 'tutorial':
        return <Tutorial onNavigate={setActiveScreen} />
      case 'accessibility':
        return <Accessibility onNavigate={setActiveScreen} />

      default:
        return <Login onNavigate={setActiveScreen} />
    }
  }

  const shouldShowBottomNav = () => {
    const noNavScreens = ['login', 'register', 'onboarding']
    return !noNavScreens.includes(activeScreen)
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-amber-50 w-full relative">
        <div className={shouldShowBottomNav() ? "pb-20" : ""}>
          {renderScreen()}
        </div>
        {shouldShowBottomNav() && (
          <BottomNavigation activeScreen={activeScreen} onNavigate={setActiveScreen} />
        )}
      </div>
    </LanguageProvider>
  )
}

export default App
