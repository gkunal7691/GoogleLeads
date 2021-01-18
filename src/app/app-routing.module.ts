import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SettingComponent } from './component/setting/setting/setting.component';




const routes: Routes = [
 {path: '', component: HomePageComponent},
 {path: 'apikey', component:SettingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
