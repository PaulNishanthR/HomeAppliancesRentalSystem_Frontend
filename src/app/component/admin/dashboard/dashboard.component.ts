import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { UserDetail } from 'src/app/model/user-detail';
import { HomeService } from 'src/app/service/home.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  totalUsers = 0;
  totalProduct = 0;
  constructor(
    private userService: UserService,
    private userHomeService: HomeService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let users: UserDetail[] = response.data;
        this.totalUsers = users.length;
      },
      error: (err) => {
        console.error('Error loading total users:', err);
      },
    });

    this.userHomeService.getAllProducts().subscribe({
      next: (response: any) => {
        let product: Product[] = response.data;
        this.totalProduct = product.length;
      },
      error: (err) => {
        console.error('Error loading total cloths:', err);
      },
    });
  }
}
