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
        const url = `${appGlobalsService.baseAPIUrl}initAllAboutTitles/he/true?groupId=${appGlobalsService.currentGroup.id}`
        return this.http.get(url).toPromise();
    }

    addAboutTitle(aboutTitle: AboutTitle): any {
        console.log(aboutTitle)
        const url = `${appGlobalsService.baseAPIUrl}addAboutTitle/he/true`
        return this.http.post(url, {
            title: aboutTitle.title,
            icon: aboutTitle.icon.toString(),
            color: aboutTitle.color.toString(),
            groupId: appGlobalsService.currentGroup.id,
            content: aboutTitle.content,
        }, httpOptions).toPromise();
    }


    updateAboutTitle(aboutTitle: AboutTitle): any {
        const url = `${appGlobalsService.baseAPIUrl}updateAboutTitle/he/true`
        return this.http.post(url, {
            title: aboutTitle.title,
            content: aboutTitle.content,
            color: aboutTitle.color.toString(),
            icon: aboutTitle.icon.toString(),
            id: aboutTitle.id
        }, httpOptions)
            .toPromise();
    }

    deleteAboutTitle(id: number): any {
        const url = `${appGlobalsService.baseAPIUrl}deleteAboutTitle/he/true?id=${id}`
        return this.http.get(url).toPromise();
    }

    // ======================================== gallery api:================================================
    initImagesForGallery(start): any {
        const url = `${appGlobalsService.baseAPIUrl}initImagesForGallery/he/true?groupId=${appGlobalsService.currentGroup.id}&start=${start}`
         console.log(url)
        return this.http.get(url)
            .toPromise();
    }

    deleteImageFromGallery(id): any {
        const url = `${appGlobalsService.baseAPIUrl}'deleteImageFromGallery/he/true?id=${id}`
        return this.http.get(url).toPromise();
    }

    addImageToGallery(src, subject) {
        const url = `${appGlobalsService.baseAPIUrl}addImageToGallery/he/true`
        return this.http.post(url, {
            id: appGlobalsService.currentGroup.id,
            src: src,
            date: new Date(),
            subject: subject
        }, httpOptions).toPromise();

    }

    // ========================this day functions:=====================================================
    // the function get the titles of this group from table thisDayOfGroup
    getCurrentGroupThisDayTitles(): any {
        /* const url = `${appGlobalsService.baseAPIUrl}'getCurrentGroupThisDayTitltes/he/true?
         id=${appGlobalsService.currentGroup.id}`
         this.http.get(url).toPromise();*/
    }

    // the function get the content of the cards according to the displayedDay and rhe id
    getDisplayDayParam(displayDay: Date): any {
        const url = `${appGlobalsService.baseAPIUrl}'getDisplayDayParam/he/true?
         id=${appGlobalsService.currentGroup.id}
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
