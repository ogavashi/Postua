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

export type UserResponse = {
  email: string;
  fullName: string;
  id: string;
  backgroundUrl: string;
  avatarUrl: string;
  token: string;
};
