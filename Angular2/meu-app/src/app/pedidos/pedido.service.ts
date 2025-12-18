import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './models/pedido.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'https://localhost:7101/api/pedido';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  create(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  update(pedido: Pedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pedido.id}`, pedido);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
