import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './models/pedido.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'https://localhost:7101/api/pedido';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Pedido[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Pedido[]>(this.apiUrl, headers);
  }

  getById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  create(pedido: Pedido): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(this.apiUrl, pedido, headers);
  }

  update(pedido: Pedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pedido.id}`, pedido);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
