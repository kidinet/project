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
        
    }
    ngOnChanges(value: any) {
        const replyPath = `${appGlobalsService.currentGroup.groupId}/forum/${this.currentForum['$key']}/replys`;
        this.replysList = this.af.list(replyPath, {});
    }
    toggleMoreText() {
        this.showMoreTextTitle = !this.showMoreTextTitle;
    }

    reply() {
        this.replysList.push(new FormReply(this.replyForm.value['replyContent'], appGlobalsService.currentUser.mail, new Date().toString()))
        this.replyForm.reset();
    }

    get usersDetails() {
        let usersInCurrentGroup = {};
        appGlobalsService.usersInCurrentGroup.forEach(user => {
            usersInCurrentGroup[user.mail] = `${user.firstName} ${user.lastName}`
        })
        return usersInCurrentGroup
    }
    get moment() {
        return moment
    }
}
