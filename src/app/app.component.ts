import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from "./pages/home/home.component";
import { MenComponent } from "./pages/home/men/men.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, MenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sports';
}
