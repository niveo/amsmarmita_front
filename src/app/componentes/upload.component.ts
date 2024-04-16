import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TOKEN_PATH_IMAGEKIT } from '@navegador/common/tokens';
import { ImagekitioAngularModule } from 'imagekit-angular';
import { lastValueFrom } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MSG_ERRO_PROCSSAMENTO } from '@navegador/common/constantes';
import { NotificationService } from 'amslib';
 

@Component({
  selector: 'app-upload-component',
  template: `<ik-upload
      [fileName]="fileName()"
      [useUniqueFileName]="false"
      [buttonRef]="myBtn"
      [overwriteFile]="true"
      [authenticator]="authenticator"
      [folder]="folder() || pathInject"
      (onError)="handleUploadError($event)"
      (onSuccess)="handleUploadSuccess($event)"
      [validateFile]="validateFileFunction"
      (onUploadStart)="onUploadStartFunction($event)"
      [onUploadProgress]="onUploadProgressFunction"
    ></ik-upload>
    <div #myBtn matRipple class="image-content elevation-2">
      @if (!loading()) {
        <ik-image
          [path]="folder() || pathInject + '/' + fileName()"
          [queryParameters]="queryParameters"
          width="100"
        ></ik-image>
      } @else {
        <mat-spinner [diameter]="34" />
      }
    </div> `,
  styles: [
    `
      .image-content {
        cursor: pointer;
        height: 100px;
        width: 100px;
        padding: 10px;
        margin: 5px;

        justify-content: center;
        display: flex;
        align-items: center;
      }
    `,
  ],
  standalone: true,
  imports: [
    ImagekitioAngularModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatRippleModule,
  ],
})
export class UploadComponent implements OnInit {
  readonly pathInject = inject(TOKEN_PATH_IMAGEKIT);
  folder = input<string>();
  fileName = input.required<string>();
  queryParameters;

  private readonly http = inject(HttpClient);

  private readonly messageSnackBarService = inject(NotificationService);

  loading = signal(false);

  ngOnInit() {
    this.updateCacheImage();
  }

  updateCacheImage() {
    this.queryParameters = { updatedAt: new Date().getTime() };
  }

  authenticator = async () => {
    try {
      const response = await lastValueFrom(
        this.http.get<{ signature: string; expire: string; token: string }>(
          '/auth/authimagekit2',
        ),
      );

      return response;
    } catch (error) {
      throw new Error(`Authentication request failed: ${error}`);
    }
  };

  validateFileFunction(res: any) {
    console.log('validating');
    if (res.size < 1000000) {
      // Less than 1mb
      return true;
    }
    return false;
  }

  onUploadStartFunction(res: any) {
    console.log('onUploadStart');
    this.loading.set(true);
  }

  onUploadProgressFunction(res: any) {
    console.log('progressing');
  }

  handleUploadSuccess(res: any) {
    console.log('File upload success with response: ', res);
    console.log(res.$ResponseMetadata.statusCode); // 200
    console.log(res.$ResponseMetadata.headers); // headers
    //this.uploadedImageSource = res.url;
    this.loading.set(false);
    this.updateCacheImage();
  }

  handleUploadError(err: any) {
    console.error('There was an error in upload: ', err);
    // this.uploadErrorMessage = 'File upload failed.';
    this.loading.set(false);
    this.messageSnackBarService.error(
      MSG_ERRO_PROCSSAMENTO,
      JSON.stringify(err),
    );
  }
}
