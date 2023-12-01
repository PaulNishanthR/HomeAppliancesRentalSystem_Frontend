import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { OrderStatusRequest } from '../model/order-status-request';
import { OrderStatus } from '../model/order-status';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderServiceService {
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/order/all`);
  }

  getUsersOrder(): Observable<AppResponse> {
    let userId = 3;
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/order/${userId}`
    );
  }

  getAllOrderStatus(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/order/status/all`
    );
  }

  updateOrderStatus(
    orderStatusRequest: OrderStatusRequest
  ): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/order/status`,
      orderStatusRequest
    );
  }
}
