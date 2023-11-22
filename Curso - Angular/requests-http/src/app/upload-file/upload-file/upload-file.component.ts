import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files: Set<File> = new Set();
  progress: number = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit() {}

  onChange(event: any) {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      this.files = new Set(selectedFiles);
    } else {
      this.files.clear();
    }
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:8000/upload')
      .pipe(
        uploadProgress(progress => this.progress = progress),
        filterResponse()
      )
      .subscribe(response => console.log('Upload Concluído'));
    }
  }

}
