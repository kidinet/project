import {Component, OnInit} from '@angular/core';
import {FormSubject} from '../../../entities/form/formSubject';
import {FormReply} from  '../../../entities/form/forunReply';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import * as appGlobalsService from '../../../store/app-globals';
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
    limitToLast = 8;
    path = `${appGlobalsService.currentGroup.groupId}/forum`;
    //
    // new dilemma:
    newDilemmaTitle = '';
    isShowNew = false;


// =====================mock  ================================
    formSubjects: FormSubject[] = [
        new FormSubject('אבל?', 'אחת האמהות', '01/01/18'),
        new FormSubject('לא?', 'אחת האמהות', '01/01/18'),
        new FormSubject('כן?', 'אחת האמהות', '01/01/18'),
        new FormSubject('כדאי?', 'אחת האמהות', '01/01/18'),
        new FormSubject('איפה?', 'אחת האמהות', '01/01/18'),
    ];

    filteredOptions: Observable<FormSubject[]>;

    constructor(public af: AngularFireDatabase) {
        this.items = af.list(this.path, {
            // preserveSnapshot: true,
            query: {
                limitToLast: this.limitToLast
            }
        });

    }

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

    displayFn(formSubject ?: FormSubject): string | undefined {
        return formSubject ? formSubject.text : undefined;
    }

    toggleShowDetails() {
        this.isExpanded = !this.isExpanded;
    }

    chooseOption(event) {
        console.log(event);
    }

// ===============================================================
    createNewDilemma() {
        this.items.push(new FormSubject(this.newDilemmaTitle, appGlobalsService.currentUser.mail, new Date().toString()));
        this.newDilemmaTitle = '';
        this.isShowNew = false;
    }

    showForumReplys(index, item) {
        let snapshotKey;
        this.items
            .subscribe(snapshots => {
                // snapshotKey = snapshots.find(snapshot => {
                //         console.log(snapshot, item, snapshot === item, 'snapshot');
                //         // console.log(snapshot['key']);
                //         return snapshot === item;
                //     }
                // );
                console.log(index, item)
                console.log(snapshots[index]['$key']);
                console.log(item['$key']);
            });
        // const uid = '-L5hjWTQWJAy3YxTVIWB';
        // const list = this.af.list(`${appGlobalsService.currentGroup.groupId}/forum/${uid}/replys`);
        // list.push(new FormReply('התגובה שליייייי1111', appGlobalsService.currentUser.mail, new Date().toString()));
        // list.push(new FormReply('התגובה שליייייי1111', appGlobalsService.currentUser.mail, new Date().toString()));
    }

    // ==================pipes===========
    get moment() {
        return moment;
    }
}
