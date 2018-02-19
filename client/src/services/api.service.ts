import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {AboutTitle} from '../entities/about/aboutTitles';
import {ImageGallery} from '../entities/gallery/imageGallery'
import * as appGlobalsService from '../store/app-globals';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {
    }

    // ============================= about page api=============================================:
    initAllAboutTitles(): any {
        /*const url = `${appGlobalsService.baseAPIUrl}initAllAboutTitles/he/true?groupId=${ppGlobalsService.currentGroup.groupId}`
         this.http.get(url).toPromise();*/
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
        ];
    }

    addAboutTitle(aboutTitle: AboutTitle): any {
        /*const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'adAboutTitle/he/true?`
         this.http.post(url, {
         title: aboutTitle.title,
         content: aboutTitle.content,
         color: aboutTitle.color.toString(),
         icon: aboutTitle.icon.toString(),
         groupId: appGlobalsService.currentGroup.groupId
         }, httpOptions).toPromise();
         }
         );*/
    }


    updateAboutTitle(aboutTitle: AboutTitle): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'updateAboutTitle/he/true?`
            this.http.post(url, {
                title: aboutTitle.title,
                content: aboutTitle.content,
                color: aboutTitle.color.toString(),
                icon: aboutTitle.icon.toString(),
                groupId: appGlobalsService.currentGroup.groupId
            }, httpOptions)
                .toPromise();
        });
    }

    deleteAboutTitle(id: number): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'deleteAboutTitle/he/true?id=${id}`
            this.http.get(url).toPromise();
        });
    }

// ======================================== gallery api:================================================
    initImagesForGallery(start): any {
        /*  const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}initImagesForGallery/he/true?
         groupId=${appGlobalsService.currentGroup.groupId}
         &start=${start}`
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
            new ImageGallery(198, new Date(), '../../assets/images/kinder-garden/kinder-garden-6.jpg', 'השבוע בגן')];
        // ===================================================================================
    }

    deleteImageFromGallery(id): any {
        const url = `${appGlobalsService.baseAPIUrl}'deleteImageFromGallery/he/true?id=${id}`
        this.http.get(url).toPromise();
    }

    addImageToGallery(src, subject) {
        /*
         const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'addImageToGallery/he/true`
         this.http.post(url, {
         groupId: appGlobalsService.currentGroup.groupId,
         src: src,
         date: new Date(),
         subject: subject
         }, httpOptions).toPromise();
         });*/
    }

    // ========================this day functions:=====================================================
    // the function get the titles of this group from table thisDayOfGroup
    getCurrentGroupThisDayTitles(): any {
        /* const url = `${appGlobalsService.baseAPIUrl}'getCurrentGroupThisDayTitltes/he/true?
         groupId=${appGlobalsService.currentGroup.groupId}`
         this.http.get(url).toPromise();*/
    }

    // the function get the content of the cards according to the displayedDay and rhe groupId
    getDisplayDayParam(displayDay: Date): any {
        const url = `${appGlobalsService.baseAPIUrl}'getDisplayDayParam/he/true?
         groupId=${appGlobalsService.currentGroup.groupId}
         &date${displayDay}`
        this.http.get(url).toPromise();
    }

    // the function get card of group and update the title
    updateThisDayTitle(updatetThisDayTitleParam): any {
        const url = `${appGlobalsService.baseAPIUrl}'updateThisDayTitle/he/true`
        this.http.post(url, updatetThisDayTitleParam, httpOptions).toPromise();

    }

    updateThisDayOfGroupTitle(updateThisDayOfGroupTitleParam): any {
        const url = `${appGlobalsService.baseAPIUrl}'updateThisDayOfGroupTitle/he/true`
        this.http.post(url, updateThisDayOfGroupTitleParam, httpOptions).toPromise();
    }

    addThisDayOfGroupTitle(addThisDayOfGroupTitleParam): any {
        const url = `${appGlobalsService.baseAPIUrl}'addThisDayOfGroupTitle/he/true`
        this.http.post(url, addThisDayOfGroupTitleParam, httpOptions).toPromise();
    }

    // =============================================================================================
}
