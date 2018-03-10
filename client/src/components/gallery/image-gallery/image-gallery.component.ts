import {Component,EventEmitter, Input,Output, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service'
import * as appGlobalsService from '../../../store/app-globals'

@Component({
    selector: 'app-image-gallery',
    templateUrl: './image-gallery.component.html',
    styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

    constructor(private apiService: ApiService) {
    }

    showResponse = false;
    @Input() imageGallery;
    @Input() type;
    @Output() loadingFinish = new EventEmitter();


    ngOnInit() {
    }

    toggleShowResponse() {
        this.showResponse = !this.showResponse;
    }
    loadingFinishEvent() {
        this.loadingFinish.emit();
    }

    deleteImage() {
        this.apiService.deleteImageFromGallery(this.imageGallery.id);
        appGlobalsService.deleteImageFromGallery(this.imageGallery.id);
    }
}
