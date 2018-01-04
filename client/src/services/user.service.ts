import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import *  as store from '../store/store';
import {User} from '../entities/user'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  getUser() {
    let promise = new Promise(() => {
      var url = 'http://localhost:7022/api/getUser/he/true';
      this.http.get(url)
        .toPromise()
        .then(
        results => {
          console.log(results)
          return results;
        },
      );
    });
  }
  creatUser(user:User): any {
    var url = 'http://localhost:7022/api/createUser/he/true?' +
      '&mail=' + user.mail+
      '&firstName=' + user.firstName +
      '&lastName=' + user.lastName +
      '&childFirstName=' + user.childFirstName +
      '&childLastName=' + user.childLastName +
      '&nickName=' + user.nickName +
      '&profile=' + user.profile +
      '&password=' + user.password +
      '&city=' + user.city +
      '&build=' + user.build +
      '&street=' + user.street +
      '&phone=' + user.phone       
      console.log(url);
    return this.http.get(url)
      .toPromise()
  }
}
