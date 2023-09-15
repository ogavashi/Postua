import { constants } from '@/common';
import { Base } from '.';
import {
  LoginRequest,
  PostItem,
  RegisterRequest,
  SearchResults,
  ShortPostItem,
  Tag,
  UserResponse,
} from '@/types';

const mockUser = {
  email: 'user@email.com',
  fullName: 'Full Name',
  id: '1337',
  backgroundUrl: 'https://media.tenor.com/6LyXLgF8ksUAAAAd/anime-gif.gif',
  avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
  token: 'testtokenPostua',
};

const tags: Tag[] = [
  {
    key: 'games',
  },
  {
    key: 'news',
  },
];

const body = {
  time: 1550476186479,
  blocks: [
    {
      id: 'K7aUIFhw72',
      type: 'paragraph',
      data: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Hendrerit gravida rutrum quisque non tellus orci ac. Mauris a diam maecenas sed enim ut sem viverra. Eget aliquet nibh praesent tristique magna sit. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ipsum faucibus vitae aliquet nec ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada. Risus commodo viverra maecenas accumsan lacus. A diam maecenas sed enim ut. Tincidunt dui ut ornare lectus sit amet est placerat. Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Dictumst vestibulum rhoncus est pellentesque.',
      },
    },
    {
      id: 'FhNjQ-FbDB',
      type: 'image',
      data: {
        url: 'https://www.centralxbox.com.br/wp-content/uploads/2022/11/Starfield.jpeg',
        caption: 'Nice!!!!',
        withBorder: true,
        withBackground: true,
        stretched: false,
      },
    },
    {
      id: 'K7aUIasdFhw72',
      type: 'paragraph',
      data: {
        text: 'Urna molestie at elementum eu facilisis. Nunc vel risus commodo viverra. Tristique et egestas quis ipsum. Dui faucibus in ornare quam viverra orci. Nunc sed augue lacus viverra. Sit amet nisl purus in mollis nunc sed id. Fusce id velit ut tortor pretium. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Cras ornare arcu dui vivamus arcu. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Facilisi etiam dignissim diam quis enim. Velit laoreet id donec ultrices tincidunt arcu. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui.',
      },
    },
  ],
  version: '2.8.1',
};

const user = {
  id: '123123',
  email: 'email@example',
  fullName: 'Full Name',
  avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
  type: 'user',
};

const user2 = {
  id: '123123',
  email: 'email@example',
  fullName: 'Test User',
  avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
  type: 'user',
};

const postStats = {
  id: '123123',
  likes: 123,
  dislikes: 2,
  comments: 12,
  views: 213324,
  visitings: 320000,
};

const post: PostItem = {
  id: '123',
  title: 'Post title 1. This is post tile 1.',
  body: body,
  user: user,
  stats: postStats,
  tags: tags,
  image: 'https://gagadget.com/media/post_big/rhtjf.jpg',
  category: {
    icon: '👾',
    key: 'games',
    backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
  },
};

const shortPosts = [
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
    type: 'post',
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
    type: 'post',
  },
  {
    id: '125',
    title:
      'Post title 3. This is post tile 3. Post title 3. This is post tile 3. Post title 3. This is post tile 3. Post title 3. This is post tile 3.',
    image: 'https://i.ytimg.com/vi/JldMvQMO_5U/maxresdefault.jpg',
    description: 'This is awesome post description. This is also awesome post description.',
    stats: postStats,
    user: user,
    category: {
      icon: '👾',
      key: 'games',
      backgroundUrl: 'https://wallpaperaccess.com/full/5927911.gif',
    },
    type: 'post',
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
    type: 'post',
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
    type: 'post',
  },
];

export class Search extends Base {
  async search(searchValue: string): Promise<SearchResults | null> {
    // const { data } = await this.apiClient.instance.post<LoginRequest, { data: UserResponse }>(
    //   '/auth/login',
    //   dto
    // );

    // return data;

    return [
      ...shortPosts,
      user,
      user2,
      ...constants.CATEGORIES.map((el) => ({ ...el, type: 'category' })),
    ] as SearchResults;
  }
}
