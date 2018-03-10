import {Component, Inject, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';
import {ImagesService} from '../../../services/images.service';
import * as appGlobalsService from '../../../store/app-globals'

@Component({
    selector: 'app-add-new-image',
    templateUrl: './add-new-image.component.html',
    styleUrls: ['./add-new-image.component.scss']
})
export class AddNewImageComponent implements OnInit {

    @ViewChild('imageToCanvas') imageToCanvas
    @ViewChild('canvas') canvas;
    subject = '';
    imageSrc = '';
    isLoading = false;
    resultMessage = ''

    constructor(public dialogRef: MatDialogRef<AddNewImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private apiService: ApiService,
        public imagesService: ImagesService) {
    }

    ngOnInit() {

    }

    setImageSrc(e) {
        this.isLoading = true;
        this.resultMessage = '';
        this.imageSrc = "";
        const oFReader = new FileReader();
        oFReader.readAsDataURL(e.target.files[0]);
        oFReader.onload = (oFREvent) => {
            this.imageSrc = oFREvent.target['result'];
            setTimeout(() => {
                this.isLoading = false;
                this.imageSrc = this.imagesService.createCanvas(this.canvas, this.imageSrc);
                console.log("scale2");
            }, 50);
        };
    }

    createImage() {
        const toDataURL = this.canvas.nativeElement.toDataURL();
        // .replace(/^data:image\/(png|jpg);base64,/, '')
        this.isLoading = true;
        this.apiService.addImageToGallery(toDataURL, this.subject).then(result => {
            this.resultMessage = result["Success"] ? 'התמונה נוספה לאוסף התמונות שלך' : 'לא ניתך להוסיף תמונה זו';
            appGlobalsService.addImage(result["returnObject"])
            this.isLoading = false;
            this.subject = "";
            this.imageSrc = "";
            const ctx = this.canvas.nativeElement.getContext('2d')
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        });
    }

}
