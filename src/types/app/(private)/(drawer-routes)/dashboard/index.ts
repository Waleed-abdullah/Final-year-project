export interface User {
  email: string;
  name: string | null;
  profile_pic: string | null;
  username: string;
  age: number;
  gender: string;
}

export interface Warrior {
  warrior_id: string;
  users: User | null;
}
