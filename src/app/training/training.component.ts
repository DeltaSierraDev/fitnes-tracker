import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;
  trainSub: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainSub = this.trainingService.excerciseChanged.subscribe(excercise => {
      if (excercise) {
        this.ongoingTraining=true;
      } else {
        this.ongoingTraining=false;
      }
    });
  }

}
