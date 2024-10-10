import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import LocalStorageBackend from 'i18next-localstorage-backend';
import Backend from 'i18next-http-backend';
import { format as formatDate } from 'date-fns';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(LocalStorageBackend)
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (value instanceof Date) {
          // @ts-ignore
          return formatDate(value, format || 'P', { locale: lng });
        }

        if (typeof value === 'number') {
          const options: Intl.NumberFormatOptions = {};

          // Currency formatting
          if (format?.startsWith('currency')) {
            const currency = format.split(',')[1] || 'EUR'; // Default to USD if no currency is provided
            options.style = 'currency';
            options.currency = currency;
          }

          // Percentage formatting
          if (format === 'percent') {
            options.style = 'percent';
            options.minimumFractionDigits = 2;
          }

          // General number formatting
          return new Intl.NumberFormat(lng, options).format(value);
        }

        return value;
      },
    },
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
