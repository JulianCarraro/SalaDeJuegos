import { Injectable, inject } from '@angular/core';
import {addDoc, collection, collectionData, Firestore,} from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService{

  firestore = inject(Firestore);

  guardarChats(mensaje: Mensaje)
  {
    const col = collection(this.firestore, 'chats');
    return addDoc(col, mensaje);
  }

  obtenerChats(): Observable<Mensaje[]>
  {
    const col = collection(this.firestore, 'chats');
    const observable = collectionData(col);
    return observable as Observable<Mensaje[]>;
  }
}
