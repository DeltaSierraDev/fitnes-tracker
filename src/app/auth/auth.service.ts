import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
  private isAuth = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router, private afa: AngularFireAuth, private trainingService: TrainingService){}

  registerUser(authData: AuthData){
    this.afa.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      this.isAuth = true;
    })
    .catch(result => {
      console.log(result);
    });
  }

  login(authData: AuthData){
    this.afa.signInWithEmailAndPassword(authData.email,authData.password);
  }

  logout(){
    this.afa.signOut();
  }

  isAuthenticated(){
    return this.isAuth;
  }

  initAuthListener(){
    this.afa.authState.subscribe(user => {
      if (user) {
        this.isAuth = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubs();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuth = false;
      }
    });
  }
}
