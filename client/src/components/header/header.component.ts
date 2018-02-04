import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor() {
    }

    groupName: string = 'הגן שלנו';
    address: string = 'רבי עקיבא 333 בני ברק';

    ngOnInit() {

    }

}
