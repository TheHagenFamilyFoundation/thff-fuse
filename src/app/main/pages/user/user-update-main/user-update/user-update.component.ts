import { Component, OnInit, Input } from '@angular/core';

import { UpdateUserService } from '../../../../../services/user/update-user.service';

// debounce
import { Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged,
} from 'rxjs/operators';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  @Input()
  user: any;

  updatedUser: any;

  newFirstName$ = new Subject<string>();

  newLastName$ = new Subject<string>();

  firstName: string;

  newFirstName: string;

  lastName: string;

  newLastName: string;

  fN: string;

  lN: string;

  ValidFirstName: any;

  ValidLastName: any;

  ValidFN: any;

  CanUpdateName = false;

  results: any;

  ShowMessage = false;

  message: any;

  constructor(public updateUserService: UpdateUserService) {
    this.newFirstName$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    )
      .subscribe((term) => {
        this.newFirstName = term;
        this.firstNameChange();
      });

    this.newLastName$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    )
      .subscribe((term) => {
        this.newLastName = term;
        this.lastNameChange();
      });
  }

  ngOnInit() {
    this.defaultValues();

    console.log('user-update: user', this.user);

    if (this.user.firstName) {
      this.firstName = this.user.firstName;
    }

    if (this.user.lastName) {
      this.lastName = this.user.lastName;
    }
  }

  defaultValues() {
    this.lastName = '';
    this.firstName = '';
  }

  updateName() {
    console.log('updateName pressed');

    const data = {
      firstName: this.newFirstName,
      lastName: this.newLastName,
      id: this.user.id,
    };

    this.ValidFN = this.updateUserService.updateName(data)
      .subscribe(
        (response) => {
          this.results = response;

          this.CanUpdateName = false;

          this.updatedUser = JSON.parse(localStorage.getItem('currentUser'));

          this.updatedUser.firstName = this.newFirstName;
          this.updatedUser.lastName = this.newLastName;

          this.firstName = this.newFirstName;
          this.lastName = this.newLastName;

          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(this.updatedUser));

          this.newFirstName = '';
          this.newLastName = '';

          if (this.results.change) {
            console.log('success');

            // output success message
            this.message = this.results.message;
            this.ShowMessage = true;

            setTimeout(() => {
              this.clearMessage();
            }, 3000);
          } else {
            console.log('fail');

            // output fail message
            this.message = 'Name Change was unsuccessful. Try Again.';
            this.ShowMessage = true;
          }
        },
      );
  }

  clearMessage() {
    this.message = '';

    this.ShowMessage = false;
  }

  firstNameChange() {
    console.log('firstName change');

    if (this.newFirstName) {
      this.ValidFirstName = true;
      this.verifyInput();
    } else {
      this.CanUpdateName = false;
    }
  }

  lastNameChange() {
    console.log('lastName change');

    if (this.newLastName) {
      this.ValidLastName = true;

      this.verifyInput();
    } else {
      // can't change if blank
      this.CanUpdateName = false;
    }
  }

  verifyInput() {
    console.log('verifyInput');

    if (this.ValidFirstName && this.ValidLastName) {
      this.CanUpdateName = true;
    } else {
      this.CanUpdateName = false;
    }
  }
}
