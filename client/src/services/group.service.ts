import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {Group} from '../entities/group';
import {UserService} from '../services/user.service';
import * as appGlobalsService from '../store/app-globals';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class GroupService {
    constructor(private http: HttpClient, private userService: UserService) {
    }


    createGroup(group: Group): any {
        const url = `${appGlobalsService.baseAPIUrl}createGroup/he/true`
        return this.http.post(url, group, httpOptions)
            .toPromise();
    }
 

    updateGroup(group: Group): any {
        const url = `${appGlobalsService.baseAPIUrl}updateGroup/he/true`;
        return this.http.post(url, group, httpOptions)
            .toPromise();
    }
}