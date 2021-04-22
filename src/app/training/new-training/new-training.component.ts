import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  excercises: Excercise[];
  exSub: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exSub = this.trainingService.excercisesChanged.subscribe(
      excercieses => this.excercises = excercieses
    );
    this.trainingService.getAvailableExcercises();
  }

  ngOnDestroy(){
    this.exSub.unsubscribe();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExcercise(form.value.excercise);
  }

}
