import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { UserhomeService } from 'src/app/service/userhome.service';
import { Product } from 'src/app/model/product';
import { AppResponse } from 'src/app/model/appResponse';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private userHomeService: UserhomeService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  search: string = ''; // Define the 'search' property

  products: Product[] = [];
  originalProducts: Product[] = [];

  postCart(productId: number | undefined): void {
    console.log('postcart : ', productId);

    if (productId !== undefined) {
      this.cartService.postCartJson(productId);
    } else {
      console.log('productId error : ', productId);
    }
  }

  // ngOnInit(): void {
  //   this.userHomeService.getAllUserProducts().subscribe({
  //     next: (response: AppResponse) => {
  //       if (response && response.data) {
  //         this.products = response.data;
  //         this.originalProducts = response.data;
  //       } else {
  //         console.error('Invalid API response format:', response);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.log('An error occurred:', err);
  //     },
  //     complete: () => console.log('There are no more actions happening.'),
  //   });
  // }

  ngOnInit(): void {
    this.userHomeService.getAllUserProducts().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.originalProducts = response.data;
          this.products = [...this.originalProducts]; // Initialize products array with a copy of originalProducts
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err: any) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
  

  // Filter the products for the search feature
  filterArray() {
    this.products = this.originalProducts.filter((e: any) => {
      return e.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    });
  }
  // Sort products in ascending order (low to high)
  sortProductsLowToHigh() {
    this.products.sort((a, b) => a.price - b.price);
  }

  // Sort products in descending order (high to low)
  sortProductsHighToLow() {
    this.products.sort((a, b) => b.price - a.price);
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
 
  getLoggedInUserName(): String {
    return this.authService.getLoggedInUser()?.username || 'Guest';
  }
 
  
  
}
