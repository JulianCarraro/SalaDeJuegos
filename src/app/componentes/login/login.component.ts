import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { UserAuth } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  public loginsCollection:any[] = [];
  public userMail:string = "";
  public userPass:string = "";
  public mensajeError:string = "";


  //public miObservable:BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
      private firestore: Firestore, 
      private router: Router,
      private auth: Auth,
      private userAuthService: UserAuth
    ){}

    Login(): void {
      this.userAuthService.logIn(this.userMail, this.userPass).subscribe({
        next: () => {
          // Inicio de sesión exitoso
          console.log("Inicio de sesión exitoso");
          this.router.navigate(["/home"]);
          let col = collection(this.firestore, 'logins');
          addDoc(col, { fecha: new Date(), "email": this.userMail})
        },
        error: () => {
          console.log("ERROR");
          // console.error("Error al iniciar sesión:", error);
          this.mensajeError = "Los datos son incorrectos";
        }
      });
    }

  Rellenar(){
    this.userMail = "MailPrueba@gmail.com";
    this.userPass = "mail123456";
  }

  //OnDestroy {
  //  this.sub.unsuscribe();
  //}

}