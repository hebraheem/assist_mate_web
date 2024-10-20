import i18next, { Callback } from 'i18next';
import { useTranslation } from 'react-i18next';
import countries from '../languages/countries.json';
import { ICountryInfo } from '../../@types/utils';
import { enUS, fr, de, ja, Locale } from 'date-fns/locale';
import { format as formatDate } from 'date-fns';

const localeMap: { [key: string]: Locale } = {
  'en-US': enUS,
  'fr-FR': fr,
  'de-DE': de,
  'ja-JP': ja,
};

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const msg = (key: string, options?: any): any => t(key, options);

  const num = (value: number, format: 'percent' | 'number' = 'number') => {
    if (format === 'percent') {
      return new Intl.NumberFormat(i18n.language, {
        style: 'percent',
        minimumFractionDigits: 2,
      }).format(value);
    }

    // General number formatting
    return new Intl.NumberFormat(i18n.language).format(value);
  };

  const dateFn = (value: Date, format = 'P') => {
    // @ts-ignore
    return formatDate(value, format, { locale: localeMap[i18n.language] });
  };

  const cur = (value: number, currency = getLocaleInfo().currency?.code) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
    }).format(value);
  };

  const updateLocale = (newLocale: string, cb?: Callback) => {
    i18next.changeLanguage(newLocale, () => {
      if (cb) cb;
    });
  };

  const getLocaleInfo = (): ICountryInfo => {
    const currentLanguage = i18n.language as string;
    // @ts-ignore
    return { ...countries[currentLanguage], code: currentLanguage };
  };

  return {
    msg,
    num,
    dateFn,
    cur,
    updateLocale,
    getLocaleInfo,
  };
};
