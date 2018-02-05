import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageGalleryResponse} from '../../../entities/gallery/imageGalleryResponse';

@Component({
    selector: 'app-image-gallery-response',
    templateUrl: './image-gallery-response.component.html',
    styleUrls: ['./image-gallery-response.component.scss']
})
export class ImageGalleryResponseComponent implements OnInit {

    constructor() {
    }
    @Output() close = new EventEmitter();
    @Input() imageGallery;
    imageGalleryResponseArray: ImageGalleryResponse[] = []

    ngOnInit() {
        // for (let i = 0; i < 5; i++) {
        //     this.imageGalleryResponseArray.push(new ImageGalleryResponse('אהבתיאהבתיאהבתיאההב' + i, 'אחת האמהות', '03/25/2015'));
        // }
    }

    closeMe() {
        this.close.emit();
    }

}
