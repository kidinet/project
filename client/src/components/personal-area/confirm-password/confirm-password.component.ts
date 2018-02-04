import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {FormValidateService} from '../../../services/form-validate.service';

@Component({
    selector: 'app-confirm-password',
    templateUrl: './confirm-password.component.html',
    styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

    constructor(private formValidateService: FormValidateService,
                private builder: FormBuilder) {
    }

    currentPassword = new FormControl('', this.formValidateService.checkCurrentPassword);
    newPassword = new FormControl('', Validators.required)
    confirmPassword = new FormControl('', this.formValidateService.confirmPassword(this.newPassword));

    changePasswordForm = this.builder.group({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
    });

    ngOnInit() {
    }

    changePassword() {
        console.log(this.changePasswordForm.value);
    }
}
