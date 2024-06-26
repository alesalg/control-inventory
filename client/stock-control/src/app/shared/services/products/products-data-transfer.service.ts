import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from '../../../models/interfaces/products/responses/getAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {

  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse>  | null>(null)
    public productsDatas: Array<GetAllProductsResponse> = [];


  setProdutcsDatas(products: Array<GetAllProductsResponse>): void {
    if(products) {
      this.productsDataEmitter$.next(products)
    }
  }

  getProductsData() {
    this.productsDataEmitter$.pipe(take(1), map((data)=> data?.filter((product)=> product.amount > 0))).subscribe({
      next: (response)=> {
        if(response){
          this.productsDatas = response;
        }
      }
    })
    return this.productsDatas
  }
}
