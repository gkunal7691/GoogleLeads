import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessesComponent } from './component/businesses/businesses/businesses.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SettingComponent } from './component/setting/setting/setting.component';




const routes: Routes = [
 {path: '', component: HomePageComponent},
 {path: 'apikey', component:SettingComponent},
 {path: 'businesses', component:BusinessesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
