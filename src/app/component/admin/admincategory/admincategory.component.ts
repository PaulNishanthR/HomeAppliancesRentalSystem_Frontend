import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css'],
})
export class AdmincategoryComponent implements OnInit {
  constructor(private categoryservice: CategoryService) {}
  CategoryId: string = '';
  Category: string = '';
  // addCategory(categoryForm: NgForm) {}

  CategoryName: string = '';
  categories: Category[] = [];
  INITIAL_CATEGORY: Category = { id: 0, title: '' };
  categoryModel: Category = this.INITIAL_CATEGORY;
  emitterValue = false;

  // ngOnInit(): void {
  //   this.getCategories();
  // }

   // Pagination variables
   itemsPerPage = 3; // Number of items to display per page
   currentPage = 1; // Current page
   totalPages: number[] = []; // Array to hold total pages
   displayedCategories: Category[] = []; // Subset of categories to display based on pagination
 
   ngOnInit(): void {
     this.getCategories();
   }

   // Function to calculate total pages based on total categories and items per page
  calculateTotalPages() {
    const totalCategories = this.categories.length;
    const pages = Math.ceil(totalCategories / this.itemsPerPage);
    this.totalPages = Array(pages).fill(0).map((x, i) => i + 1);
    this.changePage(1); // Display first page initially
  }

  // Function to change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCategories = this.categories.slice(startIndex, endIndex);
  }

  getCategories() {
    this.categoryservice.getCategories().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.categories = response.data;
          this.calculateTotalPages();
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }

  onSubmit(form: NgForm) {
    // console.log('dasda');

    if (form.valid) {
      this.categoryservice.postCategories(this.categoryModel).subscribe({
        next: (response: AppResponse) => {
          if (response && response.data) {
            this.categories = response.data;
            this.categoryModel = { ...this.INITIAL_CATEGORY };
            form.resetForm();
            this.getCategories();
            // console.log(response.data, 'asasas');
          }
        },
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
    } else {
      this.categoryservice.putCategory(this.categoryModel).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.categoryModel = this.INITIAL_CATEGORY;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.categoryservice.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  onEdit(category: Category) {
    this.categoryModel = { ...category };
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
