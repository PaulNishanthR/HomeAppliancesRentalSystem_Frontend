// import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private categoryService: CategoryService
  ) {}

  title: string = '';
  price: number = 0;
  description: string = '';
  Photo: string = '';
  CatId: string = '';
  addProducts(productForm: NgForm) {}

  INITIAL_PRODUCT: Product = {
    id: 0,
    categoryId: 0,
    title: '',
    description: '',
    price: 0,
  };
  productModel: Product = this.INITIAL_PRODUCT;
  emitterValue = false;
  products: Product[] = [];
  categories: Category[] = [];
  file = '';
  editId: number | undefined = 0;

  // Pagination variables
  itemsPerPage = 3; // Number of items to display per page
  currentPage = 1; // Current page
  totalPages: number[] = []; // Array to hold total pages
  displayedProducts: Product[] = []; // Subset of products to display based on pagination

  // ngOnInit(): void {
  //   this.getAllProducts();
  //   this.calculateTotalPages();
  // }

  ngOnInit(): void {
    this.retrieveData();
  }

  // Function to retrieve data (products and categories)
  retrieveData() {
    this.getAllProducts();
    this.getAllCategories();
  }

  // Function to calculate total pages based on total products and items per page
  calculateTotalPages() {
    const totalProducts = this.products.length;
    const pages = Math.ceil(totalProducts / this.itemsPerPage);
    this.totalPages = Array(pages)
      .fill(0)
      .map((x, i) => i + 1);
    this.changePage(1); // Display first page initially
  }

  // Function to change page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  edit(id: number | undefined) {
    if (this.editId !== undefined) {
      this.editId = id;
    }
  }
  getAllProducts() {
    this.homeService.getAllProducts().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.products = response.data;
          this.calculateTotalPages();
          // console.log('responsedata');
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err: any) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }
  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.categories = response.data;
          // console.log('responsedata');
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err: any) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }

  onSubmit(productForm: NgForm) {
    if (productForm.valid) {
      const formData = new FormData();

      console.log(productForm);
      formData.append('photo', this.file);
      formData.append('categoryId', productForm.value.category_id);
      formData.append('title', productForm.value.title);
      formData.append('description', productForm.value.description);
      formData.append('price', productForm.value.price);

      console.log(formData);
      console.log('image', productForm.value.image);
      console.log('categoryId', productForm.value.category_id);
      console.log('title', productForm.value.title);
      console.log('description', productForm.value.description);
      console.log('price', productForm.value.price);

      if (this.editId === 0) {
        this.homeService.postProducts(formData).subscribe({
          next: (response: any) => {
            this.products = response.data;
            this.categories = response.data;
            productForm.resetForm();
            this.getAllProducts();
          },
          error: (err) => {
            console.log(err?.error?.error?.message);
          },
        });
      } else {
        this.homeService.putProduct(this.productModel).subscribe({
          next: (response: any) => {
            this.products = response.data;
            this.categories = response.data;
            this.productModel = this.INITIAL_PRODUCT;
            productForm.resetForm();
          },
          error: (err) => {
            console.log(err?.error?.error?.message);
          },
        });
      }
    }
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.homeService.deleteProduct(id).subscribe({
        next: (response: any) => {
          this.products = response.data;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  onEdit(product: Product) {
    this.productModel = { ...product };
  }

  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      console.log('Selected file:', this.file);
    }
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
