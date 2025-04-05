import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/products/cart.service';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() product: any;
  @Output() quantityChanged = new EventEmitter<void>();
  @Output() productDeleted = new EventEmitter<string>();
  products:any;
  selectedSize: string | null = null;
  

  constructor(private cartService: CartService,  private productService: ProductService) {}

  ngOnInit() {
    // this.productService.getProductById(this.product.product._id).subscribe((product) => {
    //   this.products = product; 
    //   console.log('Full product details:', this.products);
    // }, error => {
    //   console.error('Error fetching product:', error);
    // });
    console.log('Product quantity:', this.product.quantity);
   
  }

  increaseQuantity() {
    this.product.quantity++;
    this.quantityChanged.emit();
  }

  decreaseQuantity() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.quantityChanged.emit();
    }
  }

  updateQuantity(newValue: number) {
    const quantity = Math.max(1, +newValue);
    this.product.quantity = quantity;
    this.quantityChanged.emit();
   

    this.cartService.updateQuantity(
      this.product.product._id,
      this.product.quantity,
      this.product.selectedSize,
       
    ).subscribe(() => {
      console.log('✅ Quantity updated');
    });
  }
  selectSize(size: string) {
    this.selectedSize = size;
    console.log('Selected size:', this.selectedSize);
  }

  //! for deletion
  deleteProduct() {
    // تأكد من استخدام الـ id المناسب، مثلاً: this.product.product._id
    const targetProductId = this.product.product._id;  
    const selectedSize = this.product.selectedSize;  // تأكد من وجود الخاصية دي
    this.cartService.removeFromCart(targetProductId, selectedSize).subscribe(() => {
      // إعلام الأب بأن المنتج تم حذفه
      this.productDeleted.emit(targetProductId);
      console.log('✅ Product deleted from cart:', targetProductId);
    });
  }
}
