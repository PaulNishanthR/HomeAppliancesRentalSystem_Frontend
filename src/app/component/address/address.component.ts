import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { UserDetail } from 'src/app/model/user-detail';
import { AddressService } from 'src/app/service/address.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  showAnimation: boolean = false;
  constructor(
    private router: Router,
    private addressService: AddressService,
    private cartService: CartService,
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  address: string = '';
  city: string = '';
  zipcode: string = '';
  // address(addressForm: NgForm) {}
  AddressName: string = '';
  INITIAL_ADDRESS: Address = {
    id: 0,
    address: '',
    city: '',
    zipcode: '',
    userId: 0,
  };
  addressModel: Address = this.INITIAL_ADDRESS;
  emitterValue = false;
  addresses: Address[] = [];
  productsForOrder: any = [];

  error: string = '';
  cartItems: Cart[] = [];
  currentOrder: Order | undefined;
  isCartEmpty: boolean = true;
  userDetails: UserDetail[] = [];

  selectedAddress: Address | undefined;
  loggedInUserId: number = this.storageService.getLoggedInUser().id;

  onSubmit(addressForm: NgForm) {
    // this.showAnimation = true;
    // setTimeout(() => {
    //   this.showAnimation = false;
    // }, 2000);
  }

  ngOnInit(): void {
    this.loadUserData();
    let userId: number = this.storageService.getLoggedInUser().id;
    this.getAllAddress(userId);
    this.summaryOfProducts();
  }

  loadUserData() {
    const loggedInUser = this.storageService.getLoggedInUser();

    if (loggedInUser && loggedInUser.id) {
      const userId: number = loggedInUser.id;
      this.getAllAddress(userId);
    } else {
      console.error('User not logged in or invalid user ID.');
    }
  }

  getAllAddress(userId: number) {
    this.addressService.getAllAddress(userId).subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.addresses = response.data.addressList;
          console.log('xxx', this.addresses);
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

  postAddress(addressForm: NgForm) {
    if (addressForm.valid) {
      let userId: number = this.storageService.getLoggedInUser().id;
      console.log('UserID:', userId); // Log to check if userId is correct

      // Make sure userId is set in addressModel before calling postAddress
      this.addressModel.userId = userId;
      this.addressService.postAddress(this.addressModel).subscribe({
        next: (response: AppResponse) => {
          if (response && response.data) {
            this.addresses = response.data.addressList;
            this.addressModel = this.INITIAL_ADDRESS;
            addressForm.resetForm();
            // this.addressModel.userId = this.storageService.getLoggedInUser().id;

            // let userId: number = this.storageService.getLoggedInUser().id;

            this.getAllAddress(userId);
          }
        },
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
    } else {
      // console.log('Form is invalid. Please check the entered details.');
      this.addressService.putAddress(this.addressModel).subscribe({
        next: (response: any) => {
          this.addresses = response.data;
          this.addressModel = this.INITIAL_ADDRESS;

          let userId: number = this.storageService.getLoggedInUser().id;

          this.getAllAddress(userId);

          addressForm.resetForm();
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.addressService.deleteAddress(id).subscribe({
        next: (response: any) => {
          this.address = response.data;

          let userId: number = this.storageService.getLoggedInUser().id;

          this.getAllAddress(userId);
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  createOrder() {}

  summaryOfProducts() {
    console.log('aaa', this.productsForOrder);

    this.productsForOrder = this.cartService.orderSummary();
    console.log(this.productsForOrder, 'gggg');
  }

  onPlaceOrderClick() {
    this.orderService.triggerPlaceOrder();
  }

  onEdit(address: Address) {
    if (address.id !== undefined && address.id !== null) {
      this.addressModel = { ...address };
      const loggedInUser = this.storageService.getLoggedInUser();

      if (loggedInUser) {
        this.addressModel.userId = loggedInUser.id;
      } else {
        console.error('User is not logged in.');
      }
    } else {
      console.error('Address ID is invalid.');
    }
  }

  loadUserDetails() {
    let userId: number = this.storageService.getLoggedInUser().id;

    this.addressService.getAllAddress(userId).subscribe(
      (response: AppResponse) => {
        if (response && response.data && Array.isArray(response.data)) {
          const userWithAddress = response.data.find(
            (user) => user.addressList && user.addressList.length > 0
          );

          if (userWithAddress) {
            const firstAddress = userWithAddress.addressList[0].id;
            console.log(firstAddress);

            const loggedInUser = this.storageService.getLoggedInUser();
            if (loggedInUser) {
              const order = {
                userId: loggedInUser.id,
                addressId: firstAddress,
              };

              this.orderService.postOrder(order).subscribe({
                next: (response: any) => {
                  this.currentOrder = response.data;
                  this.cartItems = [];
                  this.isCartEmpty = true;
                },
                error: (err) => {
                  console.error('Checkout error:', err);
                },
              });
            }
          } else {
            console.error(
              'No user with a valid addressList found in the API response.'
            );
          }
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

  // checkout() {
  //   console.log('got In');
  //   const loggedInUser = this.storageService.getLoggedInUser();

  //   if (loggedInUser) {
  //     this.loadUserDetails();
  //   } else {
  //     console.error('User not logged in.');
  //     console.log('nope');
  //   }
  // }

  checkout() {
    if (this.loggedInUserId && this.selectedAddress) {
      const order = {
        userId: this.loggedInUserId,
        addressId: this.selectedAddress.id,
      };
  
      this.orderService.postOrder(order).subscribe({
        next: (response: any) => {
          // Handle the response if needed
          console.log('Order created:', response);
        },
        error: (err) => {
          console.error('Error creating order:', err);
        },
      });
    } else {
      console.error('User ID or address is not selected.');
    }
  }
  

  // onAddressSelection(event: any, selectedAddress: Address) {
  //   selectedAddress.checked = event.target.checked;

  //   this.addresses.forEach((address) => {
  //     if (address.id !== selectedAddress.id) {
  //       address.checked = false;
  //     }
  //   });
  //   this.addressService.setSelectedAddress(selectedAddress);
  // }

  onAddressSelection(event: any, selectedAddress: Address) {
    // Set the selected address when the checkbox is checked
    if (event.target.checked) {
      this.selectedAddress = selectedAddress;
    } else {
      this.selectedAddress = undefined;
    }
  }
  
}
