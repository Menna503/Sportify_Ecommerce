import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule ,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  show:string='hidden'
  ishidden:boolean=false
  toggel() {
    this.show = this.show === 'hidden' ? 'block' : 'hidden';
  }
  
  getProfile(){
  //  this.ishidden=this.ishidden==='hidden'?'block':'hidden';
  this.ishidden=!this.ishidden
  }
}
