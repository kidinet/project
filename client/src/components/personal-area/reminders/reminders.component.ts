import {Component, OnInit} from '@angular/core';
import {Reminder} from '../../../entities/reminder/reminder';
import * as appGlobalsService from '../../../store/app-globals';
import * as moment from 'moment';
moment.locale('he');
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';
@Component({
    selector: 'app-reminders',
    templateUrl: './reminders.component.html',
    styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {

    constructor(public af: AngularFireDatabase) {

        // put the chat message on database;
        this.items = af.list(this.path, {
            query: {
                limitToLast: this.limitToLast
            }
        });
    }

    get moment() {
        return moment;
    }

    items: FirebaseListObservable<Reminder[]>;
    msg = '';
    limitToLast = 8;
    path = `${appGlobalsService.currentGroup.groupId}/${appGlobalsService.currentUser.mail.replace('@', 'A').replace('.', 'B')}/reminders`;

    ngOnInit() {
    }

}
