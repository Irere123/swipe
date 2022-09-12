export const getUserIdOrder = (
  ...uuids: string[]
): { userId1: string; userId2: string } => {
  const [userId1, userId2] = uuids.sort();

  return { userId1, userId2 };
};
