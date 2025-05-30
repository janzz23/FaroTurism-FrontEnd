import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { GuiasComponent } from './pages/guias/guias.component';
import { authGuard } from './guard/auth.guard';
import { ReservaComponent } from './pages/reserva/reserva.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MainComponent },
  { path: 'guias', component: GuiasComponent },
  {
    path: 'reservar/:id',
    component: ReservaComponent,
    canActivate: [authGuard],
  },
];
