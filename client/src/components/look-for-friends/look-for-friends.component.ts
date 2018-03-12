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
        this.usersInCurrentGroupDetails = this.getusersInCurrentGroupDetails();
    }
    usersInCurrentGroupDetails;
    title = 'My first AGM project';
    grouplatitute = appGlobalsService.currentGroup.latitute;
    groupLongitude = appGlobalsService.currentGroup.longitude;
    currentFriend: User = new User();
    currentGroup = appGlobalsService.currentGroup;
    isCurrentGroupInfoOpen = true;
    dir: {};

    getusersInCurrentGroupDetails() {
        let users = [];
        appGlobalsService.usersInCurrentGroupDetails.forEach(user => {
            user.details = appGlobalsService.usersInCurrentGroup.filter((details) => {
                return details.userMail == user.mail;
            })[0];
            if (user.latitute&&user.longitude&&user.details&&user.mail!=appGlobalsService.currentUser.mail) {
                users.push(user);
            }
        })
        return users;
    }

    get currentUser() {
        return appGlobalsService.currentUser;
    }

    get appGlobalsService() {
        return appGlobalsService;
    }


    ngOnInit() {

    }

    onMarkerClicked(i) {
        this.currentFriend = this.usersInCurrentGroupDetails[i];
        this.dir = {
            origin: { lat: this.currentUser.latitute, lng: this.currentUser.longitude },
            destination: { lat: this.currentFriend.latitute, lng: this.currentFriend.longitude }
        };
    }

    setCurrentUser(i) {
        this.currentFriend = this.usersInCurrentGroupDetails[i];;
        this.dir = {
            origin: { lat: this.currentUser.latitute, lng: this.currentUser.longitude },
            destination: { lat: this.currentFriend.latitute, lng: this.currentFriend.longitude }
        };
    }

    showKinderGardenDirection() {
        this.dir = {
            origin: { lat: this.currentUser.latitute, lng: this.currentUser.longitude },
            destination: { lat: this.currentGroup.latitute, lng: this.currentGroup.longitude }
        };
    }

    toggleCurrentGroupInfoOpen() {
        this.isCurrentGroupInfoOpen = !this.isCurrentGroupInfoOpen;
    }

}
