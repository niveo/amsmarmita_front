import { Component, input, inject } from '@angular/core';
import { TOKEN_PATH_IMAGEKIT } from '@navegador/common/tokens';
import { ImagekitioAngularModule } from 'imagekit-angular';

@Component({
  selector: 'app-imagem-component',
  template: `<ik-image
    matListItemAvatar
    [path]="folder() || pathInject + '/' + fileName()"
    width="32"
    [queryParameters]="queryParameters()"
  ></ik-image>`,
  standalone: true,
  imports: [ImagekitioAngularModule],
})
export class ImagemComponent {
  readonly pathInject = inject(TOKEN_PATH_IMAGEKIT);

  folder = input<string>();
  fileName = input.required<string>();
  queryParameters = input<any>();
}
