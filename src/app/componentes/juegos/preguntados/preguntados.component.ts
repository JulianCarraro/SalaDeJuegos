import { Component } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { Router } from '@angular/router';
import { Personaje } from '../../../interfaces/personaje';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {

  constructor(private preguntadosServ : PreguntadosService, private router : Router){}

  personajeCorrecto! : Personaje | undefined;
  personajes! : Personaje[] | undefined;
  opcionUno! : string;
  opcionDos! : string;
  opcionTres! : string;
  opcionCuatro! : string;
  score : number = 0;
  tiempoRestante: number = 7;
  tiempoTerminado: boolean = false;
  intervalId: any;

  ngOnInit(): void{
  this.inicializarJuego();
  this.iniciarContador();
  }

  inicializarJuego() : void{
    this.preguntadosServ.obtenerPersonaje().subscribe(
      (response) => {
        this.personajeCorrecto = response;

        this.preguntadosServ.obtenerOpcionesPersonajes().subscribe(
          (response) => {
            this.personajes = response;
            this.seleccionarOpciones();
          }
        )
      }
    )
  }

  iniciarContador() {
    this.intervalId = setInterval(() => {
      this.tiempoRestante -= 1;

      if (this.tiempoRestante === 0) {
        clearInterval(this.intervalId); // Detener el intervalo
        this.tiempoRestante = 0;
        this.verificarTiempo();
      }
    }, 1000); // Disminuye el contador cada 1000 ms o 1 segundo
  }

  detenerContador() {
    clearInterval(this.intervalId);
    this.tiempoRestante = 7; // Opcional: resetear el temporizador
  }

  seleccionarOpciones() : void{
    const opcionesFiltradas = this.personajes!.filter(per => per.id !== this.personajeCorrecto?.id)
  
    // Inicializar un array para las opciones seleccionadas
    const opcionesSeleccionadas = [];
  
    // Inicializar un set para controlar los índices ya seleccionados
    const indicesSeleccionados = new Set(); //cuando busca los indices, automaticamente excluye los duplicados
  
    // Seleccionar 3 índices aleatorios únicos
    while (opcionesSeleccionadas.length < 3) {
      const randomIndex = Math.floor(Math.random() * opcionesFiltradas.length);
  
      // Asegurarse de que no se añadan duplicados verificando los índices
      if (!indicesSeleccionados.has(randomIndex)) {
        opcionesSeleccionadas.push(opcionesFiltradas[randomIndex]);
        indicesSeleccionados.add(randomIndex); // Añadir índice al conjunto para control de duplicados
      }
    }

    opcionesSeleccionadas.push(this.personajeCorrecto);
    opcionesSeleccionadas.sort(() => 0.5 - Math.random())
  
    // Asignar las opciones seleccionadas a propiedades, si es necesario
    // Ejemplo de asignación
    this.opcionUno = opcionesSeleccionadas[0]!.name;
    this.opcionDos = opcionesSeleccionadas[1]!.name;
    this.opcionTres = opcionesSeleccionadas[2]!.name;
    this.opcionCuatro = opcionesSeleccionadas[3]!.name;
  }

  verificarTiempo() {
    if (this.tiempoRestante === 0) {
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
      return true;
    }
    return false;
  }


  verificarRespuesta(opcionObtenida : string) : void{

    if(opcionObtenida == this.personajeCorrecto!.name)
    {
      this.score++;
      this.inicializarJuego();
         
    }
    else{
      this.detenerContador();
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

    if(this.score == 10)
    {
      this.detenerContador();
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

  }

  actualizarImagen() : any{
    return this.personajeCorrecto?.image;
  }

  reiniciarJuego(): void {
    window.location.reload();
  }


  volverAlHome()
  {
    this.router.navigateByUrl('/home');
  }

}
