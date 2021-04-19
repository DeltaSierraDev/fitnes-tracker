import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  title = "Fitness Tracker Elite"

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
}
