import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product, NewProduct} from './products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api = 'https://dummyjson.com/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Products>{
    return this.httpClient.get<Products>(this.api);
  }

  addProduct(newProduct: NewProduct): Observable<Product> {
    return this.httpClient.post<Product>(`${this.api}/add`, newProduct)
  }

  deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api}/${productId}`);
  }
}
