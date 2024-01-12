import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/model/user-detail';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  error: string = '';
  userDetails: UserDetail[] = [];
  userDetail: UserDetail = {
    id: 0,
    username: '',
    name: '',
    roles: '',
    created_at:new Date(),
    addressList: [],
  };

  constructor(private userService: UserService) {}

  // Pagination variables
  itemsPerPage = 3; // Number of items to display per page
  currentPage = 1; // Current page
  totalPages: number[] = []; // Array to hold total pages
  displayedUsers: UserDetail[] = []; // Subset of users to display based on pagination

  // ngOnInit(): void {
  //   this.userService.getUserDetails().subscribe({
  //     next: (response: any) => {
  //       let userDetails: UserDetail[] = response.data;
  //       if (userDetails.length > 0) {
  //         this.userDetails = userDetails;
  //         this.userDetail = userDetails[0];
  //         console.log('User Detailssss:', this.userDetails);

  //       }
  //     },
  //     error: (err) => {
  //       let message: string = err?.error?.error?.message;
  //       this.error = message.includes(",") ? message.split(",")[0] : message;
  //     },
  //   });
  // }

  ngOnInit(): void {
    this.getUsers(); // Fetch users initially
  }

  getUsers() {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: UserDetail[] = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
          this.calculateTotalPages();
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }

  calculateTotalPages() {
    const totalUsers = this.userDetails.length;
    const pages = Math.ceil(totalUsers / this.itemsPerPage);
    this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    this.changePage(1); // Display first page initially
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedUsers = this.userDetails.slice(startIndex, endIndex);
  }

  setSelectedUser(userDetail: UserDetail): void {
    this.userDetail = userDetail;
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
}
