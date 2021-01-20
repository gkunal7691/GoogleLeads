import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppRoutingModule } from './app-routing.module';

import { MatTableExporterModule } from 'mat-table-exporter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { CacheService } from './services/cache.service';
import { AuthLoadService } from './services/auth.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LayoutModule } from '../app/layout/layout.module';
import { SettingComponent } from './component/setting/setting/setting.component';
import { BusinessesComponent } from './component/businesses/businesses/businesses.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon'
import { AgmCoreModule } from '@agm/core';



export function usersProviderFactory(provider: AuthLoadService) {
  return () => provider.setUserbyAPI();
}


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SettingComponent,
    BusinessesComponent,
  ],

  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhhL0iW8nLYyCPsAHGv2Wj9CIKOx9TiDk',
      libraries: ['places']
    }),
    CommonModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    HttpClientModule,
    CarouselModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    LayoutModule,
    MatButtonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    CacheService,
    AuthLoadService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: APP_INITIALIZER, useFactory: usersProviderFactory, deps: [AuthLoadService], multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
