import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {FormValidateService} from '../../services/form-validate.service';
import {User} from '../../entities/user/user';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-add-members',
    templateUrl: './add-members.component.html',
    styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {

    constructor(private builder: FormBuilder,
        private userService: UserService,
        private FormValidateService: FormValidateService,
        public dialogRef: MatDialogRef<AddMembersComponent>) {
    }

    members: User[] = [];
    mail = new FormControl('', [this.FormValidateService.validateEmail, this.FormValidateService.checkExistMail(this.members)])
    // form declare:
    addMembersForm = this.builder.group({
        mail: this.mail,
    });
    successAddMembers = null;
    isLoading = false;

    ngOnInit() {

    }

    addMember() {
        const user = new User();
        user.mail = this.mail.value;
        user.password_ = Math.random().toString(36).slice(-8);
        this.members.push(user);
        this.addMembersForm.reset();
    }

    addMembers() {

        this.isLoading = true;
        this.userService.addUsersToGroup(this.members).then(result => {
            this.successAddMembers = result;
            this.isLoading = false;
            this.successAddMembers = true;
        });


    }
}

