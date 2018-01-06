
import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
import { FormValidateService } from '../../services/form-validate.service'
import * as store from '../../store/store'
import { group } from '../../entities/group'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})

export class WelcomeComponent implements OnInit {
  constructor(public newGroupDialog: MatDialog,
    private builder: FormBuilder,
    private userService: UserService,
    private FormValidateService: FormValidateService) { }

  openNewGroupDialog(): void {
    let NewGroupDialogRef = this.newGroupDialog.open(NewGroup, {
    });
  }
  password = new FormControl('', [Validators.required]);
  mail = new FormControl('', this.FormValidateService.validateEmail)
  //form declare:
  loginForm = this.builder.group({
    mail: this.mail,
    password: this.password
  });


  login() {
    console.log(this.loginForm.value);
  }


  ngOnInit() {
    //  this.userService.getUser();
  }
}


@Component({
  selector: 'new-group',
  templateUrl: './dialogs/new-group/new-group.component.html',
  styleUrls: ['./dialogs/new-group/new-group.component.scss']
})
export class NewGroup {
  constructor(
    public dialogRef: MatDialogRef<NewGroup>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private userService: UserService,
    private groupService: GroupService,
    private formValidateService: FormValidateService) {
  }

  name = new FormControl('', Validators.required)
  firtstName = new FormControl('', Validators.required)
  lastName = new FormControl('', Validators.required)
  city = new FormControl('', Validators.required)
  street = new FormControl('', Validators.required)
  build = new FormControl('', Validators.required)
  phone = new FormControl('', this.formValidateService.validatePhone)
  fax = new FormControl('', Validators.required)
  mail = new FormControl('', this.formValidateService.validateEmail)
  password = new FormControl('', Validators.required)
  confirmPassword = new FormControl('', this.formValidateService.confirmPassword(this.password))


  createGroupForm = this.builder.group({
    name: this.name,
    city: this.city,
    street: this.street,
    build: this.build,
    phone: this.phone,
    fax: this.fax,
    mail: this.mail,
  });


  createUserForm = this.builder.group({
    firstName: this.firtstName,
    lastName: this.lastName,
    city: this.city,
    street: this.street,
    build: this.build,
    phone: this.phone,
    mail: this.mail,
    password: this.password,
    confirmPassword: this.confirmPassword
  });


  //children
  @ViewChild('stepper') stepper;

  //variable
  createGroupField = false;
  //pipe
  get createGroupFieldMessage() { return this.createGroupField ? 'לא ניתן ליצור קבוצה זו, אנא בדקו את הפרטים שנית' : ''; }

  onNoClick(): void {
    this.dialogRef.close();
  }
  createGroup() {
    this.groupService.createGroup(this.createGroupForm.value).then(result => {
      if (result.Success) {
        this.stepper.selectedIndex += 1;
      }
      else this.createGroupField = true;
    });
  }

  createManager() {
    this.userService.creatUser(this.createUserForm.value).then(result => {
      console.log(result)
      if (result.Success) {
        this.stepper.selectedIndex += 1;
      }
    })
  }
}

