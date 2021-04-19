import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  title = "Fitness Tracker Elite"
  isAuth = false;
  authSub: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
