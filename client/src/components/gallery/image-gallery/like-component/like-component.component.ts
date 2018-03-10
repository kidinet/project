import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
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
    @Output() loadingFinish = new EventEmitter();
    items: FirebaseListObservable<any>;
    isImageLike = null;

    ngOnInit() {
        console.log("init")
        const path = `${appGlobalsService.currentGroup.id}/${this.id}/likes`;
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
            this.items.subscribe(likeItems => {
                let key = likeItems.find(likeItem => {
                    return likeItem.$value === currentUser.mail;
                });
                // this.items.remove(key.$key);
                console.log(likeItems)
            });
        }
    }
}
