import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/products/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent,FooterComponent],
  templateUrl: './admin-edit-product.component.html',
 
})
export class AdminEditProductComponent implements OnInit {
  product: any = {};
  productCategories: string[] = ["67d080e25ebe64206430ae2b", "67d0805f5ebe64206430ae22"];
  productSubcategories: string[] = [' ', 'shirts', 'pants'];
  productMaterials: string[] = [
    'Synthetics', 'cotton', 'Rubber', 'Vinyl Dumbbell', 'metal', 'Leather',
    'Plastic', 'cotton-lycra', 'Polyester', 'Polyester-cotton', 'Polyester-lycra',
    'Mesh', 'Textile', 'Synthetic Leather', 'Soft foam', 'Microfiber Leather'
  ];
  productSizes: string[] = ['S', 'M', 'L', 'XL'];
  productColor: string[] = ['Red', 'Blue', 'Black', 'White'];



  constructor(private adminService: AdminService,
   private route: ActivatedRoute,private productService:ProductService, ) {}
    productId: string = ''; 
    products:any;
 
  ngOnInit(): void {
    console.log(this.productId)
    this.productId = this.route.snapshot.paramMap.get('id') || ''; 
    console.log('Product ID in AdminEditProductComponent:', this.productId);
    this.productService.getProductById(this.productId).subscribe({
      next:(data)=>{
        
        this.products = data ,
        console.log(this.products)},
      error:(err)=>{console.log(err)},
      complete:()=>{console.log("completed")}
     });
  }

  
  // دالة لتحديث المنتج
  updateProduct(): void {
    if (this.productId && this.product) {
      this.adminService.editProduct(this.productId, this.product).subscribe({
        next: () => {
          console.log('Product updated successfully');
        },
        error: (err) => {
          console.error('Error updating product:', err);
        }
      });
    }
  }
  
}