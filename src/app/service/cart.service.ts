import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Cart } from '../model/cart';
import { StorageService } from './storage.service';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

 postCartResponse : any = [];

  getAllCart(id: number): Observable<AppResponse> {
    // let userId = 3;
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/${id}`);
  }

  postCart(cart: Cart): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`, cart);
  }

  deleteCart(userId:number,productCart:number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/cart/${userId}/${productCart}`);
  }
  INITIAL_CART: Cart = {
    userId: 0,
    id: 0,
    productId: 0,
    count: 1,
  };
  cartModel = this.INITIAL_CART;

  postCartJson(productId: number) {
    console.log('postCartJson', productId);
    let postCartResponse;
    let user = this.storageService.getLoggedInUser();
    this.postCart({
      userId: user.id,
      productId: productId,
      count: this.cartModel.count,
    }).subscribe({
      next: (response: any) => {
        console.log("response : " , response);
        postCartResponse = response.data;
        this.postCartResponse.push(postCartResponse);
        console.log("response post: " , response);
        if (response && response.data) {
          if (response.status == 200) {
            this.getAllCart(user.id);
          }
          console.log(response.data);
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
    console.log('postCartResponse', postCartResponse);

  }

  

  productsForOrder: Product[] = [];
  cart: any = {
    product: {}, // Define your product object here
  };

  handleCheckboxClick(product: any) {
    // console.log('productsss', product);

    // if (event.target.checked) {
    this.productsForOrder.push(product);
    console.log('prod check', product);

    // console.log('this.productsfororder : ', this.productsForOrder);

    // this.router.navigate(['/address']);
  }

  orderSummary() {
    return this.productsForOrder;
  }

 
}
