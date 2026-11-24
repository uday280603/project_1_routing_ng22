import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../service/product-service';
import { Iproduct } from '../../../model/Iproduct';
import { MatCardImage, MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../../get-confirm-component/get-confirm-component';
import { SnackbarService } from '../../../service/snackbar-service';

@Component({
  imports: [MatCardModule, MatDivider, MatButtonModule, RouterLink],
  selector: 'app-product',
  styleUrl: './product.scss',
  templateUrl: './product.html',
})
export class Product implements OnInit {
  getProduct = signal<Iproduct | null>(null);
  productId!: number;

  _productService = inject(ProductService);
  _activeRoute = inject(ActivatedRoute);
  _routerService = inject(Router);
  _matDialog = inject(MatDialog);
  _snackbarService = inject(SnackbarService);
  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      this.getById();
    });
  }

  products = this._productService.products;

 getById() {
  this.getProduct.set(null);

  this._productService.fetchProductById(this.productId).subscribe({
    next: (data) => {
      this.getProduct.set(data.data ?? null);
    },
    error: (err) => {
      this.getProduct.set(null);
      console.log(err);
    },
  });
}

  onRemoveProduct(removeId: number) {
    let config = new MatDialogConfig();
    config.data = `Are you sure to remove product with id ${removeId}..?`;
    config.disableClose = true;
    config.width = '450px';
    let _matRef = this._matDialog.open(GetConfirmComponent, config);
    _matRef.afterClosed().subscribe((res) => {
      if (res) {
        this._productService.removeProduct(removeId).subscribe({
          next: (data) => {
            this._snackbarService.openSnackBar(data.message);
            this._routerService.navigate(['product']);
          },
          error: (err) => {
            this._snackbarService.openSnackBar(err);
          }
        });
      }
    });
  }
}
