import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pratos-form-composicao-component',
  templateUrl: './pratos-form-composicao.component.html',
})
export class PratosFormComposicaoComponent {
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  @Output()
  eventAtualizarComposicao = new EventEmitter<string[]>();

  @Input()
  composicoes: string[] = [];

  handleClose(removedTag: {}): void {
    this.composicoes = this.composicoes.filter((tag) => tag !== removedTag);
    this.eventAtualizarComposicao.emit(this.composicoes);
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
    if (this.inputValue && this.composicoes.indexOf(this.inputValue) === -1) {
      this.composicoes = [...this.composicoes, this.inputValue];
    }
    this.eventAtualizarComposicao.emit(this.composicoes);
    this.inputValue = '';
    this.inputVisible = false;
  }
}
