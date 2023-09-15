import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListIcon from '@mui/icons-material/List';

import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

export const constants = {
  CATEGORIES: [
    {
      icon: '👾',
      key: 'games',
      backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
    },
    {
      icon: '🎸',
      key: 'music',
      backgroundUrl: 'https://i.redd.it/smmnm77n9c501.gif',
    },
    {
      icon: '🖥️',
      key: 'tech',
      backgroundUrl:
        'https://steamuserimages-a.akamaihd.net/ugc/2438013375536940927/D370DBF7BFC83ED36F783F08A598FFF3E71A1D61/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    },
    {
      icon: '🍙',
      key: 'anime',
      backgroundUrl:
        'https://animesher.com/orig/2/206/2066/20664/animesher.com_pixel-pixel-gif-gif-2066449.gif',
    },
    {
      icon: '🎞',
      key: 'cinema',
      backgroundUrl:
        'https://jan-schlosser.de/wp-content/uploads/z_Pixel-Art-Star-Wars-Animation.gif',
    },
    {
      icon: '🧑‍💻',
      key: 'software',
      backgroundUrl: 'https://i.pinimg.com/originals/77/ca/a3/77caa32884d735d439ade45ba37feaf2.gif',
    },
  ],
  DEFAULT_AMOUNT: 4,
  MENU_ITEMS: [
    {
      icon: WhatshotIcon,
      key: 'popular',
      protectedItem: false,
    },
    {
      icon: AccessTimeIcon,
      key: 'fresh',
      protectedItem: false,
    },
    {
      icon: ListIcon,
      key: 'subscriptions',
      protectedItem: false,
    },
    {
      icon: FolderSpecialIcon,
      key: 'saved',
      protectedItem: true,
    },
  ],
  FILTERS_TIME: [
    {
      key: 'today',
    },
    {
      key: 'week',
    },
    {
      key: 'month',
    },
    {
      key: 'year',
    },
    {
      key: 'allTime',
    },
  ],
  FILTERS_RATING: [
    {
      key: 'from-10',
    },
    {
      key: 'from5',
    },
    {
      key: 'from10',
    },
    {
      key: 'all',
    },
  ],
  FILTERS_TAG: [{ key: 'best' }, { key: 'fresh' }, { key: 'old' }],
  FILTERS_SEARCH: [
    { key: 'all' },
    { key: 'users' },
    { key: 'games' },
    { key: 'music' },
    { key: 'tech' },
    { key: 'anime' },
    { key: 'cinema' },
    { key: 'software' },
  ],
  FILTERS_SAVED: [
    { key: 'all' },
    { key: 'games' },
    { key: 'music' },
    { key: 'tech' },
    { key: 'anime' },
    { key: 'cinema' },
    { key: 'software' },
  ],
  CATEGORY_TABS: ['posts', 'subscribers', 'rules'],
  USER_TABS: ['posts', 'subscribers', 'subscriptions'],
};
