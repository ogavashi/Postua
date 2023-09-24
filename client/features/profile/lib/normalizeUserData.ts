import { UpdateUserDtoRequest, UserForm } from '@/types';

export const normalizeUserData = (userData: UserForm): UpdateUserDtoRequest => {
  const updateUserDto = {
    fullName: userData.fullName,
    backgroundUrl: userData.backgroundUrl,
    avatarUrl: userData.avatarUrl,
    password: userData.password,
  };

  const normalized = Object.fromEntries(
    Object.entries(updateUserDto).filter(([key, value]) => {
      if (key === 'password' || key === 'fullName') {
        return value;
      }
      return true;
    })
  );

  return normalized;
};
