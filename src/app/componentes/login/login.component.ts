import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { UserService } from '../../services/user.service';

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

  public loggedUser:string = "";


  //public miObservable:BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
      private firestore: Firestore, 
      private router: Router,
      private auth: Auth,
      private userService: UserService
    ){}

  Login() {
      this.userService.login(this.userMail, this.userPass)
      .then((res) => {
      if (res.user.email !== null) this.loggedUser = res.user.email;
      let col = collection(this.firestore, 'logins');
      addDoc(col, { fecha: new Date(), "email": this.userMail})

      if(typeof localStorage !== "undefined")
      {
        localStorage.setItem('email', JSON.stringify(this.userMail));
      }

      this.router.navigate(["/home"]);
      })
      .catch((e) => {
        console.error("Error al iniciar sesión:", e);
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