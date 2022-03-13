import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService){}

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean = false;
  errorMessage = 'Error message';
  sub!: Subscription;

  private _filterCriteria: string = '';
  get filterCriteria(): string{
    return this._filterCriteria;
  }
  set filterCriteria(value: string){
    this._filterCriteria = value;
  }

  private _products: IProduct[] = [];
  get products(): IProduct[]{
    return this.performFilter(this.filterCriteria);
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => this._products = products,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.filterCriteria.length
    ? this._products
      .filter(p => p.productName.toLocaleLowerCase().includes(filterBy))
    : this._products;
  }

  onRatingClicked(message: string) : void{
    this.pageTitle = 'Product list: ' + message;
  }
}
