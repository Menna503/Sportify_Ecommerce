import { Component } from '@angular/core';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';



@Component({
  selector: 'app-men',
  imports: [MenCollectionComponent,HeaderComponent,ProductCardComponent,CommonModule ,PaginationComponent],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent {
src="assets/images/men_collection.svg";
isHidden:boolean=true;
toggelFilter(){
  this.isHidden=!this.isHidden;
}
itemsPerPage=8
currentPage=1
data=[
  {id:1,},
  {id:2,},
  {id:3,},
  {id:4,},
  {id:5,},
  {id:6,},
  {id:7,},
  {id:8,},
  {id:9,},
  {id:10,},
  {id:11,},
  {id:12,},
  {id:14,},
  {id:15,},
  {id:16,},
  {id:17,},
  {id:18,},
  {id:19,},
  {id:20,},
]

get paginatedData(){
  const start =(this.currentPage-1)*this.itemsPerPage;
  const end = start +this.itemsPerPage

  return this.data.slice(start , end)
}

changePage(page :number){
  this.currentPage=page
}

}
