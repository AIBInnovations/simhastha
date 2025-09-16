import { createContext, useContext, useState, useEffect } from 'react'

// Language translations
const translations = {
  en: {
    // App Name
    appName: 'Sārathī',
    appSubtitle: 'Your Spiritual Guide',

    // Common
    back: 'Back',
    next: 'Next',
    continue: 'Continue',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',

    // Authentication
    login: 'Login',
    register: 'Register',
    phone: 'Phone',
    email: 'Email',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    enterOTP: 'Enter OTP',
    sendOTP: 'Send OTP',
    verifyOTP: 'Verify OTP',
    guestAccess: 'Continue as Guest',
    agreeTerms: 'I agree to the Terms and Conditions',

    // Dashboard
    dashboard: 'Dashboard',
    findMyRoute: 'Find My Route',
    facilities: 'Facilities',
    events: 'Events',
    crowdMap: 'Crowd Map',
    ecoPoints: 'Eco Points',
    liveStatus: 'Live Status',

    // Navigation
    navigation: 'Navigation',
    startNavigation: 'Start Navigation',
    routeOptions: 'Route Options',
    walkingRoute: 'Walking Route',
    shuttleRoute: 'Shuttle Route',
    busRoute: 'Bus Route',
    quickestRoute: 'Quickest Route',

    // Shuttle Booking
    shuttleBooking: 'Shuttle Booking',
    quickSafeTransportation: 'Quick & Safe Transportation',
    selectJourney: 'Select Journey',
    choosePickupDestination: 'Choose your pickup and destination',
    from: 'From',
    to: 'To',
    selectPickupStation: 'Select pickup station',
    selectDestination: 'Select destination',
    findAvailableShuttles: 'Find Available Shuttles',
    chooseYourRide: 'Choose Your Ride',
    availableShuttlesRoute: 'Available shuttles for your route',
    confirmBooking: 'Confirm Booking',
    reviewTripDetails: 'Review your trip details',
    yourShuttleRide: 'Your Shuttle Ride',
    liveTracking: 'Live Tracking',

    // Services
    shuttleMini: 'Shuttle Mini',
    shuttleShare: 'Shuttle Share',
    shuttlePrime: 'Shuttle Prime',
    auto: 'Auto',
    comfortableACRide: 'Comfortable AC ride',
    shareWithPilgrims: 'Share with other pilgrims',
    premiumComfortRide: 'Premium comfort ride',
    quickLocalTransport: 'Quick local transport',
    perPerson: 'per person',
    away: 'away',

    // Stations
    stations: {
      triveniSangam: 'Triveni Sangam',
      hanumanTemple: 'Hanuman Temple',
      mainGhat: 'Main Ghat',
      foodCourt: 'Food Court',
      medicalCenter: 'Medical Center',
      parkingP1: 'Parking P1',
      ramGhat: 'Ram Ghat',
      centralBusStand: 'Central Bus Stand'
    },

    // Facilities
    washroom: 'Washroom',
    seating: 'Seating',
    water: 'Water',
    food: 'Food',
    medical: 'Medical',
    security: 'Security',
    parking: 'Parking',
    ambulance: 'Ambulance',
    pharmacy: 'Pharmacy',
    busTerminal: 'Bus Terminal',

    // Profile & Settings
    profile: 'Profile',
    settings: 'Settings',
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',

    // Bottom Navigation
    home: 'Home',
    navigate: 'Navigate',
    map: 'Map',
    more: 'More',

    // Onboarding
    welcomeToSarathi: 'Welcome to Sārathī',
    spiritualGuideSimhastha: 'Your Spiritual Guide for Simhastha 2028',
    skipTutorial: 'Skip Tutorial',
    startMyJourney: 'Start My Journey',

    // More Options
    moreOptions: 'More Options',
    tutorial: 'Tutorial',
    helpCenter: 'Help Center',
    accessibility: 'Accessibility',
    emergencySOS: 'Emergency SOS'
  },

  hi: {
    // App Name
    appName: 'सारथी',
    appSubtitle: 'आपका आध्यात्मिक मार्गदर्शक',

    // Common
    back: 'वापस',
    next: 'आगे',
    continue: 'जारी रखें',
    confirm: 'पुष्टि करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',

    // Authentication
    login: 'लॉगिन',
    register: 'रजिस्टर',
    phone: 'फोन',
    email: 'ईमेल',
    phoneNumber: 'फोन नंबर',
    emailAddress: 'ईमेल पता',
    enterOTP: 'OTP दर्ज करें',
    sendOTP: 'OTP भेजें',
    verifyOTP: 'OTP सत्यापित करें',
    guestAccess: 'अतिथि के रूप में जारी रखें',
    agreeTerms: 'मैं नियम और शर्तों से सहमत हूँ',

    // Dashboard
    dashboard: 'डैशबोर्ड',
    findMyRoute: 'मेरा रास्ता खोजें',
    facilities: 'सुविधाएं',
    events: 'कार्यक्रम',
    crowdMap: 'भीड़ मैप',
    ecoPoints: 'इको पॉइंट्स',
    liveStatus: 'लाइव स्थिति',

    // Navigation
    navigation: 'नेवीगेशन',
    startNavigation: 'नेवीगेशन शुरू करें',
    routeOptions: 'रूट विकल्प',
    walkingRoute: 'पैदल रास्ता',
    shuttleRoute: 'शटल रूट',
    busRoute: 'बस रूट',
    quickestRoute: 'सबसे तेज़ रास्ता',

    // Shuttle Booking
    shuttleBooking: 'शटल बुकिंग',
    quickSafeTransportation: 'त्वरित और सुरक्षित परिवहन',
    selectJourney: 'यात्रा चुनें',
    choosePickupDestination: 'अपना पिकअप और गंतव्य चुनें',
    from: 'से',
    to: 'तक',
    selectPickupStation: 'पिकअप स्टेशन चुनें',
    selectDestination: 'गंतव्य चुनें',
    findAvailableShuttles: 'उपलब्ध शटल खोजें',
    chooseYourRide: 'अपनी सवारी चुनें',
    availableShuttlesRoute: 'आपके रूट के लिए उपलब्ध शटल',
    confirmBooking: 'बुकिंग कन्फर्म करें',
    reviewTripDetails: 'अपनी यात्रा का विवरण देखें',
    yourShuttleRide: 'आपकी शटल सवारी',
    liveTracking: 'लाइव ट्रैकिंग',

    // Services
    shuttleMini: 'शटल मिनी',
    shuttleShare: 'शटल शेयर',
    shuttlePrime: 'शटल प्राइम',
    auto: 'ऑटो',
    comfortableACRide: 'आरामदायक AC सवारी',
    shareWithPilgrims: 'अन्य तीर्थयात्रियों के साथ साझा करें',
    premiumComfortRide: 'प्रीमियम आराम सवारी',
    quickLocalTransport: 'त्वरित स्थानीय परिवहन',
    perPerson: 'प्रति व्यक्ति',
    away: 'दूर',

    // Stations
    stations: {
      triveniSangam: 'त्रिवेणी संगम',
      hanumanTemple: 'हनुमान मंदिर',
      mainGhat: 'मुख्य घाट',
      foodCourt: 'फूड कोर्ट',
      medicalCenter: 'मेडिकल सेंटर',
      parkingP1: 'पार्किंग P1',
      ramGhat: 'राम घाट',
      centralBusStand: 'केंद्रीय बस स्टैंड'
    },

    // Facilities
    washroom: 'शौचालय',
    seating: 'बैठक',
    water: 'पानी',
    food: 'भोजन',
    medical: 'चिकित्सा',
    security: 'सुरक्षा',
    parking: 'पार्किंग',
    ambulance: 'एम्बुलेंस',
    pharmacy: 'फार्मेसी',
    busTerminal: 'बस टर्मिनल',

    // Profile & Settings
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',

    // Bottom Navigation
    home: 'होम',
    navigate: 'नेवीगेट',
    map: 'मैप',
    more: 'और',

    // Onboarding
    welcomeToSarathi: 'सारथी में आपका स्वागत है',
    spiritualGuideSimhastha: 'सिंहस्थ 2028 के लिए आपका आध्यात्मिक मार्गदर्शक',
    skipTutorial: 'ट्यूटोरियल छोड़ें',
    startMyJourney: 'मेरी यात्रा शुरू करें',

    // More Options
    moreOptions: 'अधिक विकल्प',
    tutorial: 'ट्यूटोरियल',
    helpCenter: 'सहायता केंद्र',
    accessibility: 'पहुंच',
    emergencySOS: 'आपातकालीन SOS'
  }
}

// Create Language Context
const LanguageContext = createContext()

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('sarathi-language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference
  useEffect(() => {
    localStorage.setItem('sarathi-language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isHindi: language === 'hi',
    isEnglish: language === 'en'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}