import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from "./pages/home/home.component";
import { SignPicComponent } from './components/sign-pic/sign-pic.component';
import { SignupComponent } from './pages/signup/signup.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent ,SignupComponent , SignPicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sports';
}
