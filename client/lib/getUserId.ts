export const getUserId = (userId: string | string[] | undefined) => {
  if (!userId) {
    return;
  }

  return userId as unknown as number;
};
