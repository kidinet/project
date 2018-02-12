import {Component, OnInit} from '@angular/core';
import {PersonalAreaSettingsComponent} from '../personal-area/personal-area-settings/personal-area-settings.component';
import {ConfirmPasswordComponent} from '../personal-area/confirm-password/confirm-password.component';
import {GroupSettingsComponent} from '../personal-area/group-settings/group-settings.component';
import {MatDialog} from '@angular/material';
import * as appGlobalsService from '../../store/app-globals';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(public personalSettings: MatDialog,
                public confirmPassword: MatDialog,
                public groupSettings: MatDialog) {
    }

    isPersonalAreaNavOpen = false;

    ngOnInit() {
    }

    openPersonalSettings() {
        const addNewImageDialogRef = this.personalSettings.open(PersonalAreaSettingsComponent, {});
    }

    openConfirmPassword() {
        const addNewImageDialogRef = this.confirmPassword.open(ConfirmPasswordComponent, {});
    }

    openGroupSettings() {
        const addNewImageDialogRef = this.groupSettings.open(GroupSettingsComponent, {});
    }

    toggleSettings() {
        this.isPersonalAreaNavOpen = !this.isPersonalAreaNavOpen;
    }

    logOut() {
        location.reload();
    }
    get appGlobalsService() {
        return appGlobalsService;
    }
}
