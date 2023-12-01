import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { AdmincategoryComponent } from './component/admin/admincategory/admincategory.component';
import { UsersComponent } from './component/admin/users/users.component';
import { AdminorderComponent } from './component/admin/adminorder/adminorder.component';
import { AddressComponent } from './component/address/address.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'order', component: OrderComponent, canActivate: [authGuard] },
  {
    path: 'admincategory',
    component: AdmincategoryComponent,
    canActivate: [authGuard],
  },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  {
    path: 'admincategory',
    component: AdminHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [authGuard],
  },
  {
    path: 'adminorder',
    component: AdminorderComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
