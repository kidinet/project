import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormSubject} from '../../../entities/form/formSubject';
import {FormReply} from  '../../../entities/form/forunReply';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import * as appGlobalsService from '../../../store/app-globals';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';
import * as moment from 'moment';
moment.locale('he');

@Component({
    selector: 'app-form-subjects',
    templateUrl: './form-subjects.component.html',
    styleUrls: ['./form-subjects.component.scss']
})
export class FormSubjectsComponent implements OnInit {
    // list option:
    isExpanded = false;
    searchControl = new FormControl();
    //
    // forum items:
    items: FirebaseListObservable<FormSubject[]>;
    path = `${appGlobalsService.currentGroup.groupId}/forum`;
    @Output() selectForumDilemma = new EventEmitter<any>();
    selectedForumKey: string;
    //
    // new dilemma:
    isShowNew = false;

    // form declare:
    newDilemaTitle = new FormControl('');
    newDilemaContent = new FormControl('')
    newDilemaaForm = this.builder.group({
        newDilemaTitle: this.newDilemaTitle,
        newDilemaContent: this.newDilemaContent
    });

    filteredOptions: Observable<FormSubject[]>;
    formSubjects: FormSubject[] = [];

    constructor(public af: AngularFireDatabase,
        private builder: FormBuilder) {
        this.items = af.list(this.path);
    }

    ngOnInit() {
        this.items.subscribe(items => {
            this.formSubjects = items;
            this.filteredOptions = this.searchControl.valueChanges
                .pipe(
                startWith<string | FormSubject>(''),
                map(value => typeof value === 'string' ? value : value.text),
                map(text => text ? this.filter(text) : this.formSubjects.slice().reverse())
                );
        });
    }

    filter(text: string): FormSubject[] {
        return this.formSubjects.reverse().filter(option =>
            option.title.toLowerCase().indexOf(text.toLowerCase()) === 0);
    }

    displayFn(formSubject?: FormSubject): string | undefined {
        return formSubject ? formSubject.text : undefined;
    }

    toggleShowDetails() {
        this.isExpanded = !this.isExpanded;
    }

    // ===============================================================
    createNewDilemma() {
        this.items.push(new FormSubject(this.newDilemaaForm.value['newDilemaTitle'], this.newDilemaaForm.value['newDilemaContent'], appGlobalsService.currentUser.mail, new Date().toString()));
        this.newDilemaaForm.reset();
        this.isShowNew = false;
    }
    cancel() {
        this.newDilemaaForm.reset();
        this.isShowNew = false;
    }

    showForumReplys(item) {
        this.selectedForumKey = item['$key'];
        this.selectForumDilemma.emit(item);
    }

    // ==================pipes===========
    get moment() {
        return moment;
    }

    get usersDetails() {
        let usersInCurrentGroup = {};
        appGlobalsService.usersInCurrentGroup.forEach(user => {
            usersInCurrentGroup[user.mail] = `${user.firstName} ${user.lastName}`
        })
        return usersInCurrentGroup;
    }
}
