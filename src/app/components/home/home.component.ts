import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";
import {Subscription} from "rxjs";
import {StoreService} from "../../services/store.service";

const ROWS_HEIGHT: {[id: number]: number} = {
  1: 400,
  3: 335,
  4: 350
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cols: number = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
      this.products = _products;
    });
  }

  onColumnsChange = (colsNumber: number): void => {
    this.cols = colsNumber;
  }

  onShowCategory = (newCategory: string): void => {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart = (product: Product): void => {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}