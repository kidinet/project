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
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable()
export class UserService {
    constructor(private http: HttpClient,
        private cookieService: CookieService) {
    }

    API_KEY = 'AIzaSyAftTULF-1UvfWrffosDlIChTWfhN_EqRU'
    API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key:${this.API_KEY}&address=`;

    // =======================API==========================
    creatUser(user, isAdministrator: boolean): any {
        const url = `${appGlobalsService.baseAPIUrl}createUser/he/true`;
        console.log(user)
        user.UserInGroups = [];
        user.UserInGroups[0] = new UserInGroup();
        user.UserInGroups[0].isAdministrator = true;
        user.UserInGroups[0].groupId = appGlobalsService.currentGroup.id;
        return this.http.post(url,
            user, httpOptions).toPromise();
    }

    updateUser(user: User): any {
        const url = `${appGlobalsService.baseAPIUrl}updateUser/he/true`
        return this.http.post(url, user, httpOptions).toPromise();
    }

    updateUserInGroup(userInGroup: UserInGroup): any {
        const url = `${appGlobalsService.baseAPIUrl}updateUserInGroup/he/true`
        return this.http.post(url, userInGroup, httpOptions)
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
        console.log(url, "findFromAddress");
        return this.http.get(url).toPromise();
    }

    logIn(loginFormValue): any {
        console.log(loginFormValue, 'loginFormValue service ')
        const url = `${appGlobalsService.baseAPIUrl}logIn/he/true`
        return this.http.post(url, {
            mail: loginFormValue.mail,
            password_: loginFormValue.password
        }, httpOptions).toPromise();
        //return this.http.post(url).toPromise();
    }
    logInWithGroupId(loginFormValue, id: number): any {
        const url = `${appGlobalsService.baseAPIUrl}logInWithGroupId/he/true`
        return this.http.post(url, {
            userMail: loginFormValue.mail,
            User: {
                password_: loginFormValue.password || loginFormValue.password_
            },
            groupId: id
        }, httpOptions).toPromise();
    }

    addUsersToGroup(users: User[]): any {
        console.log(users, "appGlobalsService.currentGroup.id")
        users[0].UserInGroups = [];
        users[0].UserInGroups[0] = new UserInGroup();
        users[0].UserInGroups[0].groupId = appGlobalsService.currentGroup.id
        const url = `${appGlobalsService.baseAPIUrl}addUsers/he/true`;
        return this.http.post(url, users, httpOptions).toPromise();
    }

}

