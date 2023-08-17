import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent {

  @Output() columnsCountChange = new EventEmitter<number>();

  sort: string = 'desc';
  itemsShowCount: number = 12;

  onSortUpdate = (newSort: string): void => {
    this.sort = newSort;
  }

  onItemUpdate = (count: number): void  => {
    this.itemsShowCount = count;
  }

  onColumnsUpdate = (colsNum: number): void => {
    this.columnsCountChange.emit(colsNum);
  }

}
