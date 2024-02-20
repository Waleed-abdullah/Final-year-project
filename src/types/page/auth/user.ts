export type User = {
  username: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  password?: string;
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
export enum GenderType {
  Male = 'Male',
  Female = 'Female',
}
