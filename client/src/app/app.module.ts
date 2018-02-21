import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {material} from '../modules/material';
import {components} from '../modules/components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {FormValidateService} from '../services/form-validate.service';
import {ApiService} from '../services/api.service';
import {CookieService} from 'ngx-cookie-service';
import {ImagesService} from '../services/images.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';


export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyCdNBLoYL1Oz64Gx9VtKEfolj2fIbnkgCo',
        authDomain: 'newkidinet.firebaseapp.com',
        databaseURL: 'https://newkidinet.firebaseio.com',
        projectId: 'newkidinet',
        storageBucket: '',
        messagingSenderId: '945647659389'
    }
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        material,
        components,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatDialogModule,
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        ReactiveFormsModule

    ],
    providers: [
        UserService,
        GroupService,
        FormValidateService,
        CookieService,
        ImagesService,
        ApiService,
        AngularFireDatabase],
    exports: [],

    bootstrap: [AppComponent]
})
export class AppModule {
}
