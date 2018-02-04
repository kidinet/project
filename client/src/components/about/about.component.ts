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
export class AboutComponent implements OnInit, AfterViewInit {

    constructor(private builder: FormBuilder, private apiService: ApiService) {
    }

    @ViewChild('titleElement') titleElement: ElementRef;
    @ViewChild('textArea') textArea: ElementRef;
    textareaSize = 20;
    titles: AboutTitle[]
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
        this.titles = appGlobalsService.getAboutTitles();
    }

    ngAfterViewInit() {
        this.textArea.nativeElement.addEventListener('keydown', (event) => {
            setTimeout(() => {
                this.textareaSize = this.textArea.nativeElement.scrollHeight;
            }, 0);
        });

        setTimeout(() => {
            this.textareaSize = this.textArea.nativeElement.scrollHeight + 5;
        }, 0);
    }

    addAboutTitle() {
        /*
         this.apiService.addAboutTitle(new AboutTitle(this.newAboutTitle.color, this.newAboutTitle.title.value, this.newAboutTitle.content.value, this.newAboutTitle.icon, null)).then(
         results => {
         console.log(results);
         }
         );
         */

    }

    updateAboutTitle(title: AboutTitle) {
        /* this.apiService.updateAboutTitle(title).then(
         results => {
         title.isDisabled = true;
         }
         );*/
        title.isDisabled = true;

    }

    deleteAboutTitle(title: AboutTitle) {
        /*
         this.apiService.deleteAboutTitle(title.id).then(
         results => {
         title.isDisabled = true;
         }
         );*/

    }

    editTitle(title: AboutTitle) {
        title.isDisabled = false;
    }

    getStyle() {
        return `${this.textareaSize}px`;
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
}
