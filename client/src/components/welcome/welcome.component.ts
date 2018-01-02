
import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
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
    private userService: UserService) { }

  openNewGroupDialog(): void {
    let NewGroupDialogRef = this.newGroupDialog.open(NewGroup, {
    });
  }
  password = new FormControl('', [Validators.required]);
  mail = new FormControl('', this.validateEmail)
  //form declare:
  loginForm = this.builder.group({
    mail: this.mail,
    password: this.password
  });


  login() {
    console.log(this.loginForm.value);
  }

  validateEmail(c: FormControl) {
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
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
    private groupService: GroupService) {
  }

  name = new FormControl('', )
  city = new FormControl('', )
  street = new FormControl('', )
  build = new FormControl('', )
  phone = new FormControl('', )
  fax = new FormControl('', )
  mail = new FormControl('', )


  createGroupForm = this.builder.group({
    groupName: this.name,
    city: this.city,
    streat: this.street,
    build: this.build,
    phone: this.phone,
    fax: this.fax,
    mail: this.mail,
  });


  createUserForm = this.builder.group({
    name: this.name,
    city: this.city,
    streat: this.street,
    build: this.build,
    phone: this.phone,
    mail: this.mail,
  });


  //children
  @ViewChild('stepper') stepper;

  //variables
  errorCreateGroup = '';

  get format() { return store.getCreateGroup() ? 'shortDate' : 'fullDate'; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createGroup() {
    this.groupService.createGroup(this.createGroupForm.value).then(result => {
      console.log(result)
      if (result) {
         this.stepper.selectedIndex=1;
      }

      else this.errorCreateGroup = 'לא ניתן ליצר קבוצה זו, אנא בדקו את הפרטים בשנית'
    })
  }

  createManager() {
    this.userService.createuser(this.createUserForm.value);
  }
}

