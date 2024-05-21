import { Injectable } from "@angular/core";
import { getAuth, signOut } from "firebase/auth";
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { User } from "firebase/auth";

@Injectable({
    providedIn: "root"
})

export class UserService{
    
    constructor(private auth: Auth)
    {

    }

    public login(email : string, password: string){
        return signInWithEmailAndPassword(this.auth, email, password);
    }


    public isLoggedIn(): boolean {       
        const currentUser = this.auth.currentUser;
        return currentUser !== null; // Devuelve true si el usuario está logueado, de lo contrario, devuelve false
    }
  
  
    public logOut()
    {
      return this.auth.signOut();
    }

    public async getUserMail() : Promise<string | null>
    {
        const currentUser = await this.auth.currentUser;
        return currentUser?.email ?? null;
    }



}


