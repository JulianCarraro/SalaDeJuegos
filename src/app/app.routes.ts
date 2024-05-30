
import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/juegos/preguntados/preguntados.component';
import { MayorOMenorComponent } from './componentes/juegos/mayor-o-menor/mayor-o-menor.component';
import { EvitaLasEspinasComponent } from './componentes/juegos/evita-las-espinas/evita-las-espinas.component';
import { ChatComponent } from './componentes/chat/chat.component';


export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'quiensoy', component: QuiensoyComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'ahorcado', component: AhorcadoComponent},
    { path: 'preguntados', component: PreguntadosComponent},
    { path: 'mayoromenor', component: MayorOMenorComponent},
    { path: 'evitalasespinas', component: EvitaLasEspinasComponent},
    { path: 'chat', component: ChatComponent},

    // La ruta comodin debe ir siempre al final
    { path: '**', component: PageNotFoundComponent },
    
];

