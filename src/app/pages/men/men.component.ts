import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenCollectionComponent } from '../../components/image-collection/men-collection.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductService } from '../../services/products/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-men',
  imports: [MenCollectionComponent, HeaderComponent, ProductCardComponent, CommonModule, PaginationComponent, FooterComponent, FilterComponent],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent {
  src = "assets/images/men_collection.svg";
  menClothes: any;
  subCategory: string = '';
  sort: string = '';
  brand: string = '';
  selectedIndex: number | null = null;
  priceindex: number | null = null;
  

  infoBrand: any = [
    { img: 'assets/icons/adidas.svg', brandName: 'Adidas' },
    { img: 'assets/icons/nike.svg', brandName: 'Nike' },
    { img: 'assets/icons/nilton.svg', brandName: 'Nileton' },
    { img: 'assets/icons/misery.svg', brandName: 'Mesery' }
  ];

  constructor(private http: HttpClient, private productService: ProductService) {}

  ngOnInit() {
    this.fetchData();
  
  }

  fetchData() {
    const params = {
      gender: 'men',
      category: 'clothes',
      subCategory: this.subCategory,
      sort: this.sort,
      brand: this.brand
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
    );

    if (Object.keys(filteredParams).length >= 2) {
      this.productService.getProduct(filteredParams).subscribe(products => {
        this.menClothes = products;
        console.log(this.menClothes);

      });
    }
  }

  
  updateFilters(filterData: { sort: string; brand: string }) {
    this.sort = filterData.sort;
    this.brand = filterData.brand;
    this.fetchData(); // Call fetchData() when filters change
  }
  

  display(text: string) {
    this.subCategory = text;
    this.fetchData();
  }

  // itemsPerPage = 8;
  // currentPage = 1;

  // get paginatedData() {
  //   const start = (this.currentPage - 1) * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   return this.menClothes ? this.menClothes.slice(start, end) : [];
  // }

  // changePage(page: number) {
  //   this.currentPage = page;
  // }
}
