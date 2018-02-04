import {Component, OnInit} from '@angular/core';
import {ImageGallery} from '../../entities/gallery/imageGallery'
import {ApiService} from '../../services/api.service'
import {AddNewImageComponent} from './add-new-image/add-new-image.component'
import * as appGlobalsService from '../../store/app-globals';
import {MatDialog} from "@angular/material";


@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    constructor(
        private apiService: ApiService,
        public addNewImageDialog: MatDialog) {
    }

    sortFilters = [
        {'value': -1, 'title': 'הכל'},
        {'value': 1, 'title': 'פופולרים'},
        {'value': 2, 'title': 'תאריך'},
        {'value': 3, 'title': 'נושא'}
    ]

    images: ImageGallery[];

    ngOnInit() {
        this.images = appGlobalsService.getImageGallery();
    }

    addMoreImages() {
        appGlobalsService.addImagesForGallery(this.apiService.initImagesForGallery(this.images.length));
    }
    openaddNewImageDialog(): void {
        let addNewImageDialogRef = this.addNewImageDialog.open(AddNewImageComponent, {});
    }
}
