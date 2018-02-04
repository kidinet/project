import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {AboutTitle} from '../entities/about/aboutTitles';
import {ImageGallery} from '../entities/gallery/imageGallery'
import * as appGlobalsService from '../store/app-globals';


@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {
    }

    // about page api:
    initAllAboutTitles(): any {
        /*  const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'initAllAboutTitles/he/true?
         groupId=${appGlobalsService.currentGroup.groupId}`;
         this.http.get(url)
         .toPromise();
         });
         */
        return [
            new AboutTitle(
                'סתם כותרת',
                'פירוט יותר מורחב' +
                ' על הכותרת' +
                ' על הכותרת' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                ' על הכותרת' +
                ' על הכותרת' +
                ' על הכותרת' +
                ' בלה בלה בלה', 'color', 'icon', 123, true),
            new AboutTitle(
                'סתם כותרת',
                'פירוט יותר מורחב' +
                ' על הכותרת' +
                ' על הכותרת' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                'להבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבלהבל' +
                ' על הכותרת' +
                ' על הכותרת' +
                ' על הכותרת' +
                ' בלה בלה בלה', 'color', 'icon', 123, true)
        ]
    }

    addAboutTitle(aboutTitle: AboutTitle): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'adAboutTitle/he/true?
            title=${aboutTitle.title}
            &content=${aboutTitle.content}
            &color=${aboutTitle.color.toString()}
            &icon=${aboutTitle.icon.toString()}
            &groupId=${appGlobalsService.currentGroup.groupId}`;
            // this.http.get(url)
            //     .toPromise();
        });
    }


    updateAboutTitle(aboutTitle: AboutTitle): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'updateAboutTitle/he/true?
            title=${aboutTitle.title}
            &content=${aboutTitle.content}
            &color=${aboutTitle.color.toString()}
            &icon=${aboutTitle.icon.toString()}
            &groupId=${appGlobalsService.currentGroup.groupId}`;
            // this.http.get(url)
            //     .toPromise();
        });
    }

    deleteAboutTitle(id: number): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'deleteAboutTitle/he/true?
            id=${id}`;
            // this.http.get(url)
            //     .toPromise();
        });
    }

    // gallery api:
    initImagesForGallery(start): any {

        /*
         const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'initImagesForGallery/he/true?
         groupId=${appGlobalsService.getCurrentGroup().groupId}
         &start=${start}`;
         this.http.get(url)
         .toPromise();
         });*/
        // ======================================mock=========================================
        return [
            new ImageGallery(123, new Date(), '../../assets/images/kinder-garden/kinder-garden-1.jpg', 'השבוע בגן'),
            new ImageGallery(113, new Date(), '../../assets/images/kinder-garden/kinder-garden-2.jpg', 'השבוע בגן'),
            new ImageGallery(113, new Date(), '../../assets/images/kinder-garden/kinder-garden-2.jpg', 'השבוע בגן'),
            new ImageGallery(883, new Date(), '../../assets/images/kinder-garden/kinder-garden-11.jpg', 'השבוע בגן'),
            new ImageGallery(342, new Date(), '../../assets/images/kinder-garden/kinder-garden-3.jpg', 'השבוע בגן'),
            new ImageGallery(883, new Date(), '../../assets/images/kinder-garden/kinder-garden-4.jpg', 'השבוע בגן'),
            new ImageGallery(883, new Date(), '../../assets/images/kinder-garden/kinder-garden-7.jpg', 'השבוע בגן'),
            new ImageGallery(883, new Date(), '../../assets/images/kinder-garden/kinder-garden-9.jpg', 'השבוע בגן'),
            new ImageGallery(883, new Date(), '../../assets/images/kinder-garden/kinder-garden-10.jpg', 'השבוע בגן'),
            new ImageGallery(883, new Date(), '../../assets/images/kinder-garden/kinder-garden-11.jpg', 'השבוע בגן'),
            new ImageGallery(553, new Date(), '../../assets/images/kinder-garden/kinder-garden-12.jpg', 'השבוע בגן'),
            new ImageGallery(883, new Date(), '../../assets/images/kinder-garden/kinder-garden-7.jpg', 'השבוע בגן'),
            new ImageGallery(553, new Date(), '../../assets/images/kinder-garden/kinder-garden-13.jpg', 'השבוע בגן'),
            new ImageGallery(553, new Date(), '../../assets/images/kinder-garden/kinder-garden-13.jpg', 'השבוע בגן'),
            new ImageGallery(553, new Date(), '../../assets/images/kinder-garden/kinder-garden-12.jpg', 'השבוע בגן'),
            new ImageGallery(198, new Date(), '../../assets/images/kinder-garden/kinder-garden-6.jpg', 'השבוע בגן')]
        // ===================================================================================
    }

    deleteImageFromGallery(id) {
       /* const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'deleteImageFromGallery/he/true?
            id=${id}`
            this.http.get(url)
                .toPromise();
        });
        */
    }
    addImageToGallery(src,subject){
         /*const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'addImageToGallery/he/true?
         groupId=${appGlobalsService.getCurrentGroup().groupId}
         src=${src}
         date=${new Date()}
         subject=${subject}`
         this.http.get(url)
         .toPromise();
         });
         */
    }

    initLikeItems() {
        /* const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'initLikeItems/he/true?
         &userMail=${appGlobalsService.getCurrentUser().mail}`;
         this.http.get(url)
         .toPromise();
         });
         */
        return [123, 113]
    }

    initLikeItemsCount() {
        /* const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'initLikeItemsCount/he/true?
         groupId=${appGlobalsService.getCurrentGroup().groupId}
         this.http.get(url)
         .toPromise();
         });
         */
        return {123: 1, 113: 5}
    }
}
