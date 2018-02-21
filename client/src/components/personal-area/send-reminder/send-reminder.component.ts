import {Component, OnInit} from '@angular/core';
import * as appGlobalsService from '../../../store/app-globals';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {Reminder} from '../../../entities/reminder/reminder';
import {User} from '../../../entities/user/user';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';

@Component({
    selector: 'app-send-reminder',
    templateUrl: './send-reminder.component.html',
    styleUrls: ['./send-reminder.component.scss']
})

export class SendReminderComponent implements OnInit {
    // database:
    path: string;
    items: FirebaseListObservable<Reminder[]>;
    limitToLast = 10;
    // form declare:
    newReminderContent = new FormControl('')
    newReminderaForm = this.builder.group({
        newReminderContent: this.newReminderContent
    });
    selectedUsers = {};

    constructor(private builder: FormBuilder,
                public af: AngularFireDatabase,
                public dialogRef: MatDialogRef<SendReminderComponent>) {
    }

    sendReminder() {
        for (var key in this.selectedUsers) {
            this.path = `${appGlobalsService.currentGroup.groupId}/${key.replace('@', 'A').replace('.', 'B')}/reminders`;
            this.af.list(this.path).push(new Reminder(this.newReminderContent.value, new Date().toString(), false));
            this.dialogRef.close();
        }
    }

    ngOnInit() {
        // put the chat message on database;

    }

    // ===========pipes=============
    get usersInCurrentGroup() {
        return appGlobalsService.usersInCurrentGroup;
    }

    get isSomeoneChecked() {
        for (let key in this.selectedUsers)
            if (this.selectedUsers[key]) {
                return true;
            }
        return false;
    }
}
