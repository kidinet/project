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
        /* const url = `${appGlobalsService.baseAPIUrl}initAllAboutTitles/he/true`
         this.http.post(url, {groupId: appGlobalsService.currentGroup.groupId}, httpOptions).toPromise();*/
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
            const url = `${appGlobalsService.baseAPIUrl}'deleteAboutTitle/he/true?`
            this.http.post(url, {id: id}, httpOptions).toPromise();
        });
    }

// ======================================== gallery api:================================================
    initImagesForGallery(start): any {
        /* const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}initImagesForGallery/he/true?`
         this.http.post(url, {
         groupId: appGlobalsService.currentGroup.groupId,
         start: start
         }, httpOptions)
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

    initAllResponseImage(start): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'initAllResponseImage/he/true?`
            this.http.post(url, {groupId: appGlobalsService.currentGroup.groupId}, httpOptions)
                .toPromise();
        });
    }

    deleteImageFromGallery(id) {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'deleteImageFromGallery/he/true?`
            this.http.post(url, {id: id}, httpOptions)
                .toPromise();
        });
    }

    addImageToGallery(src, subject) {
        /*
         const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'addImageToGallery/he/true?`
         this.http.post(url, {
         groupId: appGlobalsService.currentGroup.groupId,
         src: src,
         date: new Date(),
         subject: subject
         }, httpOptions).toPromise();
         });*/
    }

    initLikeItems(): any {
        /* const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'initLikeItems/he/true?`
         this.http.post(url, {userMail: appGlobalsService.CurrentUser.mail}, httpOptions).toPromise();
         });*/
        return [123, 113];
    }

    initLikeItemsCount(): any {
        /*
         const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'initLikeItemsCount/he/true?`
         this.http.post(url, {groupId: appGlobalsService.currentGroup.groupId}, httpOptions).toPromise();
         });*/

        return {123: 1, 113: 5};
    }

    // ========================this day functions:=====================================================
    // the function get add the titles of this group from table thisDayOfGroup
    getCurrentGroupThisDayTitltes():any{
        /* const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'getCurrentGroupThisDayTitltes/he/true?`
         this.http.post(url,
         {
         groupId: appGlobalsService.currentGroup.groupId,
         }, httpOptions).toPromise();
         });*/
    }
    // the function get the content of the cards according to the displayedDay and rhe groupId
    getDisplayDayParam(displayDay: Date): any {
        /* const promise = new Promise(() => {
         const url = `${appGlobalsService.baseAPIUrl}'getDisplayDayParam/he/true?`
         this.http.post(url,
         {
         groupId: appGlobalsService.currentGroup.groupId,
         date: displayDay
         }, httpOptions).toPromise();
         });*/
    }
    // the function get card of group and update the title
    updateThisDayTitle(updatetThisDayTitleParam): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'updateThisDayTitle/he/true?`
            this.http.post(url,
                {
                    title: updatetThisDayTitleParam
                }, httpOptions).toPromise();
        });
    }
    updateThisDayOfGroupTitle(updateThisDayOfGroupTitleParam): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'updateThisDayOfGroupTitleParam/he/true?`
            this.http.post(url,
                {
                    title: updateThisDayOfGroupTitleParam
                }, httpOptions).toPromise();
        });
    }
    addThisDayOfGroupTitle(addThisDayOfGroupTitleParam): any {
        const promise = new Promise(() => {
            const url = `${appGlobalsService.baseAPIUrl}'addThisDayOfGroupTitleParam/he/true?`
            this.http.post(url,
                {
                    title: addThisDayOfGroupTitleParam
                }, httpOptions).toPromise();
        });
    }
    // =============================================================================================
}
