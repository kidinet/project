import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parents-form',
  templateUrl: './parents-form.component.html',
  styleUrls: ['./parents-form.component.scss']
})
export class ParentsFormComponent implements OnInit {
  selectedForumDilemma = null;
  constructor() { }

  ngOnInit() {
   
  }
  selectForumDilemma(item) {
    this.selectedForumDilemma = item;
  }
}
