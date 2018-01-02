import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { material} from '../modules/material';
import { AboutComponent } from '../components/about/about.component';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { ParentsFormComponent } from '../components/parents-form/parents-form.component';
import { LookForFriendsComponent } from '../components/look-for-friends/look-for-friends.component';
import { ThisWeekComponent } from '../components/this-week/this-week.component';
import { PersonalAreaComponent } from '../components/personal-area/personal-area.component';
import { HomeComponent } from '../components/home/home.component';
import { HeaderComponent } from '../components/header/header.component';
import { TopMessageComponent } from '../components/top-message/top-message.component';
import { NavComponent } from '../components/nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { NewGroup } from '../components/welcome/welcome.component';
import { MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
          { path: '', component: WelcomeComponent },
          { path: 'home', component: HomeComponent,children :[
               { path: 'about', component: AboutComponent },
                { path: 'gallery', component: GalleryComponent },
                { path: 'form', component: ParentsFormComponent },
                { path: 'look-for-friends', component: LookForFriendsComponent },
                { path: 'this-week', component: ThisWeekComponent },
                { path: 'presonal-area', component: PersonalAreaComponent ,
                    children: [
                        { path: 'chat', component: GalleryComponent },
                        { path: 'memories', component: AboutComponent },
                        { path: 'pay', component: AboutComponent },
                        { path: 'medical', component: AboutComponent }
                  ]
                }
          ] }
];

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
  ],
   entryComponents: [NewGroup],
  imports: [
  RouterModule.forRoot(routes),
  BrowserModule,
  FormsModule,
  CommonModule,
  BrowserAnimationsModule,
  NoopAnimationsModule,
  material,
  MatDialogModule
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
  FormsModule
 ],
})
export class components {}