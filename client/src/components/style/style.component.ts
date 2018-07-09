import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-style',
    templateUrl: './style.component.html',
    styleUrls: ['./style.component.scss']
})

export class StyleComponent implements OnInit {

    constructor() {
    }
    
    @Input() colors;
    @Input() icons;
    @Output() color = new EventEmitter();
    @Output() icon = new EventEmitter();

    ngOnInit() {
    }

    colorClick(event) {
        this.color.emit(event.path[0].style.backgroundColor);
    }

    iconClick(event) {
        this.icon.emit(event.path[0].className);
    }

}
