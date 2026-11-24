import { Component, inject } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../../../service/product-service';
import { Iproduct } from '../../../model/Iproduct';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, RouterOutlet , MatButtonModule],
  selector: 'app-product-dashboard',
  styleUrl: './product-dashboard.scss',
  templateUrl: './product-dashboard.html',
})
export class ProductDashboard {
  getAllProducts !:Iproduct[]

  constructor(){this.getAll()}

  private _productService = inject(ProductService);
  products = this._productService.products

    getAll() {
    this._productService.fetchAll().subscribe({
      next: (data) => {
        this.getAllProducts = data;
      },
      error: (err) => [console.log(err)],
    });
  }
}
