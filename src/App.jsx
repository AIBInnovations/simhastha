import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import WashroomLocator from './components/WashroomLocator'
import SOSScreen from './components/SOSScreen'
import EventTracker from './components/EventTracker'
import EcoPoints from './components/EcoPoints'
import CrowdHeatMap from './components/CrowdHeatMap'

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard')

  const renderScreen = () => {
    switch (activeScreen) {
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
      default:
        return <Dashboard onNavigate={setActiveScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 w-full relative">
      {renderScreen()}
    </div>
  )
}

export default App
