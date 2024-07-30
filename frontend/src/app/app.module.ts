// src/app/app.module.ts


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { OperatorGuard } from './guards/operator.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MenuComponent } from './components/menu/menu.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { DashComponent } from './components/dash/dash.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NormativaComponent } from './components/normativa/normativa.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    TasksComponent,
    PrivateTasksComponent,
    PrincipalComponent,
    DashComponent,
    MenuComponent,
    PrincipalComponent,
    DashComponent,
    NoticiasComponent,
    NormativaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    OperatorGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
