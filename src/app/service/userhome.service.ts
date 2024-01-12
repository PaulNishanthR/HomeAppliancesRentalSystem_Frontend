import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class UserhomeService {
  error: String = '';

  constructor(private http:HttpClient) { }

  getAllUserProducts(){
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/product/user/all`);
  }
}
