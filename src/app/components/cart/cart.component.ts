import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/products/cart.service';

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

  constructor(private cartService: CartService) {}

  ngOnInit() {
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
      this.product.selectedSize
    ).subscribe(() => {
      console.log('✅ Quantity updated');
    });
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
