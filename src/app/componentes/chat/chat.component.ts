import { Component, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat-service.service';
import { UserAuth } from '../../services/user-auth.service';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Mensaje } from '../../interfaces/mensaje';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  auxObservable$! : Observable<User | null>;
  user$! : User | null;
  mensajes? : Mensaje[] = [];
  isChatOpen: boolean = false;

  constructor(private chatService: ChatService, private userAuthService: UserAuth, private formB : FormBuilder)
  {
    this.auxObservable$ = this.userAuthService.getUser();
    this.auxObservable$.subscribe((r)=> 
    {
      this.user$ = r;
    })
  }

  ngOnInit(){
    this.chatService.obtenerChats().subscribe((mensajes) => {

      mensajes.sort((a, b) => a.date.localeCompare(b.date));
      this.mensajes = mensajes;
      setTimeout(() => {
        this.scrollToTheLastElementByClassName();
      }, 50)

    })
  }

  form = this.formB.nonNullable.group({
    mensaje: ['', Validators.required],
  });

  toggleChat() {
    this.isChatOpen = !this.isChatOpen; // Invierte el estado del chat
    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 50)
  }

  enviarMensaje() {
    const value = this.form.getRawValue();

    let fecha = new Date();

    let mensaje: Mensaje = 
    {
      texto: value.mensaje,
      nombre: this.user$?.email || '',
      date: `${fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} - ${fecha.toLocaleTimeString()}`
    };

    this.chatService.guardarChats(mensaje);
    this.form.setValue({ mensaje: '' });

    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 20)
  }

  scrollToTheLastElementByClassName(){

    if(this.user$ as User && this.isChatOpen){
      let elements = document.getElementsByClassName('msj');
      let ultimoElemento:any = elements[elements.length-1];
      
      let toppos = ultimoElemento.offsetTop;
      
      document.getElementById('contenedorMensajes')!.scrollTop = toppos;
    }
  }

}
