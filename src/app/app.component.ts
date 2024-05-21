import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SalaDeJuegos';
  isLoggedIn: boolean = false;
  userMail : string | null = null;


  constructor(public userService: UserService) {}

  ngOnInit(): void
  {
    this.UserLogged();
    
  }

  UserLogged()
  {
      this.isLoggedIn = this.userService.isLoggedIn();
      console.log(this.isLoggedIn);
      this.userService.getUserMail().then(email=> {
        this.userMail = email;
    });
  }

  logOut() : void
  {
    this.userService.logOut();
  }

}
