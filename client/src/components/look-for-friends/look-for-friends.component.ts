import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {User} from '../../entities/user/user';
import * as appGlobalsService from '../../store/app-globals';


@Component({
    selector: 'app-look-for-friends',
    templateUrl: './look-for-friends.component.html',
    styleUrls: ['./look-for-friends.component.scss']
})
export class LookForFriendsComponent implements OnInit {

    constructor(private http: HttpClient, private userService: UserService) {
    }

    title = 'My first AGM project';
    groupLatitude = appGlobalsService.currentGroup.latitude;
    groupLongitude = appGlobalsService.currentGroup.longitude;
    currentUser: User;
    usersLocaltion: User[] = [
        new User('משה', 'ללללל', 'הרב בלוי', 'בני ברק', 12, '0504109999', 'g0504108130@gmail.com', null, '1234', 32.087804, 34.837290),
        new User('יעקב', 'ללללל', 'הרב בלוי', 'בני ברק', 12, '0504109999', 'g0504108130@gmail.com', null, '1234', 32.0869944, 34.8325423)
    ]

    // inputAddress = 'רבי עקיבא 122 בני ברק'
    // API_KEY = 'AIzaSyAftTULF-1UvfWrffosDlIChTWfhN_EqRU'
    // API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAftTULF-1UvfWrffosDlIChTWfhN_EqRU&address=`;
    // dir = undefined;

    ngOnInit() {
        // console.log(this.userService.findFromAddress('הרב בלוי 11 בני ברק'));
        // this.getDirection();
    }

    // findFromAddress(address: string): any {
    //     const compositeAddress = [address];
    //     const url = `${this.API_URL}${compositeAddress.join(',')}`;
    //
    //     return this.http.get(url).toPromise().then(
    //         results => {
    //             console.log(results);
    //         });
    // }

    // public getDirection() {
    //     this.dir = {
    //         origin: {lat: 24.799448, lng: 120.979021},
    //         destination: {lat: 24.799524, lng: 120.975017}
    //     }
    // }

    opneMarger(i) {
        this.currentUser = this.usersLocaltion[i];
    }


}
