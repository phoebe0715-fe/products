import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewProduct, Product, Products } from '../products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

  productList: Product[] = [];
  subscriptions: Subscription[] = [];
  newProduct: NewProduct = {title: '', description: '', price: 0};

  constructor(private products: ProductsService){}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.subscriptions.push(this.products.getProducts().subscribe(
      (data: Products) => {
      this.productList = data.products;
      console.log(this.productList);
    }))
  }

  addProduct(){
    this.products.addProduct(this.newProduct).subscribe((product: Product) => {
      this.productList.push(product);
      this.resetNewProduct();
    })
  }

  deleteProduct(productId: number): void {
    this.products.deleteProduct(productId).subscribe(
      () => this.productList = this.productList.filter(product => product.id !== productId))
  }

  resetNewProduct(): void {
    this.newProduct = {title: '', description: '', price: 0};
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((sub)=>{
        sub.unsubscribe();
      });
  }
}
