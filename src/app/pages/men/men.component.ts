import { Component } from '@angular/core';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { ProductService } from '../../services/products/product.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-men',
  imports: [MenCollectionComponent, HeaderComponent, ProductCardComponent, CommonModule, PaginationComponent, FooterComponent],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent {
src="assets/images/men_collection.svg";
isHidden:boolean=true;
hightChecked:boolean=true;
lowChecked:boolean=true;
adidas:boolean=true;
nike:boolean=true;
nilton:boolean=true;
misery:boolean=true;
hideBrand:boolean=true;
hideBrice:boolean=false;
selectedButton: string = 'price';
 menClothes:any
constructor(private http:HttpClient,private productService:ProductService){
  
}
ngOnInit(){


  this.productService.getProduct({ gender: 'men', category: 'clothes' })
  .subscribe(products => {
    this.menClothes=products;
    console.log(products);
  });

  }



toggelFilter(){
  this.isHidden=!this.isHidden;
  // this.hightChecked=true;
  // this.lowChecked=true;
 
}

showCheck(text:string){

  switch(text){
    case'hight':
    this.hightChecked=false;
    this.lowChecked=true;
    break;
    case'low':
    this.lowChecked=false;
    this.hightChecked=true;
    break;
    case'adidas':
    this.adidas=false;
    this.nike=true;
    this.nilton=true;
    this.misery=true;
    break;
    case 'nike':
      this.nike=false;
      this.adidas=true;
      this.nilton=true;
    this.misery=true;
    break;
    case 'nilton':
      this.nilton=false;
      this.nike=true;
      this.adidas=true;
      this.misery=true;
    break;
    case 'misery':
      this.misery=false;
      this.nilton=true;
      this.nike=true;
      this.adidas=true;
    break;


  }
 

}
show(text:string){
  this.selectedButton=text;
  switch(text){
    case 'brand':
      this.hideBrand=false;
      this.hideBrice=true;
    
      break;
    case 'price':
      this.hideBrice=false;
      this.hideBrand=true;  
    
  }
 
}

itemsPerPage=8
currentPage=1
// data=[
//   {id:1,},
//   {id:2,},
//   {id:3,},
//   {id:4,},
//   {id:5,},
//   {id:6,},
//   {id:7,},
//   {id:8,},
//   {id:9,},
//   {id:10,},
//   {id:11,},
//   {id:12,},
//   {id:14,},
//   {id:15,},
//   {id:16,},
//   {id:17,},
//   {id:18,},
//   {id:19,},
//   {id:20,},
// ]

get paginatedData(){
  const start =(this.currentPage-1)*this.itemsPerPage;
  const end = start +this.itemsPerPage

  return this.menClothes.slice(start , end)
}

changePage(page :number){
  this.currentPage=page
}

}
