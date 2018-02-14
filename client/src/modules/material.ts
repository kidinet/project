import {MatButtonModule, MatInputModule, MatCheckboxModule, MatSelectModule} from '@angular/material';
import {NgModule} from "@angular/core";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {FormControl, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatStepperModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatButtonToggleModule
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
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatButtonToggleModule
    ]
})
export class material {
}


