

export interface Iproduct{
    productId : number,
    productName : string,
    productImage : string,
    productBrand : string,
    productCategory : 'FOOD' | 'COSMATIC' |'MEDICAL' |'OTHERS',
    productPrice : string,
    isAvaible: boolean,
    productStatus  : 'DELIVERED' | 'DIS-PATCH'| 'ORDERED' | 'SHIPPED'
}