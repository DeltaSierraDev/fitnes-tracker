export interface Excercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  repetitions?: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null
}
