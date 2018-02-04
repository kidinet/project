import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import * as appGlobalsService from '../../store/app-globals';
import {ImageGallery} from '../../entities/gallery/imageGallery'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private apiService: ApiService) {
    }

    isLoading = true;

    ngOnInit() {
        /* this.apiService.initAllAboutTitles().then(result => {
         if (result.Success) {
         appGlobalsService.setAboutTitles(result.returnObject);
         } else {
         console.warn('cant get the aboutTitle');
         }
         }
         );
         */

        /*
         this.apiService.initImagesForGallery(0).then(result => {
         if (result.Success) {
         appGlobalsService.addImagesForGallery(result.returnObject);
         } else {
         console.warn('cant get the aboutTitle');
         }
         }
         );
         */

        // =======================================mock=============================
        setTimeout(() => {
            appGlobalsService.setAboutTitles(this.apiService.initAllAboutTitles());
            appGlobalsService.addImagesForGallery(this.apiService.initImagesForGallery(0));
            appGlobalsService.setLikeItems(this.apiService.initLikeItems())
            appGlobalsService.setLikeItemsCount(this.apiService.initLikeItemsCount())
            this.isLoading = false;
        }, 1000)
        // =========================================================================


    }

}
