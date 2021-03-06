import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  // private isDirector = new BehaviorSubject(false); //initialize to false
  // currentIsDirector = this.isDirector.asObservable();

  currentUser: any;

  accessLevel: number;

  constructor() { }

  // changeMessage(isDir: boolean) {
  //   this.isDirector.next(isDir)
  // }

  isDirector() {
    if (localStorage.getItem('currentUser')) {
      // console.log('JSON.parse(localStorage.getItem(\'currentUser\')', JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.accessLevel = this.currentUser.user.accessLevel;

      if (this.accessLevel >= 2) {
        return true;
      }

      return false;
    }

    return false;
  }
}
