import {Component, Input, OnInit, Output} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import * as appGlobalsService from '../../../../store/app-globals'

@Component({
    selector: 'app-like-component',
    templateUrl: './like-component.component.html',
    styleUrls: ['./like-component.component.scss']
})
export class LikeComponentComponent implements OnInit {

    constructor(private cookieService: CookieService,
                private httpClient: HttpClient) {
    }

    @Input() id: number;

    ngOnInit() {

    }

    toggleLike(): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'ToggleLike/he/true?
            &mail${appGlobalsService.getCurrentUser().mail}&id=${this.id}&isLike${this.isLike}`;
            // this.http.get(url)
            //     .toPromise();
        });
        appGlobalsService.toggleLikeItem(this.id);
    }
    get isLike(){
       return appGlobalsService.getLikeItems().indexOf(this.id) > -1;
    }
    get likeCount(){
        return appGlobalsService.getLikeItemsCount()[this.id];
    }

}
