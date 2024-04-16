import { NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, input, inject } from '@angular/core';
import {
  TOKEN_PATH_IMAGEKIT,
  TOKEN_PATH_IMAGEKIT_END_POINT,
} from '@navegador/common/tokens';
import { isBooleanTransform, objectToUrl } from '@navegador/common/util';

/**
 * Implementado apartir de
 * https://medium.com/@pavel.salauyou/configuring-imagekit-io-loader-for-ngoptimizedimage-and-manipulate-images-on-the-fly-in-angular-a0e073ab9c69
 */
@Component({
  selector: 'app-imagem-component',
  template: `
    <img
      [width]="width()"
      [height]="heightInside"
      style="width: 100%;"
      [id]="id"
      [ngStyle]="{ 'border-radius': borderRadius() ? '50px' : 'none' }"
    />
  `,
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
})
export class ImagemComponent {
  readonly pathInject = inject(TOKEN_PATH_IMAGEKIT);
  readonly pathInjectEndPoint = inject(TOKEN_PATH_IMAGEKIT_END_POINT);

  static nextId = 0;
  readonly id: string = `image_id_${ImagemComponent.nextId++}`;

  folder = input<string>();
  fileName = input.required<string>();
  borderRadius = input(false, { transform: isBooleanTransform });
  animation = input(false, { transform: isBooleanTransform });

  queryParameters = input<any>();

  heightInside = '0';
  width = input('40');
  height = input('40');

  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry: any) => {
      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        const image: HTMLImageElement = entry.target;
        observer.unobserve(image);

        if (image.hasAttribute('src')) {
          // Image has been loaded already
          return;
        }

        const sourceUrl = image.getAttribute('data-src');
        image.setAttribute('src', sourceUrl);

        image.onerror = () => {
          image.style.display = 'none';
        };

        image.onload = () => {
          if (this.animation()) image.style.transition = 'height 1s';

          image.style.height = `${this.height()}px`;
        };

        // Removing the observer
        observer.unobserve(image);
      }
    });
  });

  ngOnInit() {
    setTimeout(() => {
      const sanitezeUrl = `${this.pathInjectEndPoint}/${this.folder() || this.pathInject}/${this.fileName()}${this.queryParameters() ? '?' + objectToUrl(this.queryParameters()) : ''}`;

      const image = document.getElementById(this.id);
      image.setAttribute('data-src', sanitezeUrl);

      this.observer.observe(image);
    }, 300);
  }
}
