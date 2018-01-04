import { Injectable } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable()
export class FormValidateService {

  constructor() { }
  validateEmail(formControl: FormControl) {
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(formControl.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
  validatePhone(formControl: FormControl) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
    return phoneno.test(formControl.value) ? null : {
      validatePhone: {
        valid: false
      }
    };
  }

  confirmPassword(password: FormControl) {
    return function (formControl: FormControl) {
      return formControl.value === password.value ? null : {
        validatePassword: {
          valid: false
        }
      };
    }
  }
}
