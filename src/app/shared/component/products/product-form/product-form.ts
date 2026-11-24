import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCardSection } from '@angular/material/card/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAnchor } from '@angular/material/button';
import { Iproduct } from '../../../model/Iproduct';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { ProductService } from '../../../service/product-service';
import { SnackbarService } from '../../../service/snackbar-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  imports: [MatCardModule, MatInput, MatFormFieldModule, MatSelectModule, MatAnchor, FormField],
  selector: 'app-product-form',
  styleUrl: './product-form.scss',
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  isInEditMode: boolean = false;
  productId!: number;
  getEditedObj!: Iproduct;

  ngOnInit(): void {
    this.getId();
    this.patchData();
  }

  productModel = signal<Iproduct>({
    productId: 0,
    productName: '',
    productImage: '',
    productBrand: '',
    productCategory: 'OTHERS',
    productPrice: '',
    isAvaible: true,
    productStatus: 'ORDERED',
  });

  
  private _productService = inject(ProductService);
  private _snackbarService = inject(SnackbarService);
  private _routerService = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  productForm = form(this.productModel, (schema) => {
    required(schema.productName, { message: 'Product name is required field..!' });
    minLength(schema.productName, 3, {
      message: 'Product name should be more than 3 characters..',
    });
    maxLength(schema.productName, 15, {
      message: 'Product name should be less than 15 characters..',
    });
    required(schema.productImage, { message: 'product image is required field..!' });
    required(schema.productBrand, { message: 'product brand is required field..!' });
  });

  // productForm = form(this.productModel);

  onAddProduct(eve: Event) {
    eve.preventDefault();
    if (this.productForm().invalid()) {
      this.productForm().markAsTouched();
      return;
    }

    let NEW_PRODUCT: Iproduct = {
      ...this.productModel(),
      productId: Date.now(),
    };

    this._productService.addProduct(NEW_PRODUCT).subscribe({
      next: (obj) => {
        this._snackbarService.openSnackBar(obj.message);
        this._routerService.navigate(['product']);
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err);
      },
    });
  }

  getId() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      console.log(this.productId);
    });
  }
  patchData() {
    this._productService.fetchProductById(this.productId).subscribe({
      next: (obj) => {
        this.productModel.set({ ...obj.data });
        this.getEditedObj = obj.data;
        this.isInEditMode = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProduct() {
    if (this.productForm().invalid()) {
      this.productForm().markAsTouched();
      return;
    }
    let UPDATED_OBJ: Iproduct = {
      ...this.productModel(),
      productId: this.getEditedObj.productId,
    };
    this._productService.updateProduct(UPDATED_OBJ).subscribe({
      next: (obj) => {
        this._routerService.navigate(['product']);
        this.isInEditMode = false;
        this._snackbarService.openSnackBar(obj.message);
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err);
      },
    });
  }
}
