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
                    this.groups=data.groups;
                    this.currentUser=data.user
    }

    selectedGroup = -1;
    currentUser: User;
    groups = [];
       
    @Output() setCurrentGroup: EventEmitter<number> = new EventEmitter();

    ngOnInit() {

    }

    chooseGroup() {
        this.setCurrentGroup.emit(this.selectedGroup)
        this.dialogRef.close();
    }

}
