import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductService } from '../../services/products/product.service';
import { HttpClient } from '@angular/common/http';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-shoes',
 imports: [MenCollectionComponent, HeaderComponent, ProductCardComponent, CommonModule, PaginationComponent, FooterComponent, FilterComponent, LoadingComponent],
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.css'
})
export class ShoesComponent {
src = "assets/images/shoes_img.svg";
     productes: any;
     sort: string = '';
     brand: string = '';
     selectedIndex: number | null = null;
     priceindex: number | null = null;
     totalItems = 0;
   itemsPerPage = 8;
   currentPage = 1;
   isLoading: boolean = false;
  errorMessage: string = '';
     
   
     infoBrand: any = [
      { img: 'assets/icons/adidas.svg', brandName: 'ADIDAS' },
      { img: 'assets/icons/nike.svg', brandName: 'Nike' },
      { img: 'assets/icons/puma-logo.svg', brandName: 'PUMA' },
      { img: 'assets/icons/puma-logo.svg', brandName: 'PUMAl' },
  
      
     ];
   
     constructor(private http: HttpClient, private productService: ProductService) {}
   
     ngOnInit() {
      this.currentPage=1;
      this. loadProducts();
     
     }
   
     
     
     updateFilters(filterData: { sort: string; brand: string }) {
       this.sort = filterData.sort;
       this.brand = filterData.brand;
       this.currentPage = 1; 
       this.loadProducts();
     }
     
   
   
     loadProducts() {
      this.isLoading = true; 
       const params = {
         category: 'shoes',
         sort: this.sort,
         brand: this.brand
       };
   
       const filteredParams = Object.fromEntries(
         Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
       );
   
       this.productService.getProduct(filteredParams, this.currentPage, this.itemsPerPage)
     .subscribe({
       next: (response) => {
        this.isLoading = false; 
        this.errorMessage='';
         this.productes = response.products;
         this.totalItems = response.total;
         console.log(" API Response:", response);
       },
       error: (error) => {
        this.isLoading = false; 
        if (error.status === 500) {
          this.errorMessage = 'no data found'; // Assign the specific 500 error message
        } else {
          this.errorMessage = 'An error occurred while loading products.'; // Generic error message
        }
      },
      complete: () => {
        this.isLoading = false;  
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
