import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Archivo } from '../models/archivo';

@Injectable({
  providedIn: 'root',
})
export class ArchivosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'archivos' + '/';
    /* this.resourceUrl = 'https://pav2.azurewebsites.net/api/archivos/' */
  }

  get() {
    let params = new HttpParams();
    return this.httpClient.get(this.resourceUrl, { params: params });
  }

  getById(id: number) {
    return this.httpClient.get(this.resourceUrl + id);
  }

  put(id: number, obj: Archivo) {
    return this.httpClient.put(this.resourceUrl + id, obj);
  }
}
