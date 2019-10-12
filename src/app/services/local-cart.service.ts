import { Injectable } from '@angular/core';

import { WindowReferenceService } from './window-reference.service';

@Injectable({
  providedIn: 'root'
})
export class LocalCartService {

  private window: Window;

  constructor(windowRef: WindowReferenceService) {
    this.window = windowRef.nativeWindow;
  }


  public clearAll(): void {
    this.clearCart();
    this.clearOrder();
  }


  public clearCart(): void {
    this.window.localStorage.setItem('cart', null);
  }


  public cartHasItems(): boolean {
    return (this.window.localStorage.getItem('cart') !== null);
  }


  public cartGetItems(): any {
    if (this.cartHasItems()) {
      let cart = this.window.localStorage.getItem('cart');
      cart = JSON.parse(cart);
      return cart;
    }
    return null;
  }


  public clearOrder(): void {
    this.window.localStorage.setItem('order', null);
  }


  public cartUpdateItems(items: any): void {
    const itemStr = JSON.stringify(items);
    this.window.localStorage.setItem('cart', itemStr);
  }


  public orderHasItems(): boolean {
    return (this.window.localStorage.getItem('order') !== null &&
            this.window.localStorage.getItem('order') !== 'null');
  }


  public orderHas(key: string): boolean {
    if (this.orderHasItems() && key) {
      let order = this.window.localStorage.getItem('order');
      order = JSON.parse(order);
      return (order[key] !== null);
    }
    return false;
  }


  public orderGetItems(): any {
    if (this.orderHasItems()) {
      let order = this.window.localStorage.getItem('order');
      order = JSON.parse(order);
      return order;
    }
    return null;
  }


  public orderUpdateItems(items: any): void {
    const itemStr = JSON.stringify(items);
    this.window.localStorage.setItem('order', itemStr);
  }
}
