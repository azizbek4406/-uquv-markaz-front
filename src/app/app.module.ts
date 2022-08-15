import { APP_BOOTSTRAP_LISTENER, NgModule, NgProbeToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent,GuruhForTechDialogComponent, OpenImageComponent, OquvchilarDialogComponent, UserInfoDialogComponent } from './shared/confirm-dialog.component';
import { ErrorInterceptor } from './core/error.interceptor';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { material_import } from './material-list';
import { RouterModule } from '@angular/router';
import { GuruhComponent } from './controller/guruh/guruh.component';
import { OqituvchiComponent } from './controller/oqituvchi/oqituvchi.component';
import { OquvchiComponent } from './controller/oquvchi/oquvchi.component';
import { TulovComponent } from './controller/tulov/tulov.component';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './controller/login/login.component';
import { AccountComponent } from './controller/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInfoDialogComponent,
    ConfirmDialogComponent,
    GuruhForTechDialogComponent,
    OquvchilarDialogComponent,
    OpenImageComponent,

    DashboardComponent,
    GuruhComponent,
    OquvchiComponent,
    OqituvchiComponent,
    TulovComponent,
    LoginComponent,
    AccountComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ...material_import
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
