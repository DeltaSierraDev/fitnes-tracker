import { Subject } from "rxjs";
import { Excercise } from "./excercise.model";

export class TrainingService {
  private availableExcercises: Excercise[] = [
    { id: 'pushups', name: 'Push ups', duration: 12, calories: 10 },
    { id: 'pullups', name: 'Pull ups', duration: 10, calories: 8 },
    { id: 'situps', name: 'Sit ups', duration: 16, calories: 12 },
    { id: 'jumpingjacks', name: 'Jumping jacks', duration: 60, calories: 16 }
  ];

  runningExcercise: Excercise;
  excercises: Excercise[] = [];
  excerciseChanged = new Subject<Excercise>();

  getAvailableExcercises() {
    return this.availableExcercises.slice();
  }

  getCompletedorCancelledExcercises(){
    return this.excercises.slice();
  }

  getRunningExcercise(){
    return {...this.runningExcercise};
  }

  startExcercise(selectedId: string) {
    this.runningExcercise = this.availableExcercises.find(ex => ex.id === selectedId);
    this.excerciseChanged.next({...this.runningExcercise});
  }

  finishExcercise(){
    this.excercises.push({...this.runningExcercise, date: new Date(), state: 'completed'});
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number){
    this.excercises.push({...this.runningExcercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100)
    });
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

}
