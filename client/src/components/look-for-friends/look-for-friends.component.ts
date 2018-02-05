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
    currentGroup = appGlobalsService.currentGroup;
    isCurrentGroupInfoOpen = true;

    get usersInCurrentGroup() {
        return appGlobalsService.usersInCurrentGroup;
    }

    ngOnInit() {
        // this.getDirection();
    }

    // public getDirection() {
    //     this.dir = {
    //         origin: {lat: 24.799448, lng: 120.979021},
    //         destination: {lat: 24.799524, lng: 120.975017}
    //     }
    // }

    onMarkerClicked(i) {
        this.currentUser = this.usersInCurrentGroup[i];
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
    }

    toggleCurrentGroupInfoOpen() {
        console.log(this.isCurrentGroupInfoOpen)
        this.isCurrentGroupInfoOpen = !this.isCurrentGroupInfoOpen;
    }


}
