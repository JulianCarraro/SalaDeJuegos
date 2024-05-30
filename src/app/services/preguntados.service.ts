import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Personaje } from '../interfaces/personaje';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private http: HttpClient) { }

  obtenerPersonaje() : Observable<Personaje | undefined>
  {
    const id = Math.floor(Math.random() * 500) + 1;
    const urlWithId = `https://rickandmortyapi.com/api/character/${id}`;

    return this.http.get<Personaje>(urlWithId).pipe(
      catchError( (error) =>{
        console.log(error)
        return of (undefined)
      })
    )
  }

  obtenerOpcionesPersonajes(): Observable<Personaje[]>{
    return this.http.get<any>('https://rickandmortyapi.com/api/character?limit=500').pipe(
      map(response => response.results)
    );
    
  } 

}
