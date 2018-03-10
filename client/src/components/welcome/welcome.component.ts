import {Component, OnInit, Inject, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ApiService} from '../../services/api.service';
import {GroupService} from '../../services/group.service';
import {FormValidateService} from '../../services/form-validate.service';
import * as appGlobalsService from '../../store/app-globals';
import {ChooseGroupComponent} from './dialogs/choose-group/choose-group.component';
import {User} from '../../entities/user/user';
import {UserInGroup} from '../../entities/user/UserInGroup';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {split} from "ts-node/dist";
import {AddMembersComponent} from '../add-members/add-members.component'

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
})

export class WelcomeComponent implements OnInit {
    private privateKey: string;
    private publicKey: string;
    private enabled: boolean;

    constructor(public newGroupDialog: MatDialog,
        private builder: FormBuilder,
        private userService: UserService,
        private addMemebers: MatDialog,
        private MoreGroupDialog: MatDialog,
        private FormValidateService: FormValidateService,
        @Inject(DOCUMENT) private document: Document,
        private activatedRoute: ActivatedRoute,
        private apiService:ApiService,
        private router: Router,
        private cookieService: CookieService) {
        if (cookieService.get('kidinet') !== 'logOut') {
            let logInValue = {
                password: atob(cookieService.get('kidinet')).split('/')[0],
                mail: atob(cookieService.get('kidinet')).split('/')[1],
            };
            let groupId = atob(cookieService.get('kidinet')).split('/')[2];
            this.logInWithGroupId(logInValue, eval(groupId), false);
        }

    }
    password = new FormControl('', [Validators.required]);
    mail = new FormControl('', this.FormValidateService.validateEmail)
    // form declare:
    loginForm = this.builder.group({
        mail: this.mail,
        password: this.password
    });
    // show error message if invalid mail or password:
    logInFailed = false;
    moreGroupRef;
    newGroupRef;


    isLoading = false;

    openNewGroupDialog(): void {
        this.newGroupRef = this.newGroupDialog.open(NewGroup, {});
        this.newGroupRef.componentInstance.setCurrentGroup.subscribe((groupId: number) => {
            this.logInWithGroupId(appGlobalsService.currentUser, appGlobalsService.currentGroup.id, true)
        });
    }

    login(logInValue = this.loginForm.value) {
        let currentUserInGroup: UserInGroup;
        this.isLoading = true;
        this.userService.logIn(logInValue).then(result => {
            this.isLoading = false;
            this.logInFailed = result.Success;
            if (result.Success) {
                if (result.returnObject.groups) {
                    this.moreGroupRef = this.MoreGroupDialog.open(ChooseGroupComponent, {
                        data: {
                            groups: result.returnObject.groups,
                            user: result.returnObject.user
                        },
                    });
                } else {
                    this.initUserSettings(result);
                }
            }
        });
    }
    logInWithGroupId(loginForm, groupId: number, openAddMemebers: boolean) {
        this.isLoading = true;
        this.userService.logInWithGroupId(loginForm, groupId).then(result => {
            this.isLoading = false;
            this.logInFailed = !result.Success
            if (result.Success) {
                this.initUserSettings(result);

                if (openAddMemebers) {
                    this.newGroupDialog.closeAll();

                    this.addMemebers.open(AddMembersComponent, {});
                }
            }
        });
    }
    ngOnInit() {

        //  this.userService.getUser();
    }

    openMoreGroup() {
        this.moreGroupRef = this.MoreGroupDialog.open(ChooseGroupComponent, {
            data: { groups: [] },
        });
        this.moreGroupRef.componentInstance.setCurrentGroup.subscribe((data: any) => {

        });
    }

    initUserSettings(result) {
        appGlobalsService.setCurrentUserInGroup(result.returnObject.currentUserInGroup);
        appGlobalsService.setCurreUser(result.returnObject.user);
        appGlobalsService.setUsersInCurrentGroup(result.returnObject.usersInGroup);
        appGlobalsService.setGroup(result.returnObject.group);
        appGlobalsService.setIsAdministrator(result.returnObject.currentUserInGroup.isAdministrator);
        appGlobalsService.setUsersInCurrentGroupDetails(result.returnObject.usersInCurrentGroupDetails)
         this.apiService.initAllAboutTitles().then(result => {
            if (result.Success) {
                appGlobalsService.setAboutTitles(result.returnObject.aboutTitles);
            } else {
                console.warn('cant get the aboutTitle');
            }
        })
        this.apiService.initImagesForGallery(0).then(result => {
            if (result.Success) {
                appGlobalsService.addImagesForGallery(result.returnObject.imagesForGallery);
            }
        }
        );
        
        this.cookieService.set('kidinet', btoa(`${result.returnObject.user.password_}/${result.returnObject.user.mail}/${result.returnObject.group.id}`));
        const index = this.document.location.href.lastIndexOf('/') + 1;
        console.log(appGlobalsService,"appGlobalsService")
        if (appGlobalsService.currentUser.mail) {
            this.router.navigate(['/home/about']);
            if (this.document.location.href.substr(index - 1) === '/') {
                this.router.navigate(['/home/about']);
            }
            else {
                // this.router.navigate(['/about']);
            }
        }
    }
}


@Component({
    selector: 'new-group',
    templateUrl: './dialogs/new-group/new-group.component.html',
    styleUrls: ['./dialogs/new-group/new-group.component.scss']
})
export class NewGroup {
    constructor(public dialogRef: MatDialogRef<NewGroup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private builder: FormBuilder,
        private userService: UserService,
        private groupService: GroupService,
        private formValidateService: FormValidateService,
        private cookieService: CookieService) {
    }

    @Output() setCurrentGroup: EventEmitter<any> = new EventEmitter();
    // group form variables:
    groupName = new FormControl('', Validators.required)
    groupCity = new FormControl('', Validators.required)
    groupStreet = new FormControl('', Validators.required)
    groupBuild = new FormControl('', Validators.required)
    groupPhone = new FormControl('', Validators.required)
    groupFax = new FormControl('', Validators.required)
    groupMail = new FormControl('', this.formValidateService.validateEmail)


    // user for variables:
    firstName = new FormControl('', Validators.required)
    lastName = new FormControl('', Validators.required)
    userCity = new FormControl('', Validators.required)
    userStreet = new FormControl('', Validators.required)
    userBuild = new FormControl('', Validators.required)
    userPhone = new FormControl('', Validators.required)
    userMail = new FormControl('', this.formValidateService.validateEmail)
    password = new FormControl('', Validators.required)
    confirmPassword = new FormControl('', this.formValidateService.confirmPassword(this.password))


    createGroupForm = this.builder.group({
        name: this.groupName,
        city: this.groupCity,
        street: this.groupStreet,
        build: this.groupBuild,
        phone: this.groupPhone,
        fax: this.groupFax,
        mail: this.groupMail,
    });


    createUserForm = this.builder.group({
        firstName: this.firstName,
        lastName: this.lastName,
        city: this.userCity,
        street: this.userStreet,
        build: this.userBuild,
        phone: this.userPhone,
        mail: this.userMail,
        password: this.password,
        confirmPassword: this.confirmPassword
    });


    // children
    @ViewChild('stepper') stepper;

    // variable
    createGroupField = false;
    isLoading = false;
    // pipe
    get createGroupFieldMessage() {
        return this.createGroupField ? 'לא ניתן ליצור קבוצה זו, אנא בדקו את הפרטים שנית' : '';
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createGroup() {
        let group = this.createGroupForm.value;
        this.userService.findFromAddress(`${group.city}${group.street}${group.build}`).then(
            results => {
                if (results.status === 'OK') {
                    group.latitute = results.results[0].geometry.location.lat;
                    group.longitude = results.results[0].geometry.location.lng;
                }
                this.groupService.createGroup(group).then(result => {
                    if (result.Success) {
                        appGlobalsService.setGroup(result.returnObject);
                        this.stepper.selectedIndex += 1;
                    } else {
                        this.createGroupField = true;
                    }
                    this.isLoading = false;
                });
            });

        this.isLoading = true;
    }


    createManager() {
        let user = this.createUserForm.value;
        user.password_ = user.password
        this.userService.findFromAddress(`${user.city}${user.street}${user.build}`).then(
            results => {
                if (results.status === 'OK') {
                    user.latitude = results.results[0].geometry.location.lat;
                    user.longitude = results.results[0].geometry.location.lng;
                }
                this.userService.creatUser(user, true).then(result => {
                    if (result.Success) {
                        this.cookieService.set('kidinet', btoa(`${result.returnObject.user.password_}/${result.returnObject.user.mail}/${result.returnObject.group.id}`));
                        appGlobalsService.setCurreUser(result.returnObject);
                        this.stepper.selectedIndex += 1;

                    }
                });
            });
    }

    logInAndAddMembers() {
        this.setCurrentGroup.emit()
    }
}