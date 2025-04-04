import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-women',
  imports: [HeaderComponent, MenCollectionComponent, ProductCardComponent, FooterComponent,PaginationComponent,CommonModule],
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent {
    src="assets/images/image_71.svg"
    isHidden:boolean=true;
    womenClothes:any;
    constructor(private productService:ProductService){}

    // ngOnInit(){
    //   this.productService.getProduct({gender:'women' , category:'clothes'}).subscribe({
    //     next:(res)=>{
    //       this.womenClothes=res
    //       console.log(res);
    //     },
    //     error:(err)=>{
    //       console.log(err);
          
    //     }
    //   })
    // }

toggelFilter(){
  this.isHidden=!this.isHidden;
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

  return this.womenClothes.slice(start , end)
}

changePage(page :number){
  this.currentPage=page
}

}

