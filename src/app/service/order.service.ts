import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { StorageService } from './storage.service';
import { OrderStatus } from '../model/order-status';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  error: string = '';

  constructor(private http: HttpClient) {}

  getAllOrders(userId: number): Observable<AppResponse> {
    // let userId=3;
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/order/${userId}`);
  }

  postOrder(data: any): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/order`, data);
  }

  private placeOrderSubject = new Subject<void>();

  placeOrder$ = this.placeOrderSubject.asObservable();

  triggerPlaceOrder() {
    this.placeOrderSubject.next();
  }
}
