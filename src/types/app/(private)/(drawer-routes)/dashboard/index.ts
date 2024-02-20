export interface User {
  email: string;
  name: string | null;
  profile_pic: string | null;
  username: string;
  age: number | null;
  gender: string | null;
}

export interface Warrior {
  warrior_id: string;
  caloric_goal: number | null;
  users: User | null;
}
