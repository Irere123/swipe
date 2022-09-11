export type BaseUser = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  gender: string;
  birthday: string;
  location: string;
  numlikes: number;
  goal: string;
  lastOnline: string;
  schoolName: string;
  createdAt: string;
};

export type Params = {
  matchId: string;
  username: string;
};
