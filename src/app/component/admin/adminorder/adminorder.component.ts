import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Order } from 'src/app/model/order';
import { OrderStatus } from 'src/app/model/order-status';
import { AdminOrderServiceService } from 'src/app/service/admin-order-service.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.css'],
})
export class AdminorderComponent implements OnInit {
  orders: Order[] = [];
  userOrders: Order[] = [];
  orderStatusList: OrderStatus[] = [];
  status: OrderStatus[] = [];

  userId: number | undefined;
  orderId: number | undefined;
  statusId: number | undefined;
  selectedOrder: Order | null = null;

  constructor(private adminOrderService: AdminOrderServiceService) {}

  ngOnInit(): void {}

  getAllOrders() {
    this.adminOrderService.getAllOrders().subscribe((response: any) => {
      this.orders = response.data;
      console.log('ordered product-->', this.orders);
    });
  }

  // getAllOrders(userId: number) {
  //   this.adminOrderService.getAllOrders().subscribe({
  //     next: (response: AppResponse) => {
  //       if (response && response.data) {
  //         this.orders = response.data;
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

  // getAllOrders() {
  //   this.adminOrderService.getAllOrders().subscribe(
  //     (response: any) => {
  //       console.log('Orders:', response.data); // Log fetched orders
  //       this.orders = response.data;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching orders:', error); // Log any errors
  //     }
  //   );
  // }

  // Similar log statements can be added in other methods to track data flow.

  getUsersOrder() {
    if (this.userId !== undefined) {
      this.adminOrderService.getUsersOrder().subscribe((response: any) => {
        this.userOrders = response.data;
      });
    }
  }

  getAllOrderStatus() {
    this.adminOrderService.getAllOrderStatus().subscribe((response: any) => {
      this.orderStatusList = response.data;
    });
  }

  updateOrderStatus() {
    if (this.orderId !== undefined && this.statusId !== undefined) {
      const orderStatusRequest = {
        orderId: this.orderId,
        statusId: this.statusId,
      };

      this.adminOrderService
        .updateOrderStatus(orderStatusRequest)
        .subscribe((response: any) => {});
    }
  }

  selectUserOrder(order: Order): void {
    this.selectedOrder = order;
  }
}
