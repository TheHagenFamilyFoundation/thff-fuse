import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validate501c3-check',
  templateUrl: './validate501c3-check.component.html',
  styleUrls: ['./validate501c3-check.component.scss'],
})
export class Validate501c3CheckComponent {
  constructor(public dialogRef: MatDialogRef<Validate501c3CheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Validate501c3-check constructor');
  }

  valid() {
    console.log('valid pressed');

    const body = {
      message: '2', // 2 is accepted
    };

    this.dialogRef.close(body);
  }

  needsWork() {
    console.log('needs work pressed');

    const body = {
      message: '3', // 3 is needs changes
    };

    this.dialogRef.close(body);
  }

  cancel() {
    console.log('cancel pressed');
  }
}
