import { Component, OnInit } from '@angular/core';
import * as appGlobalsService from '../../../store/app-globals';
import {FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-send-reminder',
    templateUrl: './send-reminder.component.html',
    styleUrls: ['./send-reminder.component.scss']
})

export class SendReminderComponent implements OnInit {
    // form declare:

    newReminderContent = new FormControl('')
    newReminderaForm = this.builder.group({
        newReminderContent: this.newReminderContent
    });
    selectedUsers = {};
    constructor(private builder: FormBuilder) { }

    sendReminder() {
        console.log(this.newReminderaForm.value);
    }

    ngOnInit() {
    }
    // ===========pipes=============
    get usersInCurrentGroup() {
        return appGlobalsService.usersInCurrentGroup
    }
    get isSomeoneChecked() {
        for (var key in this.selectedUsers)
            if (this.selectedUsers[key]) {
                return true;
            }
        return false
    }
}
