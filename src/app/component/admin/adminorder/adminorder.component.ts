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

  constructor(
    private adminOrderService: AdminOrderServiceService,
    private storageService: StorageService
  ) {}

  // Pagination variables
  itemsPerPage = 3; // Number of items to display per page
  currentPage = 1; // Current page
  totalPages: number[] = []; // Array to hold total pages
  displayedOrders: Order[] = []; // Subset of orders to display based on pagination

  ngOnInit(): void {}

  calculateTotalPages() {
    const totalOrders = this.orders.length;
    const pages = Math.ceil(totalOrders / this.itemsPerPage);
    this.totalPages = Array(pages)
      .fill(0)
      .map((x, i) => i + 1);
    this.changePage(1); // Display first page initially
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedOrders = this.orders.slice(startIndex, endIndex);
  }

  getAllOrders() {
    this.adminOrderService.getAllOrders().subscribe((response: any) => {
      this.orders = response.data;
      this.calculateTotalPages();
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

  previousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.changePage(this.currentPage + 1);
    }
  }

  // onStatusChange(order: Order) {
  //   console.log(order.orderStatus);
  //   this.adminOrderService
  //     .changeOrderStatus(order.id, order.orderStatus!)
  //     .subscribe({
  //       next: (response: any) => console.log(response.data),
  //     });
  // }

  // onStatusChange(order: Order) {
  //   // Assuming 'orderStatus' in Order model is a string
  //   console.log(order.orderStatus);

  //   // Modify the assignment according to your data structure
  //   const statusString = order.orderStatus?.orderStatus; // Extracting the status string from OrderStatus object

  //   if (statusString) {
  //     this.adminOrderService
  //       .changeOrderStatus(order.id, statusString)
  //       .subscribe({
  //         next: (response: any) => console.log(response.data),
  //       });
  //   }
  // }

  
}
