import { Component, OnInit } from '@angular/core';
import { GuiaService } from '../../services/guia.service';
import { ReservaService } from '../../services/reserva.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reserva',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ReservaComponent implements OnInit {
  reservaForm: FormGroup | any;
  today: string;
  horasDisponibles: string[] = [];
  duraciones: number[] = [1, 2, 3, 4, 5];
  costoTotal: number = 0;

  guia = {
    nombre: '',
    apellido: '',
    identificacion: '',
    numeroContacto: '',
    lugarOperacion: '',
    descripcion: '',
    conocimientos: [],
    especialidades: [],
    idiomasHablados: [],
    fotoPerfil: '',
    costoHora: 0,
    beneficiosAdicionales: [],
  };

  constructor(
    private guiaService: GuiaService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    const hoy = new Date();
    this.today = hoy.toISOString().split('T')[0]; // yyyy-MM-dd
  }
  userId: any;
  id: string = '';
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id);
    this.getGuia(this.id);

    this.authService.verifyToken().subscribe((response) => {
      this.userId = response.userFound._id;
      console.log(this.userId);
    });

    this.reservaForm = this.fb.group({
      fechaReserva: [this.today, Validators.required],
      horaInicio: ['', Validators.required],
      duracionHoras: ['', Validators.required],
      lugarEncuentro: ['', Validators.required],
      notasAdicionales: [''],
    });

    this.generarHorasDisponibles();
  }

  generarHorasDisponibles(): void {
    const horas = [];
    for (let i = 8; i <= 20; i++) {
      const hora = i < 10 ? `0${i}:00` : `${i}:00`;
      horas.push(hora);
    }
    this.horasDisponibles = horas;
  }

  getGuia(id: string) {
    this.guiaService.getGuia(id).subscribe((data) => {
      console.log(data);
      this.guia = data;
      console.log(this.guia);
    });
  }

  calcularCosto(): void {
    const duracion = this.reservaForm.get('duracionHoras')?.value;
    this.costoTotal = duracion * this.guia.costoHora;
    // Aquí puedes implementar una lógica para calcular el costo
    console.log(`Duración seleccionada: ${duracion} horas`);
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      const reservaData = {
        turista: this.userId,
        guia: this.id,

        ...this.reservaForm.value,
      };

      this.reservaService.postReserva(reservaData).subscribe({
        next: (response) => {
          console.log('Reserva exitosa', response);
          Swal.fire({
            icon: 'success',
            title: '¡Reserva exitosa!',
          });
        },
        error: (error) => {
          console.error('Error en la reserva', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al reservar',
            text: error.error.message,
            confirmButtonText: 'OK',
            width: 400,
          });
        },
        complete: () => {
          console.log('Solicitud completada');
        },
      });

      console.log('Reserva enviada:', reservaData);
      // Aquí puedes enviar los datos al backend o continuar con la lógica
    } else {
      console.log('Formulario inválido');
      this.reservaForm.markAllAsTouched();
    }
  }
}
