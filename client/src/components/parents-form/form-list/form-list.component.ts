import {Component, Directive, OnInit} from '@angular/core';
import 'ng2-ripple-directive/src/scss/ripple.scss';
import * as appGlobalsService from '../../../store/app-globals';
import {FormReply} from  '../../../entities/form/forunReply';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';
import * as moment from 'moment';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
moment.locale('he');

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.scss'],

})
export class FormListComponent implements OnInit {

    showMoreTextTitle = false;
    // ====================== forum============================
    currentForumKey = '-L5hjWTQWJAy3YxTVIWB';
    currentForum: FirebaseListObservable<FormReply[]>;
    // ====================== reply:============
    replyContent = new FormControl('', Validators.required);
    replyForm = this.builder.group({
        replyContent: this.replyContent
    });
    replysList;


    constructor(public af: AngularFireDatabase,
                private builder: FormBuilder) {
        const path = `${appGlobalsService.currentGroup.groupId}/forum/${this.currentForumKey}/replys`;
        this.replysList = af.list(path, {});
    }

    ngOnInit() {

    }

    toggleMoreText() {
        this.showMoreTextTitle = !this.showMoreTextTitle;
    }

    reply() {
        this.replysList.push(new FormReply(this.replyForm.value['replyContent'], appGlobalsService.currentUser.mail, new Date().toString()))
        this.replyForm.markAsPristine();
        this.replyForm.reset();
    }
}
