import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  constructor(private router: Router, private cookie: CookieService) {}
  ngOnInit(): void {}

  public sendDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public sendProducts(): void {
    debugger;
    this.router.navigate(['/products']);
  }

  public sendCategories(): void {
    this.router.navigate(['/categories']);
  }

  public sendSales(): void {
    this.router.navigate(['/sales']);
  }
  public logout(): void {
    this.cookie.delete('USER_INFO')
    this.router.navigate(['/login']);
  }
}
