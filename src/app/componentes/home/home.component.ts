import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../services/user-auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import Swal from 'sweetalert2'

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
      descripcion: "El juego clásico de adivinanzas donde debes descubrir una palabra oculta, adivinando una letra a la vez. Cada letra incorrecta resulta en una parte del cuerpo del hombre colgado en la horca en el tablero. El objetivo es completar la palabra antes de que el dibujo del ahorcado esté completo.", 
    },
    {
      id: 2,
      url: '../../../assets/FondoMayorOMenor.jpg',
      titulo: "Mayor O Menor",
      descripcion: "Un emocionante juego de cartas donde tu tarea es predecir si la siguiente carta será de mayor o menor valor que la actual. Es un juego rápido de riesgo y recompensa que requiere intuición y suerte. Acierta tantas veces seguidas como puedas para obtener el máximo puntaje.", 
    },
    {
      id: 3,
      url: '../../../assets/FondoMiJuego5.jpg',
      titulo: "Evita las espinas",
      descripcion: "Es un juego dinámico y desafiante donde debes maniobrar a través de un campo de obstáculos lleno de espinas mortales. El objetivo es mover tu personaje hábilmente para evitar tocar las espinas y avanzar lo más lejos posible. Cuanto más tiempo sobrevivas, mayor será tu puntuación.", 
    },

  ];

  activeItemsIndex: number = 0;

  selectItem(slideIndex: number): void {
    this.activeItemsIndex = slideIndex;
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
    if(this.user$ as User)
    {
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
          this.router.navigateByUrl('/evitalasespinas');
          break;
      }
    }
    else
    {
      this.mostrarAlerta();
    }


  }

  mostrarAlerta()
  {
    Swal.fire({
      icon: 'error',                    
      title: 'Error de autenticación', 
      text: 'Debes iniciar sesión para jugar', 
      confirmButtonText: 'Cerrar',       
      showConfirmButton: true,          
    });
  }

}
