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
    currentFriend: User = new User();
    currentGroup = appGlobalsService.currentGroup;
    isCurrentGroupInfoOpen = true;
    dir: {};

    get usersInCurrentGroup() {
        return appGlobalsService.usersInCurrentGroup;
    }

    get currentUser() {
        return appGlobalsService.currentUser;
    }

    get appGlobalsService() {
        return appGlobalsService;
    }


    ngOnInit() {
        // this.getDirection();
    }

    onMarkerClicked(i) {
        this.currentFriend = this.usersInCurrentGroup[i];
        this.dir = {
            origin: {lat: this.currentUser.latitude, lng: this.currentUser.longitude},
            destination: {lat: this.currentFriend.latitude, lng: this.currentFriend.longitude}
        };
    }

    setCurrentUser(friend: User) {
        this.currentFriend = friend;
        this.dir = {
            origin: {lat: this.currentUser.latitude, lng: this.currentUser.longitude},
            destination: {lat: this.currentFriend.latitude, lng: this.currentFriend.longitude}
        };
    }

    showKinderGardenDirection() {
        this.dir = {
            origin: {lat: this.currentUser.latitude, lng: this.currentUser.longitude},
            destination: {lat: this.currentGroup.latitude, lng: this.currentGroup.longitude}
        };
    }

    toggleCurrentGroupInfoOpen() {
        this.isCurrentGroupInfoOpen = !this.isCurrentGroupInfoOpen;
    }


}
