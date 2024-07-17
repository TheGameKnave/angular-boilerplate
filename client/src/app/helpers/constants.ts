export const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es', 'zh'];
interface Language {
  [key: string]: {
    name: string;
    nativeName: string;
    regions: Region[];
  };
}
interface Region {
  region: string;
  locale: string;
  nativeName: string;
  flag: string;
}
export const LANGUAGES: Language = {
  'en': { name: 'English',  nativeName: 'English', 
    regions: [
      { region: 'United States', locale: 'en-US', nativeName: 'United States', flag: '🇺🇸' },
      { region: 'United Kingdom', locale: 'en-GB', nativeName: 'United Kingdom', flag: '🇬🇧' },
      { region: 'Canada', locale: 'en-CA', nativeName: 'Canada', flag: '🇨🇦' },
      { region: 'Australia', locale: 'en-AU', nativeName: 'Australia', flag: '🇦🇺' },
      { region: 'Ireland', locale: 'en-IE', nativeName: 'Ireland', flag: '🇮🇪' },
      { region: 'New Zealand', locale: 'en-NZ', nativeName: 'New Zealand', flag: '🇳🇿' },
      { region: 'Nigeria', locale: 'en-NG', nativeName: 'Nigeria', flag: '🇳🇬' },
    ]
  },
  'fr': { name: 'French',  nativeName: 'Français', 
    regions: [
      { region: 'France', locale: 'fr-FR', nativeName: 'France', flag: '🇫🇷' },
      { region: 'Canada', locale: 'fr-CA', nativeName: 'Canada', flag: '🇨🇦' },
      { region: 'Belgium', locale: 'fr-BE', nativeName: 'Belgique', flag: '🇧🇪' },
      { region: 'Switzerland', locale: 'fr-CH', nativeName: 'Suisse', flag: '🇨🇭' },
      { region: 'Luxembourg', locale: 'fr-LU', nativeName: 'Luxembourg', flag: '🇱🇺' },
      { region: 'Monaco', locale: 'fr-MC', nativeName: 'Monaco', flag: '🇲🇨' },
    ]
  },
  'es': { name: 'Spanish',  nativeName: 'Español', 
    regions: [
      { region: 'Spain', locale: 'es-ES', nativeName: 'España', flag: '🇪🇸' },
      { region: 'Mexico', locale: 'es-MX', nativeName: 'México', flag: '🇲🇽' },
      { region: 'Colombia', locale: 'es-CO', nativeName: 'Colombia', flag: '🇨🇴' },
      { region: 'Argentina', locale: 'es-AR', nativeName: 'Argentina', flag: '🇦🇷' },
      { region: 'Peru', locale: 'es-PE', nativeName: 'Perú', flag: '🇵🇪' },
      { region: 'Venezuela', locale: 'es-VE', nativeName: 'Venezuela', flag: '🇻🇪' },
      { region: 'Chile', locale: 'es-CL', nativeName: 'Chile', flag: '🇨🇱' },
      { region: 'Ecuador', locale: 'es-EC', nativeName: 'Ecuador', flag: '🇪🇨' },
      { region: 'Guatemala', locale: 'es-GT', nativeName: 'Guatemala', flag: '🇬🇹' },
      { region: 'Cuba', locale: 'es-CU', nativeName: 'Cuba', flag: '🇨🇺' },
      { region: 'Bolivia', locale: 'es-BO', nativeName: 'Bolivia', flag: '🇧🇴' },
      { region: 'Dominican Republic', locale: 'es-DO', nativeName: 'República Dominicana', flag: '🇩🇴' },
      { region: 'Honduras', locale: 'es-HN', nativeName: 'Honduras', flag: '🇭🇳' },
      { region: 'Paraguay', locale: 'es-PY', nativeName: 'Paraguay', flag: '🇵🇾' },
      { region: 'El Salvador', locale: 'es-SV', nativeName: 'El Salvador', flag: '🇸🇻' },
      { region: 'Nicaragua', locale: 'es-NI', nativeName: 'Nicaragua', flag: '🇳🇮' },
      { region: 'Costa Rica', locale: 'es-CR', nativeName: 'Costa Rica', flag: '🇨🇷' },
      { region: 'Uruguay', locale: 'es-UY', nativeName: 'Uruguay', flag: '🇺🇾' },
      { region: 'Panama', locale: 'es-PA', nativeName: 'Panamá', flag: '🇵🇦' },
      { region: 'Equatorial Guinea', locale: 'es-GQ', nativeName: 'Guinea Ecuatorial', flag: '🇬🇶' },
    ]
  },
  'zh': { name: 'Chinese',  nativeName: '中文', 
    regions: [
      { region: 'China', locale: 'zh-CN', nativeName: '中国', flag: '🇨🇳' },
      { region: 'Taiwan', locale: 'zh-TW', nativeName: '台灣', flag: '🇹🇼' },
      { region: 'Singapore', locale: 'zh-SG', nativeName: '新加坡', flag: '🇸🇬' },
    ]
  },
  'de': { name: 'German',  nativeName: 'Deutsch', 
    regions: [
      { region: 'Germany', locale: 'de-DE', nativeName: 'Deutschland', flag: '🇩🇪' },
      { region: 'Austria', locale: 'de-AT', nativeName: 'Österreich', flag: '🇦🇹' },
      { region: 'Switzerland', locale: 'de-CH', nativeName: 'Schweiz', flag: '🇨🇭' },
      { region: 'Liechtenstein', locale: 'de-LI', nativeName: 'Liechtenstein', flag: '🇱🇮' },
      { region: 'Luxembourg', locale: 'de-LU', nativeName: 'Luxemburg', flag: '🇱🇺' },
    ]
  },
  'it': { name: 'Italian',  nativeName: 'Italiano', 
    regions: [
      { region: 'Italy', locale: 'it-IT', nativeName: 'Italia', flag: '🇮🇹' },
      { region: 'Switzerland', locale: 'it-CH', nativeName: 'Svizzera', flag: '🇨🇭' },
      { region: 'San Marino', locale: 'it-SM', nativeName: 'San Marino', flag: '🇸🇲' },
      { region: 'Vatican City', locale: 'it-VA', nativeName: 'Città del Vaticano', flag: '🇻🇦' },
    ]
  },
  'ja': { name: 'Japanese',  nativeName: '日本語', 
    regions: [
      { region: 'Japan', locale: 'ja-JP', nativeName: '日本', flag: '🇯🇵' },
    ]
  },
  'ko': { name: 'Korean',  nativeName: '한국어', 
    regions: [
      { region: 'South Korea', locale: 'ko-KR', nativeName: '대한민국', flag: '🇰🇷' },
      { region: 'North Korea', locale: 'ko-KP', nativeName: '조선민주주의인민공화국', flag: '🇰🇵' },
    ]
  },
  'pt': { name: 'Portuguese',  nativeName: 'Português', 
    regions: [
      { region: 'Brazil', locale: 'pt-BR', nativeName: 'Brasil', flag: '🇧🇷' },
      { region: 'Portugal', locale: 'pt-PT', nativeName: 'Portugal', flag: '🇵🇹' },
      { region: 'Angola', locale: 'pt-AO', nativeName: 'Angola', flag: '🇦🇴' },
      { region: 'Mozambique', locale: 'pt-MZ', nativeName: 'Moçambique', flag: '🇲🇿' },
      { region: 'Guinea-Bissau', locale: 'pt-GW', nativeName: 'Guiné-Bissau', flag: '🇬🇼' },
      { region: 'Cape Verde', locale: 'pt-CV', nativeName: 'Cabo Verde', flag: '🇨🇻' },
      { region: 'São Tomé and Príncipe', locale: 'pt-ST', nativeName: 'São Tomé e Príncipe', flag: '🇸🇹' },
      { region: 'East Timor', locale: 'pt-TL', nativeName: 'Timor-Leste', flag: '🇹🇱' },
    ]
  },
  'ru': { name: 'Russian',  nativeName: 'Русский', 
    regions: [
      { region: 'Russia', locale: 'ru-RU', nativeName: 'Россия', flag: '🇷🇺' },
      { region: 'Belarus', locale: 'ru-BY', nativeName: 'Беларусь', flag: '🇧🇾' },
      { region: 'Kazakhstan', locale: 'ru-KZ', nativeName: 'Қазақстан', flag: '🇰🇿' },
      { region: 'Kyrgyzstan', locale: 'ru-KG', nativeName: 'Кыргызстан', flag: '🇰🇬' },
      { region: 'Tajikistan', locale: 'ru-TJ', nativeName: 'Тоҷикистон', flag: '🇹🇯' },
    ]
  },
  'ar': { name: 'Arabic',  nativeName: 'العربية', 
    regions: [
      { region: 'Saudi Arabia', locale: 'ar-SA', nativeName: 'المملكة العربية السعودية', flag: '🇸🇦' },
      { region: 'United Arab Emirates', locale: 'ar-AE', nativeName: 'الإمارات العربية المتحدة', flag: '🇦🇪' },
      { region: 'Yemen', locale: 'ar-YE', nativeName: 'اليَمَن', flag: '🇾🇪' },
      { region: 'Oman', locale: 'ar-OM', nativeName: 'عمان', flag: '🇴🇲' },
      { region: 'Iraq', locale: 'ar-IQ', nativeName: 'العراق', flag: '🇮🇶' },
      { region: 'Qatar', locale: 'ar-QA', nativeName: 'قطر', flag: '🇶🇦' },
      { region: 'Bahrain', locale: 'ar-BH', nativeName: 'البحرين', flag: '🇧🇭' },
      { region: 'Kuwait', locale: 'ar-KW', nativeName: 'الكويت', flag: '🇰🇼' },
      { region: 'Jordan', locale: 'ar-JO', nativeName: 'الأردن', flag: '🇯🇴' },
      { region: 'Lebanon', locale: 'ar-LB', nativeName: 'لبنان', flag: '🇱🇧' },
      { region: 'Libya', locale: 'ar-LY', nativeName: 'ليبيا', flag: '🇱🇾' },
      { region: 'Morocco', locale: 'ar-MA', nativeName: 'المغرب', flag: '🇲🇦' },
      { region: 'Tunisia', locale: 'ar-TN', nativeName: 'تونس', flag: '🇹🇳' },
      { region: 'Algeria', locale: 'ar-DZ', nativeName: 'الجزائر', flag: '🇩🇿' },
      { region: 'Sudan', locale: 'ar-SD', nativeName: 'السودان', flag: '🇸🇩' },
      { region: 'Somalia', locale: 'ar-SO', nativeName: 'الصومال', flag: '🇸🇴' },
      { region: 'Palestine', locale: 'ar-PS', nativeName: 'فلسطين', flag: '🇵🇸' },
      { region: 'Syria', locale: 'ar-SY', nativeName: 'سوريا', flag: '🇸🇾' },
      { region: 'Mauritania', locale: 'ar-MR', nativeName: 'موريتانيا', flag: '🇲🇷' },
    ]
  },
  'af': { name: 'Afrikaans', nativeName: 'Afrikaans',
    regions: [
      { region: 'South Africa', locale: 'af-ZA', nativeName: 'Suid-Afrika', flag: '🇿🇦' },
      { region: 'Namibia', locale: 'af-NA', nativeName: 'Namibië', flag: '🇳🇦' },
    ]
  },
  'sq': { name: 'Albanian', nativeName: 'Shqip',
    regions: [
      { region: 'Albania', locale: 'sq-AL', nativeName: 'Shqipëri', flag: '🇦🇱' },
      { region: 'Kosovo', locale: 'sq-KS', nativeName: 'Kosovë', flag: '🇽🇰' },
    ]
  },
  'am': { name: 'Amharic', nativeName: 'አማርኛ',
    regions: [
      { region: 'Ethiopia', locale: 'am-ET', nativeName: 'ኢትዮጵያ', flag: '🇪🇹' },
    ]
  },
  'hy': { name: 'Armenian', nativeName: 'Հայերեն',
    regions: [
      { region: 'Armenia', locale: 'hy-AM', nativeName: 'Հայաստան', flag: '🇦🇲' },
    ]
  },
  'bn': { name: 'Bengali', nativeName: 'বাংলা',
    regions: [
      { region: 'Bangladesh', locale: 'bn-BD', nativeName: 'বাংলাদেশ', flag: '🇧🇩' },
      { region: 'India', locale: 'bn-IN', nativeName: 'ভারত', flag: '🇮🇳' },
    ]
  },
  'bs': { name: 'Bosnian', nativeName: 'Bosanski',
    regions: [
      { region: 'Bosnia and Herzegovina', locale: 'bs-BA', nativeName: 'Bosna i Hercegovina', flag: '🇧🇦' },
    ]
  },
  'bg': { name: 'Bulgarian', nativeName: 'български',
    regions: [
      { region: 'Bulgaria', locale: 'bg-BG', nativeName: 'България', flag: '🇧🇬' },
    ]
  },
  'my': { name: 'Burmese', nativeName: 'ဗမာစာ',
    regions: [
      { region: 'Myanmar', locale: 'my-MM', nativeName: 'မြန်မာ', flag: '🇲🇲' },
    ]
  },
  'ca': { name: 'Catalan', nativeName: 'Català',
    regions: [
      { region: 'Spain', locale: 'ca-ES', nativeName: 'Espanya', flag: '🇪🇸' },
      { region: 'Andorra', locale: 'ca-AD', nativeName: 'Andorra', flag: '🇦🇩' },
    ]
  },
  'hr': { name: 'Croatian', nativeName: 'Hrvatski',
    regions: [
      { region: 'Croatia', locale: 'hr-HR', nativeName: 'Hrvatska', flag: '🇭🇷' },
      { region: 'Bosnia and Herzegovina', locale: 'hr-BA', nativeName: 'Bosna i Hercegovina', flag: '🇧🇦' },
    ]
  },
  'cs': { name: 'Czech', nativeName: 'Čeština',
    regions: [
      { region: 'Czech Republic', locale: 'cs-CZ', nativeName: 'Česká republika', flag: '🇨🇿' },
    ]
  },
  'da': { name: 'Danish', nativeName: 'Dansk',
    regions: [
      { region: 'Denmark', locale: 'da-DK', nativeName: 'Danmark', flag: '🇩🇰' },
      { region: 'Greenland', locale: 'da-GL', nativeName: 'Kalaallit Nunaat', flag: '🇬🇱' },
    ]
  },
  'nl': { name: 'Dutch', nativeName: 'Nederlands',
    regions: [
      { region: 'Netherlands', locale: 'nl-NL', nativeName: 'Nederland', flag: '🇳🇱' },
      { region: 'Belgium', locale: 'nl-BE', nativeName: 'België', flag: '🇧🇪' },
      { region: 'Suriname', locale: 'nl-SR', nativeName: 'Suriname', flag: '🇸🇷' },
    ]
  },
  'eo': { name: 'Esperanto', nativeName: 'Esperanto',
    regions: []
  },
  'et': { name: 'Estonian', nativeName: 'Eesti',
    regions: [
      { region: 'Estonia', locale: 'et-EE', nativeName: 'Eesti', flag: '🇪🇪' },
    ]
  },
  'tl': { name: 'Filipino', nativeName: 'Filipino',
    regions: [
      { region: 'Philippines', locale: 'tl-PH', nativeName: 'Pilipinas', flag: '🇵🇭' },
    ]
  },
  'fi': { name: 'Finnish', nativeName: 'Suomi',
    regions: [
      { region: 'Finland', locale: 'fi-FI', nativeName: 'Suomi', flag: '🇫🇮' },
    ]
  },
  'ka': { name: 'Georgian', nativeName: 'ქართული',
    regions: [
      { region: 'Georgia', locale: 'ka-GE', nativeName: 'საქართველო', flag: '🇬🇪' },
    ]
  },
  'el': { name: 'Greek', nativeName: 'Ελληνικά',
    regions: [
      { region: 'Greece', locale: 'el-GR', nativeName: 'Ελλάδα', flag: '🇬🇷' },
      { region: 'Cyprus', locale: 'el-CY', nativeName: 'Κύπρος', flag: '🇨🇾' },
    ]
  },
  'he': { name: 'Hebrew', nativeName: 'עברית',
    regions: [
      { region: 'Israel', locale: 'he-IL', nativeName: 'ישראל', flag: '🇮🇱' },
    ]
  },
  'hi': { name: 'Hindi', nativeName: 'हिन्दी',
    regions: [
      { region: 'India', locale: 'hi-IN', nativeName: 'भारत', flag: '🇮🇳' },
    ]
  },
  'hu': { name: 'Hungarian', nativeName: 'Magyar',
    regions: [
      { region: 'Hungary', locale: 'hu-HU', nativeName: 'Magyarország', flag: '🇭🇺' },
    ]
  },
  'is': { name: 'Icelandic', nativeName: 'Íslenska',
    regions: [
      { region: 'Iceland', locale: 'is-IS', nativeName: 'Ísland', flag: '🇮🇸' },
    ]
  },
  'id': { name: 'Indonesian', nativeName: 'Bahasa Indonesia',
    regions: [
      { region: 'Indonesia', locale: 'id-ID', nativeName: 'Indonesia', flag: '🇮🇩' },
    ]
  },
  'ga': { name: 'Irish', nativeName: 'Gaeilge',
    regions: [
      { region: 'Ireland', locale: 'ga-IE', nativeName: 'Éire', flag: '🇮🇪' },
    ]
  },
  'mk': { name: 'Macedonian', nativeName: 'Македонски',
    regions: [
      { region: 'North Macedonia', locale: 'mk-MK', nativeName: 'Северна Македонија', flag: '🇲🇰' },
    ]
  },
  'ms': { name: 'Malay', nativeName: 'Bahasa Melayu',
    regions: [
      { region: 'Malaysia', locale: 'ms-MY', nativeName: 'Malaysia', flag: '🇲🇾' },
      { region: 'Brunei', locale: 'ms-BN', nativeName: 'Brunei', flag: '🇧🇳' },
    ]
  },
  'mt': { name: 'Maltese', nativeName: 'Malti',
    regions: [
      { region: 'Malta', locale: 'mt-MT', nativeName: 'Malta', flag: '🇲🇹' },
    ]
  },
  'mn': { name: 'Mongolian', nativeName: 'Монгол',
    regions: [
      { region: 'Mongolia', locale: 'mn-MN', nativeName: 'Монгол Улс', flag: '🇲🇳' },
    ]
  },
  'ne': { name: 'Nepali', nativeName: 'नेपाली',
    regions: [
      { region: 'Nepal', locale: 'ne-NP', nativeName: 'नेपाल', flag: '🇳🇵' },
    ]
  },
  'no': { name: 'Norwegian', nativeName: 'Norsk',
    regions: [
      { region: 'Norway', locale: 'no-NO', nativeName: 'Norge', flag: '🇳🇴' },
    ]
  },
  'fa': { name: 'Persian', nativeName: 'فارسی',
    regions: [
      { region: 'Iran', locale: 'fa-IR', nativeName: 'ایران', flag: '🇮🇷' },
      { region: 'Afghanistan', locale: 'fa-AF', nativeName: 'افغانستان', flag: '🇦🇫' },
    ]
  },
  'pl': { name: 'Polish', nativeName: 'Polski',
    regions: [
      { region: 'Poland', locale: 'pl-PL', nativeName: 'Polska', flag: '🇵🇱' },
    ]
  },
  'pa': { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ',
    regions: [
      { region: 'India', locale: 'pa-IN', nativeName: 'ਭਾਰਤ', flag: '🇮🇳' },
      { region: 'Pakistan', locale: 'pa-PK', nativeName: 'پاکستان', flag: '🇵🇰' },
    ]
  },
  'ro': { name: 'Romanian', nativeName: 'Română',
    regions: [
      { region: 'Romania', locale: 'ro-RO', nativeName: 'România', flag: '🇷🇴' },
      { region: 'Moldova', locale: 'ro-MD', nativeName: 'Moldova', flag: '🇲🇩' },
    ]
  },
  'sr': { name: 'Serbian', nativeName: 'Српски',
    regions: [
      { region: 'Serbia', locale: 'sr-RS', nativeName: 'Србија', flag: '🇷🇸' },
      { region: 'Bosnia and Herzegovina', locale: 'sr-BA', nativeName: 'Босна и Херцеговина', flag: '🇧🇦' },
      { region: 'Montenegro', locale: 'sr-ME', nativeName: 'Црна Гора', flag: '🇲🇪' },
    ]
  },
  'si': { name: 'Sinhala', nativeName: 'සිංහල',
    regions: [
      { region: 'Sri Lanka', locale: 'si-LK', nativeName: 'ශ්‍රී ලංකා', flag: '🇱🇰' },
    ]
  },
  'sk': { name: 'Slovak', nativeName: 'Slovenčina',
    regions: [
      { region: 'Slovakia', locale: 'sk-SK', nativeName: 'Slovensko', flag: '🇸🇰' },
    ]
  },
  'sl': { name: 'Slovenian', nativeName: 'Slovenščina',
    regions: [
      { region: 'Slovenia', locale: 'sl-SI', nativeName: 'Slovenija', flag: '🇸🇮' },
    ]
  },
  'so': { name: 'Somali', nativeName: 'Soomaali',
    regions: [
      { region: 'Somalia', locale: 'so-SO', nativeName: 'Soomaaliya', flag: '🇸🇴' },
    ]
  },
  'sw': { name: 'Swahili', nativeName: 'Kiswahili',
    regions: [
      { region: 'Kenya', locale: 'sw-KE', nativeName: 'Kenya', flag: '🇰🇪' },
      { region: 'Tanzania', locale: 'sw-TZ', nativeName: 'Tanzania', flag: '🇹🇿' },
      { region: 'Uganda', locale: 'sw-UG', nativeName: 'Uganda', flag: '🇺🇬' },
    ]
  },
  'sv': { name: 'Swedish', nativeName: 'Svenska',
    regions: [
      { region: 'Sweden', locale: 'sv-SE', nativeName: 'Sverige', flag: '🇸🇪' },
      { region: 'Finland', locale: 'sv-FI', nativeName: 'Finland', flag: '🇫🇮' },
    ]
  },
  'ta': { name: 'Tamil', nativeName: 'தமிழ்',
    regions: [
      { region: 'India', locale: 'ta-IN', nativeName: 'இந்தியா', flag: '🇮🇳' },
      { region: 'Sri Lanka', locale: 'ta-LK', nativeName: 'இலங்கை', flag: '🇱🇰' },
      { region: 'Singapore', locale: 'ta-SG', nativeName: 'சிங்கப்பூர்', flag: '🇸🇬' },
      { region: 'Malaysia', locale: 'ta-MY', nativeName: 'மலேசியா', flag: '🇲🇾' },
    ]
  },
  'te': { name: 'Telugu', nativeName: 'తెలుగు',
    regions: [
      { region: 'India', locale: 'te-IN', nativeName: 'భారత దేశం', flag: '🇮🇳' },
    ]
  },
  'th': { name: 'Thai', nativeName: 'ไทย',
    regions: [
      { region: 'Thailand', locale: 'th-TH', nativeName: 'ประเทศไทย', flag: '🇹🇭' },
    ]
  },
  'tr': { name: 'Turkish', nativeName: 'Türkçe',
    regions: [
      { region: 'Turkey', locale: 'tr-TR', nativeName: 'Türkiye', flag: '🇹🇷' },
      { region: 'Cyprus', locale: 'tr-CY', nativeName: 'Kıbrıs', flag: '🇨🇾' },
    ]
  },
  'uk': { name: 'Ukrainian', nativeName: 'Українська',
    regions: [
      { region: 'Ukraine', locale: 'uk-UA', nativeName: 'Україна', flag: '🇺🇦' },
    ]
  },
  'ur': { name: 'Urdu', nativeName: 'اردو',
    regions: [
      { region: 'Pakistan', locale: 'ur-PK', nativeName: 'پاکستان', flag: '🇵🇰' },
      { region: 'India', locale: 'ur-IN', nativeName: 'بھارت', flag: '🇮🇳' },
    ]
  },
  'uz': { name: 'Uzbek', nativeName: 'Oʻzbekcha',
    regions: [
      { region: 'Uzbekistan', locale: 'uz-UZ', nativeName: 'Oʻzbekiston', flag: '🇺🇿' },
    ]
  },
  'vi': { name: 'Vietnamese', nativeName: 'Tiếng Việt',
    regions: [
      { region: 'Vietnam', locale: 'vi-VN', nativeName: 'Việt Nam', flag: '🇻🇳' },
    ]
  },
  'cy': { name: 'Welsh', nativeName: 'Cymraeg',
    regions: [
      { region: 'United Kingdom', locale: 'cy-GB', nativeName: 'Deyrnas Unedig', flag: '🇬🇧' },
    ]
  },
  'xh': { name: 'Xhosa', nativeName: 'isiXhosa',
    regions: [
      { region: 'South Africa', locale: 'xh-ZA', nativeName: 'Mzantsi Afrika', flag: '🇿🇦' },
    ]
  },
  'zu': { name: 'Zulu', nativeName: 'isiZulu',
    regions: [
      { region: 'South Africa', locale: 'zu-ZA', nativeName: 'iNingizimu Afrika', flag: '🇿🇦' },
    ]
  },
};
