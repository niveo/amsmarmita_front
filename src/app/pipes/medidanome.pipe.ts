import { Pipe, PipeTransform } from "@angular/core";
import { TipoMedida } from "@navegador/enuns/tipomedida.enum";

@Pipe({ name: 'medidanome', standalone: true })
export class MedidaNomePipe implements PipeTransform {

    transform(value: TipoMedida): any {
        switch (value) {
            case TipoMedida.g:
                 return `${value} - Grama(s)`;
            case TipoMedida.kg:
                return `${value} - Kilo Grama(s)`;
            case TipoMedida.l:
                return `${value.toUpperCase() } - Litro(s)`;
            case TipoMedida.ml:
                return `${value} - Mililitro(s)`;
            case TipoMedida.un:
                return `${value} - Unidade(s)`;
            case TipoMedida.dz:
                return `${value} - Duzia(s)`;
            case TipoMedida.undiv:
                return ` 1/2`;
            default:
                return "";
        }

    }
}