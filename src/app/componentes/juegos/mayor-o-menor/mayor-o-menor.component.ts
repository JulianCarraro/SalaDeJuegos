import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Carta{
  numero: number,
  palo: string,
  url: string
}

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent {

  mazo: Carta[] = [];
  cartaActual?: Carta;
  cartaSiguiente?: Carta;
  respuesta?: string;
  vidas: number = 3;
  puntos: number = 0;
  jugadorGano: boolean = false;
  jugadorPerdio: boolean = false;
  
  constructor(private router:Router){}

  ngOnInit()
  {
    this.iniciarMazo();
    this.iniciarJuego();
  }

  iniciarMazo()
  {
    const palos = ['basto', 'copa', 'espada', 'oro'];
    for(let i = 0; i < 12; i++)
    {
      for(const palo of palos)
      {
        const numero = i + 1;
        const url = (`../../../../assets/cartas/${palo}${numero}.png`)

        const carta: Carta = {
          numero: numero,
          palo: palo,
          url: url
        }

        this.mazo.push(carta);
      }
    }
  }


  iniciarJuego()
  {
    this.cartaActual = this.establecerCartaAleatoria();
    this.cartaSiguiente = this.establecerCartaAleatoria();
  }

  establecerCartaAleatoria() : Carta {
    const i = Math.floor(Math.random() * this.mazo.length);
    return this.mazo[i];
  }

  Mayor()
  {
    this.cartaSiguiente = this.establecerCartaAleatoria();
    
    if(this.cartaActual && this.cartaSiguiente.numero > this.cartaActual.numero)
      {
        this.respuesta = "Correcto";
        this.puntos++;
      }
      else{
        this.respuesta = "Incorrecto";
        this.vidas--;
      }
      
      this.cartaActual = this.cartaSiguiente;
      this.verificarResultado();
  }

  Menor()
  {
    this.cartaSiguiente = this.establecerCartaAleatoria();
    
    if(this.cartaActual && this.cartaSiguiente.numero < this.cartaActual.numero)
      {
        this.respuesta = "Correcto";
        this.puntos++;
      }
      else{
        this.respuesta = "Incorrecto";
        this.vidas--;
      }
  
      this.cartaActual = this.cartaSiguiente;
      this.verificarResultado();
  }

  Igual()
  {
    this.cartaSiguiente = this.establecerCartaAleatoria();
    
    if(this.cartaActual && this.cartaSiguiente.numero == this.cartaActual.numero)
      {
        this.respuesta = "Correcto";
        this.puntos++;
      }
      else{
        this.respuesta = "Incorrecto";
        this.vidas--;
      }
    
      this.cartaActual = this.cartaSiguiente;
      this.verificarResultado();
  }


  verificarResultado()
  {
    if(this.vidas == 0)
    {
      this.jugadorPerdio = true;
    }

    if(this.puntos == 10)
    {
      this.jugadorGano = true;
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
