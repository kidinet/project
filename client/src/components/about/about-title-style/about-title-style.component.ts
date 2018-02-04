import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-about-title-style',
    templateUrl: './about-title-style.component.html',
    styleUrls: ['./about-title-style.component.scss']
})

export class AboutTitleStyleComponent implements OnInit {

    constructor() {
    }

    colors = ['#ffb876', '#acf1ac', '#8b8be4', '#ff82f3', 'rgb(151, 237, 199)', '#d3d8f0', '#76e4e1', '#fffe98'];
    icons = ['snowflake-o',
        'bell',
        'comment-o',
        'book',
        'calendar',
        'thumbs-o-up',
        'hourglass',
        'heart',
        'bus',
        'eye',
        'bell-o',
        'smile-o'
    ]
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
