// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { NormativaComponent } from './components/normativa/normativa.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { RouterModule, Routes } from '@angular/router';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { OperatorGuard } from './guards/operator.guard';
import { PrincipalComponent } from './components/principal/principal.component';
import { DashComponent } from './components/dash/dash.component';


const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'normativa', component: NormativaComponent },
  { path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
  { path: 'private-tasks', component: PrivateTasksComponent, canActivate: [AuthGuard, AdminGuard, OperatorGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: '**', redirectTo: '/principal' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
