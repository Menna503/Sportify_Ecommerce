import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { ServicesComponent } from '../../components/services/services.component';
import { PartnersComponent } from '../../components/partners/partners.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,ServicesComponent,FooterComponent,PartnersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
