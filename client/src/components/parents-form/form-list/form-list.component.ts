import {Component, Directive, OnInit} from '@angular/core';
import 'ng2-ripple-directive/src/scss/ripple.scss';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.scss'],

})
export class FormListComponent implements OnInit {

    constructor() {
    }

    showMoreTextTitle:boolean= false;

    ngOnInit() {
    }

    toggleMoreText() {
        this.showMoreTextTitle = !this.showMoreTextTitle;
    }
}
