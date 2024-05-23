import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../services/user-auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  auxObservable$! : Observable<User | null>; //creo un observable que puede ser un usuario o null
  user$! : User | null; //Voy a guardar la respuesta del observable

  constructor(private router: Router, public userAuthService: UserAuth){
    this.auxObservable$ = this.userAuthService.getUser();
    this.auxObservable$.subscribe((r)=> 
    {
      this.user$ = r;
    })
  }

  carrouselItems =
  [
    {
      id: 0,
      url: '../../../assets/Preguntados.png',
      titulo: "Preguntados", 
      descripcion: "El emocionante juego de preguntas y respuestas que pondrá a prueba tu conocimiento en diversas categorías. Prepárate para desafiar tu mente con preguntas intrigantes y divertidas, y compite para convertirte en el verdadero Maestro del Preguntados.",
    },
    {
      id: 1,
      url: '../../../assets/Ahorcado.jpg',
      titulo: "Ahorcado",
      descripcion: "123", 
    },
    {
      id: 2,
      url: '../../../assets/FondoMayorOMenor.jpg',
      titulo: "MayorOMenor",
      descripcion: "456", 
    },
    {
      id: 3,
      url: '../../../assets/Preguntados.png',
      titulo: "MIJUEGO",
      descripcion: "7879", 
    },

  ];

  activeItemsIndex: number = 0;

  selectItem(slideIndex: number): void {
    this.activeItemsIndex = slideIndex;
    console.log(slideIndex);
  }

  getItemUrl() {
    return `${this.carrouselItems[this.activeItemsIndex].url}`;
  }

  getItemTitle() {
    return `${this.carrouselItems[this.activeItemsIndex].titulo}`;
  }

  getItemDes() {
    return `${this.carrouselItems[this.activeItemsIndex].descripcion}`;
  }

  Jugar() {
    switch(this.activeItemsIndex)
    {
      case 0: 
        this.router.navigateByUrl('/preguntados');
        break;
      case 1: 
        this.router.navigateByUrl('/ahorcado');
        break;
      case 2: 
        this.router.navigateByUrl('/mayoromenor');
        break;
      case 3: 
        this.router.navigateByUrl('/mijuego');
        break;
    }
  }
  

}
