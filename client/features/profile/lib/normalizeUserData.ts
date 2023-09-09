import { UserDto } from '@/features/user';

export const normalizeUserData = (userData: UserDto) => ({
  fullName: userData.fullName,
});
