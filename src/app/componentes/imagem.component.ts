import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component, input, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TOKEN_PATH_IMAGEKIT } from '@navegador/common/tokens';
import { objectToUrl } from '@navegador/common/util';

/**
 * Implementado apartir de
 * https://medium.com/@pavel.salauyou/configuring-imagekit-io-loader-for-ngoptimizedimage-and-manipulate-images-on-the-fly-in-angular-a0e073ab9c69
 */
@Component({
  selector: 'app-imagem-component',
  template: `
    <img
      [ngSrc]="src"
      width="40"
      height="40"
      style="border-radius: 50px;"
      priority
    />
  `,
  standalone: true,
  imports: [NgOptimizedImage, JsonPipe],
})
export class ImagemComponent {
  readonly pathInject = inject(TOKEN_PATH_IMAGEKIT);

  private readonly domSanitizer = inject(DomSanitizer);

  src: any;

  folder = input<string>();
  fileName = input.required<string>();

  queryParameters = input<any>();

  ngOnInit() {
    const sanitezeUrl =
      (this.folder() || this.pathInject) +
      '/' +
      this.fileName() +
      (this.queryParameters() ? '?' + objectToUrl(this.queryParameters()) : '');
    this.src = this.domSanitizer.bypassSecurityTrustUrl(sanitezeUrl);
  }
}
