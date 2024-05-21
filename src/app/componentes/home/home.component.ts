import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  constructor(private router: Router){}

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
      url: '../../../assets/Preguntados.png',
      titulo: "Ahorcado",
      descripcion: "123", 
    },
    {
      id: 2,
      url: '../../../assets/Preguntados.png',
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

  ngOnInit(): void {

  }

  goToSlide(slideIndex: number): void {
    this.activeItemsIndex = slideIndex;
    console.log(slideIndex);
  }

  getCurrentSlideUrl() {
    return `${this.carrouselItems[this.activeItemsIndex].url}`;
  }

  getCurrentSlideTitle() {
    return `${this.carrouselItems[this.activeItemsIndex].titulo}`;
  }

  getCurrentSlideDes() {
    return `${this.carrouselItems[this.activeItemsIndex].descripcion}`;
  }

  jugarAhora() {
    if (this.activeItemsIndex == 0) {
      this.router.navigateByUrl('/ahorcado');
    } else if (this.activeItemsIndex == 1) {
      this.router.navigateByUrl('/preguntados');
    } else if (this.activeItemsIndex == 2) {
      this.router.navigateByUrl('/mayormenor');
    } else if (this.activeItemsIndex == 3) {
      this.router.navigateByUrl('/mijuego');
    }
  }
  

}
