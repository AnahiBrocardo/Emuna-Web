import { Component } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ ProductsComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {

}
