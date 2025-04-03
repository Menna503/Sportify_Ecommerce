// import { Component ,Input ,Output ,OnInit,EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-pagination',
//   imports: [CommonModule],
//   templateUrl: './pagination.component.html',
//   styleUrl: './pagination.component.css'
// })
// export class PaginationComponent {
//    @Input() totalItems:any
//    @Input() currentPage:any
//    @Input() itemsPerPage:any
//    @Output() onClick:EventEmitter <number>=new EventEmitter()

//    totalPages=0
//    pages:number[]=[]

//    constructor(){}
//    ngOnInit():void{
//      if(this.totalItems){
//       this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage);
//       this.pages=Array.from({length:this.totalPages} , (_,i)=>i+1);
//      }
//    }

//    pageClicked(page:number){
//     if(page<=this.totalPages && page>0)
//     this.onClick.emit(page)
//    }
// }


import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: any;
  @Input() currentPage: any;
  @Input() itemsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter();

  totalPages = 0;
  pages: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.totalItems && this.itemsPerPage) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }

  pageClicked(page: number) {
    if (page <= this.totalPages && page > 0) {
      this.onClick.emit(page);
// <<<<<<< sama1
    }
  }
}
// =======
//     }
//   }
// }
// >>>>>>> develop