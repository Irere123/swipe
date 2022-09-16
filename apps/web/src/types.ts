export type BaseUser = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  gender: string;
  birthday: string;
  location: string;
  numLikes: number;
  goal: string;
  online: boolean;
  hasLoggedIn: boolean;
  lastOnline: string;
  schoolName: string;
  createdAt: string;
};

export type Params = {
  userId: string;
  matchId: string;
  username: string;
};

export type Match = {
  matchId: string;
  userId: string;
  avatarUrl: string;
  online: boolean;
  lastOnline: boolean;
  displayName: string;
  createdAt: string;
  message: string | null;
};

export type MatchesResponse = {
  matches: Match[];
};

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: number;
}

export type WebsocketMessages =
  | { type: "new-message"; message: Message }
  | { type: "unmatch"; userId: string }
  | { type: "new-match"; userId1: string; userId2: string }
  | { type: "new-like" };
