import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {User} from '../entities/user/user';
import * as appGlobalsService from '../store/app-globals';
import {UserInGroup} from '../entities/user/UserInGroup';
import {CookieService} from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class UserService {
    constructor(private http: HttpClient,
                private cookieService: CookieService) {
    }

    API_KEY = 'AIzaSyAftTULF-1UvfWrffosDlIChTWfhN_EqRU'
    API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key: ${this.API_KEY}address=`;

    // =======================API==========================
    creatUser(user: User, isAdministrator: boolean): any {
        this.findFromAddress(`${user.city} ${user.street} ${user.build}`).then(
            results => {
                if (results.status === 'OK') {
                    user.latitude = results.results[0].geometry.location.lat;
                    user.longitude = results.results[0].geometry.location.lng;
                }
            });
        const url = `${appGlobalsService.baseAPIUrl}createUser/he/true`;
        return this.http.post(url, {
            user: user,
            isAdministrator: isAdministrator,
            groupId: appGlobalsService.currentGroup.groupId
        }, httpOptions).toPromise();
    }

    updateUser(user: User): any {
        const url = `${appGlobalsService.baseAPIUrl}updateUser/he/true`
        return this.http.post(url, user, httpOptions).toPromise();
    }

    updateUserInGroup(userInGroup: UserInGroup): any {
        const url = `${appGlobalsService.baseAPIUrl}updateUserInGroup/he/true?`
        return this.http.post(url, UserInGroup, httpOptions)
            .toPromise();
    }

    updateProfileImage(profileData): any {
        const url = `${appGlobalsService.baseAPIUrl}updateProfileImage/he/true?`
        return this.http.post(url, {
            mail: appGlobalsService.currentUser.mail,
            profile: profileData
        }, httpOptions).toPromise();
    }

    updatePasseord(password): any {
        const url = `${appGlobalsService.baseAPIUrl}updateProfileImage/he/true`
        return this.http.post(url, {
            mail: appGlobalsService.currentUser.mail,
            password: password
        }, httpOptions).toPromise();
    }

    // =====================================================

    findFromAddress(address: string): any {
        const compositeAddress = [address];
        const url = `${this.API_URL}${compositeAddress.join(',')}`;
        return this.http.get(url).toPromise();
    }

    logIn(loginFormValue): any {
        const url = `${appGlobalsService.baseAPIUrl}logIn/he/true`
        this.http.post(url, {
            mail: loginFormValue.mail,
            password: loginFormValue.password
        }, httpOptions).toPromise();
    }

    addUsersToGroup(users: User[]): any {
        const url = `${appGlobalsService.baseAPIUrl}addUsers/he/true`;
        this.http.post(url, {users: users, groupId: appGlobalsService.currentGroup.groupId}, httpOptions).toPromise();
    }

}

