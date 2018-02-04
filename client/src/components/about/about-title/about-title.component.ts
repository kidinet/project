import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-about-title',
    templateUrl: './about-title.component.html',
    styleUrls: ['./about-title.component.scss'],
})
export class AboutTitleComponent implements OnInit {

    titleColor = '#c8ebd7';
    titleIcon = 'fa fa-comment-o';
    isOpen = false;
    @Input() size: string;
    @Input() isEditable: boolean;
    @Output() color = new EventEmitter();
    @Output() icon = new EventEmitter();

    getColor(event: string) {
        this.titleColor = event;
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
