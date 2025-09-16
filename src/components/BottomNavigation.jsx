import { useLanguage } from '../contexts/LanguageContext'

const BottomNavigation = ({ activeScreen, onNavigate }) => {
  const { t } = useLanguage()
  const navItems = [
    {
      id: 'dashboard',
      name: t('home'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },
    {
      id: 'navigation',
      name: t('navigate'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l6 3 6-3v13l-6 3-6-3z" />
        </svg>
      )
    },
    {
      id: 'heatmap',
      name: t('map'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'events',
      name: t('events'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'more',
      name: t('more'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      ),
      isMore: true
    }
  ]

  const moreItems = [
    { id: 'washroom', name: t('facilities'), icon: '🚿' },
    { id: 'ecopoints', name: t('ecoPoints'), icon: '🌱' },
    { id: 'shuttle-booking', name: 'Shuttle', icon: '🚗' },
    { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'profile', name: t('profile'), icon: '👤' },
    { id: 'settings', name: t('settings'), icon: '⚙️' },
    { id: 'help', name: t('helpCenter'), icon: '❓' },
    { id: 'tutorial', name: t('tutorial'), icon: '📚' },
    { id: 'accessibility', name: t('accessibility'), icon: '♿' }
  ]

  const isActive = (screenId) => {
    if (screenId === 'more') {
      return moreItems.some(item => item.id === activeScreen)
    }
    return activeScreen === screenId
  }

  const handleMoreClick = () => {
    // Create a more menu modal
    const moreMenu = document.createElement('div')
    moreMenu.className = 'fixed inset-0 bg-black/50 flex items-end justify-center z-50'

    moreMenu.innerHTML = `
      <div class="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-800">${t('moreOptions')}</h3>
          <button id="close-more" class="p-2 hover:bg-gray-100 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-3 gap-4">
          ${moreItems.map(item => `
            <button
              data-screen="${item.id}"
              class="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors ${activeScreen === item.id ? 'bg-orange-50 text-orange-600' : 'text-gray-600'}"
            >
              <div class="text-2xl mb-2">${item.icon}</div>
              <span class="text-xs font-medium">${item.name}</span>
            </button>
          `).join('')}
        </div>
        <div class="mt-6 pt-4 border-t">
          <button id="sos-btn" class="w-full bg-red-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
            <span class="text-xl">🆘</span>
            <span>${t('emergencySOS')}</span>
          </button>
        </div>
      </div>
    `

    document.body.appendChild(moreMenu)

    // Add event listeners
    const closeBtn = moreMenu.querySelector('#close-more')
    const screenBtns = moreMenu.querySelectorAll('[data-screen]')
    const sosBtn = moreMenu.querySelector('#sos-btn')

    const closeMenu = () => {
      moreMenu.remove()
    }

    closeBtn.addEventListener('click', closeMenu)
    moreMenu.addEventListener('click', (e) => {
      if (e.target === moreMenu) closeMenu()
    })

    screenBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const screen = btn.dataset.screen
        onNavigate(screen)
        closeMenu()
      })
    })

    sosBtn.addEventListener('click', () => {
      onNavigate('sos')
      closeMenu()
    })

    // Add slide up animation
    const modalContent = moreMenu.querySelector('.bg-white')
    modalContent.style.transform = 'translateY(100%)'
    modalContent.style.transition = 'transform 0.3s ease-out'

    setTimeout(() => {
      modalContent.style.transform = 'translateY(0)'
    }, 10)
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-40 safe-area-pb">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.isMore ? handleMoreClick() : onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-4 transition-colors ${
              isActive(item.id) ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation