import { MessageService } from 'primeng/api';
import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../../services/products/products.service';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/getAllProductsResponse';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrl: './products-home.component.scss',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public productsDatas: Array<GetAllProductsResponse> = []

  constructor(
    private producstService: ProductsService,
    private productsDataTransferService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
   this.getServiceProductsData()
  }

  getServiceProductsData() {
    const productsLoaded = this.productsDataTransferService.getProductsData()

    if(productsLoaded.length > 0){
      this.productsDatas = productsLoaded
    }else {
      this.getAPIProductsDatas()
    }
  }

  getAPIProductsDatas() {
    this.producstService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (resp)=> {
        if(resp.length > 0) {
          this.productsDatas = resp
        }
      },
      error: (err) => {
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos',
          life: 2500
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
