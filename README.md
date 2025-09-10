# Sārathī (सारथी) - Simhastha 2028 Pilgrimage App

A comprehensive mobile application designed to provide a seamless, safe, and engaging pilgrimage experience for attendees of Simhastha 2028. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Smart Mobility**: Real-time route optimization with crowd-aware navigation
- **Safety & Security**: Emergency SOS system with instant alerts to volunteers and authorities
- **Health & Sanitation**: Live facility tracking with cleanliness ratings and availability status
- **Digital Experience**: Event scheduling, eco-points gamification, and cultural engagement
- **Crowd Management**: Real-time heat maps and predictive crowd flow analysis

### Key Screens
1. **Dashboard** - Central hub with quick access cards and live status updates
2. **Route Planner** - AI-powered navigation with crowd density consideration
3. **Facilities Locator** - Clean washrooms and water points with IoT sensor integration
4. **Emergency SOS** - Multi-type emergency alerts with confirmation flow
5. **Event Tracker** - Live events, schedules, and personalized notifications
6. **Eco-Points Dashboard** - Gamified sustainability system with badges and rewards
7. **Crowd Heat Map** - Real-time visualization and crowd predictions

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom mobile-first components
- **Icons**: Heroicons SVG icons
- **State Management**: React hooks (useState)
- **Build Tool**: Vite for fast development and optimized builds

## 🎨 Design System

### Color Palette
- **Primary**: Deep Saffron (#FF9933) - Buttons, highlights, headers
- **Secondary**: Calm Teal (#009688) - Water points, eco-features
- **Background**: Light Cream (#FFF8E7) - Main backgrounds
- **Success**: Green (#43A047) - Safe zones, available facilities
- **Warning**: Yellow (#FFEB3B) - Moderate alerts
- **Danger**: Red (#E53935) - Emergency alerts, high crowd density

### Typography
- **Headers**: Poppins (Bold/Semi-Bold)
- **Body Text**: Manrope (Regular)
- **UI Elements**: Clean, accessible fonts with dynamic text resizing

## 📱 Mobile-First Design

- Optimized for Android 8.0+ and iOS 11.0+
- Full-width responsive design
- Touch-friendly interface with large tap targets
- Accessibility features for elderly and differently-abled users
- Cultural theming with Sanskrit elements

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simhastha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
simhastha/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── Navigation.jsx     # Route planner
│   │   ├── WashroomLocator.jsx # Facilities locator
│   │   ├── SOSScreen.jsx      # Emergency system
│   │   ├── EventTracker.jsx   # Event management
│   │   ├── EcoPoints.jsx      # Gamification system
│   │   └── CrowdHeatMap.jsx   # Crowd visualization
│   ├── App.jsx            # Main app component
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🎯 Key Features Implementation

### Navigation System
- Multi-route suggestions with real-time crowd data
- Shuttle integration and booking system
- Predictive route optimization based on crowd patterns

### Emergency System
- One-tap SOS with location sharing
- Multiple emergency types (Medical, Lost, Safety, Crowd)
- Integration with volunteer and authority networks
- Family notification system

### Gamification
- Eco-points for sustainable behavior
- Cultural badges (Shubha, Sattva, Dhrti)
- Leaderboards and challenges
- Reward redemption system

### Real-time Features
- Live crowd density visualization
- Facility availability status
- Event notifications and reminders
- Emergency alerts and announcements

## 🌟 Cultural Integration

- Sanskrit app name "सारथी" (Sārathī - meaning guide/charioteer)
- Spiritually-themed badges and rewards
- Cultural event integration
- Multilingual support (Hindi, English, regional languages)

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 📊 Performance Considerations

- Optimized for 10 million concurrent users
- Sub-second response times for critical features
- Efficient component rendering with React best practices
- Lazy loading for optimal performance

## 🔒 Security & Privacy

- End-to-end encryption for sensitive data
- GDPR-compliant data handling
- Secure location data management
- Privacy-focused health data storage

## 🌐 API Integration Ready

The app is structured to easily integrate with:
- Government traffic management systems
- IoT sensor networks for facility monitoring
- Event management systems
- Health monitoring APIs
- Crowd analytics platforms

## 📱 Deployment

The app is optimized for deployment on:
- Web platforms (Progressive Web App)
- Android (via Capacitor/Cordova)
- iOS (via Capacitor/Cordova)
- Cloud hosting platforms (Vercel, Netlify, etc.)

## 🤝 Contributing

This project was built as a comprehensive UI implementation for the Simhastha 2028 pilgrimage management system. For contributions or modifications, please ensure:

1. Follow the mobile-first design principles
2. Maintain accessibility standards
3. Preserve cultural theming elements
4. Test across different screen sizes

## 📄 License

This project is developed as part of the Simhastha 2028 initiative for pilgrimage management and safety.

## 🙏 Acknowledgments

- Designed for Simhastha 2028 Kumbh Mela
- Built with focus on pilgrim safety and experience
- Incorporates traditional Indian cultural elements
- Developed with accessibility and inclusivity in mind

---

**Made with 🙏 for Simhastha 2028 pilgrims**
