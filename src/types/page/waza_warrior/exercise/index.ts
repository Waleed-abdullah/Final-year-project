export interface ExerciseRequestBody {
  title: string;
  muscle_group: string;
  weight: number;
  sets: number;
  reps: number;
  session_id: string;
}
