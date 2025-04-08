import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/products/cart.service';
import { ProductService } from '../../services/products/product.service';

export interface CartUpdate {
  productId: string;
  currentSize: string;
  newSize?: string;
  quantity?: number;
} 

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
  @Output() productUpdatad = new EventEmitter<CartUpdate>();
  products:any;
  selectedSize: string | null = null;
  
  constructor(private cartService: CartService,  private productService: ProductService) {}

  ngOnInit() {
    console.log('Product quantity:', this.product.quantity);
  
  }
  
  increaseQuantity() {
    this.product.quantity++;
    this.emitProductUpdate(); 
  }
  
  decreaseQuantity() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.emitProductUpdate(); 
    }
  }
  
 
  updateSize(newSize: string) {
    if (newSize !== this.product.size) {
      this.product.size = newSize;
      this.emitProductUpdate();
    }
  }

  emitProductUpdate() {
    const updatedProduct: CartUpdate = {
      productId: this.product.product._id,
      currentSize: this.product.size,
      newSize: this.product.size,
      quantity: this.product.quantity
    };

    this.productUpdatad.emit(updatedProduct);  
  }

  selectSize(size: string) {
    this.selectedSize = size;
    console.log('Selected size:', this.selectedSize);
    this.updateSize(size);
    console.log('updated size', size);
  }

  deleteProduct() {
    const targetProductId = this.product.product._id;  
    const selectedSize = this.product.selectedSize; 
    this.cartService.removeFromCart(targetProductId, selectedSize).subscribe(() => {
    
      this.productDeleted.emit(targetProductId);
      console.log(' Product deleted from cart:', targetProductId);
    });
  }

 
}
