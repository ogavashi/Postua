import { Base } from '.';
import {
  LoginRequest,
  PostResponse,
  RegisterRequest,
  ShortPostResponse,
  Tag,
  UserResponse,
} from '@/types';

const tags: Tag[] = [
  {
    key: 'games',
  },
  {
    key: 'games',
  },
];

const blocks = [
  {
    id: 'K7aUIFhw72',
    type: 'paragraph',
    data: {
      text: 'Lorem ipsum.',
    },
  },
  {
    id: 'FhNjQ-FbDB',
    type: 'image',
    data: {
      url: 'https://www.centralxbox.com.br/wp-content/uploads/2022/11/Starfield.jpeg',
      caption: 'Nice!!!!',
      withBorder: false,
      withBackground: false,
      stretched: false,
    },
  },
];

const user = {
  id: '123123',
  email: 'email@example',
  fullName: 'Full Name',
  avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
};

const postStats = {
  id: '123123',
  likes: 123,
  dislikes: 2,
  comments: 12,
  views: 123,
  visitings: 32,
};

const post: PostResponse = {
  id: '123',
  title: 'Post title 1. This is post tile 1.',
  body: blocks,
  user: user,
  stats: postStats,
  tags: tags,
};

const shortPosts: ShortPostResponse[] = [
  {
    id: '123',
    title: 'Post title 1. This is post tile 1.',
    image:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/capsule_616x353.jpg?t=1688115070',
    description: 'This is awesome post description. This is also awesome post description.',
    stats: postStats,
    user: user,
    category: {
      icon: '👾',
      key: 'games',
      backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
    },
  },
  {
    id: '124',
    title: 'Post title 2. This is post tile 2.',
    image: 'https://gagadget.com/media/post_big/rhtjf.jpg',
    description: 'This is awesome post description. This is also awesome post description.',
    stats: postStats,
    user: user,
    category: {
      icon: '👾',
      key: 'games',
      backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
    },
  },
  {
    id: '125',
    title: 'Post title 3. This is post tile 3.',
    image: 'https://i.ytimg.com/vi/JldMvQMO_5U/maxresdefault.jpg',
    description: 'This is awesome post description. This is also awesome post description.',
    stats: postStats,
    user: user,
    category: {
      icon: '👾',
      key: 'games',
      backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
    },
  },
  {
    id: '126',
    title: 'Post title 4. This is post tile 4.',
    image: 'https://i.ytimg.com/vi/Rr0v0lGde2o/maxresdefault.jpg',
    description: 'This is awesome post description. This is also awesome post description.',
    stats: postStats,
    user: user,
    category: {
      icon: '👾',
      key: 'games',
      backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
    },
  },
  {
    id: '127',
    title: 'Post title 5. This is post tile 5.',
    image: 'https://www.centralxbox.com.br/wp-content/uploads/2022/11/Starfield.jpeg',
    description: 'This is awesome post description. This is also awesome post description.',
    stats: postStats,
    user: user,
    category: {
      icon: '👾',
      key: 'games',
      backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
    },
  },
];

export class Post extends Base {
  async getAll() {
    const data = shortPosts;

    return data;
  }

  async getOne(id: number) {
    return post;
  }
}
