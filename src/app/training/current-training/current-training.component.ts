import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  devider = 0;
  repeats = 0;
  timer!: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.devider = Math.round(this.trainingService.getRunningExcercise().duration);
    this.repeats = Math.round(100 / this.devider);
    this.startResumeTimer();
  }

  startResumeTimer(){
    this.timer = window.setInterval(() => {
      this.progress = this.progress + this.repeats;
      if (this.progress >= 100) {
        this.trainingService.finishExcercise();
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onPause(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress, repeats: this.repeats}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExcercise(this.progress / this.repeats);
      } else
      this.startResumeTimer();
    });
  }

  onSkip(){}

  onCancel(){}
}
