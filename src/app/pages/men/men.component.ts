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
totalItems = 0;
itemsPerPage = 8;
currentPage = 1;
constructor(private http:HttpClient,private productService:ProductService){}
// ngOnInit(){
//   //  this.fetchdata()
//   // fetchdata(){
//     this.productService.getProduct({ gender: 'men', category: 'clothes' },this.currentPage, this.itemsPerPage)
//     .subscribe(products => {
//       this.menClothes=products;
//       console.log(products);
//       this.totalItems=this.menClothes.length;
//     });
//   // }
//   }

ngOnInit() {
  this.loadProducts();
  // this.loadTotalCount(); // ✅ جلب العدد الكلي للمنتجات
}

loadProducts() {
  this.productService.getProduct({ gender: 'men', category: 'clothes' },this.currentPage,  this.itemsPerPage)
    .subscribe(response => {
      this.menClothes = response.products;
      this.totalItems = response.total; 
      console.log(response);
      
    });
}


changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.loadProducts();
  }
}



get totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}

//////////////////////////////////////////////////////////////////////////////////////////
  
  onlyShirts(){
    this.productService.getProduct({gender: 'men', category: 'clothes', subCategory: "shirts"}).subscribe({
      next:(shirts)=>{
        this.menClothes=shirts
      },
      error:(err)=>{
        console.log();
        
      }
    })
  }
  onlyPantss(){
    this.productService.getProduct({gender: 'men', category: 'clothes', subCategory: "pants"}).subscribe({
      next:(pants)=>{
        this.menClothes=pants
      },
      error:(err)=>{
        console.log();
        
      }
    })
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


get paginatedData(){
  const start =(this.currentPage-1)*this.itemsPerPage;
  const end = start +this.itemsPerPage

  return this.menClothes.slice(start , end)
}



}