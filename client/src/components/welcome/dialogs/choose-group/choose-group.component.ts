import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Group} from '../../../../entities/group';
import {UserInGroup} from '../../../../entities/user/UserInGroup';
import {User} from '../../../../entities/user/user';


@Component({
    selector: 'app-choose-group',
    templateUrl: './choose-group.component.html',
    styleUrls: ['./choose-group.component.scss']
})
export class ChooseGroupComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ChooseGroupComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    selectedGroup = -1;
    currentUser = new User('חיים', 'לוי', 'הרב בלוי', 'בני ברק', 14, '0504109999', 'g0504108132@gmail.com', null, null, 32.088000, 34.827906)
    groups = [
        {
            group: new Group(143, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
                '03-5555555', 32.090606, 34.825582),
            user: new UserInGroup('משה', 'כהן')
        },
        {
            group: new Group(173, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
                '03-5555555', 32.090606, 34.825582),
            user: new UserInGroup('משה', 'כהן')
        },
        {
            group: new Group(123, 'הגן שלנו', 'בני ברק', 'רבי עקיבא', 12, '0606660000', 'g0504108130@gmail.com',
                '03-5555555', 32.090606, 34.825582),
            user: new UserInGroup('משה', 'כהן')
        }
    ]
    @Output() setCurrentGroup: EventEmitter<number> = new EventEmitter();

    ngOnInit() {

    }

    chooseGroup() {
        this.setCurrentGroup.emit(this.selectedGroup)
        this.dialogRef.close();
    }

}
