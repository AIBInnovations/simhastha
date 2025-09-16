import { useLanguage } from '../contexts/LanguageContext'

const LanguageToggle = ({ size = 'default', showLabel = true }) => {
  const { language, toggleLanguage, t } = useLanguage()

  const sizeClasses = {
    small: 'w-12 h-6',
    default: 'w-14 h-7',
    large: 'w-16 h-8'
  }

  const dotSizeClasses = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  }

  const textSizeClasses = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base'
  }

  return (
    <div className="flex items-center space-x-3">
      {showLabel && (
        <span className={`font-medium text-gray-700 ${textSizeClasses[size]}`}>
          {t('language')}
        </span>
      )}

      <div className="flex items-center space-x-2">
        <span className={`font-medium ${language === 'en' ? 'text-orange-600' : 'text-gray-400'} ${textSizeClasses[size]}`}>
          EN
        </span>

        <button
          onClick={toggleLanguage}
          className={`relative inline-flex ${sizeClasses[size]} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
            language === 'hi'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500'
              : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={language === 'hi'}
          aria-label="Toggle language"
        >
          <span className="sr-only">Toggle language</span>
          <span
            className={`pointer-events-none inline-block ${dotSizeClasses[size]} transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              language === 'hi' ? 'translate-x-7' : 'translate-x-0'
            }`}
          >
            <span className="flex items-center justify-center w-full h-full text-xs font-bold text-gray-600">
              {language === 'hi' ? 'हि' : 'EN'}
            </span>
          </span>
        </button>

        <span className={`font-medium ${language === 'hi' ? 'text-orange-600' : 'text-gray-400'} ${textSizeClasses[size]}`}>
          हि
        </span>
      </div>
    </div>
  )
}

export default LanguageToggle