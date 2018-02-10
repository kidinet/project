import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ThisDayContent} from '../../entities/thisDay/ThisDayContent';
import * as moment from 'moment';
import * as appGlobalsService from '../../store/app-globals';
moment.locale('he');
@Component({
    selector: 'app-this-week',
    templateUrl: './this-week.component.html',
    styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent implements OnInit {

    constructor(private apiService: ApiService) {
    }

    thisDayTitles = {
        'eat_morning': {title: 'בלה בוקר בוקר בוקר'},
        'eat_noon': {title: 'תהריים צהרים צהרים'},
        'learn': {title: 'ללמוד, ללמוד '},
        'read': {title: 'בלה בוקר לקרוא בוקר'},
        'do': {title: 'בלה בוקר לקרוא בוקר'},
        'game': {title: 'בלה בוקר לקרוא בוקר'},
        'sing': {title: 'בלה בוקר לקרוא בוקר'},
        'subjects': {title: 'בלה בוקר לקרוא בוקר'},
    }

    displayDay = new Date();
    isEditable = true;
    isLoading = false;

    get currentDay() {
        return moment(this.displayDay).format('dddd');
    }

    get currentDate() {
        return moment(this.displayDay).format('MMM Do YY');
    }
     get thisDayOfGroupArray(){
        return appGlobalsService.thisDayOfGroupArray;
    }
     get thisDayContentArray(){
     let map = {};
        appGlobalsService.thisDayOfGroupArray.forEach(element => {
             let thisDay: ThisDayContent;
             thisDay= appGlobalsService.thisDayContentArray.find((item) => {
                return item.titleId==element.id;
             });
             if(!thisDay){
                thisDay= new ThisDayContent(this.displayDay,element.id,'');
                 appGlobalsService.addThisDayContent(thisDay);
              }
              map[element.id] = thisDay
        });
        return map;
    }

    ngOnInit() {
      console.log(this.thisDayOfGroupArray);
    //  console.log(this.thisDayContentArray);
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


    updateThisDayTitles() {
       // this.apiService.updateThisDayTitles(this.displayDay, this.thisDayTitles);
       console.log(this.thisDayContentArray);
    }
    

}
