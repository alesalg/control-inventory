import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { GetCategoriesresponse } from '../../models/interfaces/categories/event/getAllCategoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environments.API_URL;
  private JTW_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.JTW_TOKEN}`
    })
  }

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllCategories(): Observable<GetCategoriesresponse[]> {
    return this.http.get<GetCategoriesresponse[]>(`${this.API_URL}/categories`, this.httpOptions)
  }
}
