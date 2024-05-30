import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserAuth } from '../../services/user-auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  newUserMail: string = "";
  newUsername: string = "";
  newUserPass: string = "";
  newUserRepeatPass: string = "";

  msjError: string = "";

  constructor(
      public auth: Auth, 
      private firestore: Firestore,
      private router: Router,
      private userAuthService: UserAuth
    ){}

  Register()
  {
    if(this.newUserPass == this.newUserRepeatPass)
    {      
        this.userAuthService.register(this.newUserMail, this.newUserPass).then((res) => {
        let col = collection(this.firestore, 'users');
        addDoc(col, {fecha: new Date(), "email": this.newUserMail})
        
        this.router.navigate(["/home"]);
  
      }).catch((e) => {
        switch (e.code) {
          case "auth/invalid-email":
            this.msjError = "Email invalido";
            console.log("HOlA");
            break;
          case "auth/email-already-in-use":
            this.msjError = "Email ya en uso";
            break;
          case "auth/missing-password":
            this.msjError = "Faltan completar campos";
            break;
          case "auth/weak-password":
            this.msjError = "La contraseña es demasiado debil";
          break;
          default:
            this.msjError = "Ocurrio un error";
            break;
        }
      })
    }
    else
    {
      this.msjError = "Las contraseñas no coinciden";
    }
  }


}
