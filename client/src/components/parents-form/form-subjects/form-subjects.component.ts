import {Component, OnInit} from '@angular/core';
import {FormSubject} from '../../../entities/form/formSubject';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
    selector: 'app-form-subjects',
    templateUrl: './form-subjects.component.html',
    styleUrls: ['./form-subjects.component.scss']
})
export class FormSubjectsComponent implements OnInit {

    constructor() {
    }

    isExpanded = false;
    searchControl = new FormControl();

    formSubjects: FormSubject[] = [
        new FormSubject('אבל?', 'אחת האמהות', '01/01/18', 5),
        new FormSubject('לא?', 'אחת האמהות', '01/01/18', 5),
        new FormSubject('כן?', 'אחת האמהות', '01/01/18', 5),
        new FormSubject('כדאי?', 'אחת האמהות', '01/01/18', 5),
        new FormSubject('איפה?', 'אחת האמהות', '01/01/18', 5),
    ];

    filteredOptions: Observable<FormSubject[]>;

    ngOnInit() {
        this.filteredOptions = this.searchControl.valueChanges
            .pipe(
                startWith<string | FormSubject>(''),
                map(value => typeof value === 'string' ? value : value.text),
                map(text => text ? this.filter(text) : this.formSubjects.slice())
            );
    }

    filter(text: string): FormSubject[] {
        return this.formSubjects.filter(option =>
        option.text.toLowerCase().indexOf(text.toLowerCase()) === 0);
    }

    displayFn(formSubject?: FormSubject): string | undefined {
        return formSubject ? formSubject.text : undefined;
    }

    toggleShowDetails() {
        this.isExpanded = !this.isExpanded;
    }

    chooseOption(event) {
        console.log(event)
    }

}
