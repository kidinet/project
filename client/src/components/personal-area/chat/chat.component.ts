import { Component, OnInit } from '@angular/core';
import { AdService, } from '../../../services/ad.service';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
export class AdListing {
  title = 'Your Title'
  content = 'Ad Content'
  price = 5.00
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {

  ad: any;
  adForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adService: AdService) { }
    
  startNewAdListing() {
   this.ad = this.adService.createAd()
   this.buildForm()
  }
  saveAdChanges() {
    if (this.adForm.status != 'VALID') {
      console.log('form is not valid, cannot save to database')
      return
    }
    const data = this.adForm.value
    this.adService.updateAd(this.ad, data)
  }
  private buildForm() {
    this.adForm = this.fb.group({
      title: ['',],
      content: ['',],
      price: ['',],
      image: ['',]
    });
    this.ad.subscribe(ad => {
      this.adForm.patchValue(ad)
    })
  }
}