import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import * as appGlobalsService from '../../store/app-globals';
import {ImageGallery} from '../../entities/gallery/imageGallery';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private apiService: ApiService,
                @Inject(DOCUMENT) private document: Document,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        if (appGlobalsService.currentUser.lastName && appGlobalsService.currentUser.firstName) {
            const index = this.document.location.href.lastIndexOf('/') + 1;
            if (this.document.location.href.substr(index) === 'home') {
                this.router.navigate(['/home/about']);
            }
        } else {
            this.router.navigate(['/']);
        }

    }

    isLoading = true;
    isChat = false;

    ngOnInit() {

        /*  this.apiService.initAllAboutTitles().then(result => {
         if (result.Success) {
         appGlobalsService.setAboutTitles(result.returnObject);
         } else {
         console.warn('cant get the aboutTitle');
         }
         });*/


        /*   this.apiService.initImagesForGallery(0).then(result => {
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
        }, 1000);
        // =========================================================================


    }

    toggleChatStatus(isChat) {
        this.isChat = isChat;
    }

}
