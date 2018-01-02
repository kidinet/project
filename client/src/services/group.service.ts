import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import *  as store from '../store/store';
import { group } from '../entities/group'
@Injectable()
export class GroupService {
  constructor(private http: HttpClient) {
  }


  createGroup(group: group): any {
    var url = 'http://localhost:7022/api/createGroup/he/true?name='
     + group.name +
      '&city=' + group.city +
      '&build=' + group.build +
      '&phone=' + group.phone +
      '&mail=' + group.mail +
      '&fax=' + group.fax;
      console.log('url')
    return this.http.get(url)
      .toPromise()
  }
}
