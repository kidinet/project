import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import * as appGlobalsService from '../../../store/app-globals';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';
export class AdListing {
    title = 'Your Title'
    content = 'Ad Content'
    price = 5.00;
}

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent {

    items: FirebaseListObservable<any>;
    name: any = 'Gila';
    msg = '';

    constructor(public af: AngularFireDatabase) {
        const path = `${appGlobalsService.currentGroup.groupId}/${appGlobalsService.currentUser.mail.replace('@', 'A').replace('.', 'B')}/chat`;

        // put the chat message on database;
        this.items = af.list(path, {
            query: {
                limitToLast: 5
            }
        });
        // this.af.auth.subscribe(auth => {
        //     if (auth) {
        //         this.name = auth;
        //     }
        // });
    }

    send() {
        this.items.push({'message': this.msg, name: this.name});
        this.msg = '';
    }

}
