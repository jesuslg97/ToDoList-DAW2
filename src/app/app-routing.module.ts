import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/index' },
  { path: 'index', component: IndexComponent },
  { path: 'form', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
