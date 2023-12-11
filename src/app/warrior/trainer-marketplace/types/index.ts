export type TrainerSpecialization = {
  specializations: {
    specialization_name: string;
  };
};

export type User = {
  name: string;
  profile_pic: string;
  age: number;
  gender: string;
};

export type Trainer = {
  trainer_id: string;
  hourly_rate: number;
  bio: string;
  location: string;
  experience: number;
  users: User;
  trainer_specializations: TrainerSpecialization[];
};

export type TrainerFilters = {
  specialization?: string;
  location?: string;
  gender?: string;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  ageMin?: number;
  ageMax?: number;
  experienceMin?: number;
  experienceMax?: number;
};
