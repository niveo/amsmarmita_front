import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { isEmptyStr } from "@navegador/common/util";
import { TipoMedida } from "@navegador/enuns/tipomedida.enum";
import { Ingrediente } from "@navegador/model";
import { MedidaNomePipe } from "@navegador/pipes/medidanome.pipe";
import { IngredienteService } from "@navegador/services/ingrediente.service";
import { SharedModule } from "@navegador/shared.module";

@Component({
    selector: 'app-edit-prato-ingrediente-component',
    templateUrl: './edit-prato-ingrediente.component.html',
    standalone: true,
    imports: [
        SharedModule,
        MatDialogModule,
        MedidaNomePipe
    ]

})
export class EditPratoIngredienteComponent {

    private readonly modal = inject(MatDialog);
    private readonly service = inject(IngredienteService);
    readonly data = inject(MAT_BOTTOM_SHEET_DATA);
    private _bottomSheetRef =
        inject<MatBottomSheetRef<EditPratoIngredienteComponent>>(MatBottomSheetRef);
    medidas = Object.values(TipoMedida)
    protected readonly formBuilder = inject(FormBuilder);
    allIngredientes: Ingrediente[] = [];

    form: FormGroup<{
        _id: FormControl<string | null>;
        quantidade: FormControl<number | null>;
        medida: FormControl<string | null>;
        ingrediente: FormControl<string | null>;
    }> = this.formBuilder.group({
        _id: [''],
        quantidade: [],
        medida: [],
        ingrediente: ['', Validators.required]
    });

    constructor() {
        this.service.data$.subscribe((response) => {
            this.allIngredientes = response;
            if (this.data) {
                this.form.setValue({
                    _id: this.data._id,
                    ingrediente: this.data.ingrediente._id,
                    medida: this.data['medida'] || null,
                    quantidade: this.data['quantidade'] || null
                })
            }
        });
    }

    salvar() {
        if (!this.form.valid) return;
        const data = {}
        if (!isEmptyStr(this.form.value._id)) {
            data['_id'] = this.form.value._id
        }
        data['ingrediente'] = this.allIngredientes.find(f => f._id === this.form.value.ingrediente)
        data['medida'] = this.form.value.medida
        data['quantidade'] = this.form.value.quantidade
        this._bottomSheetRef.dismiss(data)
    }
}