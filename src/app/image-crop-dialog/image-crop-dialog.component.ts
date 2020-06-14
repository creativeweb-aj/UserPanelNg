import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CropperComponent, ImageCropperResult } from 'angular-cropperjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  image: any;
}

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: './image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.css']
})
export class ImageCropDialogComponent implements OnInit {

  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  imgUrl = null;
  config = {
    aspectRatio : 1/1,
    dragMode : 'move',
    background : true,
    movable: true,
    rotatable : true,
    scalable: true,
    zoomable: true,
    viewMode: 1,
    checkImageOrigin : true,
    cropmove:this.cropMoved.bind(this),
    checkCrossOrigin: true
  };

  imageUrl: string;

  constructor(
    public dialogRef: MatDialogRef<ImageCropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imageUrl = this.data.image;
  }

  cropMoved(data){
    this.imgUrl = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    
  }

  resultImage: any;
  resultResult: any;

  CropMe() {
    debugger
    this.resultResult = this.angularCropper.imageUrl;
    //this.resultImage = this.angularCropper.cropper.getCroppedCanvas()
    this.resultImage = this.angularCropper.cropper.crop();
    console.log(this.resultImage);
    this.angularCropper.exportCanvas();
    
  }

  resultImageFun(event: ImageCropperResult) {
    debugger
    let urlCreator = window.URL;
    this.resultResult = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
    this.angularCropper.cropper.getCroppedCanvas().toBlob(d => {
      debugger
      this.data.image = d;
      // this.data.image = this.resultResult;
      console.log('bolb ::: '+this.data.image);
      this.dialogRef.close();
    })
    
  }

  checkstatus(event: any) {
    debugger
    console.log(event.blob);
    if (event.blob === undefined) {
      return;
    }
    // this.resultResult = event.blob;
    let urlCreator = window.URL;
    this.resultResult = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(new Blob(event.blob)));
  }

  
}
