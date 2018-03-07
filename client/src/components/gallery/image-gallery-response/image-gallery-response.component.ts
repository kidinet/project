import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageGalleryResponse} from '../../../entities/gallery/imageGalleryResponse';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import * as appGlobalsService from '../../../store/app-globals';
import * as appGlobalStyle from '../../../store/app-global-style';

@Component({
    selector: 'app-image-gallery-response',
    templateUrl: './image-gallery-response.component.html',
    styleUrls: ['./image-gallery-response.component.scss']
})
export class ImageGalleryResponseComponent implements OnInit {

    items: FirebaseListObservable<ImageGalleryResponse[]>;
    myReply;

    @Output() close = new EventEmitter();
    @Input() imageGallery;

    constructor(public af: AngularFireDatabase) {

    }

    ngOnInit() {
        const path = `${appGlobalsService.currentGroup.id}/${this.imageGallery.id}/imagesReply`;
        // put the chat message on database;
        this.items = this.af.list(path, {
            query: {
                limitToLast: 5
            }
        });
    }

    closeMe() {
        this.close.emit();
    }

    sendReply() {
        this.items.push(new ImageGalleryResponse(this.imageGallery.id, this.myReply, appGlobalsService.currentUser.firstName + appGlobalsService.currentUser.lastName, new Date()));
    }

    get colors() {
        return appGlobalStyle.lightColors;
    }

}
