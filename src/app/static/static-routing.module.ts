import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
// import { LoginComponent } from './login/login.component';
import { ContentDialogComponent } from './login/contentdialog';
import { LoginDialogComponent } from './login/logindialog';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'anms.menu.about' }
  },
  {
    path: 'login',
    component: FeaturesComponent,
    data: { title: 'anms.menu.login' }
  },
  {
    path: 'features',
    component: FeaturesComponent,
    data: { title: 'anms.menu.features' }
  },
  {
    path: 'dialogo',
    component: ContentDialogComponent  },
  {
    path: 'dialogologin',
    component: LoginDialogComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
