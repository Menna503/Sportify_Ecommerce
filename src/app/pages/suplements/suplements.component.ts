import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products/product.service';
import { HttpClient } from '@angular/common/http';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
  selector: 'app-suplements',
imports: [MenCollectionComponent, HeaderComponent, ProductCardComponent, CommonModule, PaginationComponent, FooterComponent, FilterComponent],
  templateUrl: './suplements.component.html',
  styleUrl: './suplements.component.css'
})
export class SuplementsComponent {
src="assets/images/suplements_collection.svg";
 productes: any;
     sort: string = '';
     brand: string = '';
     selectedIndex: number | null = null;
     priceindex: number | null = null;
     totalItems = 0;
   itemsPerPage = 8;
   currentPage = 1;
     
   
     infoBrand: any = [
       { img: 'assets/icons/Swanson_Vitamins_Logo.jpg', brandName: 'Swanson' },
       { img: 'assets/icons/solgar-logo.png', brandName: 'Solgar'},
      
     ];
   
     constructor(private http: HttpClient, private productService: ProductService) {}
   
     ngOnInit() {
      this.currentPage=1;
      this. loadProducts();
     
     }
   
     
     
     updateFilters(filterData: { sort: string; brand: string }) {
       this.sort = filterData.sort;
       this.brand = filterData.brand;
      
       this.loadProducts();
     }
     
   
   
     loadProducts() {
       const params = {
         category: 'supplement',
         sort: this.sort,
         brand: this.brand
       };
   
       const filteredParams = Object.fromEntries(
         Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
       );
   
       this.productService.getProduct(filteredParams, this.currentPage, this.itemsPerPage)
     .subscribe({
       next: (response) => {
         this.productes = response.products;
         this.totalItems = response.total;
         console.log("✅ API Response:", response);
       },
       error: (err) => {
         console.error("❌ Server Error:", err);
         alert(`Error: ${err.message || "Something went wrong!"}`);
       }
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
     get paginatedData(){
       const start =(this.currentPage-1)*this.itemsPerPage;
       const end = start +this.itemsPerPage
     
       return this.productes.slice(start , end)
     }
     
     
     
     
}
