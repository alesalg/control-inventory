import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../../services/products/products.service';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/getAllProductsResponse';
import { EventAction } from '../../../../models/interfaces/products/event/eventAction';
import { DeleteProductAction } from '../../../../models/interfaces/products/event/deleteProductAction';

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
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

  handleProductAction(event: EventAction): void {
    if(event){
      console.log('Dados do evento recebido',event)

    }
  }

  handleDeleteProduct(event: DeleteProductAction): void {
    if(event){
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${event.productName}`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event.productId),
      })
    }
  }
  deleteProduct(productId: string) {
    if(productId){
      this.producstService.deleteProduct(productId).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if(response){
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto removido com sucesso!',
              life: 2500
            })
            this.getAPIProductsDatas()
          }
        },
        error: (err) => {
          console.log(err)
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover produto!',
            life: 2500
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
