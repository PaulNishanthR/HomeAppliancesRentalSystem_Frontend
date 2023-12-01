import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registers: Register[] = [];
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  constructor(private authService: AuthService, private router: Router) {}
  UserName: string = '';
  Name: string = '';
  Password: string = '';
  Role: string = '';

  onSubmit(form: any) {
    const newRegister: Register = {
      username: this.UserName,
      name: this.Name,
      password: this.Password,
      role: this.Role,
    };
    this.authService.register(newRegister).subscribe({
      next: (response: AppResponse) => {
        this.registers.push(response.data);
        this.router.navigate(['/login']);
      },
    });
  }
}
