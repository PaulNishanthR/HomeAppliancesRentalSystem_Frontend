import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  // public saveProductsForOrder(): void {
  //   localStorage.setItem(
  //     'productsForOrder',
  //     JSON.stringify(this.productsForOrder)
  //   );
  //   console.log('local storage done');
  // }
  
}
