import { OutputData } from '@editorjs/editorjs';
import { DataProp } from 'editorjs-blocks-react-renderer';
import { type } from 'os';

export type Theme = 'light' | 'dark' | 'auto';

export type Language = 'en' | 'ua';

export type CategoryItem = {
  icon: string;
  name: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  fullName: string;
  password: string;
};

export type UserData = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  backgroundUrl: string;
  memberFrom: string;
};

export type UserResponse = {
  user: UserData;
  token: string;
};

export type UpdateUserDtoRequest = {
  fullName?: string;
  backgroundUrl?: string;
  avatarUrl?: string;
  password?: string;
};

export type UserForm = {
  fullName?: string;
  backgroundUrl?: string;
  avatarUrl?: string;
  password?: string;
  confirmPassword?: string;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  role: { id: number; name: string };
};

export type PostStats = {
  id: string;
  likes: number;
  dislikes: number;
  comments: number;
  views: number;
  visitings: number;
};

export type Tag = {
  key: string;
};

export type Category = {
  icon: string;
  key: string;
  backgroundUrl: string;
};

export type PostItem = {
  id: string;
  title: string;
  body: DataProp;
  user: User;
  stats: PostStats;
  tags: string[];
  image?: string;
  category: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  isSaved?: boolean;
  isSubscribed?: boolean;
  createdAt: string;
};

export type CategoryPostProps = {
  pageProps: {
    post: PostItem;
  };
};

export type PageOptions = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

type SearchResultType = 'post' | 'user' | 'category';

export type SearchResult = (User | PostItem | Category) & { type: SearchResultType };

export type SearchResults = SearchResult[];

export type ServerError = { [key in string]: [string] | string | number };

export type ParsedError = { message: string } | { [key in string]: string | number };

export type PageOptionsDto = {
  take: number;
  page: number;
  order: string;
};
