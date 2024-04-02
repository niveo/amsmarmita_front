import {
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-pratos-form-composicao-component',
  templateUrl: './pratos-form-composicao.component.html',
})
export class PratosFormComposicaoComponent {
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  composicoes = input<string[]>([]);
  composicoesChange = output<string[]>();

  handleClose(removedTag: {}): void {
    this.composicoesChange.emit(
      this.composicoes().filter((tag) => tag !== removedTag),
    );
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    let comp;
    if (this.inputValue && this.composicoes().indexOf(this.inputValue) === -1) {
      comp = [...this.composicoes(), this.inputValue];
    }
    this.composicoesChange.emit(comp!);
    this.inputValue = '';
    this.inputVisible = false;
  }
}
