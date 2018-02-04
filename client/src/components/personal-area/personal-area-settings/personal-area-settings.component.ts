import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {FormValidateService} from '../../../services/form-validate.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../entities/user/user';
import {UserInGroup} from '../../../entities/user/UserInGroup';
import * as appGlobalsService from '../../../store/app-globals';
import {ImagesService} from '../../../services/images.service';
import {UserService} from '../../../services/user.service'

@Component({
    selector: 'app-personal-area-settings',
    templateUrl: './personal-area-settings.component.html',
    styleUrls: ['./personal-area-settings.component.scss']
})
export class PersonalAreaSettingsComponent implements OnInit {

    constructor(private builder: FormBuilder,
                private formValidateService: FormValidateService,
                public dialogRef: MatDialogRef<PersonalAreaSettingsComponent>,
                public imagesService: ImagesService,
                public userService: UserService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    @ViewChild('tab') tab;

    currentUser: User;
    currentUserInGroup: UserInGroup
    // variables:
    firstName = new FormControl('', Validators.required)
    lastName = new FormControl('', Validators.required)
    userCity = new FormControl('', Validators.required)
    userStreet = new FormControl('', Validators.required)
    userBuild = new FormControl('', Validators.required)
    userPhone = new FormControl('', this.formValidateService.validatePhone)
    password = new FormControl('', Validators.required)
    confirmPassword = new FormControl('', this.formValidateService.confirmPassword(this.password))

    childfirstName = new FormControl('', Validators.required)
    childlastName = new FormControl('', Validators.required)
    nickName = new FormControl('')

    createUserForm = this.builder.group({
        firstName: this.firstName,
        lastName: this.lastName,
        city: this.userCity,
        street: this.userStreet,
        build: this.userBuild,
        phone: this.userPhone,
        password: this.password,
        confirmPassword: this.confirmPassword
    });

    createUserInGroupForm = this.builder.group({
        childfirstName: this.childfirstName,
        childlastName: this.childlastName,
        nickName: this.nickName,
    });

    @ViewChild('imageToCanvas') imageToCanvas
    @ViewChild('canvas') canvas;
    submitButtonText = ['עדכן פרטים אישיים', 'עדכן פרטים לגן זה', 'עדכן תמונה']
    imageSrc = '';
    isLoading = false;
    resultMessage = ''

    ngOnInit() {
        this.currentUser = appGlobalsService.currentUser;
        this.currentUserInGroup = appGlobalsService.currentUserInGroup;
        console.log(this.currentUserInGroup, 'currentUserInGroup');
    }

    updateUser() {
        this.userService.updateUser(this.currentUser).then(result => {
            this.resultMessage = result.Success ? 'עודכן בהצלחה' : 'נסו שנית';
            this.isLoading = false;
        });
        this.isLoading = true;
    }

    updateUserInGroup() {
        this.userService.updateUserInGroup(this.currentUserInGroup).then(result => {
            this.resultMessage = result.Success ? 'עודכן בהצלחה' : 'נסו שנית';
            this.isLoading = false;
        });
        this.isLoading = true;
    }

    setImageSrc(e) {
        this.resultMessage = '';
        const oFReader = new FileReader();
        oFReader.readAsDataURL(e.target.files[0]);
        oFReader.onload = (oFREvent) => {
            this.imageSrc = oFREvent.target['result'];
        };
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.imageSrc = this.imagesService.createCanvas(this.canvas, this.imageSrc);
        }, 50);
    }

    createImage() {
        const toDataURL = this.canvas.nativeElement.toDataURL().replace(/^data:image\/(png|jpg);base64,/, '');
        this.isLoading = true;
        this.userService.updateProfileImage(toDataURL).then(result => {
            this.resultMessage = result.Success ? 'התמונה עודכנה' : 'לא ניתך לעדכן תמונה זו, נסו אחרת';
            this.isLoading = false;
        });
    }

    update() {
        switch (this.tab.selectedIndex) {
            case 0:
                this.updateUser();
                break;
            case 1:
               this.updateUserInGroup();
                break;
            case 2:
                this.createImage()
                break;
        }
    }

}
