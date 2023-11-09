import { Component, Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  constructor(private dialog:MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any){

  }
  onYesClick(){
    this.dialog.close(0);

  }
  onNoClick(){
    this.dialog.close(1);
  }
}
