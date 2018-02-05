import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import * as moment from 'moment';
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

    ngOnInit() {

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
        this.apiService.updateThisDayTitles(this.displayDay, this.thisDayTitles);
    }


}
