import {Component, OnInit} from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

    constructor( private builder: FormBuilder) {
    }
    replyTitle = new FormControl('', Validators.required);
    replyContent = new FormControl('', Validators.required);
    replyForm= this.builder.group({
        replyTitle: this.replyTitle,
        replyContent: this.replyContent
        });
    ngOnInit() {
    }

    reply() {
        console.log('reply');
    }
}
