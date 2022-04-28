import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuruhComponent } from './controller/guruh/guruh.component';
import { LoginComponent } from './controller/login/login.component';
import { OqituvchiComponent } from './controller/oqituvchi/oqituvchi.component';
import { OquvchiComponent } from './controller/oquvchi/oquvchi.component';

const routes: Routes = [
  {
    path: "oqituvchi",
    component: OqituvchiComponent
  },
  {
    path: "guruh",
    component: GuruhComponent
  },
  {
    path: "oquvchi",
    component: OquvchiComponent
  },
  {
    path: "login",
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
