import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {AboutComponent} from '../components/about/about.component';
import {GalleryComponent} from '../components/gallery/gallery.component';
import {WelcomeComponent} from '../components/welcome/welcome.component';
import {LookForFriendsComponent} from '../components/look-for-friends/look-for-friends.component';
import {ParentsFormComponent} from '../components/parents-form/parents-form.component';
import {PersonalAreaComponent} from '../components/personal-area/personal-area.component';
import {ThisWeekComponent} from '../components/this-week/this-week.component';


const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {
        path: 'home', component: HomeComponent, children: [
        {path: 'about', component: AboutComponent},
        {path: 'gallery', component: GalleryComponent},
        {path: 'form', component: ParentsFormComponent},
        {path: 'look-for-friends', component: LookForFriendsComponent},
        {path: 'this-week', component: ThisWeekComponent},
        {
            path: 'presonal-area', component: PersonalAreaComponent
        }
    ]
    },
    {path: '**', redirectTo: '/' }
];

export const AppRoutes = RouterModule.forRoot(routes);

