import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
      {
            path: '',
            loadComponent: () =>
                  import('./pedidos/pedidos.list.component/pedidos.list.component')
                        .then(m => m.PedidosListComponent)
      },
      {
            path: 'novo',
            canActivate: [authGuard],
            loadComponent: () =>
                  import('./pedidos/pedidos.form.component/pedidos.form.component')
                        .then(m => m.PedidosFormComponent)
      }
];