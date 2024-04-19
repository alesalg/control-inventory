import { Component, Input, input } from '@angular/core';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/getAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {

  @Input() products: Array<GetAllProductsResponse> = [];

  public productSelected!: GetAllProductsResponse


}
