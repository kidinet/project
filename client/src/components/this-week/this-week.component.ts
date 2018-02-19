import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ThisDayContent} from '../../entities/thisDay/thisDayContent';
import {ThisDayOfGroup} from '../../entities/thisDay/thisDayOfGroup';
import * as moment from 'moment';
import * as appGlobalsService from '../../store/app-globals';
import * as appGlobalsStyle from '../../store/app-global-style';
moment.locale('he');
@Component({
    selector: 'app-this-week',
    templateUrl: './this-week.component.html',
    styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent implements OnInit {

    constructor(private apiService: ApiService) {
    }

    displayDay = new Date();
    isEditable = true;
    isLoading = false;
    newTitle: ThisDayOfGroup = new ThisDayOfGroup(null, null, null, 'fa fa-question-circle');

    get currentDay() {
        return moment(this.displayDay).format('dddd');
    }

    get currentDate() {
        return moment(this.displayDay).format('MMM Do YY');
    }

    get thisDayOfGroupArray() {
        return appGlobalsService.thisDayOfGroupArray;
    }

    get thisDayContentArray() {
        let map = {};
        appGlobalsService.thisDayOfGroupArray.forEach(element => {
            let thisDay: ThisDayContent;
            thisDay = appGlobalsService.thisDayContentArray.find((item) => {
                return item.titleId == element.id;
            });
            if (!thisDay) {
                thisDay = new ThisDayContent(this.displayDay, element.id, '');
                appGlobalsService.addThisDayContent(thisDay);
            }
            map[element.id] = thisDay
        });
        return map;
    }

    get appGlobalsService() {
        return appGlobalsService;
    }
    get appGlobalsStyle(){
        return appGlobalsStyle;
    }

    getColor(event: string, title: any) {
        title.color = event;
    }

    getIcon(event: string, title: any) {
        title.icon = event;
    }

    toggleStyleOpen(title) {
        title.isStyleOpen = !title.isStyleOpen;
    }

    ngOnInit() {
       // this.apiService.getDisplayDayParam(this.displayDay).then(result=>{
       //     appGlobalsService.initThisDayOfGroupArray(result.returnOject);
       // })
    }

    nextDay() {
        this.displayDay.setDate(this.displayDay.getDate() + 1);
        if (this.displayDay.getDay() === 6) {
            this.nextDay();
        }
        this.isLoading = true;
        this.apiService.getDisplayDayParam(this.displayDay).then(result => {
            this.displayDay = result.returnObject;
            this.isLoading = false;
        });
    }

    prevDay() {
        this.displayDay.setDate(this.displayDay.getDate() - 1);
        if (this.displayDay.getDay() === 6) {
            this.prevDay();
        }
        this.isLoading = true;
        this.apiService.getDisplayDayParam(this.displayDay).then(result => {
            this.displayDay = result.returnObject;
            this.isLoading = false;
        });
    }


    updateThisDayTitle(thisDayTitle) {
        this.apiService.updateThisDayTitle(thisDayTitle);
    }

    updateThisDayOfGroupTitle(titleOfGroup) {
         this.apiService.updateThisDayOfGroupTitle(titleOfGroup);
    }

    addNewTitle() {
        if (this.newTitle.title) {
            this.newTitle.icon = this.newTitle.setIcon();
            this.isLoading = true;
            this.apiService.addThisDayOfGroupTitle(this.newTitle).then(result => {
                appGlobalsService.addThisDayOfGroup(result.retureObject);
                this.newTitle = new ThisDayOfGroup(null, null, null, 'fa fa-question-circle');
                this.isLoading = false;
            })
        }
    }


}
