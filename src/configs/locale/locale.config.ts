import { LocaleDict } from './locale.type';

export const enUSLocale = {
  theme: 'Theme',
  logout: 'Logout',
  sortButtons: 'Sort Buttons',
  changeLanguage: 'Change Language',
  toggleClock: 'Toggle Clock',
  getStarted: 'Get Started',
  xList: '{{ feature }} List',
};

export const idLocale = {
  theme: 'Tema',
  logout: 'Keluar',
  sortButtons: 'Urutkan Tombol',
  changeLanguage: 'Ganti Bahasa',
  toggleClock: 'Toggle Jam',
  getStarted: 'Mulai Sekarang',
  xList: 'Daftar {{ feature }}',
};

export const localeDict: LocaleDict = {
  'en-US': enUSLocale,
  id: idLocale,
};
