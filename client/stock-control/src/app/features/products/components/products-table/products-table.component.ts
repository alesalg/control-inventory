import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/getAllProductsResponse';
import { ProductEvent } from '../../../../models/enums/products/productEvent';
import { EventAction } from '../../../../models/interfaces/products/event/eventAction';
import { DeleteProductAction } from '../../../../models/interfaces/products/event/deleteProductAction';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {

  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>()
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>()

  public productSelected!: GetAllProductsResponse

  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT; 


  public HandleProductEvent(action: number, id?: string): void {
    if(action){
      const productEventData = id ? {action, id} : {action};
      this.productEvent.emit(productEventData);

    }
  }

  public HandleDeleteEvent(productId: string, productName: string): void {
    if(productId && productName){
      this.deleteProductEvent.emit({ productId, productName});
    }
  }
}
