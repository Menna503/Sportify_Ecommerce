import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',

})
export class AdminComponent {
  
}
