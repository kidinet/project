import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {FormValidateService} from '../../../services/form-validate.service';
import {GroupService} from '../../../services/group.service';
import * as appGlobalsService from '../../../store/app-globals';

@Component({
    selector: 'app-group-settings',
    templateUrl: './group-settings.component.html',
    styleUrls: ['./group-settings.component.scss']
})
export class GroupSettingsComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<GroupSettingsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private builder: FormBuilder,
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

    createGroupForm = this.builder.group({
        groupName: this.groupName,
        groupCity: this.groupCity,
        groupStreet: this.groupStreet,
        groupBuild: this.groupBuild,
        groupPhone: this.groupPhone,
        groupFax: this.groupFax,
        groupMail: this.groupMail,
    });
    currentGroup: {}

    ngOnInit() {
        this.currentGroup = Object.assign({}, appGlobalsService.currentGroup);
    }

    updateGroup() {
        appGlobalsService.setGroup(this.currentGroup);
        this.groupService.updateGroup(this.currentGroup);
    }

}
