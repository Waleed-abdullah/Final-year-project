export interface ExerciseLog {
  log_id: string;
  exercise_id: string;
  weight: number | null;
  achieved_reps: number | null;
}

// Define the Exercise type, including an array of Exercise Logs
export interface Exercise {
  exercise_id: string;
  title: string;
  muscle_group: string;
  weight: number | null;
  sets: number;
  reps: number;
  exercise_log: ExerciseLog[]; // Array of Exercise Logs
}

// Define the Session type, including an array of Exercises
export interface Session {
  session_id: string;
  warrior_id: string;
  scheduled_date: Date;
  exercise: Exercise[]; // Array of Exercises
}

export interface Template {
  template_id: string;
  warrior_id: string;
  title: string;
}
