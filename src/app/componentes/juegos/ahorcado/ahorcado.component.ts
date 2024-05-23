import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  jugadorGano: boolean = false;
  jugadorPerdio: boolean = false;
  palabraAAdivinar: string = "";
  
  establecerPalabraAleatoria() : string {
    const i = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[i];
  }
  
  constructor(private router:Router)
  {
    this.palabraAAdivinar = this.establecerPalabraAleatoria().toLowerCase();
    this.palabraJugador = '_ '.repeat(this.palabraAAdivinar.length);
    console.log(this.palabraAAdivinar);
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
      this.jugadorGano = true;
    }

    if(this.vidas == 0)
    {
      this.jugadorPerdio = true;
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
