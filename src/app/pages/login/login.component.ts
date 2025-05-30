import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  login() {
    this.authService.loginUser(this.usuario).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token); // o sessionStorage.setItem(...)
        }

        Swal.fire({
          icon: 'success',
          title: '¡Login exitoso! ',
          text: 'Bienvenido al sistema ' + response.userName,

          confirmButtonText: 'OK',
        }).then(() => {
          // Redirige a la URL original si existe
          const redirectUrl = localStorage.getItem('redirectUrl');
          if (redirectUrl) {
            localStorage.removeItem('redirectUrl');
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigate(['/guias']);
          }
        });
      },
      error: (error) => {
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.error.message,
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }
}
