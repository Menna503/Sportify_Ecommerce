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
  src = "assets/images/men_collection.svg";
  isHidden: boolean = true;
  hightChecked: boolean = true;
  lowChecked: boolean = true;
  adidas: boolean = true;
  nike: boolean = true;
  nilton: boolean = true;
  misery: boolean = true;
  hideBrand: boolean = true;
  hideBrice: boolean = false;
  selectedButton: string = 'price';
  menClothes: any;
  subCategory: string = '';
  brand: string = '';
  sort: string='';

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

    // Remove keys with empty values
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== "")
    );

    // Ensure there are additional filters before sending the request
    if (Object.keys(filteredParams).length >= 2) {
      this.productService.getProduct(filteredParams)
        .subscribe(products => {
          this.menClothes = products;
          console.log(products);
        });
    } else {
      console.warn("No filters applied, request not sent!");
    }
  }

  toggelFilter() {
    this.isHidden = !this.isHidden;
  }

  showCheck(text: string) {
    switch (text) {
      case 'hight':
        this.hightChecked = false;
        this.lowChecked = true;
        this.sort='-price';
        break;
      case 'low':
        this.lowChecked = false;
        this.hightChecked = true;
        this.sort='price';
        break;
      case 'Adidas':
        this.adidas=false;
        this.nike=true;
        this.nilton=true;
        this.misery=true;
        this.brand='Adidas'; 
        break;
      case 'Nike':
        this.nike=false;
        this.adidas=true;
        this.nilton=true;
        this.misery=true;
        this.brand='Nike'
        break;
      case 'Nileton':
        this.nilton=false;
        this.nike=true;
        this.adidas=true;
        this.misery=true;
        this.brand='Nileton';
        break;
      case 'Mesery':
        this.misery=false;
      this.nilton=true;
      this.nike=true;
      this.adidas=true;
      this.brand='Mesery';
        break;
    }
    this.fetchData();
  }

  display(text: string) {
    this.subCategory = text;
    this.fetchData();
  }

  show(text: string) {
    this.selectedButton = text;
    this.hideBrand = text !== 'brand';
    this.hideBrice = text !== 'price';
  }

  itemsPerPage = 8;
  currentPage = 1;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.menClothes ? this.menClothes.slice(start, end) : [];
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
