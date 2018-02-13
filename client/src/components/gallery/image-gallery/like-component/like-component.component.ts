import {Component, Input, OnInit, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import * as appGlobalsService from '../../../../store/app-globals';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {currentUser} from '../../../../store/app-globals';

@Component({
    selector: 'app-like-component',
    templateUrl: './like-component.component.html',
    styleUrls: ['./like-component.component.scss']
})
export class LikeComponentComponent implements OnInit {

    constructor(private cookieService: CookieService,
                private httpClient: HttpClient,
                public af: AngularFireDatabase) {
    }

    @Input() id: number;
    items: FirebaseListObservable<any>;
    isImageLike = null;

    ngOnInit() {
        const path = `${appGlobalsService.currentGroup.groupId}/${this.id}/likes`;
        // put the chat message on database;
        this.items = this.af.list(path);
        this.items.subscribe(likeItems => {
            this.isImageLike = likeItems.find(likeItem => {
                return likeItem.$value === currentUser.mail;
            });
        });

    }

    toggleLike(): any {
        if (!this.isImageLike) {
            this.items.push(appGlobalsService.currentUser.mail);
        } else {
            this.items.remove();
        }
    }
}
