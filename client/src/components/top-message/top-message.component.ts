import { Component, Input,OnInit , Output , EventEmitter} from '@angular/core';
import {TopMessageClass} from '../../entities/header/TopMessageClass';
@Component({
    selector: 'app-top-message',
    templateUrl: './top-message.component.html',
    styleUrls: ['./top-message.component.scss']
})
export class TopMessageComponent implements OnInit {
    constructor() { }
    public topMessgeArray: TopMessageClass[] = [];
    public rollMessage = [];
    ngOnInit() {
        this.initfromServe();
    }
    initfromServe(){
    for (var index = 0; index < 15; index++) {
        this.topMessgeArray.push(new TopMessageClass('message'+index));
        }
    }
    initrolltext(){
   
    }

}
