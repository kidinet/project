import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Group} from '../../../../entities/group';
import {UserInGroup} from '../../../../entities/user/UserInGroup';


@Component({
  selector: 'app-choose-group',
  templateUrl: './choose-group.component.html',
  styleUrls: ['./choose-group.component.scss']
})
export class ChooseGroupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChooseGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  groups = [
    {
      group: new Group(123, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
        '03-5555555', 32.090606, 34.825582),
      user: new UserInGroup('משה', 'כהן')
    },
    {
      group: new Group(123, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
        '03-5555555', 32.090606, 34.825582),
      user: new UserInGroup('משה', 'כהן')
    },
    {
      group: new Group(123, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
        '03-5555555', 32.090606, 34.825582),
      user: new UserInGroup('משה', 'כהן')
    }
  ]
  ngOnInit() {
    console.log(this.groups)
  }

}
