const host = 'https://md.exchangerbee.com';
const apiPath = '/graphql';

const tFun = (key) => key;

const getTranslatedConfig = (t = tFun) => ({
  siteName: 'exchangerbee.com',
  siteGtagId: null,
  siteGads: false,
  siteGdpr: false,
  siteMenu: [
    { url: '/converter', label: t('Convertor valutar') },
    { url: '/banks', label: t('Cursul la bănci') },
    { url: '/currencies', label: t('Lista valute') },
    { url: '/countries', label: t('Lista ţărilor') },
  ],
  adminMenu: [
    { url: '/admin/banks', label: t('Banks') },
    { url: '/admin/parsers', label: t('Parsers') },
    { url: '/admin/quotes', label: t('Quotes') },
    { url: '/admin/posts', label: t('Posts') },
  ],
  apiBaseUrl: `${host}${apiPath}`,
  storagePath: '/space',
  locale: 'ro',
  utcOffset: 120, // 'Europe/Chisinau'
  baseCountry: {
    slug: t('md'),
    name: t('Moldova'),
    flag: '🇲🇩',
  },
  baseCurrency: {
    slug: 'mdl',
    name: t('Leul moldovenesc'),
    numCode: '498',
    symbol: t('lei'),
    bid: '1',
    ask: '1',
  },
  centralBank: {
    name: t('Banca Naţională a Moldovei'),
    slug: t('bnm'),
  },
  baseCurrenciesArr: ['usd', 'eur', 'ron', 'rub', 'uah'],
  countries: [
    { slug: 'md', name: t('Moldova') },
    { slug: 'ro', name: t('România') },
    { slug: 'ru', name: t('Rusia') },
    { slug: 'ua', name: t('Ucraina') },
  ],
  apiPath,
  host,
});

module.exports = getTranslatedConfig();
module.exports.getTranslatedConfig = getTranslatedConfig;
