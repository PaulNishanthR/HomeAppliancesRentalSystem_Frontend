import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {

 

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  orders: Order[] = [];
  INITIAL_ORDER = {
    id: 0,
    ptoduct: { id: 0, title: '', price: 0 },
    address: { id: 0, address: '', city: '', zipcode: 0 },
  };
  orderModel = this.INITIAL_ORDER;

  ngOnInit(): void {
    let userId: any = this.storageService.getLoggedInUser().id;
    this.getAllOrders(userId);
  }

  getAllOrders(userId: number) {
    this.orderService.getAllOrders(userId).subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.orders = response.data;
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

  createOrder() {
    this.orderService.postOrder(this.orderModel).subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.orders = response.data;
          this.orderModel = { ...this.INITIAL_ORDER };
          // const loggedInUser = this.storageService.getLoggedInUser();
          // const userId = loggedInUser ? loggedInUser.id : undefined;
          let userId: any = this.storageService.getLoggedInUser().id;
          this.getAllOrders(userId);
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }

  // createOrder() {
  //   this.orderService.postOrder(this.orderModel).subscribe({
  //     next: (response: AppResponse) => {
  //       if (response && response.data) {
  //         this.orders = response.data;
  //         this.orderModel = { ...this.INITIAL_ORDER };
  //         const loggedInUser = this.storageService.getLoggedInUser();
  //         const userId = loggedInUser ? loggedInUser.id : undefined;
  //         if (userId !== undefined) {
  //           this.getAllOrders(userId);
  //         } else {
  //           console.error('User ID is undefined.');
  //         }
  //       }
  //     },
  //     error: (err) => {
  //       console.error('An error occurred:', err);
  //     },
  //   });
  // }
}
