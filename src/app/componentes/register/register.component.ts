import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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

  
  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";
  flagPass: boolean = true;

  constructor(
      public auth: Auth, 
      private firestore: Firestore,
      private router: Router
    ){}

  Register()
  {
    if(this.newUserPass == this.newUserRepeatPass)
    {      
      createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPass).then((res) => {
        let col = collection(this.firestore, 'users');
        addDoc(col, {fecha: new Date(), "email": this.newUserMail})
        this.flagError = true;
        this.router.navigate(["/home"]);
  
      }).catch((e) => {
        console.log(e.code);
    
        // switch (e.code) {
        //   case "auth/invalid-email":
        //     this.msjError = "Email invalido";
        //     break;
        //   case "auth/email-already-in-use":
        //     this.msjError = "Email ya en uso";
        //     break;
        //   default:
        //     this.msjError = e.code
        //     break;
        // }
      })
    }
    else
    {
      this.flagPass = false;
    }
  }


}
