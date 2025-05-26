import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  usuario = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}
  ngOnInit(): void {}

  login() {
    this.authService.loginUser(this.usuario).subscribe(
      (response) => {
        console.log('Login successful', response);
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso!',
          text: response.message,
        });
      },
      (error) => {
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          // si usas `html`, SweetAlert no mostrará `text`
          text: error.error.message,
          confirmButtonText: 'OK',
          width: 400,
        });
      }
    );
  }
}
