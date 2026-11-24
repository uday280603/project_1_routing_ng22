import { Service, signal } from '@angular/core';
import { Iproduct } from '../model/Iproduct';
import { Observable, of, throwError } from 'rxjs';
import { Ires } from '../model/Ires';

@Service()
export class ProductService {
  productData: Iproduct[] = [
    {
      productId: 1,
      productName: 'Fresh Apple',
      productImage: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
      productBrand: 'Fresh Farm',
      productCategory: 'FOOD',
      productPrice: '150',
      isAvaible: true,
      productStatus: 'DELIVERED',
    },
    {
      productId: 2,
      productName: 'Face Cream',
      productImage:
        'https://imgs.search.brave.com/IMfFZJS9OWC5qrvtWj7oMXdf3q-GeV02F3lNZFMSbVc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDcv/Nzk5LzExNy9zbWFs/bC9zdHVkaW8tc2hv/dC1vZi1yZWxheGVk/LWJlYXV0aWZ1bC13/b21hbi13aXRoLWNs/b3NlZC1leWVzLXRp/bHRzLWhlYWQtdG91/Y2hlcy1za2luLWdl/bnRseS1hcHBsaWVz/LWZhY2UtY3JlYW0t/d2VhcnMtYmF0aC10/b3dlbC1vbi1oZWFk/LWFmdGVyLXRha2lu/Zy1zcGEtcHJvY2Vk/dXJlcy1lbmpveXMt/ZmFjaWFsLXRyZWF0/bWVudHMtYm9keS1j/YXJlLWZyZWUtcGhv/dG8uanBn',
      productBrand: 'Glow Beauty',
      productCategory: 'COSMATIC',
      productPrice: '499',
      isAvaible: true,
      productStatus: 'DIS-PATCH',
    },
    {
      productId: 3,
      productName: 'Vitamin Tablets',
      productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
      productBrand: 'Health Plus',
      productCategory: 'MEDICAL',
      productPrice: '299',
      isAvaible: false,
      productStatus: 'DELIVERED',
    },
  ];

  products = signal<Iproduct[]>(this.productData);

  fetchAll(): Observable<Iproduct[]> {
    return of(this.productData);
  }

  fetchProductById(id: number): Observable<Ires<Iproduct>> {
    let GETOBJ = this.productData.find((prod) => prod.productId === id);
    if (!GETOBJ) {
      return throwError(() => new Error('Product not found..!'));
    }
    return of({
      message: '',
      data: GETOBJ,
    });
  }

  addProduct(productObj: Iproduct): Observable<Ires<Iproduct>> {
    this.productData.unshift(productObj);
    this.products.set([...this.productData]);
    return of({
      message: `New product with id ${productObj.productId} is added successfullly..!`,
      data: productObj,
    });
  }

  updateProduct(updatedObj: Iproduct): Observable<Ires<Iproduct>> {
    let GETINDEX = this.productData.findIndex((obj) => obj.productId === updatedObj.productId);
    this.productData[GETINDEX] = updatedObj;
    this.products.update((dataArray) =>
      dataArray.map((product) =>
        product.productId === updatedObj.productId ? updatedObj : product,
      ),
    );
    return of({
      message: `The Product with id ${updatedObj.productId} is updated successfully..!`,
      data: updatedObj,
    });
  }

  removeProduct(id: number): Observable<Ires<Iproduct>> {
    let GETINDEX = this.productData.findIndex((p) => p.productId === id);
    let removeObj = this.productData.splice(GETINDEX, 1);
    this.products.set([...this.productData]);
    return of({
      message: `The product with id ${id} is removed successfully..!`,
      data: removeObj[0],
    });
  }
}
