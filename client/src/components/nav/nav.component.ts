import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PersonalAreaSettingsComponent} from '../personal-area/personal-area-settings/personal-area-settings.component';
import {ConfirmPasswordComponent} from '../personal-area/confirm-password/confirm-password.component';
import {GroupSettingsComponent} from '../personal-area/group-settings/group-settings.component';
import {SendReminderComponent} from '../personal-area/send-reminder/send-reminder.component';
import {MatDialog} from '@angular/material';
import {AddMembersComponent} from '../add-members/add-members.component'
import * as appGlobalsService from '../../store/app-globals';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(public personalSettings: MatDialog,
        public confirmPassword: MatDialog,
        public groupSettings: MatDialog,
        public addMembers: MatDialog,
        public reminder: MatDialog) {
    }

    isPersonalAreaNavOpen = false;
    isChat = false;
    @Output() chatStatusChange: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
    }

    //=================popups=========================
    openPersonalSettings() {
        this.personalSettings.open(PersonalAreaSettingsComponent, {});
    }

    openConfirmPassword() {
        this.confirmPassword.open(ConfirmPasswordComponent, {});
    }

    openGroupSettings() {
        this.groupSettings.open(GroupSettingsComponent, {});
    }

    openReminderPopup() {
        this.reminder.open(SendReminderComponent, {});
    }

    openAddMembers() {
        this.addMembers.open(AddMembersComponent, {});
    }

    // =========================================================

    toggleSettings() {
        this.isPersonalAreaNavOpen = !this.isPersonalAreaNavOpen;
    }

    toggleChatStatus() {
        this.isChat = !this.isChat;
        this.chatStatusChange.emit(this.isChat);
    }

    // ===================pipes=======================
    get appGlobalsService() {
        return appGlobalsService;
    }
}
