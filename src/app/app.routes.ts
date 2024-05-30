
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () => import('./componentes/login/login.component').then(
            (l) => l.LoginComponent,
        ),
    },
    {
        path: "home",
        loadComponent: () => import('./componentes/home/home.component').then(
            (l) => l.HomeComponent,
        ),
    },
    {
        path: "quiensoy",
        loadComponent: () => import('./componentes/quiensoy/quiensoy.component').then(
            (l) => l.QuiensoyComponent,
        ),
    },
    {
        path: "register",
        loadComponent: () => import('./componentes/register/register.component').then(
            (l) => l.RegisterComponent,
        ),
    },
    {
        path: "ahorcado",
        loadComponent: () => import('./componentes/juegos/ahorcado/ahorcado.component').then(
            (l) => l.AhorcadoComponent,
        ),
    },
    {
        path: "mayoromenor",
        loadComponent: () => import('./componentes/juegos/mayor-o-menor/mayor-o-menor.component').then(
            (l) => l.MayorOMenorComponent,
        ),
    },
    {
        path: "preguntados",
        loadComponent: () => import('./componentes/juegos/preguntados/preguntados.component').then(
            (l) => l.PreguntadosComponent,
        ),
    },
    {
        path: "evitalasespinas",
        loadComponent: () => import('./componentes/juegos/evita-las-espinas/evita-las-espinas.component').then(
            (l) => l.EvitaLasEspinasComponent,
        ),
    },
    {
        path: " ",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: "full",
    },
    
];

