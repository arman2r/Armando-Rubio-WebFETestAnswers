import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cotizar-seguro'
  },
  {
    path: 'cotizar-seguro',
    loadComponent: () => import('./pages/quote-insurance/quote-insurance.component').then((x) => x.QuoteInsuranceComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
