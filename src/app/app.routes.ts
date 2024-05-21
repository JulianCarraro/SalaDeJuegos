
import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';


export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'quiensoy', component: QuiensoyComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'ahorcado', component: AhorcadoComponent},
    // La ruta comodin debe ir siempre al final
    { path: '**', component: PageNotFoundComponent },
    
];

