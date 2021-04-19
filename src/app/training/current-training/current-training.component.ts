import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  devider = 4;
  repeats = 100 / this.devider;
  timer!: number;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startResumeTimer();
  }

  startResumeTimer(){
    this.timer = window.setInterval(() => {
      this.progress = this.progress + this.repeats;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onPause(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress, repeats: this.repeats}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else
      this.startResumeTimer();
    });
  }

  onSkip(){}

  onCancel(){}
}
