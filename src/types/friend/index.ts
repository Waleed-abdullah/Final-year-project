export type Friend = {
  warrior_id: string;
  username: string | undefined;
  profile_pic: string | null | undefined;
  status: string | null | undefined;
};

export type friendRequest = {
  id: number;
  requester_id: string | null;
  accepter_id: string | null;
  status: string | null;
  date_connected: Date | null;
  username: string | undefined | null;
  profile_pic: string | null | undefined;
};

export type FriendRequestAction = 'accepted' | 'rejected';
