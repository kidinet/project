import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import * as appGlobalsService from '../../store/app-globals';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(private cookieService: CookieService) {
    }

    groupName: string = 'הגן שלנו';
    address: string = 'רבי עקיבא 333 בני ברק';

    ngOnInit() {

    }
    logOut() {
        this.cookieService.set('kidinet','logOut');
        location.reload();
    }
    get appGlobalsService() {
        return appGlobalsService;
    }


}
