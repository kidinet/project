import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {User} from '../entities/user/user';
import * as appGlobalsService from '../store/app-globals';
import {UserInGroup} from '../entities/user/UserInGroup';
import {catchError} from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }

    API_KEY = 'AIzaSyAftTULF-1UvfWrffosDlIChTWfhN_EqRU'
    API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        })
    };
    dir = undefined;

    // =======================API==========================
    creatUser(user: User, isAdministrator: boolean): any {
        this.findFromAddress(`${user.city} ${user.street} ${user.build}`).then(
            results => {
                if (results.status === 'OK') {
                    user.latitude = results.results[0].geometry.location.lat;
                    user.longitude = results.results[0].geometry.location.lng;
                }
            });
        const url = `${appGlobalsService.baseAPIUrl}createUser/he/true?
            &mail ${user.mail}
            &firstName=${user.firstName}
            &lastName=${user.lastName}
            &profile=${null}
            &password=${user.password}
            &city=${user.city}
            &build=${user.build}
            &streat=${user.street}
            &phone=${user.phone}
            &latitude=${user.latitude}
            &longitude=${user.longitude}
            &isAdministrator=${isAdministrator}
            &groupId=${appGlobalsService.getCurrentGroup().groupId}`;
        // return this.http.get(url)
        // .toPromise();
    }

    updateUser(user: User): any {
        const url = `${appGlobalsService.baseAPIUrl}updateUser/he/true?
            mail=${appGlobalsService.currentUser.mail}
            &firstName=${user.firstName}
            &lastName=${user.lastName}
            &city=${user.city}
            &build=${user.build}
            &streat=${user.street}
            &phone=${user.phone}`

        return this.http.get(url)
            .toPromise();
    }

    updateUserInGroup(userInGroup: UserInGroup): any {
        const url = `${appGlobalsService.baseAPIUrl}updateUserInGroup/he/true?
            &mail=${appGlobalsService.currentUser.mail}
            &groupId=${appGlobalsService.currentGroup.groupId}
            &childFirstName=${userInGroup.childFirstName}
            &childLastName=${userInGroup.childLastName}
            &nickname=${userInGroup.nickname}`

        return this.http.get(url)
            .toPromise();
    }

    updateProfileImage(profileData): any {
        const url = `${appGlobalsService.baseAPIUrl}updateProfileImage/he/true?
        mail=${appGlobalsService.currentUser.mail}
        &Rprogile=${profileData}`;
        return this.http.get(url)
            .toPromise();
    }

    updatePasseord(password): any {
        const url = `${appGlobalsService.baseAPIUrl}updateProfileImage/he/true`
        return this.http.post(url, {
            mail: appGlobalsService.currentUser.mail,
            password: password
        }, this.httpOptions).pipe();
    }

    // =====================================================

    findFromAddress(address: string): any {
        const compositeAddress = [address];
        const url = `${this.API_URL}${compositeAddress.join(',')}`;

        return this.http.get(url).toPromise();
    }
}
