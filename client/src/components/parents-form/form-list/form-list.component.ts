import {Component, Directive, OnInit, Input} from '@angular/core';
import 'ng2-ripple-directive/src/scss/ripple.scss';
import * as appGlobalsService from '../../../store/app-globals';
import {FormReply} from  '../../../entities/form/forunReply';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';
import * as moment from 'moment';
moment.locale('he');
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.scss'],

})
export class FormListComponent implements OnInit {

    showMoreTextTitle = false;
    usersDetails;
    details = {};
    // ====================== forum============================
    replysList: FirebaseListObservable<FormReply[]>;
    @Input() currentForum: any;

    // reply:
    replyContent = new FormControl(null);
    replyForm = this.builder.group({
        replyContent: this.replyContent
    });

    constructor(public af: AngularFireDatabase,
        private builder: FormBuilder) {
    }

    ngOnInit() {
        this.usersDetails = this.getusersInCurrentGroupDetails();
        this.getChatDetails();
    }
    getChatDetails() {
        appGlobalsService.usersInCurrentGroup.forEach(user => {
            this.details[user.userMail] = user.nickname;
        })
    }
    get detail() {
        let details = {};
        appGlobalsService.usersInCurrentGroup.forEach(user => {
            details[user.userMail] = user.nickname;
        })
        return details
    }

    ngOnChanges(value: any) {
        if (this.currentForum) {
            const replyPath = `${appGlobalsService.currentGroup.id}/forum/${this.currentForum['$key']}/replys`;
            this.replysList = this.af.list(replyPath, {});
        }
    }

    toggleMoreText() {
        this.showMoreTextTitle = !this.showMoreTextTitle;
    }

    reply() {
        this.replysList.push(new FormReply(this.replyForm.value['replyContent'], appGlobalsService.currentUser.mail, new Date().toString()))
        this.replyForm.reset();
    }

    getusersInCurrentGroupDetails() {
        let users = [];
        appGlobalsService.usersInCurrentGroupDetails.forEach(user => {
            user.details = appGlobalsService.usersInCurrentGroup.filter((details) => {
                return details.userMail == user.mail;
            })[0];
            if (user.details) {
                users.push(user);
            }
        })
        return users;
    }
    get appGlobalsService() {
        return appGlobalsService
    }

    get moment() {
        return moment;
    }
}
