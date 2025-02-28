import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RunningManComponent } from "../../components/running-man/running-man.component";
import { CategoriesComponent } from "../../components/categories/categories.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RunningManComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
