import { Component } from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart = { items : [{
      product: "prdImg",
      name: "Product",
      price: 25,
      quantity: 10,
      id: 1,
    },
      {
          product: "prdImg",
          name: "Product",
          price: 25,
          quantity: 1,
          id: 2,
      }]};
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<String> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  ngOnInit(): void {
    this.dataSource = this.cart.items
  }

  getTotal(items: Array<CartItem>): number {
      return items.map(item => item.price * item.quantity).reduce((acc, total) => acc + total, 0);
  }
}
