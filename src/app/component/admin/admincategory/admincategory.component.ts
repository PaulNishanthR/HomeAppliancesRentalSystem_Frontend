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

  ngOnInit(): void {
    this.getCategories();
    // this.onSubmit();
  }
  getCategories() {
    this.categoryservice.getCategories().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.categories = response.data;
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
}
