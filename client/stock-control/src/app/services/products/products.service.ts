import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environments } from '../../../environments/environments';
import { Observable, map } from 'rxjs';
import { GetAllProductsResponse } from '../../models/interfaces/products/getAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = environments.API_URL;
  private JTW_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.JTW_TOKEN}`
    })
  }

  constructor(private http: HttpClient, private cookie: CookieService) { }


  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(`${this.API_URL}/products`, this.httpOptions).pipe(
      map((data)=> data.filter((product)=> product?.amount > 0))
    )
  }
}
