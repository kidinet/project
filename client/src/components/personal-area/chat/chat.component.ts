import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {Chat} from '../../../entities/chat/chat';
import * as appGlobalsService from '../../../store/app-globals';
import * as moment from 'moment';
moment.locale('he');
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements AfterContentInit {

    items: FirebaseListObservable<Chat[]>;
    msg = '';
    limitToLast = 8;
    path = `${appGlobalsService.currentGroup.groupId}/${appGlobalsService.currentUser.mail.replace('@', 'A').replace('.', 'B')}/chat`;
    @ViewChild('chat') private chat: ElementRef;

    constructor(public af: AngularFireDatabase) {

        // put the chat message on database;
        this.items = af.list(this.path, {
            query: {
                limitToLast: this.limitToLast
            }
        });
        // this.af.auth.subscribe(auth => {
        //     if (auth) {
        //         this.name = auth;
        //     }
        // });
    }

    get moment() {
        return moment;
    }

    ngAfterContentInit() {

    }

    send() {
        if (this.msg !== '') {
            this.items.push(new Chat(appGlobalsService.currentUser.mail, this.msg, new Date().toString()));
            this.msg = '';
        }
    }

    showHistoryChat() {
        this.limitToLast += 10;
        this.items = this.af.list(this.path, {
            query: {
                limitToLast: this.limitToLast
            }
        });
    }
}
