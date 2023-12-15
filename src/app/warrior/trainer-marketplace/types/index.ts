export type TrainerSpecialization = {
  specializations: {
    specialization_name: string;
  };
};

export type User = {
  user_id: string;
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
export type DetailedTrainer = {
  trainer_id: number;
  hourly_rate: number;
  bio: string;
  location: string;
  experience: number;
  users: {
    user_id: number;
    name: string;
    profile_pic: string;
    age: number;
    gender: string;
  };
  trainer_specializations: {
    specializations: {
      specialization_name: string;
    };
  }[];
  trainer_certifications: {
    certifications: {
      certification_name: string;
    }[];
  }[];
  reviews: {
    review_id: number;
    rating: number;
    comment: string;
    waza_warriors: {
      users: {
        name: string;
        profile_pic: string;
      }[];
    }[];
  }[];
  availability: {
    availability_id: number;
    start_time: string; // Assuming time is stored as string
    end_time: string; // Adjust the type based on your actual data format
    weekday: string;
  }[];
};
