import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  imports: [HeaderComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form = {
    nombre: '',
    apellido: '',
    numeroTelefono: '',
    email: '',
    password: '',
    nacionalidad: '',
    idiomasHablados: [] as string[],
  };

  idiomasDisponibles = [
    'Inglés',
    'Español',
    'Portugués',
    'Francés',
    'Alemán',
    'Mandarín',
    'Japonés',
  ];

  constructor(private authService: AuthService, private router: Router) {}

  actualizarIdiomas(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const idioma = checkbox.value;

    if (checkbox.checked) {
      this.form.idiomasHablados.push(idioma);
    } else {
      this.form.idiomasHablados = this.form.idiomasHablados.filter(
        (i) => i !== idioma
      );
    }
  }

  onSubmit() {
    console.log(this.form);
  }

  registrarUsuario() {
    this.authService.registerUser(this.form).subscribe(
      (response) => {
        console.log('Registro exitoso', response);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: '¿Deseas Iniciar Sesión?',
          showDenyButton: true,

          confirmButtonText: 'Sí',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          } else if (result.isDenied) {
            Swal.fire('Ok, puedes seguir en registro', '', 'info');
            location.reload(); // Recarga la página
          }
        });
      },
      (error) => {
        console.error('Error en el registro', error);
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
