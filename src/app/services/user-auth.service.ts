import { Injectable } from "@angular/core";
import { getAuth, signOut } from "firebase/auth";
import {Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { User } from "firebase/auth";
import { Observable, from } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class UserAuth{

    observable! : Observable<User | null>;
    auxObservable$! : Observable<User | null>; //creo un observable que puede ser un usuario o null
    user$! : User | null; //Voy a guardar la respuesta del observable
    
    constructor(private auth: Auth){}


    public register(email : string, password: string)
    {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    public logIn(email : string, password: string) : Observable<void>{
        const promise = signInWithEmailAndPassword(this.auth, email, password).then(()=>{
        })
        return from (promise);
    }
  
  
    logOut():Observable<void>
    {
        const promise = signOut(this.auth);     
        return from (promise);
    }

    getUser()
    {
        this.observable = authState(this.auth);
        return this.observable;
    }

    isLoggedIn()
    {
        this.auxObservable$ = this.getUser();
        this.auxObservable$.subscribe((r)=> 
        {
          this.user$ = r;
        
        })

        return this.user$;
    }

}

