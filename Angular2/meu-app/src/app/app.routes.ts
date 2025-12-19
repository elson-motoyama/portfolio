import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
       {
            path: '',
            loadComponent: () =>
                  import('./login/login')
                        .then(m => m.LoginComponent)
      },
      {
            path: 'lista',
            loadComponent: () =>
                  import('./pedidos/pedidos.list.component/pedidos.list.component')
                        .then(m => m.PedidosListComponent)
      },
      {
            path: 'novo',
            canActivate: [AuthGuard],
            loadComponent: () =>
                  import('./pedidos/pedidos.form.component/pedidos.form.component')
                        .then(m => m.PedidosFormComponent)
      }
];