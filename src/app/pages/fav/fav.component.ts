import { Component , ElementRef, ViewChild} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-fav',
  imports: [HeaderComponent,ProductCardComponent,FooterComponent],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css'
})
export class FavComponent {
  // @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  // ngAfterViewInit() {
  //   const slider = this.scrollContainer.nativeElement;
  //   let isDown = false;
  //   let startX: number;
  //   let scrollLeft: number;

  //   slider.addEventListener('mousedown', (e: MouseEvent) => {
  //     isDown = true;
  //     startX = e.pageX - slider.offsetLeft;
  //     scrollLeft = slider.scrollLeft;
  //   });

  //   slider.addEventListener('mouseleave', () => {
  //     isDown = false;
  //   });

  //   slider.addEventListener('mouseup', () => {
  //     isDown = false;
  //   });

  //   slider.addEventListener('mousemove', (e: MouseEvent) => {
  //     if (!isDown) return;
  //     e.preventDefault();
  //     const x = e.pageX - slider.offsetLeft;
  //     const walk = (x - startX) * 2; // سرعة التمرير
  //     slider.scrollLeft = scrollLeft - walk;
  //   });

  //   // دعم اللمس للموبايل
  //   slider.addEventListener('touchstart', (e: TouchEvent) => {
  //     isDown = true;
  //     startX = e.touches[0].pageX - slider.offsetLeft;
  //     scrollLeft = slider.scrollLeft;
  //   });

  //   slider.addEventListener('touchend', () => {
  //     isDown = false;
  //   });

  //   slider.addEventListener('touchmove', (e: TouchEvent) => {
  //     if (!isDown) return;
  //     const x = e.touches[0].pageX - slider.offsetLeft;
  //     const walk = (x - startX) * 2;
  //     slider.scrollLeft = scrollLeft - walk;
  //   });
  // }
}