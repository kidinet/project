import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ApiService} from '../../services/api.service';
import {AboutTitle} from '../../entities/about/aboutTitles';
import * as appGlobalsService from '../../store/app-globals';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    constructor(private builder: FormBuilder, private apiService: ApiService) {
    }

    @ViewChild('titleElement') titleElement: ElementRef;
    titles: AboutTitle[]
    isLoading = false;
    newAboutTitle = {
        title: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required),
        color: '',
        icon: ''
    }

    aboutTitleForm = this.builder.group({
        title: this.newAboutTitle.title,
        content: this.newAboutTitle.content
    })

    ngOnInit() {
        this.titles = appGlobalsService.aboutTitles;
    }
    addAboutTitle() {
        this.isLoading = true;
        this.apiService.addAboutTitle(new AboutTitle(
            this.newAboutTitle.title.value,
            this.newAboutTitle.content.value,
            this.newAboutTitle.icon,
            this.newAboutTitle.color)
        ).then(
            results => {
                this.isLoading = false;
                this.aboutTitleForm.reset();
                appGlobalsService.addAboutTitles(results.returnObject);
            }
            );
    }

    updateAboutTitle(title: AboutTitle) {
        this.apiService.updateAboutTitle(title).then(
            results => {
                this.isLoading = false;
            }
        );
        this.isLoading = true;
        title.isEditable = false;
    }

    deleteAboutTitle(title: AboutTitle) {
        this.apiService.deleteAboutTitle(title.id).then(
            results => {
                appGlobalsService.deleteAboutTitle(title)
                title.isEditable = true;
            });
    }

    editTitle(title: AboutTitle) {
        title.isEditable = true;
    }


    // set the new title style:
    setNewAboutTitleColor(color: string) {
        this.newAboutTitle.color = color;
    }

    setNewAboutTitleIcon(icon: string) {
        this.newAboutTitle.icon = icon;
    }


    // set exist title style:
    setTitleColor(color, title) {
        title.color = color;
    }

    setTitleIcon(icon, title) {
        title.icon = icon;
    }

    // pipe
    get appGlobalsService() {
        return appGlobalsService
    }
}
