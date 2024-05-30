import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-evita-las-espinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evita-las-espinas.component.html',
  styleUrl: './evita-las-espinas.component.css'
})
export class EvitaLasEspinasComponent implements OnInit{
  triangles: { top: number }[] = [];
  triangleGroups: number[][] = [[1, 2, 3, 4, 8], [4, 5, 6], [7, 8, 9, 2, 1]];
  currentGroupIndex = 0;
  timer: any;
  birdPosition = { left: 240, top: 340 };
  direction = 1;
  birdTimer: any;
  velocity = 0;
  gravity = 1;
  jumpStrength = -15;
  score = 0;
  jugadorGano: boolean = false;
  jugadorPerdio: boolean = false;

  constructor(private router:Router){}

  ngOnInit(): void {

    for (let i = 0; i < 10; i++) {
      this.triangles.push({ top: i * 70 }); // Asumiendo que el espacio de juego es de 700px de alto
    }
    
    this.updateTrianglePositions();

    Swal.fire({
      title: 'Preparándote para jugar',
      html: 'El juego comenzará en <strong></strong> segundos.',
      timer: 5000,  // Temporizador de 5 segundos
      timerProgressBar: true,  // Muestra una barra de progreso del temporizador
      showConfirmButton: false,  // No muestra el botón de confirmar
      backdrop: true,  // Fondo opaco
      allowOutsideClick: false,  // Impide clics fuera del SweetAlert
      willOpen: () => {
        const b = Swal.getHtmlContainer() ? Swal.getHtmlContainer()?.querySelector('strong') : null;
        if (b) {
          const timerInterval = setInterval(() => {
            const timeLeft = Swal.getTimerLeft();
            if (timeLeft !== undefined) {
              b.textContent = (timeLeft / 1000).toFixed(0);
            }
          }, 100);
          Swal.stopTimer(); // Pausa el timer para evitar que se cierre prematuramente
          setTimeout(() => {
            Swal.resumeTimer(); // Reanuda el timer después de que todo esté listo
          }, 100);
          // Aseguramos que timerInterval se limpie adecuadamente
          Swal.getPopup()?.addEventListener('close', () => {
            clearInterval(timerInterval);
          });
        }
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.startBirdMovement();
      }
    });
  }

  updateTrianglePositions(): void {
    this.triangleGroups[this.currentGroupIndex].forEach((index) => {
      this.triangles[index].top = Math.random() * 620; // Posiciones aleatorias para cada grupo
    });
  }

  startBirdMovement(): void {
    this.birdTimer = setInterval(() => {
      this.birdPosition.left += this.direction * 9;
      this.velocity += this.gravity;
      this.birdPosition.top += this.velocity;
      

      if (this.birdPosition.left <= 0 || this.birdPosition.left >= 480) {
        this.direction *= -1;
        this.score++;

        setTimeout(() => {
          this.updateTrianglePositions();
        }, 500);  // 1000 milisegundos equivalen a 1 segundo
      }

      if (this.checkCollision()) {
        clearInterval(this.birdTimer);
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

      if (this.birdPosition.top >= 680) {
        this.birdPosition.top = 680;
        this.velocity = 0;
      }

      if(this.score == 30)
      {
        clearInterval(this.birdTimer);
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


    }, 50);
  }

  checkCollision(): boolean {
    const birdLeft = this.birdPosition.left;
    const birdRight = this.birdPosition.left + 20;
    const birdTop = this.birdPosition.top;
    const birdBottom = this.birdPosition.top + 20;
    let retorno = false;
  
    // Revisar cada grupo de triángulos activos según currentGroupIndex
    for (let triangleIndex of this.triangleGroups[this.currentGroupIndex]) {
      const triangleTop = this.triangles[triangleIndex].top;
      const triangleBottom = triangleTop + 40;
  
      // Comprobar colisión con triángulo izquierdo
      if (birdRight > 0 && birdLeft < 40 && birdBottom > triangleTop && birdTop < triangleBottom) {
        retorno = true;
      }
  
      // Comprobar colisión con triángulo derecho
      if (birdRight > 460 && birdLeft < 500 && birdBottom > triangleTop && birdTop < triangleBottom) {
        retorno = true;
      }
    }
  
    // Verificar colisión con triángulos arriba y abajo
    for (let i = 0; i < 10; i++) {
      const horizontalPosition = i * 48 + 10;
      const triangleTopDown = 0;
      const triangleBottomDown = 40;
      const triangleTopUp = 660;
      const triangleBottomUp = 700;
  
      // Comprobar colisión con triángulos abajo
      if (birdRight > horizontalPosition && birdLeft < horizontalPosition + 40 && birdBottom > triangleTopDown && birdTop < triangleBottomDown) {
        retorno = true;
      }
  
      // Comprobar colisión con triángulos arriba
      if (birdRight > horizontalPosition && birdLeft < horizontalPosition + 40 && birdBottom > triangleTopUp && birdTop < triangleBottomUp) {
        retorno = true;
      }
    }

    return retorno;
  }  


  jump(): void {
    this.velocity = this.jumpStrength;
  }

  reiniciarJuego(): void {
    window.location.reload();
  }


  volverAlHome()
  {
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    // clearInterval(this.timer);
    clearInterval(this.birdTimer);
  }

}

