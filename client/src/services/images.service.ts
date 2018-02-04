import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import {Observable} from "rxjs/Observable";


@Injectable()
export class ImagesService {

    constructor() {
    }

    createCanvas(canvasElement, imageSrc) {
        const canvas = canvasElement.nativeElement;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = imageSrc;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL();
    }

    rotate(deg, canvasElement, imageSrc) {
        const canvas = canvasElement;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const image = new Image();
        image.src = imageSrc;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        context.translate(cx, cy);
        context.rotate(deg * Math.PI / 180);
        context.translate(-cx, -cy);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    scale(scaleHeight, canvasElement, imageSrc) {
        const canvas = canvasElement;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const image = new Image();
        image.src = imageSrc;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        context.translate(cx, cy);
        context.scale(scaleHeight, scaleHeight);
        context.translate(-cx, -cy);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    translate(x, y, canvasElement, imageSrc) {
        const canvas = canvasElement;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const image = new Image();
        image.src = imageSrc;
        context.translate(x, y);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
}

