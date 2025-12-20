import { Component, OnInit, signal } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { PedidoService } from '../pedido.service';
import { CommonModule } from '@angular/common';
import { Delay } from '../../delay';
import { AprovadoPipe } from '../../aprovado-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationService } from '../../notification';

@Component({
  selector: 'app-pedidos-list-component',
  imports: [
    CommonModule,
    Delay,
    AprovadoPipe,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './pedidos.list.component.html',
  styleUrl: './pedidos.list.component.scss',
  standalone: true,
})
export class PedidosListComponent implements OnInit{

  pedidos = signal<Pedido[]>([]);

  constructor(
    private readonly service: PedidoService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe({
      next: (p) => {
        this.pedidos.set(p);
      },
      error: (e) => {
        this.notificationService.error(e.headers?.get('token-error'));;
      }
    });
  }

  remover(id: number) {
    this.service.delete(id).subscribe(() => {
      this.notificationService.success('Pedido removido!');
      this.pedidos.update(x => x.filter(p => p.id !== id));
    });
  }

}
