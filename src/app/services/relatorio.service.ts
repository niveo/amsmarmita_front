import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private readonly http = inject(HttpClient);

  carregarRelatorioView(marmitaId: string) {
    return this.http.get<any>('/relatorios/relatorio', {
      params: { marmitaId },
    });
  }

  carregarRelatorioPdf(marmitaId: string) {
    return this.http
      .get('/relatorios/relatoriopdf', {
        params: { marmitaId },
        responseType: 'blob',
        headers: { Accept: 'application/pdf' },
      })
      .subscribe((data) => importedSaveAs(data, 'marmitas.pdf'));
  }
}
