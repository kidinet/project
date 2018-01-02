
import {MatButtonModule,MatInputModule, MatCheckboxModule,MatSelectModule} from '@angular/material';
import {NgModule} from "@angular/core";
// import {FormControl, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports: 
  [MatButtonModule,
   MatCheckboxModule,
   MatSelectModule,
   MatInputModule,
   FormsModule,
   ReactiveFormsModule,
   MatTabsModule,
   MatStepperModule,
   BrowserAnimationsModule,
   NoopAnimationsModule
   ],
  exports: [
    MatButtonModule,
     MatCheckboxModule,
     MatSelectModule,
     MatInputModule,
     FormsModule,
     ReactiveFormsModule,
     MatTabsModule,
     MatStepperModule,
     BrowserAnimationsModule,
     NoopAnimationsModule
  ]
})
export class material {}


