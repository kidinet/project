import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogModule,MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-new-grop-dialog',
  templateUrl: './new-grop-dialog.component.html',
  styleUrls: ['./new-grop-dialog.component.scss']
})
export class NewGropDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
    openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  template: 'kjkjkjkjkj',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
