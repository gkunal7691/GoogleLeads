import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CacheService } from './services/cache.service';
import { AuthLoadService } from './services/auth.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LayoutModule } from '../app/layout/layout.module';


export function usersProviderFactory(provider: AuthLoadService) {
  return () => provider.setUserbyAPI();
}


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    LayoutModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    CacheService,
    AuthLoadService,
    { provide: APP_INITIALIZER, useFactory: usersProviderFactory, deps: [AuthLoadService], multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
