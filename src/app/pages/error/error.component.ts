import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule],
  templateUrl: './error.component.html',
  
})
export class ErrorComponent {

  constructor(private router: Router) {}

  backToHome() {
    console.log('Navigating to home...');
    this.router.navigate(['/home']);
  }
}
