import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  newProductName: string = '';
  categoryId: number = 0;
  page: number = 1;
  pageSize: number = 10;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories(); // Fetch categories when component initializes
  }

  getCategories() {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe(categories => this.categories = categories);
  }

  getProducts() {
    this.http.get<any[]>(`http://localhost:3000/products?page=${this.page}&pageSize=${this.pageSize}`).subscribe(products => this.products = products);
  }

  createProduct() {
    this.http.post<any>('http://localhost:3000/products', { productName: this.newProductName, categoryId: this.categoryId }).subscribe(() => {
      this.getProducts();
      this.newProductName = '';
      this.categoryId = 0; // Reset categoryId after creating a product
    });
  }

  updateProduct(productId: number, newName: string, newCategoryId: number) {
    this.http.put<any>('http://localhost:3000/products', { productId, productName: newName, categoryId: newCategoryId }).subscribe(() => this.getProducts());
  }

  deleteProduct(productId: number) {
    this.http.delete<any>(`http://localhost:3000/products/${productId}`).subscribe(() => this.getProducts());
  }
}
