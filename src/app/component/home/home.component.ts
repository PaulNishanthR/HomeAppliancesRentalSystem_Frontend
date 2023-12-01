import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { UserhomeService } from 'src/app/service/userhome.service';
import { Product } from 'src/app/model/product';
import { AppResponse } from 'src/app/model/appResponse';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private userHomeService: UserhomeService,
    private cartService: CartService
  ) {}

  postCart(productId: number | undefined): void {
    console.log('postcart : ', productId);

    if (productId !== undefined) {
      this.cartService.postCartJson(productId);
    } else {
      console.log('productId error : ', productId);
    }
  }

  products: Product[] = [];

  ngOnInit(): void {
    this.userHomeService.getAllUserProducts().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.products = response.data;
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
}
