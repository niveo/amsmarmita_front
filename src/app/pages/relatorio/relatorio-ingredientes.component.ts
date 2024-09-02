import { Component, input, computed, OnInit } from '@angular/core';
import { isEmpty } from '@navegador/common/util';
import { TipoIngrediente } from '@navegador/enuns/tipoingrediente.enum';
import { TipoMedida } from '@navegador/enuns/tipomedida.enum';

@Component({
  selector: 'app-relatorio-ingredientes-component',
  templateUrl: './relatorio-ingredientes.component.html',
  styles: [
    `
      .lbl-item-titulo {
        font-weight: bold;
      }

      .item-inner {
        margin-left: 20px;
        margin-right: 20px;
        padding:  10px;
        border-bottom: 1px solid #07363d;
        border-left: 5px solid #07363d;
      }

      .item-inner span {
        font-weight: 900;
      }

      .item-inner-quantidade {
        padding-right: 10px; padding-left: 10px; font-size: 25px
      }

      .expansion-headers-align .mat-expansion-panel-header-title { 
        font-weight: 500;
      } 

      .expansion-headers-align .mat-expansion-panel-header-description {
        direction: rtl;
        padding-right: 10px; 
        font-size: 25px;
        font-weight: 500;
      } 
    `,
  ],
})
export class RelatorioIngredienteComponent implements OnInit {

  registros = input.required<any[]>();

  ngOnInit(): void {
  }

  globalRegistros = computed(() => {
    return [
      {
        "titulo": "Mercado",
        "registros": this.registros().filter(m => m.tipo === TipoIngrediente.MERCADO)
      },
      {
        "titulo": "Feira / Legumes / Verduras",
        "registros": this.registros().filter(m => m.tipo === TipoIngrediente.LEGUME_VERDURA)
      },
      {
        "titulo": "Frios / Carnes",
        "registros": this.registros().filter(m => m.tipo === TipoIngrediente.CARNE_FRIOS)
      },
      {
        "titulo": "Tempero",
        "registros": this.registros().filter(m => m.tipo === TipoIngrediente.TEMPERO)
      },
      {
        "titulo": "Outros",
        "registros": this.registros().filter(m => m.tipo === TipoIngrediente.OUTROS)
      }
    ]
  });

  calMedida(medida: TipoMedida, quantidade: number) {
    if (medida === TipoMedida.OUTROS) return ''
    if (medida === TipoMedida.g) {
      return ((quantidade / 1000).toFixed(3)) + medida.toString()
    }
    return (quantidade) + medida
  }
}
