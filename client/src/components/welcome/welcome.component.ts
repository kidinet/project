import {Component, OnInit, Inject, Input, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
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
        private MoreGroupDialog: MatDialog,
        private FormValidateService: FormValidateService,
        @Inject(DOCUMENT) private document: Document,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cookieService: CookieService) {
        if (cookieService.get('kidinet') !== 'logOut') {
            let logInValue = {
                password: atob(cookieService.get('kidinet')).split('/')[0],
                mail: atob(cookieService.get('kidinet')).split('/')[1],
            };
            let groupId = atob(cookieService.get('kidinet')).split('/')[2];
            this.logInWithGroupId(logInValue, eval(groupId));
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

    openNewGroupDialog(): void {
        this.newGroupDialog.open(NewGroup, {});
    }

    login(logInValue = this.loginForm.value) {
        let currentUserInGroup: UserInGroup;
        this.userService.logIn(logInValue).then(result => {
            this.logInFailed = result.Success;
            if (result.Success) {
                if (result.returnObject.groups) {
                    this.moreGroupRef = this.MoreGroupDialog.open(ChooseGroupComponent, {
                        data: {
                            groups: result.returnObject.groups,
                            user: result.returnObject.user
                        },
                    });
                    this.moreGroupRef.componentInstance.setCurrentGroup.subscribe((groupId: number) => {
                        this.logInWithGroupId(this.loginForm.value, groupId)
                    });
                } else {
                    this.initUserSettings(result);
                }
            }
        });
    }
    logInWithGroupId(loginForm, groupId: number) {
        this.userService.logInWithGroupId(loginForm, groupId).then(result => {
            this.logInFailed = !result.Success
            if (result.Success) {
                this.initUserSettings(result)
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
        console.log(appGlobalsService,'<<<<<<<');
        this.cookieService.set('kidinet', btoa(`${result.returnObject.user.password_}/${result.returnObject.user.mail}/${result.returnObject.group.id}`));
        this.router.navigate(['/home/about']);
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
        private formValidateService: FormValidateService) {
    }

    // group form variables:
    groupName = new FormControl('', Validators.required)
    groupCity = new FormControl('', Validators.required)
    groupStreet = new FormControl('', Validators.required)
    groupBuild = new FormControl('', Validators.required)
    groupPhone = new FormControl('', this.formValidateService.validatePhone)
    groupFax = new FormControl('', Validators.required)
    groupMail = new FormControl('', this.formValidateService.validateEmail)


    // user for variables:
    firstName = new FormControl('', Validators.required)
    lastName = new FormControl('', Validators.required)
    userCity = new FormControl('', Validators.required)
    userStreet = new FormControl('', Validators.required)
    userBuild = new FormControl('', Validators.required)
    userPhone = new FormControl('', this.formValidateService.validatePhone)
    userMail = new FormControl('', this.formValidateService.validateEmail)
    password = new FormControl('', Validators.required)
    confirmPassword = new FormControl('', this.formValidateService.confirmPassword(this.password))


    createGroupForm = this.builder.group({
        groupName: this.groupName,
        groupCity: this.groupCity,
        groupStreet: this.groupStreet,
        groupBuild: this.groupBuild,
        groupPhone: this.groupPhone,
        groupFax: this.groupFax,
        groupMail: this.groupMail,
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
        this.groupService.createGroup(this.createGroupForm.value).then(result => {
            if (result.Success) {
                appGlobalsService.setGroup(result.returnObject);
                this.stepper.selectedIndex += 1;
            } else {
                this.createGroupField = true;
            }
            this.isLoading = false;
        });
        this.isLoading = true;
    }


    createManager() {
        this.userService.creatUser(this.createUserForm.value, true).then(result => {
            if (result.Success) {
                // appGlobalsService.currentUser = result.returnObject;
                this.stepper.selectedIndex += 1;
            }
        });
    }

    logInAndAddMembers() {

    }
}

