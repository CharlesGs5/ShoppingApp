import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {HttpClient} from "@angular/common/http";
import {loadStripe} from "@stripe/stripe-js";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { items : [
      {
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

  constructor(private cartService: CartService, private http: HttpClient) {}
  ngOnInit(): void {
      this.cartService.cart.subscribe((_cart) => {
          this.cart = _cart;
          this.dataSource = this.cart.items;
      });
  }

  getTotal(items: Array<CartItem>): number {
      return this.cartService.getTotal(items)
  }

  onClearCart(): void {
      this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
      this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
      this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void {
      this.cartService.removeQuantity(item)
  }

  onCheckout(): void {
      this.http.post('http://localhost:4242/checkout', {
          items: this.cart.items,
      }).subscribe(async(res: any) => {
         let stripe = await loadStripe('pk_test_51NlJelLlg6AUYyoijQxyHpme1JhdpOlhGgq7UPMpP63gV5T2gC5m8bOkTcMkYHwcCjumqMNk5Kqlcs4xpmqYdErG00OooGqgVl');
         stripe?.redirectToCheckout({
            sessionId: res.id
         });
      });
  }
}
