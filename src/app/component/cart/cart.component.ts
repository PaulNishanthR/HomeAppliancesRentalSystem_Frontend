import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { UserDetail } from 'src/app/model/user-detail';
import { AddressService } from 'src/app/service/address.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: Cart[] = [];
  error: string = '';
  isCartEmpty: boolean = true;
  INITIAL_CART: Cart = {
    id: 0,
    product: { title: '', price: 0, description: '', count: 1 },
    count: 1,
  };

  cartItems: Cart[] = [];
  currentOrder: Order | undefined;
  userDetails: UserDetail[] = [];
  // cartModel: Cart = this.INITIAL_CART;
  emitterValue = false;
  totalPrice : number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private storageService: StorageService,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    // this.cartService.getAllCart().subscribe(
    //   (response: AppResponse) => {
    //     this.cartProducts = response.data;
    //   },
    //   (err) => {
    //     console.error('An error occurred:', err);
    //   }
    // );
    this.getAllCart();
  }

  getAllCart = async () => {
    let user = this.storageService.getLoggedInUser();
    await this.cartService.getAllCart(user.id).subscribe(
      (response: AppResponse) => {
        console.log("response : " , response);
        
      this.cartProducts = response.data;
      },
      (err) => {
        console.error('An error occurred:', err);
      }
    );
    console.log("cartProducts : " , this.cartProducts);
    
    for(let cart of this.cartProducts) {
      console.log("cart : " , cart);
      
      if(cart.product?.price!==undefined)
        this.totalPrice += cart?.product?.price;
    }
  }

  // onSubmit(categoryForm: any) {
  //   this.cartService
  //     .postCart({

  //     })
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response && response.data) {
  //           if(response.status==200) {
  //             this.getAllCart();
  //           }
  //           console.log(response.data);
  //         }
  //       },
  //       error: (err) => {
  //         console.error('An error occurred:', err);
  //       },
  //     });
  // }

  deleteCart(event: Event, userId: number | undefined, productCartId: number | undefined) {
    event.preventDefault(); 
    console.log('deletecart : ', userId, 'productid : ', productCartId);
    userId = this.storageService.getLoggedInUser().id;
    console.log('deletecart : ', userId, 'productid : ', productCartId);

    if (userId !== undefined && productCartId !== undefined) {
      this.cartService.deleteCart(userId, productCartId).subscribe({
        next: (response: any) => {
          this.cartProducts = response.data;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    } else {
      console.log('Error');
    }
  }

  someValue: any;
  productsForOrder: any[] = [];
  cart: any = {
    product: {}, // Define your product object here
  };

  // handleCheckboxClick(event: any, product: any) {
  //   console.log('productsss', product);

  //   if (event.target.checked) {
  //     this.productsForOrder.push(product);
  //     this.cartService.handleCheckboxClick(product);
  //     console.log('this.productsfororder : ', this.productsForOrder);
  //     localStorage.setItem(
  //       'productsForOrder',
  //       JSON.stringify(this.productsForOrder)
  //     );

  //     // console.log('local done');

  //     // this.router.navigate(['/address']);
  //   } else {
  //     for (let prod of this.productsForOrder) {
  //       if (prod.id === product.id) {
  //       }
  //     }
  //     this.productsForOrder = this.productsForOrder.filter(
  //       (item) => item.id !== product.id
  //     );
  //     // this.productsForOrder = [];
  //     // alert('Please check the checkbox to proceed.');
  //   }
  // }
}
