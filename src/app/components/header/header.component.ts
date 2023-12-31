import {Component, Input} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private _cart: Cart = { items: [] }
  itemsQuantity: number = 0;

  constructor(private cartService: CartService) {}

  @Input()
  get cart() {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items.map((item) => item.quantity)
        .reduce((acc, item) => acc + item, 0)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart();
  }
}
