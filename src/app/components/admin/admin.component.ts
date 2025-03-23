import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-admin',
  imports: [FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './admin.component.html',

})
export class AdminComponent {
  
}
