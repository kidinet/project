import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import * as appGlobalsService from '../../store/app-globals';
import {ImageGallery} from '../../entities/gallery/imageGallery';
import {User} from '../../entities/user/user';
import {DOCUMENT} from '@angular/common';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';
import {Reminder} from '../../entities/reminder/reminder';
import * as moment from 'moment';
moment.locale('he');

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private apiService: ApiService,
        @Inject(DOCUMENT) private document: Document,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public af: AngularFireDatabase) {
        if (!appGlobalsService.currentUser.mail) {
            this.router.navigate(['/']);
        }
    }

    isLoading = false;
    isChat = false;
    currentUserForChat: User;
    // database:
    path: string;
    items: FirebaseListObservable<Reminder[]>;
    reverseItems;
    limitToLast = 0;
    notRead = false;
    // reminders
    openReminders = {};
    usersInCurrentGroup

    ngOnInit() {
        this.usersInCurrentGroup=this.getusersInCurrentGroupDetails();
       

        // get the reminders message from database;
        this.path = `${appGlobalsService.currentGroup.id}/${appGlobalsService.currentUser.mail.replace('@', 'A').replace('.', 'B')}/reminders`;
        this.showMoreReminders(6);
    }

    toggleChatStatus(isChat) {
        this.isChat = isChat;
    }

    setCurrentUser(user: User) {
        this.currentUserForChat = user;
    }

    readReminder(reminder) {
        this.openReminders[reminder['$key']] = !this.openReminders[reminder['$key']];
        this.items.update(this.items.$ref.ref.child(reminder['$key']), { isRead: true });
    }
    showMoreReminders(addMore: number) {
        if (this.notRead) {
            this.items = this.af.list(this.path);
        }
        else {
            this.limitToLast += addMore;
            this.items = this.af.list(this.path, {
                query: {
                    limitToLast: this.limitToLast,
                    // TODO: 'index rule'
                }
            });
        }

        this.items.subscribe(items => {
            this.reverseItems = items.slice().reverse();
            if (this.notRead) {
                this.reverseItems = this.reverseItems.filter(item => {
                    return !(item.isRead)
                })
            }
        });
    }
    getusersInCurrentGroupDetails() {
        let users = [];
        appGlobalsService.usersInCurrentGroupDetails.forEach(user => {
            user.details = appGlobalsService.usersInCurrentGroup.filter((details) => {
                return details.userMail == user.mail;
            })[0];
            if (user.details) {
                users.push(user);
            }
        })
        return users;
    }

    // ==================pipes===========
    get appGlobalsService() {
        return appGlobalsService;
    }

    get moment() {
        return moment;
    }
}
