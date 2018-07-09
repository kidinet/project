import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ImageGallery} from '../../entities/gallery/imageGallery';
import {ApiService} from '../../services/api.service';
import {AddNewImageComponent} from './add-new-image/add-new-image.component';
import * as appGlobalsService from '../../store/app-globals';
import {MatDialog} from '@angular/material';


@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    constructor(private apiService: ApiService,
        public addNewImageDialog: MatDialog) {
    }

    @ViewChild('swiper') swiper;
    grid = 'list';
    config: SwiperOptions = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
    };
    isLoading = false;

    loadingFinishEvent() {
        this.isLoading = false;
    }
    ngOnInit() {


    }

    addMoreImages() {
        appGlobalsService.addImagesForGallery(this.apiService.initImagesForGallery(this.images.length));
    }

    openaddNewImageDialog(): void {
        this.addNewImageDialog.open(AddNewImageComponent, {});
    }
    get images() {
        return appGlobalsService.imageGallery;
    }
    get appGlobalsService(){
        return appGlobalsService
    }

}
