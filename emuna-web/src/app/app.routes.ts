import { Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PatternsComponent } from './components/patterns/patterns.component';
import { QuestionsComponent } from './components/questions/questions.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'patterns', component: PatternsComponent},
    {path: 'questions', component: QuestionsComponent}
];
