import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {

  palabras: string[] = [
    "Cafe", "Escritorio", "Lapiz", "Pajaro", "Arcoiris", "Ventana", "Leon", "Nube", 
    "Reloj", "Tigre", "Sandwich", "Nariz", "Elefante", "Unicornio", "Fresa", "Computadora", 
    "Cocodrilo", "Playa", "Calabaza", "Cohete", "Bicicleta", "Elefante", "Buceo", "Piscina", 
    "Silla", "Espada", "Diamante", "Hormiga", "Maleta", "Robot", "Globo", "Gato", 
    "Pelicula", "Helado", "Telescopio", "Piano", "Lobo", "Girasol", "Zanahoria", "Monstruo", 
    "Barco", "Calavera", "Nariz", "Cometa", "Jirafa", "Fuego", "Tren", "Oso", 
    "Buho", "Paloma"
  ];
  
  letras: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
  'u', 'v', 'w', 'x', 'y', 'z'];
  
  letrasHabilitadas: boolean[] = Array(this.letras.length).fill(true);
  letrasEncontradas: string[] = [];
  aciertos: number = 0;
  vidas:number = 6;
  palabraJugador : string = '';
  palabraAAdivinar: string = "";
  score: number = 0;
  
  establecerPalabraAleatoria() : string {
    const i = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[i];
  }
  
  constructor(private router:Router)
  {
    this.palabraAAdivinar = this.establecerPalabraAleatoria().toLowerCase();
    this.palabraJugador = '_ '.repeat(this.palabraAAdivinar.length);
  }

  eligeLetra(letra : string)
  {
    if (this.palabraAAdivinar.indexOf(letra) >= 0) {
    } else {
      this.vidas--;
    }
    const palabraOcultaArreglo = this.palabraJugador.split(' ');

    const indice = this.letras.indexOf(letra);
    if (indice !== -1) {
      this.letrasHabilitadas[indice] = false;
    }

    for (let i = 0; i <= this.palabraAAdivinar.length; i++) {
      if (this.palabraAAdivinar[i] === letra) {
        palabraOcultaArreglo[i] = letra;
        this.aciertos++;
      }
    }
    this.palabraJugador = palabraOcultaArreglo.join(' ');
    this.verificarResultado();
  }

  verificarResultado()
  {
    if(this.aciertos == this.palabraAAdivinar.length)
    {
      this.score++;
    }

    if(this.score == 7)
    {
      Swal.fire({
        icon: 'success',
        title: 'Ganaste',
        showCancelButton: true,  // Habilita el botón de cancelar que usaremos para "Volver al Menú"
        confirmButtonText: 'Reiniciar',
        cancelButtonText: 'Volver al Menú',
        reverseButtons: true,  // Coloca el botón de cancelar a la izquierda
        backdrop: true,  // Esto asegura que el fondo sea opaco e interactuable solo con el SweetAlert
        allowOutsideClick: false,  // Impide clics fuera del SweetAlert
    }).then((r) => {
        if (r.isConfirmed) {
            // El usuario hizo clic en "Reiniciar", llama a la función ReiniciarJuego
            this.reiniciarJuego();
        } else if (r.dismiss === Swal.DismissReason.cancel) {
            // El usuario hizo clic en "Volver al Menú", llama a la función VolverAlMenu
            this.volverAlHome();
        }
    });
    }

    if(this.vidas == 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Perdiste',
        showCancelButton: true,  // Habilita el botón de cancelar que usaremos para "Volver al Menú"
        confirmButtonText: 'Reiniciar',
        cancelButtonText: 'Volver al Menú',
        reverseButtons: true,  // Coloca el botón de cancelar a la izquierda
        backdrop: true,  // Esto asegura que el fondo sea opaco e interactuable solo con el SweetAlert
        allowOutsideClick: false,  // Impide clics fuera del SweetAlert
        }).then((r) => {
        if (r.isConfirmed) {
            // El usuario hizo clic en "Reiniciar", llama a la función ReiniciarJuego
            this.reiniciarJuego();
        } else if (r.dismiss === Swal.DismissReason.cancel) {
            // El usuario hizo clic en "Volver al Menú", llama a la función VolverAlMenu
            this.volverAlHome();
        }
      });
    }
  }

  reiniciarJuego(){
    window.location.reload();
  }

  volverAlHome()
  {
    this.router.navigateByUrl('/home');
  }

}
