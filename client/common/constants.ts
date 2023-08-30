import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListIcon from '@mui/icons-material/List';

export const constants = {
  MOCK: {
    CATEGORIES: ['👾 Games', '🎸 Music', '🖥️ Tech', '🍙 Amime', '🎥 Cinema'],
  },
  CATEGORIES: [
    {
      icon: '👾',
      name: 'Games',
    },
    {
      icon: '🎸',
      name: 'Music',
    },
    {
      icon: '🖥️',
      name: 'Tech',
    },
    {
      icon: '🍙',
      name: 'Amime',
    },
    {
      icon: '🎞',
      name: 'Cinema',
    },
    {
      icon: '⌨️',
      name: 'Hardware',
    },
    {
      icon: '🧑‍💻',
      name: 'Software',
    },
  ],
  DEFAULT_AMOUNT: 5,
  MENU_ITEMS: [
    {
      icon: WhatshotIcon,
      name: 'Popular',
    },
    {
      icon: AccessTimeIcon,
      name: 'Fresh',
    },
    {
      icon: ListIcon,
      name: 'Subscriptions',
    },
  ],
};
