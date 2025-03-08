import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-confirm-payment',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.css'
})
export class ConfirmPaymentComponent {

}
