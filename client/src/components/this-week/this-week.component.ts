import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ThisDayContent} from '../../entities/thisDay/thisDayContent';
import {ThisDayOfGroup} from '../../entities/thisDay/thisDayOfGroup';
import * as moment from 'moment';
import * as appGlobalsService from '../../store/app-globals';
import * as appGlobalsStyle from '../../store/app-global-style';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

moment.locale('he');
@Component({
    selector: 'app-this-week',
    templateUrl: './this-week.component.html',
    styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent implements OnInit {

    constructor(private apiService: ApiService,
        public af: AngularFireDatabase) {
    }
    items: FirebaseListObservable<any>;


    displayDay = new Date();
    isEditable = appGlobalsService.isAdministrator;
    isLoading = false;
    dateData: string;
    newTitle: ThisDayOfGroup = new ThisDayOfGroup(null, null, null, 'fa fa-question-circle');



    ngOnInit() {
        this.dateData = moment(this.displayDay).locale('en').format("MMM Do YY").toString().replace(/ /g, '');
        const path = `${appGlobalsService.currentGroup.id}/thisDay`;
        this.items = this.af.list(path);

        // this.items.forEach(item => {
        //     this.items.remove(item.$key)
        // })

    }

    get currentDay() {
        return moment(this.displayDay).format('dddd');
    }
    get currentDate() {
        return moment(this.displayDay).format('MMM Do YY');
    }
    get appGlobalsService() {
        return appGlobalsService;
    }
    get appGlobalsStyle() {
        return appGlobalsStyle;
    }
    getColor(event: string, title: any) {
        title.color = event;
        title.isStyleOpen = false;
        this.updateThisDayOfGroupTitle(title);
        title.isStyleOpen = true;
    }
    getIcon(event: string, title: any) {
        title.icon = event;
        title.isStyleOpen = false;
        this.updateThisDayOfGroupTitle(title);
        title.isStyleOpen = true;
    }
    toggleStyleOpen(title) {
        if (appGlobalsService.isAdministrator) {
            title.isStyleOpen = !title.isStyleOpen;
        }
    }


    nextDay() {
        this.displayDay.setDate(this.displayDay.getDate() + 1);
        this.dateData = moment(this.displayDay).locale('en').format("MMM Do YY").toString().replace(/ /g, '');
        if (this.displayDay.getDay() === 6) {
            this.nextDay();
        }
    }
    prevDay() {
        this.displayDay.setDate(this.displayDay.getDate() - 1);
        this.dateData = moment(this.displayDay).locale('en').format("MMM Do YY").toString().replace(/ /g, '');
        if (this.displayDay.getDay() === 6) {
            this.prevDay();
        }
    }
    removeTitle(title) {
        this.items.remove(title.$key);
    }

    updateThisDayOfGroupTitle(titleOfGroup) {
        this.items.update(this.items.$ref.ref.child(titleOfGroup['$key']), titleOfGroup);
    }

    addNewTitle() {
        this.newTitle[this.dateData] = this.newTitle[this.dateData] ? this.newTitle[this.dateData] : ""
        if (this.newTitle.title) {
            this.items.push(this.newTitle);
            this.newTitle = new ThisDayOfGroup(null, null, null, 'fa fa-question-circle');
            this.newTitle.icon = this.newTitle.setIcon();
        }
    }


}
