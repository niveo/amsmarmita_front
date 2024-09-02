import { Component, inject, input } from "@angular/core";
import { IngredienteModule } from "@navegador/pages/ingrediente/ingrediente.module";
import { IngredienteService } from "@navegador/services/ingrediente.service";
import { NotificationDialogService } from "amslib";
import { MSG_CONFIRMAR_EXCLUSAO } from "@navegador/common/constantes";
import { EditPratoIngredienteComponent } from "./edit-prato-ingrediente.component";
import { SharedModule } from "@navegador/shared.module";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { v4 } from "uuid";
import { isEmptyStr } from "@navegador/common/util";
import { MedidaNomePipe } from "@navegador/pipes/medidanome.pipe";

@Component({
    selector: 'app-lista-prato-ingredientes-component',
    templateUrl: './lista-prato-ingredientes.component.html',
    standalone: true,
    imports: [
        IngredienteModule,
        EditPratoIngredienteComponent,
        SharedModule,
        MatBottomSheetModule,
        MedidaNomePipe
    ],
})
export class ListaPratoIngredientesComponent {

    readonly service = inject(IngredienteService);
    readonly modal = inject(MatBottomSheet);
    registros = input<any[]>(null);
    protected readonly _notificationDialogService = inject(
        NotificationDialogService,
    );


    remover(item: any) {
        let index = null
        if (!isEmptyStr(item._id)) {
            index = this.registros().findIndex(f => f._id === item._id)
        } else {
            index = this.registros().findIndex(f => f.temp === item.temp)
        }
        if (index)
            this.registros().splice(index, 1)
    }

    incluir() {
        this.modal.open(EditPratoIngredienteComponent).afterDismissed().subscribe(data => {
            if (data) {
                this.registros().push({ ...data, temp: v4().toString() })
            }
        })
    }

    removerRegistro(item: any) {
        this._notificationDialogService
            .confirmation({ mensagem: MSG_CONFIRMAR_EXCLUSAO })
            .afterClosed()
            .subscribe((response: boolean) => {
                if (response) this.remover(item);
            });
    }

    editar(data: any) {
        this.modal.open(EditPratoIngredienteComponent, { data: data }).afterDismissed().subscribe(data => {
            if (data) {
                if (data._id) {
                    const value = this.registros().find(f => f._id === data._id)
                    value.ingrediente = data.ingrediente
                    value.medida = data.medida
                    value.quantidade = data.quantidade
                }
            }
        })
    }
}