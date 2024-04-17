import { MessageService } from 'primeng/api';
import { ProductsService } from './../../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { GetAllProductsResponse } from '../../../models/interfaces/products/getAllProductsResponse';
import { ProductsDataTransferService } from '../../../shared/services/products/products-data-transfer.service';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {

    public productsList: Array<GetAllProductsResponse> = []

    constructor(private productsService: ProductsService, private messageService: MessageService, private productsDataTransferService: ProductsDataTransferService) {}

    ngOnInit(): void {
        this.getProductsData();
       
    }


    getProductsData(): void {
        this.productsService.getAllProducts().subscribe({
            next: (response) => {
                if(response.length > 0){
                    this.productsList = response;
                    this.productsDataTransferService.setProdutcsDatas(this.productsList)

                }
            },
            error: (err) => {
                console.log(err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao buscar produtos',
                    life: 2500
                })
            }
        })
    }
}
