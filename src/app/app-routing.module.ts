import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { from } from 'rxjs';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { JoinAsProComponent } from './join-as-pro/join-as-pro.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProfessionalsComponent } from './professionals/professionals.component'
import { AllTaskComponent } from './all-task/all-task.component'
import { DetailedTaskViewComponent } from './detailed-task-view/detailed-task-view.component'
import { MytaskComponent } from './mytask/mytask.component'
import { HireProComponent } from './hire-pro/hire-pro.component';
import { CustomerComponent } from './customer/customer.component';
import { AppliedTasksComponent } from './applied-tasks/applied-tasks.component'
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './sharedComponents/about/about.component';
import { ReviewComponent } from './sharedComponents/review/review.component';
import { PhotosComponent } from './sharedComponents/photos/photos.component';
import { FaqComponent } from './sharedComponents/faq/faq.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'joinaspro', component: JoinAsProComponent },
  { path: 'task', component: TasksComponent },
  { path: 'hire-pro', component: HireProComponent },
  { path: 'search-task', component: CustomerComponent },

  { path: 'registration', component: RegistrationPageComponent },
  // { path: 'registration', component: RegistrationPageComponent },
  { path: 'subcategory/:categoryId', component: SubCategoryComponent },
  { path: 'professionals', component: ProfessionalsComponent },
  { path: 'alltasks', component: AllTaskComponent },
  { path: 'taskdetails/:taskId', component: DetailedTaskViewComponent },
  { path: 'mytasks', component: MytaskComponent },
  { path: 'applied', component: AppliedTasksComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
