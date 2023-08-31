const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['ua', 'en'],
    defaultLocale: 'ua',
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
};
