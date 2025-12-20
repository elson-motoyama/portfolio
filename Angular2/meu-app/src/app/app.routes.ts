import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
       {
            path: '',
            loadComponent: () =>
                  import('./login/login.component')
                        .then(m => m.LoginComponent)
      },
      {
            path: 'lista',
            loadComponent: () =>
                  import('./pedidos/pedidos-list/pedidos-list.component')
                        .then(m => m.PedidosListComponent)
      },
      {
            path: 'novo',
            canActivate: [AuthGuard],
            loadComponent: () =>
                  import('./pedidos/pedidos-form/pedidos-form.component')
                        .then(m => m.PedidosFormComponent)
      }
];