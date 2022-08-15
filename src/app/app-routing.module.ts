import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './controller/account/account.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { GuruhComponent } from './controller/guruh/guruh.component';
import { LoginComponent } from './controller/login/login.component';
import { OqituvchiComponent } from './controller/oqituvchi/oqituvchi.component';
import { OquvchiComponent } from './controller/oquvchi/oquvchi.component';
import { TulovComponent } from './controller/tulov/tulov.component';

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
    path: "",
    component: DashboardComponent
  },
  {
    path: "tulov",
    component: TulovComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "account",
    component: AccountComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
