import { Subject, Subscription } from "rxjs";
import { Excercise } from "./excercise.model";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class TrainingService {

  private availableExcercises: Excercise[] = [];
  private runningExcercise: Excercise;
  private fbSubs: Subscription[] = [];

  excerciseChanged = new Subject<Excercise>();
  excercisesChanged = new Subject<Excercise[]>();
  finishedExcercisesChanged = new Subject<Excercise[]>();

  constructor(private db: AngularFirestore){}

  getAvailableExcercises() {
    this.fbSubs.push(this.db.collection('availableExcercises').snapshotChanges()
    .pipe(map(result => {
      return result.map( res => {
        const data: any = res.payload.doc.data();
        return {
          id: res.payload.doc.id,
          ...(res.payload.doc.data() as Excercise)
        };
     })
    })).subscribe((result: Excercise[]) => {
      this.availableExcercises = result;
      this.excercisesChanged.next([...this.availableExcercises])
    }));
  }

  getCompletedorCancelledExcercises(){
    this.fbSubs.push(this.db.collection('finishedExcercises').valueChanges().subscribe((result: Excercise[]) => {
      console.log(result);
      this.finishedExcercisesChanged.next(result);
    }));
  }

  getRunningExcercise(){
    return {...this.runningExcercise};
  }

  startExcercise(selectedId: string) {
    this.runningExcercise = this.availableExcercises.find(ex => ex.id === selectedId);
    this.excerciseChanged.next({...this.runningExcercise});
  }

  finishExcercise(){
    this.addDataToDatabase({...this.runningExcercise, date: new Date(), state: 'completed'});
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number){
    this.addDataToDatabase({...this.runningExcercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100)
    });
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  private addDataToDatabase(excercise: Excercise){
    this.db.collection('finishedExcercises').add(excercise);
  }

  cancelSubs(){
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

}
