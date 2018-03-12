import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import * as appGlobalsService from '../../store/app-globals';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(private cookieService: CookieService,
        private router: Router) {
    }

    groupName: string = 'הגן שלנו';
    address: string = 'רבי עקיבא 333 בני ברק';

    ngOnInit() {

    }
    logOut() {
        this.cookieService.set('kidinet', 'logOut');
        // location.reload();
        this.router.navigate(['/']);
    }
    get appGlobalsService() {
        return appGlobalsService;
    }


}
