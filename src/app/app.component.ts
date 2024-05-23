import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAuth } from './services/user-auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SalaDeJuegos';

  auxObservable$! : Observable<User | null>; //creo un observable que puede ser un usuario o null
  user! : User | null; //Voy a guardar la respuesta del observable

  constructor(public userAuthService: UserAuth, private router: Router) 
  {
    this.auxObservable$ = this.userAuthService.getUser();
    this.auxObservable$.subscribe;
  }

  logOut() : void
  {
    this.userAuthService.logOut();
    this.router.navigate(["/home"]);
  }

}
