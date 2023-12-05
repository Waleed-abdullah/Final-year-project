export type User = {
  username: string;
  email: string;
  password?: string | null;
  user_type: string;
  provider: string;
  is_verified: boolean;
  profile_pic?: string;
  date_joined?: Date;
  last_login?: Date;
  created_at?: Date;
  updated_at?: Date;
};

// User types as an Enum
export enum UserType {
  WazaWarrior = 'Waza Warrior',
  WazaTrainer = 'Waza Trainer',
}
