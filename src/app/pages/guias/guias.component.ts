import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { GuiaService } from '../../services/guia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guias',
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './guias.component.html',
  styleUrl: './guias.component.css',
})
export class GuiasComponent implements OnInit {
  listGuias: any[] = []; //
  especialidades: any[] = [];
  constructor(private guiaService: GuiaService, private router: Router) {}
  ngOnInit(): void {
    this.getGuias();
  }

  getGuias() {
    this.guiaService.getGuias().subscribe((data) => {
      console.log(data);
      this.listGuias = data;
      this.especialidades = data.turista.especialidades;
      console.log(this.especialidades);
    });
  }

  irReservar(guiaId: string): void {
    this.router.navigate(['/reservar/' + guiaId]);
  }
}
