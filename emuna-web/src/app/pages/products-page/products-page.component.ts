import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { ProductsComponent } from '../../components/products/products.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [NavbarComponent, ProductsComponent, NavbarComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {

}
