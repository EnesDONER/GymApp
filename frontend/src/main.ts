import { CommonModule } from "@angular/common";
import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app/app.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from "./app/app.routes";
import { authInterceptor } from "./app/common/interceptors/auth.interceptor";


bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true
      }),
      RouterModule.forRoot(routes)
    )
  ]
})