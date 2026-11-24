import { Routes } from '@angular/router';
import { Home } from './shared/component/home/home';
import { User } from './shared/component/user/user';
import { About } from './shared/component/about/about';
import { ProductDashboard } from './shared/component/products/product-dashboard/product-dashboard';
import { Product } from './shared/component/products/product/product';
import { ProductForm } from './shared/component/products/product-form/product-form';
import { AuthComponent } from './shared/component/auth-component/auth-component';
import { authGuard } from './shared/guard/auth-guard';
import { roleBaseAccessControlGuard } from './shared/guard/role-base-access-control-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: Home,
  },
  {
    path: 'product',
    component: ProductDashboard,
    canActivate: [authGuard, roleBaseAccessControlGuard],
    data: {
      roles: ['admin', 'buyer'],
    },
    children: [
      {
        path: 'add',
        component: ProductForm,
      },
      {
        path: ':id',
        component: Product,
      },
      {
        path: ':id/updateProduct',
        component: ProductForm,
      },
    ],
  },
  {
    path: 'user',
    component: User,
    data: {
      roles: ['superAdmin', 'admin'],
    },
  },
  {
    path: 'about',
    component: About,
  },
];
