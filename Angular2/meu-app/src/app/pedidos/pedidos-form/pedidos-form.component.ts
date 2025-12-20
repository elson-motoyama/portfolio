import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoService } from '../pedido.service';
import { DisplayBlockDirective } from '../../shared/directives/display-block.directive';
import { AddSpacingDirective } from '../../shared/directives/add-spacing.directive';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-pedidos-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DisplayBlockDirective,
    AddSpacingDirective,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './pedidos-form.component.html',
  styleUrl: './pedidos-form.component.scss',
  standalone: true,
})

export class PedidosFormComponent {

  pedidoForm: FormGroup;

  pedido = {
    id: 0,
    valor: 0,
    desconto: 0,
    aprovado: false,
    clienteId: 0
  };

  constructor(
    private readonly service: PedidoService,
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService
  ) {
    this.pedidoForm = this.fb.group({
      clienteId: [null],
      valor: [null, [Validators.required, Validators.min(1)]],
      desconto: [null],
      aprovado: [false]
    });
  }

  salvar() {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      return;
    }

    const pedido = this.pedidoForm.value;

    this.service.create(pedido).subscribe((response) => {
      if (response.success) {
        this.notificationService.success('Pedido salvo!');
        this.pedidoForm.reset({
          aprovado: false
        });
      }
      else {
        this.notificationService.error(response.error);
      }
    });
  }
}
