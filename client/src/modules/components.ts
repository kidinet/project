import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {material} from '../modules/material';
import {AboutComponent} from '../components/about/about.component';
import {GalleryComponent} from '../components/gallery/gallery.component';
import {ParentsFormComponent} from '../components/parents-form/parents-form.component';
import {LookForFriendsComponent} from '../components/look-for-friends/look-for-friends.component';
import {ThisWeekComponent} from '../components/this-week/this-week.component';
import {PersonalAreaComponent} from '../components/personal-area/personal-area.component';
import {HomeComponent} from '../components/home/home.component';
import {HeaderComponent} from '../components/header/header.component';
import {TopMessageComponent} from '../components/top-message/top-message.component';
import {NavComponent} from '../components/nav/nav.component';
import {RouterModule, Routes, ROUTES} from '@angular/router';
import {WelcomeComponent} from '../components/welcome/welcome.component';
import {NewGroup} from '../components/welcome/welcome.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AgmCoreModule} from '@agm/core';            // @agm/core
import {AgmDirectionModule} from 'agm-direction';   // agm-direction
import * as globals from '../store/app-globals';
import { ReactiveFormsModule } from '@angular/forms';
// globals
import {StyleComponent} from '../components/style/style.component';
// image gallery components:
import {ImageGalleryComponent} from '../components/gallery/image-gallery/image-gallery.component'
import {LikeComponentComponent} from '../components/gallery/image-gallery/like-component/like-component.component';
import {ImageGalleryResponseComponent} from '../components/gallery/image-gallery-response/image-gallery-response.component'
import {AddNewImageComponent} from '../components/gallery/add-new-image/add-new-image.component';

// form components:
import {FormListComponent} from '../components/parents-form/form-list/form-list.component';
import {FormSubjectsComponent} from '../components/parents-form/form-subjects/form-subjects.component';
import {ReplyComponent} from '../components/parents-form/reply/reply.component';

// about components:
import {AboutTitleComponent} from '../components/about/about-title/about-title.component';

// personal area components:
import {ChatComponent} from '../components/personal-area/chat/chat.component';
import {PersonalAreaSettingsComponent} from '../components/personal-area/personal-area-settings/personal-area-settings.component';
import {RemindersComponent} from '../components/personal-area/reminders/reminders.component';
import {ConfirmPasswordComponent} from '../components/personal-area/confirm-password/confirm-password.component';
import {GroupSettingsComponent} from '../components/personal-area/group-settings/group-settings.component';
import {AppRoutes} from './route';



@NgModule({
    declarations: [
        AboutComponent,
        GalleryComponent,
        ParentsFormComponent,
        LookForFriendsComponent,
        ThisWeekComponent,
        PersonalAreaComponent,
        HomeComponent,
        HeaderComponent,
        TopMessageComponent,
        NavComponent,
        WelcomeComponent,
        NewGroup,
        ImageGalleryComponent,
        LikeComponentComponent,
        ImageGalleryResponseComponent,
        FormListComponent,
        FormSubjectsComponent,
        ReplyComponent,
        AboutTitleComponent,
        ChatComponent,
        PersonalAreaSettingsComponent,
        RemindersComponent,
        AddNewImageComponent,
        ConfirmPasswordComponent,
        GroupSettingsComponent,
        StyleComponent,
        
    ],
    entryComponents: [NewGroup, AddNewImageComponent, ConfirmPasswordComponent, GroupSettingsComponent],
    imports: [
        AppRoutes,
        BrowserModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        material,
        MatDialogModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAftTULF-1UvfWrffosDlIChTWfhN_EqRU',
            language: 'he'
        }),
        AgmDirectionModule,
    ],
    exports: [
        AboutComponent,
        GalleryComponent,
        ParentsFormComponent,
        LookForFriendsComponent,
        ThisWeekComponent,
        PersonalAreaComponent,
        HomeComponent,
        HeaderComponent,
        TopMessageComponent,
        NavComponent,
        RouterModule,
        WelcomeComponent,
        MatDialogModule,
        NewGroup,
        FormsModule,
        ImageGalleryComponent,
        LikeComponentComponent,
        ImageGalleryResponseComponent,
        FormListComponent,
        FormSubjectsComponent,
        ReplyComponent,
        AboutTitleComponent,
        ChatComponent,
        PersonalAreaSettingsComponent,
        RemindersComponent,
        AddNewImageComponent,
        ReactiveFormsModule
    ],
})
export class components {

}