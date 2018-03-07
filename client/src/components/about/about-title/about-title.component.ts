import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as appGlobalStyle from '../../../store/app-global-style';

@Component({
    selector: 'app-about-title',
    templateUrl: './about-title.component.html',
    styleUrls: ['./about-title.component.scss'],
})
export class AboutTitleComponent implements OnInit {


    isOpen = false;
    @Input() size: string;
    @Input() titleColor = "rgb(200, 235, 215)";
    @Input() titleIcon = "fa fa-bell";
    @Input() isEditable: boolean;
    @Output() color = new EventEmitter();
    @Output() icon = new EventEmitter();


    get appGlobalStyle() {
        return appGlobalStyle;
    }
    getColor(event: string) {
        this.titleColor = event;
        console.log('titleColor', this.titleColor)
        this.color.emit(this.titleColor);
    }

    getIcon(event: string) {
        this.titleIcon = event;
        this.icon.emit(this.titleIcon);
    }

    toggleEditStyle() {
        if (this.isEditable) {
            this.isOpen = !this.isOpen;
        }
    }


    constructor() {
    }

    ngOnInit() {
        this.color.emit(this.titleColor);
        this.icon.emit(this.titleIcon);
    }

}
